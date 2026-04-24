// src/pages/SmartEstimate.jsx
import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { db } from "../lib/supabase";
import { success, error as notifyError, warning } from "../modules/notificationUtils";
import Modal, { ConfirmDialog } from "../components/Modal";

const MAX_PHOTOS = 5;
const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const PROJECT_TYPES = [
  "Fencing",
  "Landscaping",
  "Handyman",
  "Apartment Turnover",
  "Metal Building",
  "Painting",
  "Concrete",
  "Demo",
  "Other",
];

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(parseFloat(amount || 0));
}

function confidenceBadge(confidence) {
  const c = (confidence || "").toLowerCase();
  if (c === "high") return "bg-green-100 text-green-800 border-green-200";
  if (c === "medium") return "bg-yellow-100 text-yellow-800 border-yellow-200";
  if (c === "low") return "bg-red-100 text-red-800 border-red-200";
  return "bg-gray-100 text-gray-800 border-gray-200";
}

export default function SmartEstimate({ readOnly = false }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id: routeId } = useParams();
  const fileInputRef = useRef(null);

  // ---------- Form inputs ----------
  const [photos, setPhotos] = useState([]); // array of File
  const [photoErrors, setPhotoErrors] = useState([]);
  const [description, setDescription] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [projectType, setProjectType] = useState("");

  // Customers for the dropdown
  const [customers, setCustomers] = useState([]);
  const [customersLoading, setCustomersLoading] = useState(true);

  // Zone resolution
  const [zoneInfo, setZoneInfo] = useState(null); // { name, multiplier } or { error: true }
  const [zoneLoading, setZoneLoading] = useState(false);

  // Generation state
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState(null); // backend response

  // Discard / convert modals
  const [confirmDiscard, setConfirmDiscard] = useState(false);
  const [convertOpen, setConvertOpen] = useState(false);
  const [convertCustomerId, setConvertCustomerId] = useState("");
  const [convertTitle, setConvertTitle] = useState("");
  const [converting, setConverting] = useState(false);

  // Drag state
  const [dragActive, setDragActive] = useState(false);

  // Read-only load (when arriving at /smart-estimate/:id)
  const [readOnlyLoading, setReadOnlyLoading] = useState(readOnly && !!routeId);
  const [readOnlyError, setReadOnlyError] = useState(null);

  // ---------- Effects ----------
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await db.customers.getAll();
        if (!cancelled) setCustomers(data || []);
      } catch (err) {
        console.error("Failed to load customers:", err);
      } finally {
        if (!cancelled) setCustomersLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Load existing estimate in read-only mode
  useEffect(() => {
    if (!readOnly || !routeId) return;
    let cancelled = false;
    (async () => {
      try {
        const data = await db.estimates.getById(routeId);
        if (cancelled) return;
        // Reshape stored estimate into the same `result` shape used by the right column
        setResult({
          estimate_id: data.id,
          zone: data.zone || null,
          ai: data.ai || {
            confidence: data.confidence || null,
            summary: data.ai_summary || "",
            scope: data.scope || [],
            labor_hours: data.labor_hours || null,
            notes: data.ai_notes || null,
          },
          line_items: data.line_items || [],
          subtotal: data.subtotal || 0,
          suggested_quote_title: data.suggested_quote_title || "",
          warnings: data.warnings || [],
          customer: data.customer || null,
          created_at: data.created_at,
          status: data.status,
          converted_quote: data.converted_quote || null,
          description: data.description || "",
          zip_code: data.zip_code || "",
        });
        setDescription(data.description || "");
        setZipCode(data.zip_code || "");
        setCustomerId(data.customer_id || "");
        setProjectType(data.project_type || "");
      } catch (err) {
        console.error("Failed to load estimate:", err);
        setReadOnlyError(err.message || "Failed to load estimate");
      } finally {
        if (!cancelled) setReadOnlyLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [readOnly, routeId]);

  // Resolve zone whenever zip becomes 5 digits
  useEffect(() => {
    if (readOnly) return;
    const trimmed = (zipCode || "").trim();
    if (!/^\d{5}$/.test(trimmed)) {
      setZoneInfo(null);
      return;
    }
    let cancelled = false;
    setZoneLoading(true);
    (async () => {
      try {
        const data = await db.pricing.resolveZone(trimmed);
        if (cancelled) return;
        if (data && data.zone) {
          setZoneInfo(data.zone);
        } else if (data && data.name) {
          // backend may return the zone object directly
          setZoneInfo(data);
        } else {
          setZoneInfo({ outside: true });
        }
      } catch (err) {
        if (!cancelled) setZoneInfo({ outside: true, error: err.message });
      } finally {
        if (!cancelled) setZoneLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [zipCode, readOnly]);

  // Free object URLs when files change / unmount
  useEffect(() => {
    const urls = photos.map((p) => URL.createObjectURL(p));
    return () => {
      urls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [photos]);

  // ---------- Photo handlers ----------
  const validateFiles = (incoming) => {
    const errs = [];
    const accepted = [];
    for (const f of incoming) {
      if (!ALLOWED_TYPES.includes(f.type)) {
        errs.push(`${f.name}: JPEG/PNG/WebP only`);
        continue;
      }
      if (f.size > MAX_FILE_BYTES) {
        errs.push(`${f.name}: file too large (max 5MB)`);
        continue;
      }
      accepted.push(f);
    }
    return { errs, accepted };
  };

  const addFiles = useCallback(
    (fileList) => {
      const incoming = Array.from(fileList || []);
      if (incoming.length === 0) return;
      const { errs, accepted } = validateFiles(incoming);
      const room = MAX_PHOTOS - photos.length;
      const sliced = accepted.slice(0, room);
      if (accepted.length > room) {
        errs.push(`Max ${MAX_PHOTOS} photos`);
      }
      setPhotos((prev) => [...prev, ...sliced]);
      setPhotoErrors(errs);
    },
    [photos],
  );

  const removePhoto = (idx) => {
    setPhotos((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer && e.dataTransfer.files) {
      addFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleFilePick = (e) => {
    addFiles(e.target.files);
    // reset so picking the same file again triggers change
    e.target.value = "";
  };

  // ---------- Generate ----------
  const canGenerate = useMemo(() => {
    return (
      photos.length >= 1 &&
      description.trim().length >= 10 &&
      /^\d{5}$/.test((zipCode || "").trim()) &&
      !generating
    );
  }, [photos, description, zipCode, generating]);

  const handleGenerate = async () => {
    if (!canGenerate) return;
    setGenerating(true);
    setResult(null);
    try {
      const fd = new FormData();
      photos.forEach((p) => fd.append("photos", p));
      fd.append("description", description.trim());
      fd.append("zip_code", zipCode.trim());
      if (customerId) fd.append("customer_id", customerId);
      if (projectType) fd.append("project_type", projectType);

      const data = await db.estimates.create(fd);
      setResult(data);
      // Pre-populate convert modal defaults
      setConvertCustomerId(customerId || "");
      setConvertTitle(data.suggested_quote_title || "");
      success("Smart Estimate generated");
    } catch (err) {
      console.error("Smart Estimate error:", err);
      notifyError(err.message || "Failed to generate estimate");
    } finally {
      setGenerating(false);
    }
  };

  const handleClear = () => {
    setPhotos([]);
    setPhotoErrors([]);
    setDescription("");
    setZipCode("");
    setCustomerId("");
    setProjectType("");
    setZoneInfo(null);
    setResult(null);
  };

  // ---------- Discard ----------
  const handleDiscard = async () => {
    if (!result?.estimate_id) return;
    try {
      await db.estimates.discard(result.estimate_id);
      success("Estimate discarded");
      navigate("/smart-estimate");
    } catch (err) {
      console.error("Discard error:", err);
      notifyError(err.message || "Failed to discard estimate");
    }
  };

  // ---------- Convert ----------
  const handleConvertSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!result?.estimate_id) return;
    if (!convertCustomerId) {
      warning("Please select a customer");
      return;
    }
    setConverting(true);
    try {
      const payload = {
        customer_id: convertCustomerId,
        title: convertTitle || result.suggested_quote_title,
      };
      const data = await db.estimates.convert(result.estimate_id, payload);
      success("Quote draft created");
      const newId = data.quote_id || data.id;
      setConvertOpen(false);
      navigate(`/quotes/${newId}/edit`);
    } catch (err) {
      console.error("Convert error:", err);
      notifyError(err.message || "Failed to create draft quote");
    } finally {
      setConverting(false);
    }
  };

  // ---------- Render helpers ----------
  if (readOnlyLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-terracotta"></div>
        </div>
      </div>
    );
  }

  if (readOnlyError) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-6">
          {readOnlyError}
        </div>
      </div>
    );
  }

  const aiData = result?.ai || {};
  const lineItems = result?.line_items || [];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="text-2xl font-heading font-bold text-charcoal">
          {readOnly ? "Smart Estimate" : t("smartEstimate.create.title")}
        </h1>
        <button
          type="button"
          onClick={() => navigate("/smart-estimate")}
          className="text-sm text-gray-600 hover:text-terracotta"
        >
          ← {t("common.back")}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ---------------- LEFT: Inputs ---------------- */}
        {!readOnly && (
          <div className="bg-white rounded-lg shadow p-6 space-y-6">
            {/* Photo dropzone */}
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                {t("smartEstimate.create.uploadPhotos")}{" "}
                <span className="text-red-500">*</span>
              </label>
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition ${
                  dragActive
                    ? "border-terracotta bg-terracotta/5"
                    : "border-gray-300 hover:border-terracotta hover:bg-gray-50"
                }`}
              >
                <svg
                  className="w-10 h-10 mx-auto text-gray-400 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 16.5V19a2 2 0 002 2h14a2 2 0 002-2v-2.5M16 12l-4-4-4 4M12 8v12"
                  />
                </svg>
                <p className="text-sm text-gray-600">
                  {t("smartEstimate.create.dropPhotos")}
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFilePick}
                  className="hidden"
                />
              </div>

              {/* Inline errors */}
              {photoErrors.length > 0 && (
                <ul className="mt-2 text-xs text-red-600 space-y-1">
                  {photoErrors.map((er, i) => (
                    <li key={i}>{er}</li>
                  ))}
                </ul>
              )}

              {/* Thumbnails */}
              {photos.length > 0 && (
                <div className="mt-3 grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {photos.map((file, idx) => {
                    const url = URL.createObjectURL(file);
                    return (
                      <div
                        key={`${file.name}-${idx}`}
                        className="relative rounded-md overflow-hidden border border-gray-200 group"
                      >
                        <img
                          src={url}
                          alt={file.name}
                          className="w-full h-20 object-cover"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removePhoto(idx);
                          }}
                          className="absolute top-1 right-1 bg-black/70 hover:bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
                          aria-label="Remove photo"
                        >
                          ✕
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
              <p className="text-xs text-gray-500 mt-2">
                {photos.length}/{MAX_PHOTOS} photos
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                {t("smartEstimate.create.description")}{" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value.slice(0, 2000))}
                placeholder={t("smartEstimate.create.descriptionPlaceholder")}
                rows={4}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-terracotta"
              />
              <p
                className={`text-xs mt-1 ${
                  description.trim().length < 10
                    ? "text-gray-500"
                    : "text-gray-600"
                }`}
              >
                {description.length}/2000
                {description.trim().length > 0 &&
                  description.trim().length < 10 &&
                  " · minimum 10 characters"}
              </p>
            </div>

            {/* Zip */}
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                {t("smartEstimate.create.zipCode")}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={5}
                value={zipCode}
                onChange={(e) =>
                  setZipCode(e.target.value.replace(/\D/g, "").slice(0, 5))
                }
                placeholder="77316"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-terracotta"
              />
              {zoneLoading && (
                <p className="text-xs text-gray-500 mt-1">Resolving zone...</p>
              )}
              {!zoneLoading && zoneInfo && !zoneInfo.outside && (
                <p className="text-xs text-deepGreen mt-1">
                  {t("smartEstimate.create.zone")}: {zoneInfo.name}
                  {zoneInfo.multiplier
                    ? ` (${zoneInfo.multiplier}× baseline)`
                    : ""}
                </p>
              )}
              {!zoneLoading && zoneInfo && zoneInfo.outside && (
                <p className="text-xs text-red-600 mt-1">
                  {t("smartEstimate.create.outsideArea")}
                </p>
              )}
            </div>

            {/* Customer */}
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                {t("smartEstimate.create.customer")}
              </label>
              <select
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-terracotta bg-white"
              >
                <option value="">(unassigned — pick when saving)</option>
                {customersLoading ? (
                  <option disabled>Loading customers...</option>
                ) : (
                  customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.first_name} {c.last_name}
                      {c.email ? ` · ${c.email}` : ""}
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* Project type */}
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                {t("smartEstimate.create.projectType")}
              </label>
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-terracotta bg-white"
              >
                <option value="">—</option>
                {PROJECT_TYPES.map((pt) => (
                  <option key={pt} value={pt}>
                    {pt}
                  </option>
                ))}
              </select>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={handleGenerate}
                disabled={!canGenerate}
                className="bg-terracotta hover:bg-terracotta/90 disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-md font-medium transition flex items-center gap-2"
              >
                {generating ? (
                  <>
                    <span className="animate-spin h-4 w-4 border-2 border-white border-b-transparent rounded-full" />
                    {t("smartEstimate.create.generating")}
                  </>
                ) : (
                  t("smartEstimate.create.generate")
                )}
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="px-4 py-2.5 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition"
              >
                Reset
              </button>
            </div>
          </div>
        )}

        {/* ---------------- RIGHT: Result ---------------- */}
        <div
          className={`${
            readOnly ? "md:col-span-2" : ""
          } ${result ? "" : "hidden md:block"}`}
        >
          {!result ? (
            <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
              <svg
                className="w-12 h-12 mx-auto text-gray-300 mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M5 3v4 M3 5h4 M6 17v4 M4 19h4 M13 3l-1.5 4.5L7 9l4.5 1.5L13 15l1.5-4.5L19 9l-4.5-1.5z"
                />
              </svg>
              <p className="font-medium text-gray-700 mb-1">
                Smart Estimate result will appear here
              </p>
              <p className="text-sm text-gray-500">
                Upload photos and a short description, then click Generate.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-6 space-y-5">
              {/* Header + confidence */}
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <h2 className="text-xl font-heading font-bold text-terracotta">
                  ✨ Smart Estimate
                </h2>
                {aiData.confidence && (
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium border ${confidenceBadge(
                      aiData.confidence,
                    )}`}
                  >
                    {t("smartEstimate.create.confidence")}: {aiData.confidence}
                  </span>
                )}
              </div>

              {/* Zone */}
              {result.zone && (
                <p className="text-sm text-gray-700">
                  <span className="font-medium">
                    {t("smartEstimate.create.zone")}:
                  </span>{" "}
                  {result.zone.name}
                  {result.zone.multiplier
                    ? ` (${result.zone.multiplier}× baseline)`
                    : ""}
                </p>
              )}

              {/* Summary */}
              {aiData.summary && (
                <div className="bg-cream border border-gray-200 rounded-md p-4 text-sm text-charcoal whitespace-pre-wrap">
                  <p className="font-medium mb-1 text-gray-700">
                    {t("smartEstimate.create.summary")}
                  </p>
                  {aiData.summary}
                </div>
              )}

              {/* Scope pills */}
              {Array.isArray(aiData.scope) && aiData.scope.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    {t("smartEstimate.create.scope")}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {aiData.scope.map((s, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 rounded-full text-xs bg-terracotta/10 text-terracotta border border-terracotta/20"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Labor hours */}
              {(aiData.labor_hours || aiData.labor_hours === 0) && (
                <p className="text-sm text-gray-700">
                  <span className="font-medium">
                    {t("smartEstimate.create.laborHours")}:
                  </span>{" "}
                  {aiData.labor_hours}
                </p>
              )}

              {/* AI notes */}
              {aiData.notes && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 text-sm text-yellow-800">
                  {aiData.notes}
                </div>
              )}

              {/* Warnings */}
              {Array.isArray(result.warnings) && result.warnings.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3 text-sm text-red-800">
                  <p className="font-medium mb-1">
                    {t("smartEstimate.create.warnings")}
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    {result.warnings.map((w, i) => (
                      <li key={i}>{w}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Line items */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  {t("smartEstimate.create.lineItems")}
                </p>
                {lineItems.length === 0 ? (
                  <p className="text-sm text-gray-500 italic">No line items</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 text-gray-700">
                        <tr>
                          <th className="px-3 py-2 text-left">Item</th>
                          <th className="px-3 py-2 text-right">Qty</th>
                          <th className="px-3 py-2 text-left">Unit</th>
                          <th className="px-3 py-2 text-right">Unit Price</th>
                          <th className="px-3 py-2 text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {lineItems.map((li, i) => {
                          const qty = parseFloat(li.quantity || 0);
                          const unitPrice = parseFloat(li.unit_price || 0);
                          const total =
                            li.total !== undefined && li.total !== null
                              ? parseFloat(li.total)
                              : qty * unitPrice;
                          const isCustom = unitPrice === 0;
                          return (
                            <tr key={i}>
                              <td className="px-3 py-2 text-gray-800">
                                {li.description || li.name || "-"}
                                {isCustom && (
                                  <span className="ml-2 inline-block text-xs px-2 py-0.5 rounded bg-primaryYellow/30 text-charcoal">
                                    Custom — set price after save
                                  </span>
                                )}
                              </td>
                              <td className="px-3 py-2 text-right text-gray-700">
                                {qty}
                              </td>
                              <td className="px-3 py-2 text-gray-700">
                                {li.unit || "-"}
                              </td>
                              <td className="px-3 py-2 text-right text-gray-700">
                                {formatCurrency(unitPrice)}
                              </td>
                              <td className="px-3 py-2 text-right text-gray-900 font-medium">
                                {formatCurrency(total)}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Subtotal */}
              <div className="flex justify-end">
                <p className="text-lg font-bold text-terracotta">
                  Subtotal: {formatCurrency(result.subtotal)}
                </p>
              </div>

              {/* Disclaimer */}
              <div className="bg-terracotta text-white rounded-md p-4 text-sm font-medium text-center">
                {t("smartEstimate.create.disclaimer")}
              </div>

              {/* Actions */}
              {!readOnly && (
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setConvertCustomerId(customerId || "");
                      setConvertTitle(result.suggested_quote_title || "");
                      setConvertOpen(true);
                    }}
                    className="bg-terracotta hover:bg-terracotta/90 text-white px-5 py-2.5 rounded-md font-medium transition"
                  >
                    {t("smartEstimate.create.saveAsDraft")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmDiscard(true)}
                    className="px-4 py-2.5 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition"
                  >
                    {t("smartEstimate.create.discard")}
                  </button>
                </div>
              )}

              {readOnly && result.converted_quote && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/quotes/${result.converted_quote.id}`)
                    }
                    className="bg-terracotta hover:bg-terracotta/90 text-white px-5 py-2.5 rounded-md font-medium transition"
                  >
                    Open Linked Quote{" "}
                    {result.converted_quote.quote_number
                      ? `(${result.converted_quote.quote_number})`
                      : ""}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Discard confirm */}
      <ConfirmDialog
        isOpen={confirmDiscard}
        onClose={() => setConfirmDiscard(false)}
        onConfirm={handleDiscard}
        title="Discard Smart Estimate"
        message="Are you sure you want to discard this estimate? It will be marked as discarded and removed from your active list."
        confirmText="Discard"
        cancelText="Cancel"
        variant="danger"
      />

      {/* Convert modal */}
      <Modal
        isOpen={convertOpen}
        onClose={() => setConvertOpen(false)}
        title={t("smartEstimate.create.confirmCustomer")}
        size="md"
      >
        <form onSubmit={handleConvertSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">
              {t("smartEstimate.create.customer")}{" "}
              <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={convertCustomerId}
              onChange={(e) => setConvertCustomerId(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-terracotta bg-white"
            >
              <option value="">— Select customer —</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.first_name} {c.last_name}
                  {c.email ? ` · ${c.email}` : ""}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">
              Quote title
            </label>
            <input
              type="text"
              value={convertTitle}
              onChange={(e) => setConvertTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-terracotta"
              placeholder="Quote title"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setConvertOpen(false)}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition"
            >
              {t("common.cancel")}
            </button>
            <button
              type="submit"
              disabled={converting}
              className="px-4 py-2 bg-terracotta text-white rounded-md font-medium hover:bg-terracotta/90 transition disabled:opacity-50"
            >
              {converting ? "Saving..." : "Save Draft Quote"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
