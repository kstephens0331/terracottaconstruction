// src/pages/Customers.jsx
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { db } from "../lib/supabase";
import { success, error } from "../modules/notificationUtils";
import Modal from "../components/Modal";

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

  // Edit modal state
  const [editOpen, setEditOpen] = useState(false);
  const [editSaving, setEditSaving] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [editForm, setEditForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address_street: "",
    address_city: "",
    address_state: "",
    address_zip: "",
    notes: ""
  });

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

  const openEditModal = (customer) => {
    setEditTarget(customer);
    setEditForm({
      first_name: customer.first_name || "",
      last_name: customer.last_name || "",
      email: customer.email || "",
      phone: customer.phone || "",
      address_street: customer.address_street || "",
      address_city: customer.address_city || "",
      address_state: customer.address_state || "",
      address_zip: customer.address_zip || "",
      notes: customer.notes || ""
    });
    setEditOpen(true);
  };

  const closeEditModal = () => {
    if (editSaving) return;
    setEditOpen(false);
    setEditTarget(null);
  };

  const handleEditChange = (field, value) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditSave = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!editTarget) return;

    const trimmedFirst = (editForm.first_name || "").trim();
    const trimmedLast = (editForm.last_name || "").trim();
    const trimmedEmail = (editForm.email || "").trim();

    // Validation: need at least a first or last name
    if (!trimmedFirst && !trimmedLast) {
      error("A first or last name is required");
      return;
    }

    // Email validation if provided
    if (trimmedEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail)) {
        error("Please enter a valid email address");
        return;
      }
    }

    setEditSaving(true);
    try {
      await db.customers.update(editTarget.id, {
        first_name: trimmedFirst || null,
        last_name: trimmedLast || null,
        email: trimmedEmail || null,
        phone: editForm.phone?.trim() || null,
        address_street: editForm.address_street?.trim() || null,
        address_city: editForm.address_city?.trim() || null,
        address_state: editForm.address_state?.trim() || null,
        address_zip: editForm.address_zip?.trim() || null,
        notes: editForm.notes?.trim() || null
      });
      success(t("customers.edit.updated") || "Customer updated");
      setEditOpen(false);
      setEditTarget(null);
      fetchCustomers();
    } catch (err) {
      console.error("Customer update failed", err);
      error(err.message || t("customers.edit.updateError") || "Failed to update customer");
    } finally {
      setEditSaving(false);
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
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin h-10 w-10 rounded-full border-b-2 border-terracotta"></div>
          </div>
        ) : customers.length === 0 ? (
          <div className="p-12 text-center">
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
                d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-7a4 4 0 11-8 0 4 4 0 018 0zm6 3a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <p className="text-gray-700 font-medium mb-1">
              {t("customers.empty") || "No customers yet"}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              {t("customers.emptyHint") ||
                "Add your first customer using the form above."}
            </p>
            <button
              type="button"
              onClick={() => {
                const el = document.querySelector('input[placeholder^="First Name"]');
                if (el) el.focus();
              }}
              className="inline-flex items-center bg-terracotta hover:bg-terracotta/90 text-white px-4 py-2 rounded-md font-medium transition"
            >
              + New Customer
            </button>
          </div>
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    {t("common.actions") || "Actions"}
                  </th>
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
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => openEditModal(c)}
                        aria-label={t("customers.edit.title") || "Edit customer"}
                        title={t("common.edit") || "Edit"}
                        className="inline-flex items-center gap-1 text-terracotta hover:text-terracotta/80 text-sm font-medium"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        <span>{t("common.edit") || "Edit"}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Customer Modal */}
      <Modal
        isOpen={editOpen}
        onClose={closeEditModal}
        title={t("customers.edit.title") || "Edit Customer"}
        size="lg"
      >
        <form onSubmit={handleEditSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("customers.edit.firstName") || "First Name"}
              </label>
              <input
                type="text"
                value={editForm.first_name}
                onChange={(e) => handleEditChange("first_name", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-terracotta"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("customers.edit.lastName") || "Last Name"}
              </label>
              <input
                type="text"
                value={editForm.last_name}
                onChange={(e) => handleEditChange("last_name", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-terracotta"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("customers.edit.email") || "Email"}
              </label>
              <input
                type="email"
                value={editForm.email}
                onChange={(e) => handleEditChange("email", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-terracotta"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("customers.edit.phone") || "Phone"}
              </label>
              <input
                type="tel"
                value={editForm.phone}
                onChange={(e) => handleEditChange("phone", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-terracotta"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("customers.edit.address") || "Address"}
              </label>
              <input
                type="text"
                value={editForm.address_street}
                onChange={(e) => handleEditChange("address_street", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-terracotta"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("customers.edit.city") || "City"}
              </label>
              <input
                type="text"
                value={editForm.address_city}
                onChange={(e) => handleEditChange("address_city", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-terracotta"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("customers.edit.state") || "State"}
                </label>
                <input
                  type="text"
                  value={editForm.address_state}
                  onChange={(e) => handleEditChange("address_state", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-terracotta"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("customers.edit.zip") || "ZIP"}
                </label>
                <input
                  type="text"
                  value={editForm.address_zip}
                  onChange={(e) => handleEditChange("address_zip", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-terracotta"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("customers.edit.notes") || "Notes"}
              </label>
              <textarea
                value={editForm.notes}
                onChange={(e) => handleEditChange("notes", e.target.value)}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-terracotta"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={closeEditModal}
              disabled={editSaving}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-60"
            >
              {t("common.cancel") || "Cancel"}
            </button>
            <button
              type="submit"
              disabled={editSaving}
              className={`px-4 py-2 rounded-md text-white font-medium ${
                editSaving
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-terracotta hover:bg-terracotta/90"
              }`}
            >
              {editSaving
                ? (t("common.loading") || "Saving...")
                : (t("customers.edit.save") || "Save Changes")}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Customers;
