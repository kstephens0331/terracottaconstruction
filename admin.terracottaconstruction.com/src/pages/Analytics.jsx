// src/pages/Analytics.jsx
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { db } from '../lib/supabase';
import { messages } from '../modules/notificationUtils';

export default function Analytics() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [dashboardStats, setDashboardStats] = useState(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const stats = await db.analytics.getDashboardStats();
      setDashboardStats(stats);
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
      </div>

      {/* Overview Cards */}
      {dashboardStats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Revenue Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Revenue</h3>
            <p className="text-2xl font-bold text-green-600">
              {formatCurrency(dashboardStats.totalRevenue)}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {formatCurrency(dashboardStats.totalOutstanding)} outstanding
            </p>
          </div>

          {/* Quotes Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Quotes</h3>
            <p className="text-2xl font-bold text-blue-600">
              {dashboardStats.totalQuotes}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {dashboardStats.pendingQuotes} pending, {dashboardStats.approvedQuotes} approved
            </p>
          </div>

          {/* Work Orders Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Work Orders</h3>
            <p className="text-2xl font-bold text-purple-600">
              {dashboardStats.totalWorkOrders}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {dashboardStats.pendingWorkOrders} in progress
            </p>
          </div>

          {/* Customers Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Customers</h3>
            <p className="text-2xl font-bold text-terracotta">
              {dashboardStats.totalCustomers}
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Invoices Summary */}
        {dashboardStats && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Invoice Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Invoices</span>
                <span className="font-semibold">{dashboardStats.totalInvoices}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Unpaid Invoices</span>
                <span className="font-semibold text-yellow-600">{dashboardStats.unpaidInvoices}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Outstanding Balance</span>
                <span className="font-semibold text-red-600">{formatCurrency(dashboardStats.totalOutstanding)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Collected</span>
                <span className="font-semibold text-green-600">{formatCurrency(dashboardStats.totalRevenue)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        {dashboardStats && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Overview</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Pending Quotes</span>
                <span className="font-semibold text-blue-600">{dashboardStats.pendingQuotes}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Approved Quotes</span>
                <span className="font-semibold text-green-600">{dashboardStats.approvedQuotes}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Active Work Orders</span>
                <span className="font-semibold text-purple-600">{dashboardStats.pendingWorkOrders}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
