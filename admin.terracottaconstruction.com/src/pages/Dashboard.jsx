// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { quotesAPI, workOrdersAPI } from "../services/api";
import { success, error } from "../modules/notificationUtils";

function Dashboard() {
  const [quotes, setQuotes] = useState([]);
  const [workOrders, setWorkOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchQuotes = async () => {
    try {
      const data = await quotesAPI.getAll();
      setQuotes(data.quotes || []);
    } catch (err) {
      console.error("Error fetching quotes:", err);
      error("Failed to load quotes");
    }
  };

  const fetchWorkOrders = async () => {
    try {
      const data = await workOrdersAPI.getAll();
      setWorkOrders(data.work_orders || []);
    } catch (err) {
      console.error("Error fetching work orders:", err);
      error("Failed to load work orders");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchQuotes(), fetchWorkOrders()]);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleQuoteStatusChange = async (id, status) => {
    try {
      await quotesAPI.updateStatus(id, status);
      success(`Quote status updated to ${status}`);
      fetchQuotes();
    } catch (err) {
      console.error("Failed to update quote status:", err);
      error("Failed to update quote status");
    }
  };

  const handleWorkOrderStatusChange = async (id, status) => {
    try {
      await workOrdersAPI.updateStatus(id, status);
      success(`Work order status updated to ${status}`);
      fetchWorkOrders();
    } catch (err) {
      console.error("Failed to update work order status:", err);
      error("Failed to update work order status");
    }
  };

  const filterData = (records) =>
    records.filter((rec) =>
      [rec.customer_name, rec.customer_email, rec.phone, rec.address]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount || 0);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-terracotta"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-8 p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold text-terracotta mb-4">Admin Dashboard</h1>

      <input
        type="text"
        placeholder="Search by name, email, phone, address..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 border border-gray-300 rounded px-3 py-2"
      />

      <h2 className="text-xl font-semibold mb-2">Open or Approved Quotes</h2>
      {filterData(quotes.filter((q) => q.status === "Open" || q.status === "Approved")).length === 0 ? (
        <p className="text-gray-500 mb-6">No open or approved quotes.</p>
      ) : (
        <div className="overflow-x-auto mb-6">
          <table className="w-full table-auto border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Quote #</th>
                <th className="p-2 text-left">Customer</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-right">Total</th>
                <th className="p-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filterData(quotes.filter((q) => q.status === "Open" || q.status === "Approved")).map((q) => (
                <tr key={q.id} className="border-t hover:bg-gray-50">
                  <td className="p-2 font-medium">{q.quote_number || q.id.slice(0, 8)}</td>
                  <td className="p-2">{q.customer_name}</td>
                  <td className="p-2">{q.customer_email}</td>
                  <td className="p-2 text-right">{formatCurrency(q.total)}</td>
                  <td className="p-2">
                    <select
                      value={q.status}
                      onChange={(e) => handleQuoteStatusChange(q.id, e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="Open">Open</option>
                      <option value="Sent">Sent</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Invoiced">Invoiced</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <h2 className="text-xl font-semibold mb-2">Active Work Orders</h2>
      {filterData(workOrders.filter((wo) => wo.status !== "Complete")).length === 0 ? (
        <p className="text-gray-500">No active work orders.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">WO #</th>
                <th className="p-2 text-left">Customer</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Description</th>
                <th className="p-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filterData(workOrders.filter((wo) => wo.status !== "Complete")).map((wo) => (
                <tr key={wo.id} className="border-t hover:bg-gray-50">
                  <td className="p-2 font-medium">{wo.work_order_number || wo.id.slice(0, 8)}</td>
                  <td className="p-2">{wo.customer_name}</td>
                  <td className="p-2">{wo.customer_email}</td>
                  <td className="p-2">{wo.description}</td>
                  <td className="p-2">
                    <select
                      value={wo.status}
                      onChange={(e) => handleWorkOrderStatusChange(wo.id, e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="New">New</option>
                      <option value="Scheduled">Scheduled</option>
                      <option value="In Progress">In Progress</option>
                      <option value="On Hold">On Hold</option>
                      <option value="Complete">Complete</option>
                    </select>
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

export default Dashboard;
