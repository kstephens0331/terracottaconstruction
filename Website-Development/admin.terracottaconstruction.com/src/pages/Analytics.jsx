// src/pages/Analytics.jsx
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';
import { db, supabase } from '../lib/supabase';
import { messages } from '../modules/notificationUtils';

// Admin brand palette (see CLAUDE.md design system)
const COLOR_TERRACOTTA = '#C1440E';
const COLOR_YELLOW = '#F4B400';
const COLOR_GREEN = '#3E7C48';
const COLOR_CHARCOAL = '#333333';
const COLOR_GRAY = '#9CA3AF';

const PIE_COLORS = [
  COLOR_TERRACOTTA,
  COLOR_YELLOW,
  COLOR_GREEN,
  COLOR_CHARCOAL,
  COLOR_GRAY,
];

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount || 0);
}

function formatCurrencyShort(amount) {
  if (amount == null) return '$0';
  if (Math.abs(amount) >= 1000) {
    return `$${(amount / 1000).toFixed(1)}k`;
  }
  return `$${Math.round(amount)}`;
}

// Build [{ key: 'YYYY-MM', label: 'Mon YY', total: 0 }, ...] for last 12 months
function buildLast12MonthBuckets() {
  const buckets = [];
  const now = new Date();
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const label = d.toLocaleString('en-US', { month: 'short', year: '2-digit' });
    buckets.push({ key, label, total: 0 });
  }
  return buckets;
}

// Normalize work order status values for grouping (case-insensitive, underscore/space tolerant)
function normalizeStatus(status) {
  if (!status) return 'Unknown';
  const s = String(status).toLowerCase().replace(/_/g, ' ').trim();
  if (s === 'pending' || s === 'new') return 'Pending';
  if (s === 'scheduled') return 'Scheduled';
  if (s === 'in progress') return 'In Progress';
  if (s === 'completed' || s === 'complete') return 'Completed';
  if (s === 'cancelled' || s === 'canceled') return 'Cancelled';
  if (s === 'on hold') return 'On Hold';
  return status; // pass-through for anything we did not enumerate
}

function Spinner({ size = 'h-10 w-10' }) {
  return (
    <div className="flex items-center justify-center py-12">
      <div className={`animate-spin ${size} rounded-full border-b-2 border-terracotta`}></div>
    </div>
  );
}

function EmptyState({ message }) {
  return (
    <div className="flex items-center justify-center py-12 text-sm text-gray-500">
      {message}
    </div>
  );
}

