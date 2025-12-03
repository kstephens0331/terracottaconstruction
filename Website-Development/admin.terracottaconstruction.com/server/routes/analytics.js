// server/routes/analytics.js
import express from 'express';
import { db } from '../firebaseAdmin.js';

const router = express.Router();

// Get dashboard overview stats
router.get('/dashboard', async (req, res) => {
  try {
    const [quotesSnapshot, workOrdersSnapshot, customersSnapshot, invoicesSnapshot] = await Promise.all([
      db.collection('quotes').get(),
      db.collection('work_orders').get(),
      db.collection('customers').get(),
      db.collection('invoices').get()
    ]);

    const quotes = quotesSnapshot.docs.map(doc => doc.data());
    const workOrders = workOrdersSnapshot.docs.map(doc => doc.data());
    const customers = customersSnapshot.docs.map(doc => doc.data());
    const invoices = invoicesSnapshot.docs.map(doc => doc.data());

    // Calculate stats
    const stats = {
      quotes: {
        total: quotes.length,
        open: quotes.filter(q => q.status === 'Open').length,
        approved: quotes.filter(q => q.status === 'Approved').length,
        rejected: quotes.filter(q => q.status === 'Rejected').length,
        conversion_rate: quotes.length > 0
          ? ((quotes.filter(q => ['Approved', 'Invoiced'].includes(q.status)).length / quotes.length) * 100).toFixed(1)
          : 0
      },
      work_orders: {
        total: workOrders.length,
        new: workOrders.filter(wo => wo.status === 'New').length,
        in_progress: workOrders.filter(wo => wo.status === 'In Progress').length,
        complete: workOrders.filter(wo => wo.status === 'Complete').length,
        scheduled: workOrders.filter(wo => wo.status === 'Scheduled').length
      },
      customers: {
        total: customers.length,
        leads: customers.filter(c => c.status === 'Lead').length,
        active: customers.filter(c => c.status === 'Active').length,
        vip: customers.filter(c => c.status === 'VIP').length
      },
      revenue: {
        total_invoiced: invoices.reduce((sum, inv) => sum + (inv.total || 0), 0),
        total_collected: invoices.reduce((sum, inv) => sum + (inv.amount_paid || 0), 0),
        outstanding: invoices.reduce((sum, inv) => sum + (inv.balance_due || 0), 0),
        paid_invoices: invoices.filter(inv => inv.status === 'Paid').length
      }
    };

    res.json({
      success: true,
      stats
    });
  } catch (err) {
    console.error('Error fetching dashboard stats:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard statistics',
      error: err.message
    });
  }
});

// Get revenue by period
router.get('/revenue', async (req, res) => {
  try {
    const { period = 'monthly', year = new Date().getFullYear() } = req.query;

    const snapshot = await db.collection('invoices').get();
    const invoices = snapshot.docs.map(doc => doc.data());

    // Filter by year
    const yearInvoices = invoices.filter(inv => {
      const invDate = new Date(inv.created_at);
      return invDate.getFullYear() === parseInt(year);
    });

    let revenueData = [];

    if (period === 'monthly') {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      revenueData = months.map((month, index) => {
        const monthInvoices = yearInvoices.filter(inv => {
          const invDate = new Date(inv.created_at);
          return invDate.getMonth() === index;
        });

        return {
          period: month,
          invoiced: monthInvoices.reduce((sum, inv) => sum + (inv.total || 0), 0),
          collected: monthInvoices.reduce((sum, inv) => sum + (inv.amount_paid || 0), 0),
          count: monthInvoices.length
        };
      });
    } else if (period === 'weekly') {
      // Last 12 weeks
      const weeks = [];
      for (let i = 11; i >= 0; i--) {
        const weekStart = new Date();
        weekStart.setDate(weekStart.getDate() - (i * 7));
        weekStart.setHours(0, 0, 0, 0);

        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 7);

        const weekInvoices = invoices.filter(inv => {
          const invDate = new Date(inv.created_at);
          return invDate >= weekStart && invDate < weekEnd;
        });

        weeks.push({
          period: `Week ${12 - i}`,
          start_date: weekStart.toISOString().split('T')[0],
          invoiced: weekInvoices.reduce((sum, inv) => sum + (inv.total || 0), 0),
          collected: weekInvoices.reduce((sum, inv) => sum + (inv.amount_paid || 0), 0),
          count: weekInvoices.length
        });
      }
      revenueData = weeks;
    }

    res.json({
      success: true,
      period,
      year: parseInt(year),
      data: revenueData
    });
  } catch (err) {
    console.error('Error fetching revenue data:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch revenue data',
      error: err.message
    });
  }
});

