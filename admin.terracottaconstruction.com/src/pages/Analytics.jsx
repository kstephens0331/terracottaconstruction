// src/pages/Analytics.jsx
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { analyticsAPI } from '../services/api';
import { messages } from '../modules/notificationUtils';

export default function Analytics() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [revenueData, setRevenueData] = useState(null);
  const [topCustomers, setTopCustomers] = useState([]);
  const [period, setPeriod] = useState('monthly');
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    loadAnalytics();
  }, [period, year]);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const [dashboard, revenue, customers] = await Promise.all([
        analyticsAPI.getDashboard(),
        analyticsAPI.getRevenue({ period, year }),
        analyticsAPI.getTopCustomers({ limit: 5 })
      ]);

      setDashboardStats(dashboard.stats);
      setRevenueData(revenue.data);
      setTopCustomers(customers.customers);
    } catch (error) {
      console.error('Failed to load analytics:', error);
      messages.fetchError('analytics');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-charcoal">Analytics Dashboard</h1>
        <div className="flex gap-3">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="border rounded-md px-3 py-2"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <select
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
            className="border rounded-md px-3 py-2"
          >
            {[2024, 2025, 2026].map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Overview Cards */}
      {dashboardStats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Revenue Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Revenue</h3>
            <p className="text-2xl font-bold text-green-600">
              {formatCurrency(dashboardStats.revenue.total_collected)}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {formatCurrency(dashboardStats.revenue.outstanding)} outstanding
            </p>
          </div>

          {/* Quotes Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Quotes</h3>
            <p className="text-2xl font-bold text-blue-600">
              {dashboardStats.quotes.total}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {dashboardStats.quotes.conversion_rate}% conversion rate
            </p>
          </div>

          {/* Work Orders Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Work Orders</h3>
            <p className="text-2xl font-bold text-purple-600">
              {dashboardStats.work_orders.total}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {dashboardStats.work_orders.in_progress} in progress
            </p>
          </div>

          {/* Customers Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Customers</h3>
            <p className="text-2xl font-bold text-terracotta">
              {dashboardStats.customers.total}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {dashboardStats.customers.active} active
            </p>
          </div>
        </div>
      )}

      {/* Revenue Chart (Simple Bar Chart) */}
      {revenueData && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
          <div className="h-64 flex items-end gap-2">
            {revenueData.map((item, index) => {
              const maxValue = Math.max(...revenueData.map(d => d.collected || d.invoiced || 1));
              const height = ((item.collected || 0) / maxValue) * 100;

              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex flex-col items-center">
                    <div
                      className="w-full bg-terracotta rounded-t"
                      style={{ height: `${Math.max(height, 2)}%` }}
                      title={formatCurrency(item.collected || 0)}
                    />
                  </div>
                  <span className="text-xs text-gray-500 mt-2 rotate-45 origin-left">
                    {item.period}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quote Status Breakdown */}
        {dashboardStats && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Quote Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Open</span>
                <span className="font-semibold">{dashboardStats.quotes.open}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Approved</span>
                <span className="font-semibold text-green-600">{dashboardStats.quotes.approved}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Rejected</span>
                <span className="font-semibold text-red-600">{dashboardStats.quotes.rejected}</span>
              </div>
            </div>
          </div>
        )}

        {/* Work Order Status */}
        {dashboardStats && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Work Order Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">New</span>
                <span className="font-semibold">{dashboardStats.work_orders.new}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Scheduled</span>
                <span className="font-semibold text-blue-600">{dashboardStats.work_orders.scheduled}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">In Progress</span>
                <span className="font-semibold text-yellow-600">{dashboardStats.work_orders.in_progress}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Complete</span>
                <span className="font-semibold text-green-600">{dashboardStats.work_orders.complete}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Top Customers */}
      {topCustomers.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6 mt-8">
          <h3 className="text-lg font-semibold mb-4">Top Customers by Revenue</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b">
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Total Revenue</th>
                  <th className="pb-3 text-right">Outstanding</th>
                </tr>
              </thead>
              <tbody>
                {topCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b last:border-0">
                    <td className="py-3">
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-sm text-gray-500">{customer.email}</p>
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        customer.status === 'VIP' ? 'bg-purple-100 text-purple-800' :
                        customer.status === 'Active' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="py-3 text-right font-semibold text-green-600">
                      {formatCurrency(customer.total_revenue)}
                    </td>
                    <td className="py-3 text-right text-gray-600">
                      {formatCurrency(customer.outstanding)}
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
