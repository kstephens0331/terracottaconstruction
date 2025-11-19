// server/routes/invoices.js
import express from 'express';
import { db } from '../firebaseAdmin.js';
import { validateInvoice, validateStatus } from '../middleware/validate.js';

const router = express.Router();

// Valid invoice statuses
const INVOICE_STATUSES = ['Draft', 'Sent', 'Viewed', 'Paid', 'Partial', 'Overdue', 'Cancelled'];

// Get all invoices with optional filtering
router.get('/', async (req, res) => {
  try {
    const { status, customer_id, from_date, to_date, limit = 100 } = req.query;

    let query = db.collection('invoices').orderBy('created_at', 'desc');

    if (status) {
      query = query.where('status', '==', status);
    }

    if (customer_id) {
      query = query.where('customer_id', '==', customer_id);
    }

    query = query.limit(parseInt(limit));

    const snapshot = await query.get();
    let invoices = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Filter out cancelled/deleted records from default list
    invoices = invoices.filter(inv => inv.status !== 'Deleted');

    // Date filtering
    if (from_date) {
      const fromTimestamp = new Date(from_date).getTime();
      invoices = invoices.filter(inv => new Date(inv.created_at).getTime() >= fromTimestamp);
    }

    if (to_date) {
      const toTimestamp = new Date(to_date).getTime();
      invoices = invoices.filter(inv => new Date(inv.created_at).getTime() <= toTimestamp);
    }

    res.json({
      success: true,
      invoices,
      count: invoices.length
    });
  } catch (err) {
    console.error('Error fetching invoices:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch invoices',
      error: err.message
    });
  }
});

// Get single invoice by ID
router.get('/:id', async (req, res) => {
  try {
    const doc = await db.collection('invoices').doc(req.params.id).get();

    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Invoice not found'
      });
    }

    // Check if deleted
    if (doc.data().status === 'Deleted') {
      return res.status(404).json({
        success: false,
        message: 'Invoice not found'
      });
    }

    res.json({
      success: true,
      invoice: { id: doc.id, ...doc.data() }
    });
  } catch (err) {
    console.error('Error fetching invoice:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch invoice',
      error: err.message
    });
  }
});

// Create invoice from quote
router.post('/from-quote', validateInvoice, async (req, res) => {
  const { quote_id, due_date, notes, tax_rate } = req.body;

  try {
    // Get the quote
    const quoteDoc = await db.collection('quotes').doc(quote_id).get();

    if (!quoteDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Quote not found'
      });
    }

    const quoteData = quoteDoc.data();

    // Check if quote is approved
    if (quoteData.status !== 'Approved') {
      return res.status(400).json({
        success: false,
        message: 'Only approved quotes can be converted to invoices'
      });
    }

    // Check if invoice already exists for this quote
    const existingInvoice = await db.collection('invoices')
      .where('quote_id', '==', quote_id)
      .get();

    if (!existingInvoice.empty) {
      return res.status(400).json({
        success: false,
        message: 'An invoice already exists for this quote'
      });
    }

    // Generate invoice number
    const counterRef = db.collection('counters').doc('invoices');
    const counter = await db.runTransaction(async (transaction) => {
      const doc = await transaction.get(counterRef);
      const newCount = (doc.exists ? doc.data().count : 0) + 1;
      transaction.set(counterRef, { count: newCount });
      return newCount;
    });

    const invoiceNumber = `INV-${String(counter).padStart(5, '0')}`;

    // Calculate totals
    const subtotal = quoteData.total || quoteData.subtotal || 0;
    const taxAmount = tax_rate ? subtotal * (tax_rate / 100) : 0;
    const total = subtotal + taxAmount;

    // Default due date: 30 days from now
    const defaultDueDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

    const invoiceData = {
      invoice_number: invoiceNumber,
      quote_id,
      quote_number: quoteData.quote_number,
      customer_name: quoteData.customer_name,
      customer_email: quoteData.customer_email,
      customer_id: quoteData.customer_id || null,
      line_items: quoteData.line_items,
      subtotal,
      tax_rate: tax_rate || 0,
      tax_amount: taxAmount,
      total,
      amount_paid: 0,
      balance_due: total,
      status: 'Draft',
      due_date: due_date || defaultDueDate,
      notes: notes || '',
      payment_history: [],
      created_at: new Date().toISOString(),
      created_by: req.user.email,
      updated_at: new Date().toISOString()
    };

    const docRef = await db.collection('invoices').add(invoiceData);

    // Update quote status to Invoiced
    await db.collection('quotes').doc(quote_id).update({
      status: 'Invoiced',
      invoice_id: docRef.id,
      updated_at: new Date().toISOString()
    });

    res.status(201).json({
      success: true,
      id: docRef.id,
      invoice_number: invoiceNumber,
      message: 'Invoice created successfully'
    });
  } catch (err) {
    console.error('Error creating invoice:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to create invoice',
      error: err.message
    });
  }
});

