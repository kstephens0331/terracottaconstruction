// src/pages/WorkOrders.jsx
import React, { useState, useEffect } from "react";
import { db } from "../lib/supabase";
import { success, error } from "../modules/notificationUtils";

function WorkOrders() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [reference, setReference] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const data = await db.workOrders.getAll();
      setOrders(data || []);
    } catch (err) {
      console.error("Failed to fetch work orders", err);
      error("Failed to load work orders");
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const resetForm = () => {
    setName("");
    setEmail("");
    setDescription("");
    setReference("");
    setPriority("Normal");
  };

  const handleSubmit = async () => {
    if (!name || !email || !description) {
      error("Name, email, and description are required.");
      return;
    }

    if (description.length < 10) {
      error("Description must be at least 10 characters");
      return;
    }

    setLoading(true);

    try {
      const result = await db.workOrders.create({
        title: `Work Order for ${name}`,
        description,
        priority: priority.toLowerCase(),
        status: 'pending'
      });

      success(`Work Order ${result.work_order_number} created`);
      resetForm();
      fetchOrders();
    } catch (err) {
      console.error("Submission error", err);
      error(err.message || "Failed to create work order");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await db.workOrders.updateStatus(id, newStatus.toLowerCase().replace(' ', '_'));
      success(`Status updated to ${newStatus}`);
      fetchOrders();
    } catch (err) {
      console.error("Status update failed", err);
      error("Failed to update status");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="max-w-5xl mx-auto mt-8 p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold text-terracotta mb-4">Work Orders</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Customer Name *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        />
        <input
          type="email"
          placeholder="Customer Email *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        />
        <input
          type="text"
          placeholder="Reference (optional)"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="Low">Low Priority</option>
          <option value="Normal">Normal Priority</option>
          <option value="High">High Priority</option>
          <option value="Urgent">Urgent</option>
        </select>
        <textarea
          placeholder="Work Order Description * (min 10 characters)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 col-span-2 min-h-[100px]"
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`px-4 py-2 rounded text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-terracotta hover:bg-terracotta-dark"
          }`}
        >
          {loading ? "Submitting..." : "Submit Work Order"}
        </button>
        <button
          onClick={resetForm}
          className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
        >
          Clear
        </button>
      </div>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-4">All Work Orders</h2>
      {fetchLoading ? (
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-terracotta"></div>
        </div>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">No work orders submitted yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2">WO #</th>
                <th className="p-2">Customer</th>
                <th className="p-2">Description</th>
                <th className="p-2">Priority</th>
                <th className="p-2">Status</th>
                <th className="p-2">Created</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t hover:bg-gray-50">
                  <td className="p-2 font-medium">
                    {order.work_order_number || order.id.slice(0, 8)}
                  </td>
                  <td className="p-2">
                    <div>{order.customer ? `${order.customer.first_name} ${order.customer.last_name}` : 'N/A'}</div>
                    <div className="text-xs text-gray-500">{order.customer?.email}</div>
                  </td>
                  <td className="p-2 max-w-xs truncate">{order.description}</td>
                  <td className="p-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      order.priority === 'Urgent' ? 'bg-red-100 text-red-800' :
                      order.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                      order.priority === 'Low' ? 'bg-gray-100 text-gray-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {order.priority || 'Normal'}
                    </span>
                  </td>
                  <td className="p-2">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                    >
                      <option value="New">New</option>
                      <option value="Scheduled">Scheduled</option>
                      <option value="In Progress">In Progress</option>
                      <option value="On Hold">On Hold</option>
                      <option value="Complete">Complete</option>
                    </select>
                  </td>
                  <td className="p-2 text-xs text-gray-600">
                    {formatDate(order.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default WorkOrders;
