// src/pages/QuotesList.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { db } from "../lib/supabase";
import { success, error } from "../modules/notificationUtils";
import { ConfirmDialog } from "../components/Modal";

const STATUS_VALUES = [
  "Draft",
  "Pending",
  "Sent",
  "Viewed",
  "Approved",
  "Rejected",
  "Revision Requested",
  "Expired",
  "Invoiced",
];

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

export default function QuotesList() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  // Filters
  const [statusFilter, setStatusFilter] = useState("");
  const [customerSearch, setCustomerSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Sorting
  const [sortKey, setSortKey] = useState("created_at");
  const [sortDir, setSortDir] = useState("desc");

  // Delete modal
  const [pendingDelete, setPendingDelete] = useState(null);

  const loadQuotes = async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const data = await db.quotes.getAll();
      setQuotes(data || []);
    } catch (err) {
      console.error("Failed to load quotes:", err);
      setLoadError(err.message || "Failed to load quotes");
      error(t("quotes.list.errorLoading"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuotes();
  }, []);

  const filteredSorted = useMemo(() => {
    let result = [...quotes];

    if (statusFilter) {
      result = result.filter((q) => q.status === statusFilter);
    }

    if (customerSearch.trim()) {
      const needle = customerSearch.toLowerCase();
      result = result.filter((q) => {
        const name = q.customer
          ? `${q.customer.first_name || ""} ${q.customer.last_name || ""}`
          : "";
        const email = q.customer?.email || "";
        return (
          name.toLowerCase().includes(needle) ||
          email.toLowerCase().includes(needle)
        );
      });
    }

    if (dateFrom) {
      const fromTs = new Date(dateFrom).getTime();
      result = result.filter(
        (q) => q.created_at && new Date(q.created_at).getTime() >= fromTs,
      );
    }
    if (dateTo) {
      // include full day
      const toTs = new Date(dateTo).getTime() + 24 * 60 * 60 * 1000 - 1;
      result = result.filter(
        (q) => q.created_at && new Date(q.created_at).getTime() <= toTs,
      );
    }

    result.sort((a, b) => {
      let av;
      let bv;
      switch (sortKey) {
        case "quote_number":
          av = a.quote_number || "";
          bv = b.quote_number || "";
          break;
        case "customer":
          av = a.customer
            ? `${a.customer.first_name || ""} ${a.customer.last_name || ""}`
            : "";
          bv = b.customer
            ? `${b.customer.first_name || ""} ${b.customer.last_name || ""}`
            : "";
          break;
        case "title":
          av = a.title || "";
          bv = b.title || "";
          break;
        case "status":
          av = a.status || "";
          bv = b.status || "";
          break;
        case "total":
          av = parseFloat(a.total || 0);
          bv = parseFloat(b.total || 0);
          break;
        case "created_at":
        default:
          av = a.created_at ? new Date(a.created_at).getTime() : 0;
          bv = b.created_at ? new Date(b.created_at).getTime() : 0;
          break;
      }
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [
    quotes,
    statusFilter,
    customerSearch,
    dateFrom,
    dateTo,
    sortKey,
    sortDir,
  ]);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sortIndicator = (key) => {
    if (sortKey !== key) return null;
    return <span className="ml-1 text-xs">{sortDir === "asc" ? "▲" : "▼"}</span>;
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    try {
      await db.quotes.delete(pendingDelete.id);
      success(t("quotes.detail.deleted"));
      setPendingDelete(null);
      loadQuotes();
    } catch (err) {
      console.error("Failed to delete quote:", err);
      error(t("quotes.detail.deleteError"));
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-heading font-bold text-charcoal">
          {t("quotes.list.title")}
        </h1>
        <button
          type="button"
          onClick={() => navigate("/quotes/new")}
          className="bg-terracotta hover:bg-terracotta/90 text-white px-4 py-2 rounded-md font-medium transition"
        >
          {t("quotes.list.newQuote")}
        </button>
      </div>

      {/* Filter bar */}
      <div className="bg-white rounded-lg shadow p-4 mb-6 grid grid-cols-1 md:grid-cols-4 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            {t("quotes.list.filterStatus")}
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-terracotta"
          >
            <option value="">{t("quotes.list.allStatuses")}</option>
            {STATUS_VALUES.map((s) => (
              <option key={s} value={s}>
                {t(`quotes.status.${s}`)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            {t("quotes.list.searchCustomer")}
          </label>
          <input
            type="text"
            value={customerSearch}
            onChange={(e) => setCustomerSearch(e.target.value)}
            placeholder={t("quotes.list.searchCustomer")}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-terracotta"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            {t("quotes.list.from")}
          </label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-terracotta"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            {t("quotes.list.to")}
          </label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-terracotta"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-terracotta"></div>
        </div>
      ) : loadError ? (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-6 text-center">
          {t("quotes.list.errorLoading")}
        </div>
      ) : filteredSorted.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <svg
            className="w-12 h-12 mx-auto text-gray-300 mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="text-gray-700 font-medium mb-1">
            {t("quotes.list.empty")}
          </p>
          <p className="text-sm text-gray-500 mb-4">
            {t("quotes.list.emptyHint") ||
              "Create your first quote to start tracking estimates."}
          </p>
          <button
            type="button"
            onClick={() => navigate("/quotes/new")}
            className="inline-flex items-center bg-terracotta hover:bg-terracotta/90 text-white px-4 py-2 rounded-md font-medium transition"
          >
            {t("quotes.list.newQuote")}
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer select-none"
                    onClick={() => handleSort("quote_number")}
                  >
                    {t("quotes.list.columns.quoteNumber")}
                    {sortIndicator("quote_number")}
                  </th>
                  <th
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer select-none"
                    onClick={() => handleSort("customer")}
                  >
                    {t("quotes.list.columns.customer")}
                    {sortIndicator("customer")}
                  </th>
                  <th
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer select-none"
                    onClick={() => handleSort("title")}
                  >
                    {t("quotes.list.columns.title")}
                    {sortIndicator("title")}
                  </th>
                  <th
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer select-none"
                    onClick={() => handleSort("status")}
                  >
                    {t("quotes.list.columns.status")}
                    {sortIndicator("status")}
                  </th>
                  <th
                    className="px-4 py-3 text-right text-sm font-medium text-gray-700 cursor-pointer select-none"
                    onClick={() => handleSort("total")}
                  >
                    {t("quotes.list.columns.total")}
                    {sortIndicator("total")}
                  </th>
                  <th
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer select-none"
                    onClick={() => handleSort("created_at")}
                  >
                    {t("quotes.list.columns.created")}
                    {sortIndicator("created_at")}
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">
                    {t("quotes.list.columns.actions")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredSorted.map((q) => (
                  <tr
                    key={q.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigate(`/quotes/${q.id}`)}
                  >
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {q.quote_number || "-"}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {q.customer ? (
                        <>
                          <div className="font-medium text-gray-900">
                            {q.customer.first_name} {q.customer.last_name}
                          </div>
                          {q.customer.email && (
                            <div className="text-xs text-gray-500">
                              {q.customer.email}
                            </div>
                          )}
                        </>
                      ) : (
                        <span className="text-gray-400">{t("common.none")}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {q.title || "-"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${statusBadgeClasses(
                          q.status,
                        )}`}
                      >
                        {t(`quotes.status.${q.status}`, q.status || "")}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-right font-medium text-gray-900">
                      {formatCurrency(q.total)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {formatDate(q.created_at)}
                    </td>
                    <td
                      className="px-4 py-3 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => navigate(`/quotes/${q.id}`)}
                          title={t("common.view")}
                          className="p-1 text-gray-600 hover:text-terracotta"
                        >
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
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={() => navigate(`/quotes/${q.id}/edit`)}
                          title={t("common.edit")}
                          className="p-1 text-gray-600 hover:text-terracotta"
                        >
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
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={() => setPendingDelete(q)}
                          title={t("common.delete")}
                          className="p-1 text-gray-600 hover:text-red-600"
                        >
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
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V4a2 2 0 012-2h4a2 2 0 012 2v3"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={!!pendingDelete}
        onClose={() => setPendingDelete(null)}
        onConfirm={confirmDelete}
        title={t("quotes.list.confirmDeleteTitle")}
        message={t("quotes.list.confirmDeleteMessage")}
        confirmText={t("common.delete")}
        cancelText={t("common.cancel")}
        variant="danger"
      />
    </div>
  );
}
