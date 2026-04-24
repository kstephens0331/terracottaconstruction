// src/pages/QuoteDetail.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase, db } from "../lib/supabase";
import { success, error } from "../modules/notificationUtils";
import { ConfirmDialog } from "../components/Modal";
import { calculateMargin } from "../modules/marginUtils";

function statusBadgeClasses(status) {
  const map = {
    Draft: "bg-gray-100 text-gray-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Sent: "bg-blue-100 text-blue-800",
    Viewed: "bg-indigo-100 text-indigo-800",
    Approved: "bg-green-100 text-green-800",
    Rejected: "bg-red-100 text-red-800",
    "Revision Requested": "bg-orange-100 text-orange-800",
    Expired: "bg-gray-100 text-gray-500",
    Invoiced: "bg-purple-100 text-purple-800",
  };
  return map[status] || "bg-gray-100 text-gray-800";
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(parseFloat(amount || 0));
}

function formatDate(value) {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatDateTime(value) {
  if (!value) return "-";
  return new Date(value).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function QuoteDetail() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [quote, setQuote] = useState(null);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmSend, setConfirmSend] = useState(false);

  const loadQuote = async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const data = await db.quotes.getById(id);
      setQuote(data);

      // Fetch activity log inline (no dedicated helper exists)
      const { data: actData, error: actErr } = await supabase
        .from("quote_activity")
        .select("*")
        .eq("quote_id", id)
        .order("created_at", { ascending: false });
      if (actErr) {
        console.warn("Failed to load quote_activity:", actErr.message);
        setActivity([]);
      } else {
        setActivity(actData || []);
      }
    } catch (err) {
      console.error("Failed to load quote:", err);
      setLoadError(err.message || "Failed to load quote");
      error(t("quotes.detail.errorLoading"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const sortedItems = useMemo(() => {
    if (!quote?.items) return [];
    return [...quote.items].sort(
      (a, b) => (a.sort_order || 0) - (b.sort_order || 0),
    );
  }, [quote]);

  const marginData = useMemo(() => {
    if (!quote?.items) return { margin: 0, totalCost: 0, totalPrice: 0 };
    return calculateMargin(
      quote.items.map((it) => ({
        cost: it.unit_cost,
        price: it.unit_price,
        quantity: it.quantity,
      })),
    );
  }, [quote]);

  const handleStatusChange = async (newStatus) => {
    try {
      await db.quotes.updateStatus(id, newStatus);
      success(t("quotes.detail.statusUpdated", { status: newStatus }));
      loadQuote();
    } catch (err) {
      console.error("Failed to update status:", err);
      error(t("quotes.detail.statusUpdateError"));
    }
  };

  const handleConvertToInvoice = async () => {
    try {
      await db.invoices.createFromQuote(id);
      // Also mark quote as Invoiced
      try {
        await db.quotes.updateStatus(id, "Invoiced");
      } catch (innerErr) {
        console.warn("Could not set quote status to Invoiced:", innerErr);
      }
      success(t("quotes.detail.invoiceCreated"));
      navigate("/invoices");
    } catch (err) {
      console.error("Failed to convert to invoice:", err);
      error(t("quotes.detail.invoiceCreateError"));
    }
  };

  const handleDelete = async () => {
    try {
      await db.quotes.delete(id);
      success(t("quotes.detail.deleted"));
      navigate("/quotes");
    } catch (err) {
      console.error("Failed to delete quote:", err);
      error(t("quotes.detail.deleteError"));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-terracotta"></div>
      </div>
    );
  }

  if (loadError || !quote) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-6 text-center">
          {t("quotes.detail.notFound")}
        </div>
        <div className="mt-4">
          <button
            type="button"
            onClick={() => navigate("/quotes")}
            className="text-sm text-gray-600 hover:text-terracotta"
          >
            ← {t("common.back")}
          </button>
        </div>
      </div>
    );
  }

  const status = quote.status;

  // Action button visibility
  const canMarkSent = status === "Draft";
  const canApproveReject = status === "Sent" || status === "Viewed";
  const canConvertInvoice = status === "Approved";
  const canEdit = ["Draft", "Sent", "Viewed", "Revision Requested"].includes(
    status,
  );
  const revisionBanner = status === "Revision Requested";

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <button
            type="button"
            onClick={() => navigate("/quotes")}
            className="text-sm text-gray-600 hover:text-terracotta mb-2"
          >
            ← {t("common.back")}
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-heading font-bold text-charcoal">
              {quote.quote_number || t("quotes.title")}
            </h1>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadgeClasses(
                status,
              )}`}
            >
              {t(`quotes.status.${status}`, status || "")}
            </span>
          </div>
          {quote.title && (
            <p className="text-gray-700 mt-1">{quote.title}</p>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {canMarkSent && (
            <button
              type="button"
              onClick={() => setConfirmSend(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium transition"
            >
              {t("quotes.detail.markAsSent")}
            </button>
          )}
          {canApproveReject && (
            <>
              <button
                type="button"
                onClick={() => handleStatusChange("Approved")}
                className="bg-deepGreen hover:opacity-90 text-white px-3 py-2 rounded-md text-sm font-medium transition"
              >
                {t("quotes.detail.markAsApproved")}
              </button>
              <button
                type="button"
                onClick={() => handleStatusChange("Rejected")}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium transition"
              >
                {t("quotes.detail.markAsRejected")}
              </button>
            </>
          )}
          {canConvertInvoice && (
            <button
              type="button"
              onClick={handleConvertToInvoice}
              className="bg-primaryYellow hover:bg-yellow-400 text-charcoal px-3 py-2 rounded-md text-sm font-medium transition"
            >
              {t("quotes.detail.convertToInvoice")}
            </button>
          )}
          {canEdit && (
            <button
              type="button"
              onClick={() => navigate(`/quotes/${id}/edit`)}
              className="bg-terracotta hover:bg-terracotta/90 text-white px-3 py-2 rounded-md text-sm font-medium transition"
            >
              {t("quotes.detail.edit")}
            </button>
          )}
          <button
            type="button"
            onClick={() => setConfirmDelete(true)}
            className="bg-white border border-red-300 text-red-600 hover:bg-red-50 px-3 py-2 rounded-md text-sm font-medium transition"
          >
            {t("quotes.detail.delete")}
          </button>
        </div>
      </div>

      {/* Revision banner */}
      {revisionBanner && (
        <div className="bg-yellow-50 border border-yellow-300 text-yellow-900 rounded-md p-4 mb-6">
          <p className="font-semibold mb-1">
            {t("quotes.detail.revisionBanner")}
          </p>
          {quote.customer_notes && (
            <p className="text-sm whitespace-pre-wrap mb-2">
              {quote.customer_notes}
            </p>
          )}
          <button
            type="button"
            onClick={() => navigate(`/quotes/${id}/edit`)}
            className="text-sm font-medium underline hover:no-underline"
          >
            {t("quotes.detail.editToCreateNewVersion")}
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left/main */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-heading font-semibold text-charcoal mb-4">
              {t("quotes.detail.customerCard")}
            </h2>
            {quote.customer ? (
              <div className="space-y-1 text-sm">
                <p className="font-medium text-gray-900">
                  {quote.customer.first_name} {quote.customer.last_name}
                </p>
                {quote.customer.email && (
                  <p className="text-gray-700">{quote.customer.email}</p>
                )}
                {quote.customer.phone && (
                  <p className="text-gray-700">{quote.customer.phone}</p>
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">{t("common.none")}</p>
            )}
          </section>

          {/* Dates */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-heading font-semibold text-charcoal mb-4">
              {t("quotes.detail.datesCard")}
            </h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">{t("quotes.detail.created")}</p>
                <p className="font-medium text-gray-900">
                  {formatDate(quote.created_at)}
                </p>
              </div>
              <div>
                <p className="text-gray-500">{t("quotes.detail.validUntil")}</p>
                <p className="font-medium text-gray-900">
                  {formatDate(quote.valid_until)}
                </p>
              </div>
              <div>
                <p className="text-gray-500">{t("quotes.detail.sentAt")}</p>
                <p className="font-medium text-gray-900">
                  {formatDateTime(quote.sent_at)}
                </p>
              </div>
              <div>
                <p className="text-gray-500">
                  {t("quotes.detail.approvedAt")}
                </p>
                <p className="font-medium text-gray-900">
                  {formatDateTime(quote.approved_at)}
                </p>
              </div>
            </div>
          </section>

          {/* Line items */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-heading font-semibold text-charcoal mb-4">
              {t("quotes.detail.lineItemsCard")}
            </h2>
            {sortedItems.length === 0 ? (
              <p className="text-gray-500 text-sm">{t("common.none")}</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left font-medium text-gray-700">
                        {t("quotes.create.itemDescription")}
                      </th>
                      <th className="px-3 py-2 text-right font-medium text-gray-700 w-20">
                        {t("quotes.create.quantity")}
                      </th>
                      <th className="px-3 py-2 text-left font-medium text-gray-700 w-20">
                        {t("quotes.create.unit")}
                      </th>
                      <th className="px-3 py-2 text-right font-medium text-gray-700 w-28">
                        {t("quotes.create.unitPrice")}
                      </th>
                      <th className="px-3 py-2 text-right font-medium text-gray-700 w-28">
                        {t("quotes.create.itemTotal")}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {sortedItems.map((it) => (
                      <tr key={it.id}>
                        <td className="px-3 py-2 text-gray-900">
                          {it.description}
                        </td>
                        <td className="px-3 py-2 text-right text-gray-700">
                          {it.quantity}
                        </td>
                        <td className="px-3 py-2 text-gray-700">
                          {it.unit || "-"}
                        </td>
                        <td className="px-3 py-2 text-right text-gray-900">
                          {formatCurrency(it.unit_price)}
                        </td>
                        <td className="px-3 py-2 text-right font-medium text-gray-900">
                          {formatCurrency(it.total)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="mt-4 border-t border-gray-200 pt-4 space-y-2 text-sm max-w-sm ml-auto">
              <div className="flex justify-between">
                <span className="text-gray-700">
                  {t("quotes.create.subtotal")}
                </span>
                <span className="font-medium text-gray-900">
                  {formatCurrency(quote.subtotal)}
                </span>
              </div>
              {parseFloat(quote.discount_amount || 0) > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-700">
                    {t("quotes.create.discount")}
                  </span>
                  <span className="font-medium text-gray-900">
                    -{formatCurrency(quote.discount_amount)}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-700">
                  {t("quotes.create.taxAmount")} ({quote.tax_rate || 0}%)
                </span>
                <span className="font-medium text-gray-900">
                  {formatCurrency(quote.tax_amount)}
                </span>
              </div>
              <div className="flex justify-between text-base pt-2 border-t border-gray-300">
                <span className="font-semibold text-charcoal">
                  {t("quotes.create.grandTotal")}
                </span>
                <span className="font-bold text-terracotta">
                  {formatCurrency(quote.total)}
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-600 pt-2 border-t border-gray-200">
                <span>{t("quotes.create.margin")}</span>
                <span>{marginData.margin}%</span>
              </div>
            </div>
          </section>

          {(quote.terms || quote.notes) && (
            <section className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-heading font-semibold text-charcoal mb-4">
                {t("quotes.create.termsSection")}
              </h2>
              {quote.terms && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    {t("quotes.create.terms")}
                  </p>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">
                    {quote.terms}
                  </p>
                </div>
              )}
              {quote.notes && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    {t("quotes.create.notes")}
                  </p>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">
                    {quote.notes}
                  </p>
                </div>
              )}
            </section>
          )}
        </div>

        {/* Right column: Activity */}
        <aside className="space-y-6">
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-heading font-semibold text-charcoal mb-4">
              {t("quotes.detail.activityCard")}
            </h2>
            {activity.length === 0 ? (
              <p className="text-sm text-gray-500">
                {t("quotes.detail.activityEmpty")}
              </p>
            ) : (
              <ol className="space-y-4">
                {activity.map((a) => (
                  <li key={a.id} className="flex gap-3">
                    <div className="flex-none">
                      <div className="w-8 h-8 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {a.action || a.activity_type || "Activity"}
                      </p>
                      {a.description && (
                        <p className="text-xs text-gray-600 mt-0.5">
                          {a.description}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        {a.actor_type ? `${a.actor_type} · ` : ""}
                        {formatDateTime(a.created_at)}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </section>
        </aside>
      </div>

      <ConfirmDialog
        isOpen={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        onConfirm={handleDelete}
        title={t("quotes.list.confirmDeleteTitle")}
        message={t("quotes.list.confirmDeleteMessage")}
        confirmText={t("common.delete")}
        cancelText={t("common.cancel")}
        variant="danger"
      />

      <ConfirmDialog
        isOpen={confirmSend}
        onClose={() => setConfirmSend(false)}
        onConfirm={() => handleStatusChange("Sent")}
        title={t("quotes.detail.confirmSendTitle")}
        message={t("quotes.detail.confirmSendMessage")}
        confirmText={t("quotes.detail.markAsSent")}
        cancelText={t("common.cancel")}
        variant="primary"
      />
    </div>
  );
}
