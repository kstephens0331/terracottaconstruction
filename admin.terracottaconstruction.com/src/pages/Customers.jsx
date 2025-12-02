// src/pages/Customers.jsx
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { db } from "../lib/supabase";
import { success, error } from "../modules/notificationUtils";

function Customers() {
  const { t } = useTranslation();

  const [customers, setCustomers] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("TX");
  const [zip, setZip] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  // Load all customers from Supabase
  const fetchCustomers = async () => {
    try {
      const data = await db.customers.getAll();
      setCustomers(data || []);
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
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setStreet("");
    setCity("");
    setState("TX");
    setZip("");
  };

  // Add new customer via Supabase
  const handleCreate = async () => {
    if (!firstName || !lastName) {
      error("First and last name are required");
      return;
    }

    // Basic email validation if email provided
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        error("Please enter a valid email address");
        return;
      }
    }

    setLoading(true);
    try {
      await db.customers.create({
        first_name: firstName,
        last_name: lastName,
        email: email || null,
        phone: phone || null,
        address_street: street || null,
        address_city: city || null,
        address_state: state,
        address_zip: zip || null,
        status: 'Lead'
      });

      success("Customer added successfully!");
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
      await db.customers.update(id, { status: newStatus });
      success(`Customer status updated to ${newStatus}`);
      fetchCustomers();
    } catch (err) {
      console.error("Status update failed", err);
      error("Failed to update customer status");
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'Lead': 'bg-gray-100 text-gray-800',
      'Active': 'bg-green-100 text-green-800',
      'Inactive': 'bg-red-100 text-red-800',
      'Archived': 'bg-gray-200 text-gray-600'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">
        {t("customers.title") || "Customers"}
      </h1>

      {/* Add Customer Form */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">Add New Customer</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="First Name *"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-terracotta"
          />
          <input
            type="text"
            placeholder="Last Name *"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-terracotta"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-terracotta"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-terracotta"
          />
          <input
            type="text"
            placeholder="Street Address"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-terracotta"
          />
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-terracotta"
          />
          <input
            type="text"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-terracotta"
          />
          <input
            type="text"
            placeholder="ZIP Code"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-terracotta"
          />
        </div>
        <div className="flex gap-3 mt-4">
          <button
            onClick={handleCreate}
            disabled={!firstName || !lastName || loading}
            className={`px-6 py-2 rounded-lg text-white font-medium ${
              !firstName || !lastName || loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-terracotta hover:bg-terracotta/90"
            }`}
          >
            {loading ? "Adding..." : "Create Customer"}
          </button>
          <button
            onClick={resetForm}
            className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Customer List */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Customer List</h2>
        </div>
        {fetchLoading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-terracotta"></div>
          </div>
        ) : customers.length === 0 ? (
          <p className="text-gray-500 p-6">No customers found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {customers.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{c.first_name} {c.last_name}</div>
                      {c.company_name && <div className="text-sm text-gray-500">{c.company_name}</div>}
                    </td>
                    <td className="px-6 py-4 text-gray-700">{c.email || "—"}</td>
                    <td className="px-6 py-4 text-gray-700">{c.phone || "—"}</td>
                    <td className="px-6 py-4 text-gray-700">
                      {c.address_city && c.address_state
                        ? `${c.address_city}, ${c.address_state}`
                        : "—"}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={c.status || 'Lead'}
                        onChange={(e) => handleStatusChange(c.id, e.target.value)}
                        className={`${getStatusColor(c.status)} border-0 rounded-full px-3 py-1 text-sm font-medium cursor-pointer`}
                      >
                        <option value="Lead">Lead</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Archived">Archived</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Customers;
