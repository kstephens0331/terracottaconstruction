// src/pages/QuoteEdit.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { db } from "../lib/supabase";
import { success, error } from "../modules/notificationUtils";
import QuoteForm from "../components/QuoteForm";

export default function QuoteEdit() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setLoadError(null);
      try {
        const data = await db.quotes.getById(id);
        if (cancelled) return;
        setQuote(data);
      } catch (err) {
        if (cancelled) return;
        console.error("Failed to load quote:", err);
        setLoadError(err.message || "Failed to load quote");
        error(t("quotes.detail.errorLoading"));
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [id, t]);

  const handleSubmit = async ({ quote: quoteUpdates, items }) => {
    try {
      await db.quotes.update(id, quoteUpdates, items);
      success(t("quotes.edit.updated"));
      navigate(`/quotes/${id}`);
    } catch (err) {
      console.error("Failed to update quote:", err);
      error(err.message || t("quotes.edit.updateError"));
    }
  };

  const handleCancel = () => {
    navigate(`/quotes/${id}`);
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
          {t("quotes.detail.errorLoading")}
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

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-charcoal">
            {t("quotes.edit.title")}
          </h1>
          {quote.quote_number && (
            <p className="text-sm text-gray-500 mt-1">{quote.quote_number}</p>
          )}
        </div>
        <button
          type="button"
          onClick={handleCancel}
          className="text-sm text-gray-600 hover:text-terracotta"
        >
          ← {t("common.back")}
        </button>
      </div>

      <QuoteForm
        mode="edit"
        initial={quote}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}