// Update invoice status
router.put('/:id/status', validateStatus(INVOICE_STATUSES), async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const docRef = db.collection('invoices').doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Invoice not found'
      });
    }

    const updateData = {
      status,
      updated_at: new Date().toISOString(),
      updated_by: req.user.email
    };

    if (status === 'Sent') {
      updateData.sent_at = new Date().toISOString();
    } else if (status === 'Paid') {
      updateData.paid_at = new Date().toISOString();
    }

    await docRef.update(updateData);

    res.json({
      success: true,
      message: `Invoice status updated to ${status}`
    });
  } catch (err) {
    console.error('Error updating invoice status:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to update invoice status',
      error: err.message
    });
  }
});

// Record payment
router.post('/:id/payment', async (req, res) => {
  const { id } = req.params;
  const { amount, payment_method, reference, notes } = req.body;

  if (!amount || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Valid payment amount is required'
    });
  }

  try {
    const docRef = db.collection('invoices').doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Invoice not found'
      });
    }

    const invoiceData = doc.data();
    const newAmountPaid = (invoiceData.amount_paid || 0) + amount;
    const newBalanceDue = invoiceData.total - newAmountPaid;

    // Determine new status
    let newStatus = invoiceData.status;
    if (newBalanceDue <= 0) {
      newStatus = 'Paid';
    } else if (newAmountPaid > 0) {
      newStatus = 'Partial';
    }

    // Create payment record
    const payment = {
      amount,
      payment_method: payment_method || 'Other',
      reference: reference || '',
      notes: notes || '',
      recorded_at: new Date().toISOString(),
      recorded_by: req.user.email
    };

    const paymentHistory = [...(invoiceData.payment_history || []), payment];

    await docRef.update({
      amount_paid: newAmountPaid,
      balance_due: Math.max(0, newBalanceDue),
      status: newStatus,
      payment_history: paymentHistory,
      updated_at: new Date().toISOString(),
      updated_by: req.user.email,
      ...(newStatus === 'Paid' ? { paid_at: new Date().toISOString() } : {})
    });

    res.json({
      success: true,
      message: 'Payment recorded successfully',
      new_balance: Math.max(0, newBalanceDue),
      status: newStatus
    });
  } catch (err) {
    console.error('Error recording payment:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to record payment',
      error: err.message
    });
  }
});

// Get invoice summary/stats
router.get('/stats/summary', async (req, res) => {
  try {
    const snapshot = await db.collection('invoices').get();
    const invoices = snapshot.docs.map(doc => doc.data());

    const stats = {
      total_invoices: invoices.length,
      total_revenue: invoices.reduce((sum, inv) => sum + (inv.amount_paid || 0), 0),
      outstanding_balance: invoices.reduce((sum, inv) => sum + (inv.balance_due || 0), 0),
      by_status: {}
    };

    // Count by status
    invoices.forEach(inv => {
      stats.by_status[inv.status] = (stats.by_status[inv.status] || 0) + 1;
    });

    res.json({
      success: true,
      stats
    });
  } catch (err) {
    console.error('Error fetching invoice stats:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch invoice statistics',
      error: err.message
    });
  }
});

export default router;
