// src/pages/Customers.jsx
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { customersAPI } from "../services/api";
import { success, error } from "../modules/notificationUtils";
import { getStatusBadge } from "../modules/customerStatus";

function Customers() {
  const { t } = useTranslation();

  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  // Load all customers from API
  const fetchCustomers = async () => {
    try {
      const data = await customersAPI.getAll();
      setCustomers(data.customers || []);
    } catch (err) {
      console.error("Failed to fetch customers", err);
      error("Failed to load customers");
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
  };

  // Add new customer via API
  const handleCreate = async () => {
    if (!name || !email) {
      error("Name and email are required");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      error("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      const result = await customersAPI.create({
        name,
        email,
        phone,
        address
      });

      success(`Customer added with account #${result.account_number}`);
      resetForm();
      fetchCustomers();
    } catch (err) {
      console.error("Add error", err);
      error(err.message || "Failed to add customer");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await customersAPI.updateStatus(id, newStatus);
      success(`Customer status updated to ${newStatus}`);
      fetchCustomers();
    } catch (err) {
      console.error("Status update failed", err);
      error("Failed to update customer status");
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4 text-terracotta">
        {t("customers.title")}
      </h1>

      <div className="bg-white p-4 rounded shadow mb-8">
        <h2 className="text-lg font-semibold mb-2">Add New Customer</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="email"
            placeholder="Email Address *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="flex gap-3 mt-4">
          <button
            onClick={handleCreate}
            disabled={!name || !email || loading}
            className={`px-4 py-2 rounded text-white ${
              !name || !email || loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-terracotta hover:bg-terracotta-dark"
            }`}
          >
            {loading ? "Adding..." : "Create Customer"}
          </button>
          <button
            onClick={resetForm}
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Customer List</h2>
        {fetchLoading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-terracotta"></div>
          </div>
        ) : customers.length === 0 ? (
          <p className="text-gray-500">No customers found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">Account #</th>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Email</th>
                  <th className="p-2 text-left">Phone</th>
                  <th className="p-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => {
                  const badge = getStatusBadge(c.status || 'Lead');
                  return (
                    <tr key={c.id} className="border-t hover:bg-gray-50">
                      <td className="p-2 font-medium">{c.account_number || "—"}</td>
                      <td className="p-2">{c.name}</td>
                      <td className="p-2">{c.email}</td>
                      <td className="p-2">{c.phone || "—"}</td>
                      <td className="p-2">
                        <select
                          value={c.status || 'Lead'}
                          onChange={(e) => handleStatusChange(c.id, e.target.value)}
                          className={`text-xs border rounded px-2 py-1 ${badge?.className || ''}`}
                        >
                          <option value="Lead">Lead</option>
                          <option value="Prospect">Prospect</option>
                          <option value="Active">Active</option>
                          <option value="VIP">VIP</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Customers;
