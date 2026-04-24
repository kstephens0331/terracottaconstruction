// src/components/QuoteForm.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { db } from "../lib/supabase";
import { error } from "../modules/notificationUtils";
import {
  calculateMargin,
  isBelowMinimumMargin,
} from "../modules/marginUtils";
import { MIN_MARGIN_THRESHOLD } from "../modules/pricingEngine";

function roundMoney(n) {
  const v = parseFloat(n);
  if (Number.isNaN(v)) return 0;
  return Math.round(v * 100) / 100;
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(parseFloat(amount || 0));
}

function emptyItem() {
  return {
    service_id: "",
    description: "",
    quantity: 1,
    unit: "each",
    unit_price: 0,
    unit_cost: 0,
  };
}

function defaultValidUntil() {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().split("T")[0];
}

/**
 * Controlled quote form.
 *
 * Props:
 *   initial: optional existing quote shape (used for edit mode)
 *   mode: "create" | "edit"
 *   onSubmit: async ({ quote, items, action }) where action is
 *             "draft" or "send" for create, "save" for edit.
 *   onCancel: () => void
 *   submitLabelPrimary: string (defaults based on mode)
 *   submitLabelSecondary: string (only for create)
 */
export default function QuoteForm({
  initial,
  mode = "create",
  onSubmit,
  onCancel,
  submitLabelPrimary,
  submitLabelSecondary,
}) {
  const { t } = useTranslation();

  const [customers, setCustomers] = useState([]);
  const [services, setServices] = useState([]);
  const [loadingRefs, setLoadingRefs] = useState(true);

  const [customerId, setCustomerId] = useState(initial?.customer_id || "");
  const [title, setTitle] = useState(initial?.title || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [validUntil, setValidUntil] = useState(
    initial?.valid_until
      ? String(initial.valid_until).split("T")[0]
      : defaultValidUntil(),
  );

  const [items, setItems] = useState(() => {
    if (initial?.items && initial.items.length > 0) {
      const sorted = [...initial.items].sort(
        (a, b) => (a.sort_order || 0) - (b.sort_order || 0),
      );
      return sorted.map((it) => ({
        service_id: it.service_id || "",
        description: it.description || "",
        quantity: it.quantity ?? 1,
        unit: it.unit || "each",
        unit_price: it.unit_price ?? 0,
        unit_cost: it.unit_cost ?? 0,
      }));
    }
    return [emptyItem()];
  });

  const [taxRate, setTaxRate] = useState(
    initial?.tax_rate != null ? Number(initial.tax_rate) : 8.25,
  );
  const [discountAmount, setDiscountAmount] = useState(
    initial?.discount_amount != null ? Number(initial.discount_amount) : 0,
  );
  const [terms, setTerms] = useState(initial?.terms || "");
  const [notes, setNotes] = useState(initial?.notes || "");

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const [custData, svcData] = await Promise.all([
          db.customers.getAll(),
          db.services.getAll().catch(() => []),
        ]);
        if (cancelled) return;
        setCustomers(custData || []);
        setServices(svcData || []);
      } catch (err) {
        console.error("Failed to load form refs:", err);
        error(err.message || "Failed to load form data");
      } finally {
        if (!cancelled) setLoadingRefs(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, it) => {
      const q = parseFloat(it.quantity) || 0;
      const p = parseFloat(it.unit_price) || 0;
      return sum + q * p;
    }, 0);
    const rate = parseFloat(taxRate) || 0;
    const discount = parseFloat(discountAmount) || 0;
    const taxableBase = Math.max(0, subtotal - discount);
    const taxAmount = (taxableBase * rate) / 100;
    const total = taxableBase + taxAmount;

    return {
      subtotal: roundMoney(subtotal),
      taxAmount: roundMoney(taxAmount),
      total: roundMoney(total),
    };
  }, [items, taxRate, discountAmount]);

  const marginData = useMemo(() => {
    return calculateMargin(
      items.map((it) => ({
        cost: it.unit_cost,
        price: it.unit_price,
        quantity: it.quantity,
      })),
    );
  }, [items]);

  const belowMargin = isBelowMinimumMargin(
    marginData.margin,
    MIN_MARGIN_THRESHOLD,
  );

  const handleItemChange = (index, field, value) => {
    setItems((prev) => {
      const next = [...prev];
      const row = { ...next[index] };
      if (field === "service_id") {
        row.service_id = value;
        const svc = services.find((s) => s.id === value);
        if (svc) {
          if (!row.description) row.description = svc.name || "";
          if (svc.unit) row.unit = svc.unit;
          if (svc.default_price != null) row.unit_price = svc.default_price;
          else if (svc.base_price != null) row.unit_price = svc.base_price;
          else if (svc.unit_price != null) row.unit_price = svc.unit_price;
          if (svc.default_cost != null) row.unit_cost = svc.default_cost;
          else if (svc.base_cost != null) row.unit_cost = svc.base_cost;
          else if (svc.unit_cost != null) row.unit_cost = svc.unit_cost;
        }
      } else if (
        field === "quantity" ||
        field === "unit_price" ||
        field === "unit_cost"
      ) {
        row[field] = value === "" ? "" : parseFloat(value);
      } else {
        row[field] = value;
      }
      next[index] = row;
      return next;
    });
  };

  const addItem = () => setItems((prev) => [...prev, emptyItem()]);

  const removeItem = (index) => {
    setItems((prev) =>
      prev.length === 1 ? prev : prev.filter((_, i) => i !== index),
    );
  };

  const validate = () => {
    if (!customerId) {
      error(t("quotes.create.validation.customerRequired"));
      return false;
    }
    if (!title.trim()) {
      error(t("quotes.create.validation.titleRequired"));
      return false;
    }
    if (!items || items.length === 0) {
      error(t("quotes.create.validation.itemsRequired"));
      return false;
    }
    for (const it of items) {
      const q = parseFloat(it.quantity);
      const p = parseFloat(it.unit_price);
      if (
        !it.description ||
        !it.description.trim() ||
        Number.isNaN(q) ||
        q <= 0 ||
        Number.isNaN(p) ||
        p <= 0
      ) {
        error(t("quotes.create.validation.itemInvalid"));
        return false;
      }
    }
    return true;
  };

  const buildPayload = () => {
    const quote = {
      customer_id: customerId || null,
      title: title.trim(),
      description: description || null,
      valid_until: validUntil || null,
      subtotal: totals.subtotal,
      tax_rate: roundMoney(taxRate),
      tax_amount: totals.taxAmount,
      discount_amount: roundMoney(discountAmount),
      total: totals.total,
      terms: terms || null,
      notes: notes || null,
    };

    const itemsPayload = items.map((it, index) => ({
      service_id: it.service_id || null,
      description: it.description.trim(),
      quantity: parseFloat(it.quantity) || 0,
      unit: it.unit || "each",
      unit_price: roundMoney(it.unit_price),
      unit_cost: roundMoney(it.unit_cost),
      total: roundMoney(
        (parseFloat(it.quantity) || 0) * (parseFloat(it.unit_price) || 0),
      ),
      total_cost: roundMoney(
        (parseFloat(it.quantity) || 0) * (parseFloat(it.unit_cost) || 0),
      ),
      sort_order: index,
    }));

    return { quote, items: itemsPayload };
  };

  const submit = async (action) => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      const payload = buildPayload();
      await onSubmit({ ...payload, action });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-terracotta";

  return (
    <div className="space-y-6">
      {/* Customer section */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-heading font-semibold text-charcoal mb-4">
          {t("quotes.create.customerSection")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("quotes.create.selectCustomer")} *
            </label>
            <select
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              className={inputClass}
              disabled={loadingRefs}
            >
              <option value="">{t("quotes.create.selectCustomer")}</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.first_name} {c.last_name}
                  {c.email ? ` (${c.email})` : ""}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <span className="text-sm text-gray-500 italic">
              {t("quotes.create.addNewCustomer")}
            </span>
          </div>
        </div>
      </section>

      {/* Details section */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-heading font-semibold text-charcoal mb-4">
          {t("quotes.create.detailsSection")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("quotes.create.quoteTitle")} *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t("quotes.create.quoteTitlePlaceholder")}
              className={inputClass}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("quotes.create.quoteDescription")}
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t("quotes.create.quoteDescriptionPlaceholder")}
              rows={3}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("quotes.create.validUntil")}
            </label>
            <input
              type="date"
              value={validUntil}
              onChange={(e) => setValidUntil(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {/* Line items */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-heading font-semibold text-charcoal mb-4">
          {t("quotes.create.lineItemsSection")}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left font-medium text-gray-700">
                  {t("quotes.create.service")}
                </th>
                <th className="px-3 py-2 text-left font-medium text-gray-700">
                  {t("quotes.create.itemDescription")}
                </th>
                <th className="px-3 py-2 text-left font-medium text-gray-700 w-20">
                  {t("quotes.create.quantity")}
                </th>
                <th className="px-3 py-2 text-left font-medium text-gray-700 w-24">
                  {t("quotes.create.unit")}
                </th>
                <th className="px-3 py-2 text-right font-medium text-gray-700 w-28">
                  {t("quotes.create.unitPrice")}
                </th>
                <th className="px-3 py-2 text-right font-medium text-gray-700 w-28">
                  {t("quotes.create.unitCost")}
                </th>
                <th className="px-3 py-2 text-right font-medium text-gray-700 w-28">
                  {t("quotes.create.itemTotal")}
                </th>
                <th className="px-3 py-2 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {items.map((it, idx) => {
                const rowTotal =
                  (parseFloat(it.quantity) || 0) *
                  (parseFloat(it.unit_price) || 0);
                return (
                  <tr key={idx}>
                    <td className="px-3 py-2 align-top">
                      <select
                        value={it.service_id || ""}
                        onChange={(e) =>
                          handleItemChange(idx, "service_id", e.target.value)
                        }
                        className={inputClass}
                      >
                        <option value="">
                          {t("quotes.create.customItem")}
                        </option>
                        {services.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-3 py-2 align-top">
                      <input
                        type="text"
                        value={it.description}
                        onChange={(e) =>
                          handleItemChange(idx, "description", e.target.value)
                        }
                        className={inputClass}
                        placeholder={t("quotes.create.itemDescription")}
                      />
                    </td>
                    <td className="px-3 py-2 align-top">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={it.quantity}
                        onChange={(e) =>
                          handleItemChange(idx, "quantity", e.target.value)
                        }
                        className={inputClass}
                      />
                    </td>
                    <td className="px-3 py-2 align-top">
                      <input
                        type="text"
                        value={it.unit}
                        onChange={(e) =>
                          handleItemChange(idx, "unit", e.target.value)
                        }
                        className={inputClass}
                      />
                    </td>
                    <td className="px-3 py-2 align-top">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={it.unit_price}
                        onChange={(e) =>
                          handleItemChange(idx, "unit_price", e.target.value)
                        }
                        className={`${inputClass} text-right`}
                      />
                    </td>
                    <td className="px-3 py-2 align-top">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={it.unit_cost}
                        onChange={(e) =>
                          handleItemChange(idx, "unit_cost", e.target.value)
                        }
                        className={`${inputClass} text-right`}
                      />
                    </td>
                    <td className="px-3 py-2 align-top text-right font-medium text-gray-900">
                      {formatCurrency(rowTotal)}
                    </td>
                    <td className="px-3 py-2 align-top">
                      {items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem(idx)}
                          className="text-red-600 hover:text-red-800 text-xs"
                          title={t("quotes.create.removeItem")}
                        >
                          ✕
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <button
          type="button"
          onClick={addItem}
          className="mt-4 bg-terracotta hover:bg-terracotta/90 text-white px-4 py-2 rounded-md text-sm font-medium transition"
        >
          {t("quotes.create.addItem")}
        </button>
      </section>

      {/* Totals */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-heading font-semibold text-charcoal mb-4">
          {t("quotes.create.totalsSection")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("quotes.create.taxRate")}
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={taxRate}
                onChange={(e) =>
                  setTaxRate(e.target.value === "" ? "" : parseFloat(e.target.value))
                }
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("quotes.create.discount")}
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={discountAmount}
                onChange={(e) =>
                  setDiscountAmount(
                    e.target.value === "" ? "" : parseFloat(e.target.value),
                  )
                }
                className={inputClass}
              />
            </div>
          </div>
          <div className="bg-gray-50 rounded-md p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-700">
                {t("quotes.create.subtotal")}
              </span>
              <span className="font-medium text-gray-900">
                {formatCurrency(totals.subtotal)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-700">
                {t("quotes.create.discount")}
              </span>
              <span className="font-medium text-gray-900">
                -{formatCurrency(parseFloat(discountAmount) || 0)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-700">
                {t("quotes.create.taxAmount")}
              </span>
              <span className="font-medium text-gray-900">
                {formatCurrency(totals.taxAmount)}
              </span>
            </div>
            <div className="flex justify-between text-base pt-2 border-t border-gray-300">
              <span className="font-semibold text-charcoal">
                {t("quotes.create.grandTotal")}
              </span>
              <span className="font-bold text-terracotta">
                {formatCurrency(totals.total)}
              </span>
            </div>
            <div
              className={`flex justify-between text-xs pt-2 border-t border-gray-200 ${
                belowMargin ? "text-red-600" : "text-deepGreen"
              }`}
            >
              <span>{t("quotes.create.margin")}</span>
              <span className="font-medium">{marginData.margin}%</span>
            </div>
            {belowMargin && (
              <div className="text-xs text-red-600">
                {t("quotes.create.marginWarning", {
                  threshold: MIN_MARGIN_THRESHOLD,
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Terms & Notes */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-heading font-semibold text-charcoal mb-4">
          {t("quotes.create.termsSection")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("quotes.create.terms")}
            </label>
            <textarea
              value={terms}
              onChange={(e) => setTerms(e.target.value)}
              placeholder={t("quotes.create.termsPlaceholder")}
              rows={4}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("quotes.create.notes")}
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t("quotes.create.notesPlaceholder")}
              rows={4}
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {/* Actions */}
      <div className="flex flex-wrap justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className="px-5 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition disabled:opacity-50"
        >
          {t("quotes.create.cancel")}
        </button>
        {mode === "create" ? (
          <>
            <button
              type="button"
              onClick={() => submit("draft")}
              disabled={submitting}
              className="px-5 py-2 rounded-md bg-primaryYellow text-charcoal font-medium hover:bg-yellow-400 transition disabled:opacity-50"
            >
              {submitLabelSecondary || t("quotes.create.saveDraft")}
            </button>
            <button
              type="button"
              onClick={() => submit("send")}
              disabled={submitting}
              className="px-5 py-2 rounded-md bg-terracotta text-white font-medium hover:bg-terracotta/90 transition disabled:opacity-50"
            >
              {submitLabelPrimary || t("quotes.create.saveAndSend")}
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => submit("save")}
            disabled={submitting}
            className="px-5 py-2 rounded-md bg-terracotta text-white font-medium hover:bg-terracotta/90 transition disabled:opacity-50"
          >
            {submitLabelPrimary || t("quotes.edit.save")}
          </button>
        )}
      </div>
    </div>
  );
}
