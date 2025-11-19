// server/routes/quotes.js
import express from 'express';
import { db } from '../firebaseAdmin.js';
import { validateQuote, validateStatus } from '../middleware/validate.js';

const router = express.Router();

// Valid quote statuses
const QUOTE_STATUSES = ['Open', 'Sent', 'Approved', 'Rejected', 'Invoiced', 'Expired'];

// Get all quotes with optional filtering
router.get('/', async (req, res) => {
  try {
    const { status, customer_id, from_date, to_date, limit = 100 } = req.query;

    let query = db.collection('quotes').orderBy('created_at', 'desc');

    // Apply filters
    if (status) {
      query = query.where('status', '==', status);
    }

    if (customer_id) {
      query = query.where('customer_id', '==', customer_id);
    }

    // Limit results
    query = query.limit(parseInt(limit));

    const snapshot = await query.get();
    let quotes = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Filter out deleted records
    quotes = quotes.filter(q => q.status !== 'Deleted');

    // Filter by date range (client-side for simplicity)
    if (from_date) {
      const fromTimestamp = new Date(from_date).getTime();
      quotes = quotes.filter(q => new Date(q.created_at).getTime() >= fromTimestamp);
    }

    if (to_date) {
      const toTimestamp = new Date(to_date).getTime();
      quotes = quotes.filter(q => new Date(q.created_at).getTime() <= toTimestamp);
    }

    res.json({
      success: true,
      quotes,
      count: quotes.length
    });
  } catch (err) {
    console.error('Error fetching quotes:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch quotes',
      error: err.message
    });
  }
});

// Get single quote by ID
router.get('/:id', async (req, res) => {
  try {
    const doc = await db.collection('quotes').doc(req.params.id).get();

    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Quote not found'
      });
    }

    // Check if deleted
    if (doc.data().status === 'Deleted') {
      return res.status(404).json({
        success: false,
        message: 'Quote not found'
      });
    }

    res.json({
      success: true,
      quote: { id: doc.id, ...doc.data() }
    });
  } catch (err) {
    console.error('Error fetching quote:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch quote',
      error: err.message
    });
  }
});

// Create new quote
router.post('/', validateQuote, async (req, res) => {
  const {
    customerName,
    customerEmail,
    customerId,
    quoteItems,
    margin,
    total,
    allowOverride,
    notes,
    validUntil
  } = req.body;

  try {
    // Generate quote number
    const counterRef = db.collection('counters').doc('quotes');
    const counter = await db.runTransaction(async (transaction) => {
      const doc = await transaction.get(counterRef);
      const newCount = (doc.exists ? doc.data().count : 0) + 1;
      transaction.set(counterRef, { count: newCount });
      return newCount;
    });

    const quoteNumber = `QT-${String(counter).padStart(5, '0')}`;

    const quoteData = {
      quote_number: quoteNumber,
      customer_name: customerName,
      customer_email: customerEmail,
      customer_id: customerId || null,
      line_items: quoteItems,
      margin: margin || 0,
      total,
      subtotal: quoteItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      allow_override: allowOverride || false,
      status: 'Open',
      notes: notes || '',
      valid_until: validUntil || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      created_at: new Date().toISOString(),
      created_by: req.user.email,
      updated_at: new Date().toISOString()
    };

    const docRef = await db.collection('quotes').add(quoteData);

    res.status(201).json({
      success: true,
      id: docRef.id,
      quote_number: quoteNumber,
      message: 'Quote created successfully'
    });
  } catch (err) {
    console.error('Error creating quote:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to create quote',
      error: err.message
    });
  }
});

// Update quote
router.put('/:id', validateQuote, async (req, res) => {
  const { id } = req.params;
  const {
    customerName,
    customerEmail,
    customerId,
    quoteItems,
    margin,
    total,
    allowOverride,
    notes,
    validUntil
  } = req.body;

  try {
    const docRef = db.collection('quotes').doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Quote not found'
      });
    }

    // Don't allow editing approved or invoiced quotes
    const currentStatus = doc.data().status;
    if (['Approved', 'Invoiced'].includes(currentStatus)) {
      return res.status(400).json({
        success: false,
        message: `Cannot edit quote with status: ${currentStatus}`
      });
    }

    await docRef.update({
      customer_name: customerName,
      customer_email: customerEmail,
      customer_id: customerId || null,
      line_items: quoteItems,
      margin: margin || 0,
      total,
      subtotal: quoteItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      allow_override: allowOverride || false,
      notes: notes || '',
      valid_until: validUntil || doc.data().valid_until,
      updated_at: new Date().toISOString(),
      updated_by: req.user.email
    });

    res.json({
      success: true,
      message: 'Quote updated successfully'
    });
  } catch (err) {
    console.error('Error updating quote:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to update quote',
      error: err.message
    });
  }
});

// Update quote status
router.put('/:id/status', validateStatus(QUOTE_STATUSES), async (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;

  try {
    const docRef = db.collection('quotes').doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Quote not found'
      });
    }

    const updateData = {
      status,
      updated_at: new Date().toISOString(),
      updated_by: req.user.email
    };

    // Add status-specific fields
    if (status === 'Sent') {
      updateData.sent_at = new Date().toISOString();
    } else if (status === 'Approved') {
      updateData.approved_at = new Date().toISOString();
    } else if (status === 'Rejected') {
      updateData.rejected_at = new Date().toISOString();
      if (notes) updateData.rejection_reason = notes;
    }

    await docRef.update(updateData);

    res.json({
      success: true,
      message: `Quote status updated to ${status}`
    });
  } catch (err) {
    console.error('Error updating quote status:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to update quote status',
      error: err.message
    });
  }
});

// Delete quote (soft delete)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const docRef = db.collection('quotes').doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Quote not found'
      });
    }

    // Soft delete - mark as deleted instead of actually deleting
    await docRef.update({
      status: 'Deleted',
      deleted_at: new Date().toISOString(),
      deleted_by: req.user.email
    });

    res.json({
      success: true,
      message: 'Quote deleted successfully'
    });
  } catch (err) {
    console.error('Error deleting quote:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to delete quote',
      error: err.message
    });
  }
});

// Duplicate quote
router.post('/:id/duplicate', async (req, res) => {
  const { id } = req.params;

  try {
    const doc = await db.collection('quotes').doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Quote not found'
      });
    }

    const originalData = doc.data();

    // Generate new quote number
    const counterRef = db.collection('counters').doc('quotes');
    const counter = await db.runTransaction(async (transaction) => {
      const counterDoc = await transaction.get(counterRef);
      const newCount = (counterDoc.exists ? counterDoc.data().count : 0) + 1;
      transaction.set(counterRef, { count: newCount });
      return newCount;
    });

    const quoteNumber = `QT-${String(counter).padStart(5, '0')}`;

    const newQuoteData = {
      ...originalData,
      quote_number: quoteNumber,
      status: 'Open',
      created_at: new Date().toISOString(),
      created_by: req.user.email,
      updated_at: new Date().toISOString(),
      valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      duplicated_from: id
    };

    // Remove status-specific fields
    delete newQuoteData.sent_at;
    delete newQuoteData.approved_at;
    delete newQuoteData.rejected_at;
    delete newQuoteData.rejection_reason;

    const docRef = await db.collection('quotes').add(newQuoteData);

    res.status(201).json({
      success: true,
      id: docRef.id,
      quote_number: quoteNumber,
      message: 'Quote duplicated successfully'
    });
  } catch (err) {
    console.error('Error duplicating quote:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to duplicate quote',
      error: err.message
    });
  }
});

export default router;
