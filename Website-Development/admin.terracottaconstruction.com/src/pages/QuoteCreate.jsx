// src/pages/QuoteCreate.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { db } from "../lib/supabase";
import { success, error } from "../modules/notificationUtils";
import QuoteForm from "../components/QuoteForm";

export default function QuoteCreate() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSubmit = async ({ quote, items, action }) => {
    try {
      const payload = {
        ...quote,
        status: action === "send" ? "Sent" : "Draft",
      };
      if (action === "send") {
        payload.sent_at = new Date().toISOString();
      }

      const created = await db.quotes.create(payload, items);
      success(t("quotes.create.created"));
      navigate(`/quotes/${created.id}`);
    } catch (err) {
      console.error("Failed to create quote:", err);
      error(err.message || t("quotes.create.createError"));
    }
  };

  const handleCancel = () => {
    navigate("/quotes");
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold text-charcoal">
          {t("quotes.create.title")}
        </h1>
        <button
          type="button"
          onClick={handleCancel}
          className="text-sm text-gray-600 hover:text-terracotta"
        >
          ← {t("common.back")}
        </button>
      </div>

      <QuoteForm
        mode="create"
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}
