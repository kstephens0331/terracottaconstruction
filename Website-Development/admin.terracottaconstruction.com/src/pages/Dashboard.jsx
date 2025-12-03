// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { db } from "../lib/supabase";
import { success, error } from "../modules/notificationUtils";

function Dashboard({ user }) {
  const [quotes, setQuotes] = useState([]);
  const [workOrders, setWorkOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [quotesData, workOrdersData, statsData] = await Promise.all([
        db.quotes.getAll(),
        db.workOrders.getAll(),
        db.analytics.getDashboardStats()
      ]);
      setQuotes(quotesData || []);
      setWorkOrders(workOrdersData || []);
      setStats(statsData);
    } catch (err) {
      console.error("Error fetching data:", err);
      error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleQuoteStatusChange = async (id, newStatus) => {
    try {
      await db.quotes.updateStatus(id, newStatus);
      success(`Quote status updated to ${newStatus}`);
      fetchData();
    } catch (err) {
      console.error("Failed to update quote status:", err);
      error("Failed to update quote status");
    }
  };

  const handleWorkOrderStatusChange = async (id, newStatus) => {
    try {
      await db.workOrders.updateStatus(id, newStatus);
      success(`Work order status updated to ${newStatus}`);
      fetchData();
    } catch (err) {
      console.error("Failed to update work order status:", err);
      error("Failed to update work order status");
    }
  };

  const filterData = (records) =>
    records.filter((rec) => {
      const customerName = rec.customer ? `${rec.customer.first_name} ${rec.customer.last_name}` : '';
      const searchFields = [
        customerName,
        rec.customer?.email,
        rec.customer?.phone,
        rec.title,
        rec.description
      ].join(" ").toLowerCase();
      return searchFields.includes(search.toLowerCase());
    });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount || 0);
  };

  const getStatusColor = (status) => {
    const colors = {
      'Draft': 'bg-gray-100 text-gray-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Sent': 'bg-blue-100 text-blue-800',
      'Approved': 'bg-green-100 text-green-800',
      'Rejected': 'bg-red-100 text-red-800',
      'Scheduled': 'bg-purple-100 text-purple-800',
      'In Progress': 'bg-orange-100 text-orange-800',
      'Completed': 'bg-green-100 text-green-800',
      'On Hold': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-terracotta"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.full_name || 'Admin'}!
        </h1>
        <p className="text-gray-600">Here's what's happening with your business today.</p>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-500">Total Customers</div>
            <div className="text-3xl font-bold text-gray-900">{stats.totalCustomers}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-500">Pending Quotes</div>
            <div className="text-3xl font-bold text-yellow-600">{stats.pendingQuotes}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-500">Active Work Orders</div>
            <div className="text-3xl font-bold text-blue-600">{stats.pendingWorkOrders}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-500">Outstanding Balance</div>
            <div className="text-3xl font-bold text-red-600">{formatCurrency(stats.totalOutstanding)}</div>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by customer name, email, or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-terracotta"
        />
      </div>

      {/* Pending Quotes */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Pending & Sent Quotes</h2>
        </div>
        <div className="overflow-x-auto">
          {filterData(quotes.filter((q) => ['Pending', 'Sent', 'Draft'].includes(q.status))).length === 0 ? (
            <p className="text-gray-500 p-6">No pending quotes.</p>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quote #</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filterData(quotes.filter((q) => ['Pending', 'Sent', 'Draft'].includes(q.status))).map((q) => (
                  <tr key={q.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{q.quote_number}</td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900">{q.customer?.first_name} {q.customer?.last_name}</div>
                      <div className="text-gray-500 text-sm">{q.customer?.email}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{q.title}</td>
                    <td className="px-6 py-4 text-right font-medium">{formatCurrency(q.total)}</td>
                    <td className="px-6 py-4">
                      <select
                        value={q.status}
                        onChange={(e) => handleQuoteStatusChange(q.id, e.target.value)}
                        className={`${getStatusColor(q.status)} border-0 rounded-full px-3 py-1 text-sm font-medium cursor-pointer`}
                      >
                        <option value="Draft">Draft</option>
                        <option value="Pending">Pending</option>
                        <option value="Sent">Sent</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Converted">Converted</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Active Work Orders */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Active Work Orders</h2>
        </div>
        <div className="overflow-x-auto">
          {filterData(workOrders.filter((wo) => !['Completed', 'Cancelled'].includes(wo.status))).length === 0 ? (
            <p className="text-gray-500 p-6">No active work orders.</p>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">WO #</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Scheduled</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filterData(workOrders.filter((wo) => !['Completed', 'Cancelled'].includes(wo.status))).map((wo) => (
                  <tr key={wo.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{wo.work_order_number}</td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900">{wo.customer?.first_name} {wo.customer?.last_name}</div>
                      <div className="text-gray-500 text-sm">{wo.customer?.phone}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{wo.title}</td>
                    <td className="px-6 py-4 text-gray-700">
                      {wo.scheduled_date ? new Date(wo.scheduled_date).toLocaleDateString() : 'Not scheduled'}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={wo.status}
                        onChange={(e) => handleWorkOrderStatusChange(wo.id, e.target.value)}
                        className={`${getStatusColor(wo.status)} border-0 rounded-full px-3 py-1 text-sm font-medium cursor-pointer`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Scheduled">Scheduled</option>
                        <option value="In Progress">In Progress</option>
                        <option value="On Hold">On Hold</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
