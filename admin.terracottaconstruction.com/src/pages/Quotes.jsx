// src/pages/Quotes.jsx
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { customersAPI, quotesAPI } from "../services/api";
import { calculateMargin, isBelowMinimumMargin } from "../modules/marginUtils";
import { success, error } from "../modules/notificationUtils";

function Quotes() {
  const { t } = useTranslation();

  const [customers, setCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [overrideAllowed, setOverrideAllowed] = useState(false);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [lineItems, setLineItems] = useState([
    { description: "", quantity: 1, cost: 0, price: 0 }
  ]);

  const { margin, totalCost, totalPrice } = calculateMargin(lineItems);
  const belowMargin = isBelowMinimumMargin(margin);

  // Fetch all customers from API
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await customersAPI.getAll();
        setCustomers(data.customers || []);
      } catch (err) {
        console.error("Failed to fetch customers", err);
        error("Failed to load customers");
      }
    };

    fetchCustomers();
  }, []);

  // Autofill when a customer is selected
  useEffect(() => {
    const selected = customers.find((c) => c.id === selectedCustomerId);
    if (selected) {
      setCustomerName(selected.name);
      setCustomerEmail(selected.email);
    }
  }, [selectedCustomerId, customers]);

  const handleItemChange = (index, field, value) => {
    const updated = [...lineItems];
    updated[index][field] =
      field === "description" ? value : parseFloat(value || 0);
    setLineItems(updated);
  };

  const addLineItem = () => {
    setLineItems([
      ...lineItems,
      { description: "", quantity: 1, cost: 0, price: 0 }
    ]);
  };

  const removeLineItem = (index) => {
    const updated = lineItems.filter((_, i) => i !== index);
    setLineItems(updated);
  };

  const resetForm = () => {
    setSelectedCustomerId("");
    setCustomerName("");
    setCustomerEmail("");
    setOverrideAllowed(false);
    setNotes("");
    setLineItems([{ description: "", quantity: 1, cost: 0, price: 0 }]);
  };

  // Send quote via API
  const handleSend = async () => {
    if (belowMargin && !overrideAllowed) {
      error("Margin is below 30% and override is not allowed.");
      return;
    }

    if (!customerName || !customerEmail) {
      error("Customer name and email are required");
      return;
    }

    if (lineItems.length === 0 || !lineItems[0].description) {
      error("At least one line item is required");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        customerName,
        customerEmail,
        customerId: selectedCustomerId || null,
        quoteItems: lineItems,
        margin: parseFloat(margin),
        total: parseFloat(totalPrice),
        allowOverride: overrideAllowed,
        notes
      };

      const result = await quotesAPI.create(payload);
      success(`Quote ${result.quote_number} created successfully`);
      resetForm();
    } catch (err) {
      console.error("Send error:", err);
      error(err.message || "Failed to create quote");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-8 p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-terracotta">
        {t("quotes.title")}
      </h1>

      <label className="block mb-4">
        <span className="block font-semibold mb-1">Select Existing Customer</span>
        <select
          value={selectedCustomerId}
          onChange={(e) => setSelectedCustomerId(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">-- New Customer --</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} ({c.email})
            </option>
          ))}
        </select>
      </label>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <label className="block">
          <span className="block font-semibold mb-1">Customer Name *</span>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </label>

        <label className="block">
          <span className="block font-semibold mb-1">Customer Email *</span>
          <input
            type="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </label>
      </div>

      <h3 className="font-semibold mb-2">Line Items</h3>
      <div className="space-y-4">
        {lineItems.map((item, index) => (
          <div key={index} className="grid grid-cols-6 gap-2 items-end">
            <input
              type="text"
              placeholder={t("quotes.description")}
              value={item.description}
              onChange={(e) =>
                handleItemChange(index, "description", e.target.value)
              }
              className="col-span-2 border border-gray-300 rounded px-3 py-2"
            />
            <input
              type="number"
              min="1"
              placeholder="Qty"
              value={item.quantity}
              onChange={(e) =>
                handleItemChange(index, "quantity", e.target.value)
              }
              className="border border-gray-300 rounded px-3 py-2"
            />
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="Cost"
              value={item.cost}
              onChange={(e) => handleItemChange(index, "cost", e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            />
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="Price"
              value={item.price}
              onChange={(e) => handleItemChange(index, "price", e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            />
            {lineItems.length > 1 && (
              <button
                onClick={() => removeLineItem(index)}
                className="text-red-600 hover:underline"
              >
                {t("quotes.remove")}
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={addLineItem}
        className="mt-4 bg-terracotta text-white px-4 py-2 rounded hover:bg-terracotta-dark"
      >
        {t("quotes.addItem")}
      </button>

      <label className="block mt-4">
        <span className="block font-semibold mb-1">Notes (optional)</span>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          rows={3}
          placeholder="Any additional notes for this quote..."
        />
      </label>

      <div className="mt-6 space-y-2 text-lg font-semibold">
        <div>Total Cost: ${totalCost}</div>
        <div>Total Price: ${totalPrice}</div>
        <div className={belowMargin ? "text-red-600" : "text-green-600"}>
          Margin: {margin}% {belowMargin && "(Below 30%)"}
        </div>
      </div>

      {belowMargin && (
        <div className="mt-4 text-sm text-red-600">
          Warning: This quote is below the required 30% margin.
          <label className="ml-2">
            <input
              type="checkbox"
              checked={overrideAllowed}
              onChange={() => setOverrideAllowed(!overrideAllowed)}
            />{" "}
            Allow override
          </label>
        </div>
      )}

      <div className="mt-6 flex gap-4">
        <button
          onClick={handleSend}
          disabled={(belowMargin && !overrideAllowed) || loading}
          className={`${
            (belowMargin && !overrideAllowed) || loading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-primaryYellow hover:bg-yellow-400"
          } text-charcoal px-4 py-2 rounded flex items-center gap-2`}
        >
          {loading && (
            <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-charcoal"></span>
          )}
          {t("quotes.send")}
        </button>
        <button
          onClick={resetForm}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
        >
          Clear Form
        </button>
      </div>
    </div>
  );
}

export default Quotes;