export default function Analytics() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const [dashboardStats, setDashboardStats] = useState(null);
  const [revenueSeries, setRevenueSeries] = useState([]);
  const [workOrderStatusData, setWorkOrderStatusData] = useState([]);
  const [topCustomersData, setTopCustomersData] = useState([]);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const twelveMonthsAgo = new Date();
      twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 11);
      twelveMonthsAgo.setDate(1);
      twelveMonthsAgo.setHours(0, 0, 0, 0);
      const sinceIso = twelveMonthsAgo.toISOString().slice(0, 10);

      const [
        statsResult,
        paymentsResult,
        workOrdersResult,
        approvedQuotesResult,
      ] = await Promise.all([
        db.analytics.getDashboardStats(),
        supabase
          .from('payments')
          .select('payment_date, amount')
          .gte('payment_date', sinceIso),
        supabase
          .from('work_orders')
          .select('status')
          .is('deleted_at', null),
        supabase
          .from('quotes')
          .select(
            'total, customer:customers(id, first_name, last_name)'
          )
          .eq('status', 'Approved')
          .is('deleted_at', null),
      ]);

      setDashboardStats(statsResult);

      // Revenue trend: bucket payments by month
      if (paymentsResult.error) throw paymentsResult.error;
      const buckets = buildLast12MonthBuckets();
      const bucketMap = new Map(buckets.map((b) => [b.key, b]));
      (paymentsResult.data || []).forEach((p) => {
        if (!p.payment_date) return;
        const d = new Date(p.payment_date);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        const bucket = bucketMap.get(key);
        if (bucket) {
          bucket.total += parseFloat(p.amount || 0);
        }
      });
      setRevenueSeries(
        buckets.map((b) => ({
          month: b.label,
          total: Math.round(b.total * 100) / 100,
        }))
      );

      // Work order status breakdown
      if (workOrdersResult.error) throw workOrdersResult.error;
      const statusOrder = [
        'Pending',
        'Scheduled',
        'In Progress',
        'Completed',
        'Cancelled',
      ];
      const statusCounts = new Map(statusOrder.map((s) => [s, 0]));
      (workOrdersResult.data || []).forEach((wo) => {
        const norm = normalizeStatus(wo.status);
        if (statusCounts.has(norm)) {
          statusCounts.set(norm, statusCounts.get(norm) + 1);
        } else {
          statusCounts.set(norm, (statusCounts.get(norm) || 0) + 1);
        }
      });
      const woData = Array.from(statusCounts.entries())
        .map(([name, value]) => ({ name, value }))
        .filter((e) => e.value > 0);
      setWorkOrderStatusData(woData);

      // Top 5 customers by approved-quote total
      if (approvedQuotesResult.error) throw approvedQuotesResult.error;
      const customerTotals = new Map();
      (approvedQuotesResult.data || []).forEach((q) => {
        if (!q.customer) return;
        const id = q.customer.id;
        const name =
          `${q.customer.first_name || ''} ${q.customer.last_name || ''}`.trim() ||
          'Unknown';
        const prev = customerTotals.get(id) || { name, total: 0 };
        prev.total += parseFloat(q.total || 0);
        customerTotals.set(id, prev);
      });
      const topCustomers = Array.from(customerTotals.values())
        .sort((a, b) => b.total - a.total)
        .slice(0, 5)
        .map((c) => ({
          name: c.name.length > 22 ? `${c.name.slice(0, 21)}…` : c.name,
          total: Math.round(c.total * 100) / 100,
        }));
      setTopCustomersData(topCustomers);
    } catch (err) {
      console.error('Failed to load analytics:', err);
      setLoadError(err.message || 'Failed to load analytics');
      messages.fetchError('analytics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-heading font-bold text-charcoal mb-6">
          {t('analytics.title') || 'Analytics Dashboard'}
        </h1>
        <Spinner />
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-heading font-bold text-charcoal mb-6">
          {t('analytics.title') || 'Analytics Dashboard'}
        </h1>
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-6">
          <p className="font-medium">
            {t('analytics.loadError') || 'Failed to load analytics'}
          </p>
          <p className="text-sm mt-1 opacity-80">{loadError}</p>
          <button
            type="button"
            onClick={loadAnalytics}
            className="mt-3 px-4 py-2 bg-terracotta text-white rounded-md hover:bg-terracotta/90 text-sm font-medium"
          >
            {t('analytics.retry') || 'Try again'}
          </button>
        </div>
      </div>
    );
  }

  const stats = dashboardStats || {};

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-heading font-bold text-charcoal">
          {t('analytics.title') || 'Analytics Dashboard'}
        </h1>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-charcoal mb-2">
            {t('analytics.kpi.totalCustomers') || 'Total Customers'}
          </h3>
          <p className="text-3xl font-heading font-bold text-terracotta">
            {stats.totalCustomers ?? 0}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-charcoal mb-2">
            {t('analytics.kpi.totalRevenue') || 'Total Revenue'}
          </h3>
          <p className="text-3xl font-heading font-bold text-terracotta">
            {formatCurrency(stats.totalRevenue)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-charcoal mb-2">
            {t('analytics.kpi.outstandingBalance') || 'Outstanding Balance'}
          </h3>
          <p className="text-3xl font-heading font-bold text-terracotta">
            {formatCurrency(stats.totalOutstanding)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-charcoal mb-2">
            {t('analytics.kpi.pendingQuotes') || 'Pending Quotes'}
          </h3>
          <p className="text-3xl font-heading font-bold text-terracotta">
            {stats.pendingQuotes ?? 0}
          </p>
        </div>
      </div>

      {/* Revenue Trend (Line Chart) */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-heading font-semibold text-charcoal mb-4">
          {t('analytics.revenueTrend') || 'Revenue Trend (Last 12 Months)'}
        </h2>
        {revenueSeries.length === 0 || revenueSeries.every((p) => p.total === 0) ? (
          <EmptyState
            message={
              t('analytics.revenueEmpty') ||
              'No payments recorded in the last 12 months.'
            }
          />
        ) : (
          <div style={{ width: '100%', height: 320 }}>
            <ResponsiveContainer>
              <LineChart
                data={revenueSeries}
                margin={{ top: 10, right: 24, left: 8, bottom: 8 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke={COLOR_CHARCOAL} fontSize={12} />
                <YAxis
                  stroke={COLOR_CHARCOAL}
                  fontSize={12}
                  tickFormatter={(v) => formatCurrencyShort(v)}
                />
                <Tooltip
                  formatter={(value) => formatCurrency(value)}
                  labelStyle={{ color: COLOR_CHARCOAL }}
                  contentStyle={{
                    borderRadius: 6,
                    borderColor: '#e5e7eb',
                    fontSize: 13,
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 13 }} />
                <Line
                  type="monotone"
                  dataKey="total"
                  name={t('analytics.revenueLabel') || 'Revenue'}
                  stroke={COLOR_TERRACOTTA}
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: COLOR_TERRACOTTA }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Work Order Status (Donut/Pie Chart) */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-heading font-semibold text-charcoal mb-4">
            {t('analytics.workOrderStatus') || 'Work Order Status'}
          </h2>
          {workOrderStatusData.length === 0 ? (
            <EmptyState
              message={
                t('analytics.workOrderEmpty') || 'No work orders recorded yet.'
              }
            />
          ) : (
            <div style={{ width: '100%', height: 320 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Tooltip
                    formatter={(value, name) => [value, name]}
                    contentStyle={{
                      borderRadius: 6,
                      borderColor: '#e5e7eb',
                      fontSize: 13,
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    wrapperStyle={{ fontSize: 13, color: COLOR_CHARCOAL }}
                  />
                  <Pie
                    data={workOrderStatusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="45%"
                    innerRadius={55}
                    outerRadius={95}
                    paddingAngle={2}
                  >
                    {workOrderStatusData.map((entry, index) => (
                      <Cell
                        key={`cell-${entry.name}`}
                        fill={PIE_COLORS[index % PIE_COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Top 5 Customers (Horizontal Bar Chart) */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-heading font-semibold text-charcoal mb-4">
            {t('analytics.topCustomers') || 'Top 5 Customers (Approved Quotes)'}
          </h2>
          {topCustomersData.length === 0 ? (
            <EmptyState
              message={
                t('analytics.topCustomersEmpty') ||
                'No approved quotes yet.'
              }
            />
          ) : (
            <div style={{ width: '100%', height: 320 }}>
              <ResponsiveContainer>
                <BarChart
                  data={topCustomersData}
                  layout="vertical"
                  margin={{ top: 10, right: 24, left: 8, bottom: 8 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    type="number"
                    stroke={COLOR_CHARCOAL}
                    fontSize={12}
                    tickFormatter={(v) => formatCurrencyShort(v)}
                  />
                  <YAxis
                    dataKey="name"
                    type="category"
                    stroke={COLOR_CHARCOAL}
                    fontSize={12}
                    width={140}
                  />
                  <Tooltip
                    formatter={(value) => formatCurrency(value)}
                    contentStyle={{
                      borderRadius: 6,
                      borderColor: '#e5e7eb',
                      fontSize: 13,
                    }}
                  />
                  <Bar
                    dataKey="total"
                    name={t('analytics.approvedTotal') || 'Approved Total'}
                    fill={COLOR_TERRACOTTA}
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
