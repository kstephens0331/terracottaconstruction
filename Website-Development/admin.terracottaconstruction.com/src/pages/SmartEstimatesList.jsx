// src/pages/SmartEstimatesList.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { db } from "../lib/supabase";
import { error as notifyError } from "../modules/notificationUtils";

const STATUS_VALUES = ["draft", "converted", "discarded"];

function statusBadgeClasses(status) {
  const map = {
    draft: "bg-gray-100 text-gray-800",
    converted: "bg-green-100 text-green-800",
    discarded: "bg-red-100 text-red-800",
  };
  return map[status] || "bg-gray-100 text-gray-800";
}

function statusLabel(status) {
  if (!status) return "—";
  return status.charAt(0).toUpperCase() + status.slice(1);
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

function truncate(s, n) {
  if (!s) return "";
  return s.length > n ? `${s.slice(0, n)}…` : s;
}

export default function SmartEstimatesList() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [estimates, setEstimates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const [statusFilter, setStatusFilter] = useState("");
  const [customerSearch, setCustomerSearch] = useState("");

  const loadEstimates = async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const data = await db.estimates.getAll();
      setEstimates(data || []);
    } catch (err) {
      console.error("Failed to load estimates:", err);
      setLoadError(err.message || "Failed to load estimates");
      notifyError("Failed to load Smart Estimates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEstimates();
  }, []);

  const filtered = useMemo(() => {
    let result = [...estimates];
    if (statusFilter) {
      result = result.filter((e) => e.status === statusFilter);
    }
    if (customerSearch.trim()) {
      const needle = customerSearch.toLowerCase();
      result = result.filter((e) => {
        const name = e.customer
          ? `${e.customer.first_name || ""} ${e.customer.last_name || ""}`
          : "";
        const email = e.customer?.email || "";
        return (
          name.toLowerCase().includes(needle) ||
          email.toLowerCase().includes(needle)
        );
      });
    }
    return result;
  }, [estimates, statusFilter, customerSearch]);

  return (
    <div className="p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-heading font-bold text-charcoal">
          {t("smartEstimate.list.title")}
        </h1>
        <button
          type="button"
          onClick={() => navigate("/smart-estimate/new")}
          className="bg-terracotta hover:bg-terracotta/90 text-white px-4 py-2 rounded-md font-medium transition"
        >
          {t("smartEstimate.list.new")}
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            {t("quotes.list.filterStatus")}
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-terracotta bg-white"
          >
            <option value="">{t("quotes.list.allStatuses")}</option>
            {STATUS_VALUES.map((s) => (
              <option key={s} value={s}>
                {statusLabel(s)}
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
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
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-terracotta"></div>
        </div>
      ) : loadError ? (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-6 text-center">
          {loadError}
        </div>
      ) : filtered.length === 0 ? (
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
              d="M5 3v4 M3 5h4 M6 17v4 M4 19h4 M13 3l-1.5 4.5L7 9l4.5 1.5L13 15l1.5-4.5L19 9l-4.5-1.5z"
            />
          </svg>
          <p className="text-gray-700 font-medium mb-1">
            {t("smartEstimate.list.empty")}
          </p>
          <p className="text-sm text-gray-500 mb-4">
            {t("smartEstimate.list.emptyHint")}
          </p>
          <button
            type="button"
            onClick={() => navigate("/smart-estimate/new")}
            className="inline-flex items-center bg-terracotta hover:bg-terracotta/90 text-white px-4 py-2 rounded-md font-medium transition"
          >
            {t("smartEstimate.list.new")}
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Description
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Zone
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">
                    Subtotal
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filtered.map((e) => (
                  <tr
                    key={e.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigate(`/smart-estimate/${e.id}`)}
                  >
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {formatDate(e.created_at)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {truncate(e.description || "", 60)}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {e.customer ? (
                        <>
                          <div className="font-medium text-gray-900">
                            {e.customer.first_name} {e.customer.last_name}
                          </div>
                          {e.customer.email && (
                            <div className="text-xs text-gray-500">
                              {e.customer.email}
                            </div>
                          )}
                        </>
                      ) : (
                        <span className="text-gray-400">
                          {t("common.none")}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {e.zone?.name || "-"}
                    </td>
                    <td className="px-4 py-3 text-sm text-right font-medium text-gray-900">
                      {formatCurrency(e.subtotal)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${statusBadgeClasses(
                          e.status,
                        )}`}
                      >
                        {statusLabel(e.status)}
                      </span>
                    </td>
                    <td
                      className="px-4 py-3 text-right"
                      onClick={(ev) => ev.stopPropagation()}
                    >
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            navigate(`/smart-estimate/${e.id}`)
                          }
                          title={t("common.view")}
                          className="text-xs px-2 py-1 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded"
                        >
                          {t("common.view")}
                        </button>
                        {e.converted_quote && (
                          <button
                            type="button"
                            onClick={() =>
                              navigate(`/quotes/${e.converted_quote.id}`)
                            }
                            title="Open Linked Quote"
                            className="text-xs px-2 py-1 text-white bg-terracotta hover:bg-terracotta/90 rounded"
                          >
                            Open Quote
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
