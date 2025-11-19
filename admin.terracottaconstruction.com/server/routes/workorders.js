// server/routes/workorders.js
import express from 'express';
import { db } from '../firebaseAdmin.js';
import { validateWorkOrder, validateStatus } from '../middleware/validate.js';

const router = express.Router();

// Valid work order statuses
const WORK_ORDER_STATUSES = ['New', 'Scheduled', 'In Progress', 'On Hold', 'Complete', 'Cancelled'];

// Get all work orders with optional filtering
router.get('/', async (req, res) => {
  try {
    const { status, customer_id, from_date, to_date, limit = 100 } = req.query;

    // Use 'work_orders' collection (standardized)
    let query = db.collection('work_orders').orderBy('created_at', 'desc');

    if (status) {
      query = query.where('status', '==', status);
    }

    if (customer_id) {
      query = query.where('customer_id', '==', customer_id);
    }

    query = query.limit(parseInt(limit));

    const snapshot = await query.get();
    let workOrders = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Filter out deleted records
    workOrders = workOrders.filter(wo => wo.status !== 'Deleted');

    // Date filtering
    if (from_date) {
      const fromTimestamp = new Date(from_date).getTime();
      workOrders = workOrders.filter(wo => new Date(wo.created_at).getTime() >= fromTimestamp);
    }

    if (to_date) {
      const toTimestamp = new Date(to_date).getTime();
      workOrders = workOrders.filter(wo => new Date(wo.created_at).getTime() <= toTimestamp);
    }

    res.json({
      success: true,
      work_orders: workOrders,
      count: workOrders.length
    });
  } catch (err) {
    console.error('Error fetching work orders:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch work orders',
      error: err.message
    });
  }
});

// Get single work order by ID
router.get('/:id', async (req, res) => {
  try {
    const doc = await db.collection('work_orders').doc(req.params.id).get();

    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Work order not found'
      });
    }

    // Check if deleted
    if (doc.data().status === 'Deleted') {
      return res.status(404).json({
        success: false,
        message: 'Work order not found'
      });
    }

    res.json({
      success: true,
      work_order: { id: doc.id, ...doc.data() }
    });
  } catch (err) {
    console.error('Error fetching work order:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch work order',
      error: err.message
    });
  }
});

// Create new work order
router.post('/', validateWorkOrder, async (req, res) => {
  const {
    customer_name,
    customer_email,
    customer_id,
    quote_id,
    description,
    reference,
    scheduled_date,
    priority,
    assigned_to,
    notes
  } = req.body;

  try {
    // Generate work order number
    const counterRef = db.collection('counters').doc('work_orders');
    const counter = await db.runTransaction(async (transaction) => {
      const doc = await transaction.get(counterRef);
      const newCount = (doc.exists ? doc.data().count : 0) + 1;
      transaction.set(counterRef, { count: newCount });
      return newCount;
    });

    const workOrderNumber = `WO-${String(counter).padStart(5, '0')}`;

    const workOrderData = {
      work_order_number: workOrderNumber,
      customer_name,
      customer_email,
      customer_id: customer_id || null,
      quote_id: quote_id || null,
      description,
      reference: reference || '',
      status: 'New',
      priority: priority || 'Normal',
      scheduled_date: scheduled_date || null,
      assigned_to: assigned_to || null,
      notes: notes || '',
      created_at: new Date().toISOString(),
      created_by: req.user.email,
      updated_at: new Date().toISOString()
    };

    const docRef = await db.collection('work_orders').add(workOrderData);

    res.status(201).json({
      success: true,
      id: docRef.id,
      work_order_number: workOrderNumber,
      message: 'Work order created successfully'
    });
  } catch (err) {
    console.error('Error creating work order:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to create work order',
      error: err.message
    });
  }
});

// Update work order
router.put('/:id', validateWorkOrder, async (req, res) => {
  const { id } = req.params;
  const {
    customer_name,
    customer_email,
    description,
    reference,
    scheduled_date,
    priority,
    assigned_to,
    notes
  } = req.body;

  try {
    const docRef = db.collection('work_orders').doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Work order not found'
      });
    }

    const updateData = {
      customer_name,
      customer_email,
      description,
      reference: reference || '',
      updated_at: new Date().toISOString(),
      updated_by: req.user.email
    };

    if (scheduled_date !== undefined) updateData.scheduled_date = scheduled_date;
    if (priority) updateData.priority = priority;
    if (assigned_to !== undefined) updateData.assigned_to = assigned_to;
    if (notes !== undefined) updateData.notes = notes;

    await docRef.update(updateData);

    res.json({
      success: true,
      message: 'Work order updated successfully'
    });
  } catch (err) {
    console.error('Error updating work order:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to update work order',
      error: err.message
    });
  }
});

// Update work order status
router.put('/:id/status', validateStatus(WORK_ORDER_STATUSES), async (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;

  try {
    const docRef = db.collection('work_orders').doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Work order not found'
      });
    }

    const updateData = {
      status,
      updated_at: new Date().toISOString(),
      updated_by: req.user.email
    };

    // Add status-specific timestamps
    if (status === 'In Progress') {
      updateData.started_at = new Date().toISOString();
    } else if (status === 'Complete') {
      updateData.completed_at = new Date().toISOString();
    } else if (status === 'Cancelled') {
      updateData.cancelled_at = new Date().toISOString();
      if (notes) updateData.cancellation_reason = notes;
    }

    await docRef.update(updateData);

    res.json({
      success: true,
      message: `Work order status updated to ${status}`
    });
  } catch (err) {
    console.error('Error updating work order status:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to update work order status',
      error: err.message
    });
  }
});

// Delete work order (soft delete)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const docRef = db.collection('work_orders').doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Work order not found'
      });
    }

    await docRef.update({
      status: 'Deleted',
      deleted_at: new Date().toISOString(),
      deleted_by: req.user.email
    });

    res.json({
      success: true,
      message: 'Work order deleted successfully'
    });
  } catch (err) {
    console.error('Error deleting work order:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to delete work order',
      error: err.message
    });
  }
});

export default router;