// Get quote conversion analytics
router.get('/quotes/conversion', async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    const snapshot = await db.collection('quotes').get();
    const quotes = snapshot.docs.map(doc => doc.data());

    // Filter by date range
    const recentQuotes = quotes.filter(q =>
      new Date(q.created_at) >= startDate
    );

    const stats = {
      total: recentQuotes.length,
      open: recentQuotes.filter(q => q.status === 'Open').length,
      sent: recentQuotes.filter(q => q.status === 'Sent').length,
      approved: recentQuotes.filter(q => q.status === 'Approved').length,
      rejected: recentQuotes.filter(q => q.status === 'Rejected').length,
      invoiced: recentQuotes.filter(q => q.status === 'Invoiced').length,
      conversion_rate: recentQuotes.length > 0
        ? ((recentQuotes.filter(q => ['Approved', 'Invoiced'].includes(q.status)).length / recentQuotes.length) * 100).toFixed(1)
        : 0,
      total_value: recentQuotes.reduce((sum, q) => sum + (q.total || 0), 0),
      approved_value: recentQuotes
        .filter(q => ['Approved', 'Invoiced'].includes(q.status))
        .reduce((sum, q) => sum + (q.total || 0), 0),
      average_value: recentQuotes.length > 0
        ? (recentQuotes.reduce((sum, q) => sum + (q.total || 0), 0) / recentQuotes.length).toFixed(2)
        : 0
    };

    res.json({
      success: true,
      period_days: parseInt(days),
      stats
    });
  } catch (err) {
    console.error('Error fetching quote conversion data:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch quote conversion data',
      error: err.message
    });
  }
});

// Get work order completion analytics
router.get('/workorders/completion', async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    const snapshot = await db.collection('work_orders').get();
    const workOrders = snapshot.docs.map(doc => doc.data());

    // Filter by date range
    const recentWO = workOrders.filter(wo =>
      new Date(wo.created_at) >= startDate
    );

    const completedWO = recentWO.filter(wo => wo.status === 'Complete');

    // Calculate average completion time
    let avgCompletionTime = 0;
    const completionTimes = completedWO
      .filter(wo => wo.completed_at && wo.created_at)
      .map(wo => {
        const created = new Date(wo.created_at);
        const completed = new Date(wo.completed_at);
        return (completed - created) / (1000 * 60 * 60 * 24); // Days
      });

    if (completionTimes.length > 0) {
      avgCompletionTime = (completionTimes.reduce((sum, t) => sum + t, 0) / completionTimes.length).toFixed(1);
    }

    const stats = {
      total: recentWO.length,
      new: recentWO.filter(wo => wo.status === 'New').length,
      scheduled: recentWO.filter(wo => wo.status === 'Scheduled').length,
      in_progress: recentWO.filter(wo => wo.status === 'In Progress').length,
      complete: completedWO.length,
      cancelled: recentWO.filter(wo => wo.status === 'Cancelled').length,
      completion_rate: recentWO.length > 0
        ? ((completedWO.length / recentWO.length) * 100).toFixed(1)
        : 0,
      avg_completion_days: avgCompletionTime
    };

    res.json({
      success: true,
      period_days: parseInt(days),
      stats
    });
  } catch (err) {
    console.error('Error fetching work order completion data:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch work order completion data',
      error: err.message
    });
  }
});

// Get customer acquisition analytics
router.get('/customers/acquisition', async (req, res) => {
  try {
    const { year = new Date().getFullYear() } = req.query;

    const snapshot = await db.collection('customers').get();
    const customers = snapshot.docs.map(doc => doc.data());

    // Filter by year
    const yearCustomers = customers.filter(c => {
      const cDate = new Date(c.created_at);
      return cDate.getFullYear() === parseInt(year);
    });

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const acquisitionData = months.map((month, index) => {
      const monthCustomers = yearCustomers.filter(c => {
        const cDate = new Date(c.created_at);
        return cDate.getMonth() === index;
      });

      return {
        month,
        new_customers: monthCustomers.length,
        leads: monthCustomers.filter(c => c.status === 'Lead').length,
        converted: monthCustomers.filter(c => ['Active', 'VIP'].includes(c.status)).length
      };
    });

    res.json({
      success: true,
      year: parseInt(year),
      total_new: yearCustomers.length,
      data: acquisitionData
    });
  } catch (err) {
    console.error('Error fetching customer acquisition data:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch customer acquisition data',
      error: err.message
    });
  }
});

// Get top customers by revenue
router.get('/customers/top', async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const [customersSnapshot, invoicesSnapshot] = await Promise.all([
      db.collection('customers').get(),
      db.collection('invoices').get()
    ]);

    const customers = customersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const invoices = invoicesSnapshot.docs.map(doc => doc.data());

    // Calculate revenue per customer
    const customerRevenue = customers.map(customer => {
      const customerInvoices = invoices.filter(inv =>
        inv.customer_id === customer.id ||
        inv.customer_email === customer.email
      );

      return {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        status: customer.status,
        total_invoices: customerInvoices.length,
        total_revenue: customerInvoices.reduce((sum, inv) => sum + (inv.amount_paid || 0), 0),
        outstanding: customerInvoices.reduce((sum, inv) => sum + (inv.balance_due || 0), 0)
      };
    });

    // Sort by revenue and limit
    const topCustomers = customerRevenue
      .sort((a, b) => b.total_revenue - a.total_revenue)
      .slice(0, parseInt(limit));

    res.json({
      success: true,
      customers: topCustomers
    });
  } catch (err) {
    console.error('Error fetching top customers:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch top customers',
      error: err.message
    });
  }
});

export default router;
