// server/routes/customers.js
import express from 'express';
import { db } from '../firebaseAdmin.js';
import { validateCustomer } from '../middleware/validate.js';

const router = express.Router();

// Customer status options
const CUSTOMER_STATUSES = ['Lead', 'Prospect', 'Active', 'VIP', 'Inactive'];

// Get all customers with optional filtering
router.get('/', async (req, res) => {
  try {
    const { status, search, limit = 100 } = req.query;

    let query = db.collection('customers').orderBy('created_at', 'desc');

    if (status) {
      query = query.where('status', '==', status);
    }

    query = query.limit(parseInt(limit));

    const snapshot = await query.get();
    let customers = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Filter out deleted records
    customers = customers.filter(c => c.status !== 'Deleted');

    // Client-side search filtering
    if (search) {
      const searchLower = search.toLowerCase();
      customers = customers.filter(c =>
        c.name?.toLowerCase().includes(searchLower) ||
        c.email?.toLowerCase().includes(searchLower) ||
        c.account_number?.includes(search) ||
        c.phone?.includes(search)
      );
    }

    res.json({
      success: true,
      customers,
      count: customers.length
    });
  } catch (err) {
    console.error('Error fetching customers:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch customers',
      error: err.message
    });
  }
});

// Get single customer by ID
router.get('/:id', async (req, res) => {
  try {
    const doc = await db.collection('customers').doc(req.params.id).get();

    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    // Check if deleted
    if (doc.data().status === 'Deleted') {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    // Get customer's quotes and work orders
    const [quotesSnapshot, workOrdersSnapshot] = await Promise.all([
      db.collection('quotes').where('customer_id', '==', req.params.id).get(),
      db.collection('work_orders').where('customer_id', '==', req.params.id).get()
    ]);

    const quotes = quotesSnapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    const workOrders = workOrdersSnapshot.docs.map(d => ({ id: d.id, ...d.data() }));

    res.json({
      success: true,
      customer: {
        id: doc.id,
        ...doc.data(),
        quotes,
        work_orders: workOrders
      }
    });
  } catch (err) {
    console.error('Error fetching customer:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch customer',
      error: err.message
    });
  }
});

// Create new customer
router.post('/', validateCustomer, async (req, res) => {
  const { name, email, phone, address, notes } = req.body;

  try {
    // Check for duplicate email
    const existingCustomer = await db.collection('customers')
      .where('email', '==', email.toLowerCase())
      .get();

    if (!existingCustomer.empty) {
      return res.status(400).json({
        success: false,
        message: 'A customer with this email already exists'
      });
    }

    // Generate account number
    const accountNumber = String(Math.floor(100000 + Math.random() * 900000));

    const customerData = {
      name,
      email: email.toLowerCase(),
      phone: phone || '',
      address: address || '',
      account_number: accountNumber,
      status: 'Lead',
      notes: notes || '',
      total_quotes: 0,
      total_revenue: 0,
      created_at: new Date().toISOString(),
      created_by: req.user.email,
      updated_at: new Date().toISOString()
    };

    const docRef = await db.collection('customers').add(customerData);

    res.status(201).json({
      success: true,
      id: docRef.id,
      account_number: accountNumber,
      message: 'Customer created successfully'
    });
  } catch (err) {
    console.error('Error creating customer:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to create customer',
      error: err.message
    });
  }
});

// Update customer
router.put('/:id', validateCustomer, async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address, status, notes } = req.body;

  try {
    const docRef = db.collection('customers').doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    // Check for duplicate email (excluding current customer)
    if (email && email.toLowerCase() !== doc.data().email) {
      const existingCustomer = await db.collection('customers')
        .where('email', '==', email.toLowerCase())
        .get();

      if (!existingCustomer.empty) {
        return res.status(400).json({
          success: false,
          message: 'A customer with this email already exists'
        });
      }
    }

    const updateData = {
      updated_at: new Date().toISOString(),
      updated_by: req.user.email
    };

    if (name) updateData.name = name;
    if (email) updateData.email = email.toLowerCase();
    if (phone !== undefined) updateData.phone = phone;
    if (address !== undefined) updateData.address = address;
    if (status && CUSTOMER_STATUSES.includes(status)) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;

    await docRef.update(updateData);

    res.json({
      success: true,
      message: 'Customer updated successfully'
    });
  } catch (err) {
    console.error('Error updating customer:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to update customer',
      error: err.message
    });
  }
});

// Update customer status
router.put('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status || !CUSTOMER_STATUSES.includes(status)) {
    return res.status(400).json({
      success: false,
      message: `Invalid status. Must be one of: ${CUSTOMER_STATUSES.join(', ')}`
    });
  }

  try {
    const docRef = db.collection('customers').doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    await docRef.update({
      status,
      updated_at: new Date().toISOString(),
      updated_by: req.user.email
    });

    res.json({
      success: true,
      message: `Customer status updated to ${status}`
    });
  } catch (err) {
    console.error('Error updating customer status:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to update customer status',
      error: err.message
    });
  }
});

// Delete customer (soft delete)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const docRef = db.collection('customers').doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    await docRef.update({
      status: 'Deleted',
      deleted_at: new Date().toISOString(),
      deleted_by: req.user.email
    });

    res.json({
      success: true,
      message: 'Customer deleted successfully'
    });
  } catch (err) {
    console.error('Error deleting customer:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to delete customer',
      error: err.message
    });
  }
});

export default router;
