// server.js
// Terracotta Construction customer-portal-server v2.
// Responsibilities:
//   - Verify Supabase JWTs (customer + admin roles)
//   - Send branded transactional email via Resend
//   - Handle customer-driven actions that need server-side auth (e.g. quote revisions)
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const { supabase } = require('./lib/supabase');
const { sendEmail } = require('./lib/email');
const { renderTemplate, templates } = require('./lib/templates');
const { verifyCustomer, verifyAdmin } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// ---------------------------------------------------------------------------
// Core middleware
// ---------------------------------------------------------------------------

app.use(helmet());
app.use(express.json({ limit: '256kb' }));

const allowedOrigins = [
  process.env.CUSTOMER_PORTAL_URL,
  process.env.ADMIN_PORTAL_URL,
  'http://localhost:3000',
  'http://localhost:5173',
].filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      // Allow same-origin / server-side requests with no Origin header.
      if (!origin) return cb(null, true);
      if (allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error(`CORS blocked: ${origin}`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Global rate limit: 100 req / 15 min / IP
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});
app.use(globalLimiter);

// Strict limiter for email-sending endpoints: 10 / 15 min / IP
const emailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Email rate limit exceeded. Try again later.' },
});

// ---------------------------------------------------------------------------
// Health
// ---------------------------------------------------------------------------

app.get('/health', (_req, res) => {
  res.json({
    status: 'healthy',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
  });
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function handleError(res, err, fallbackMsg, status = 500) {
  // eslint-disable-next-line no-console
  console.error('[api]', fallbackMsg, err);
  const message = (err && err.message) || fallbackMsg;
  return res.status(status).json({ success: false, error: message });
}

function requireString(value, field) {
  if (typeof value !== 'string' || !value.trim()) {
    const err = new Error(`${field} is required`);
    err.status = 400;
    throw err;
  }
  return value.trim();
}

// ---------------------------------------------------------------------------
// Customer endpoints
// ---------------------------------------------------------------------------

// POST /api/quote-revisions
// Customer-initiated revision request on one of their quotes.
app.post('/api/quote-revisions', emailLimiter, verifyCustomer, async (req, res) => {
  try {
    const quoteId = requireString(req.body && req.body.quoteId, 'quoteId');
    const message = requireString(req.body && req.body.message, 'message');

    // Load quote, ensure it belongs to this customer.
    const { data: quote, error: quoteErr } = await supabase
      .from('quotes')
      .select('id, quote_number, title, customer_id, status, customer_notes')
      .eq('id', quoteId)
      .is('deleted_at', null)
      .single();

    if (quoteErr || !quote) {
      return res.status(404).json({ success: false, error: 'Quote not found' });
    }
    if (quote.customer_id !== req.customer.id) {
      return res.status(403).json({ success: false, error: 'Not your quote' });
    }

    // Update the quote.
    const { error: updateErr } = await supabase
      .from('quotes')
      .update({
        status: 'Revision Requested',
        customer_notes: message,
      })
      .eq('id', quoteId);
    if (updateErr) {
      return handleError(res, updateErr, 'Failed to update quote');
    }

    // Activity log. `quote_activity` is optional; swallow failures so the
    // revision request itself is not blocked by a missing audit table.
    try {
      await supabase.from('quote_activity').insert({
        quote_id: quoteId,
        action: 'revision_requested',
        actor_type: 'customer',
        actor_id: req.user.id,
        details: { message },
      });
    } catch (activityErr) {
      // eslint-disable-next-line no-console
      console.warn('[quote-revisions] activity log insert skipped:', activityErr.message);
    }

    // Notify admin via branded email.
    const adminTo = process.env.ADMIN_NOTIFICATION_EMAIL || 'terracottaconstruction@gmail.com';
    const rendered = renderTemplate('quote-revision-request', {
      quoteId,
      quoteNumber: quote.quote_number,
      projectTitle: quote.title,
      customerName: req.customer.name || req.customer.full_name || req.user.email,
      customerEmail: req.customer.email || req.user.email,
      customerPhone: req.customer.phone,
      message,
    });

    try {
      await sendEmail({
        to: adminTo,
        subject: rendered.subject,
        html: rendered.html,
        text: rendered.text,
        replyTo: req.customer.email || req.user.email,
      });
    } catch (mailErr) {
      // eslint-disable-next-line no-console
      console.error('[quote-revisions] email send failed:', mailErr);
      // Do NOT fail the request just because the email failed - the DB state
      // has already been updated and the admin can see it in the portal.
      return res.json({
        success: true,
        quoteId,
        warning: 'Revision logged but admin notification email failed to send.',
      });
    }

    return res.json({ success: true, quoteId });
  } catch (err) {
    return handleError(res, err, 'Failed to submit revision request', err.status || 500);
  }
});

// POST /api/auth/welcome
// Customer-triggered welcome email right after registration.
app.post('/api/auth/welcome', emailLimiter, verifyCustomer, async (req, res) => {
  try {
    const to = req.customer.email || req.user.email;
    if (!to) {
      return res.status(400).json({ success: false, error: 'No email on account' });
    }

    const rendered = renderTemplate('welcome', {
      customerName: req.customer.name || req.customer.full_name || 'there',
    });
    await sendEmail({
      to,
      subject: rendered.subject,
      html: rendered.html,
      text: rendered.text,
    });

    return res.json({ success: true });
  } catch (err) {
    return handleError(res, err, 'Failed to send welcome email');
  }
});

// ---------------------------------------------------------------------------
// Admin endpoints
// ---------------------------------------------------------------------------

// POST /api/admin/send-quote
// Admin sends (or resends) a quote to the customer.
app.post('/api/admin/send-quote', emailLimiter, verifyAdmin, async (req, res) => {
  try {
    const quoteId = requireString(req.body && req.body.quoteId, 'quoteId');

    const { data: quote, error: quoteErr } = await supabase
      .from('quotes')
      .select('id, quote_number, title, total, status, valid_until, customer_id')
      .eq('id', quoteId)
      .is('deleted_at', null)
      .single();
    if (quoteErr || !quote) {
      return res.status(404).json({ success: false, error: 'Quote not found' });
    }

    const { data: customer, error: customerErr } = await supabase
      .from('customers')
      .select('id, name, full_name, email')
      .eq('id', quote.customer_id)
      .single();
    if (customerErr || !customer) {
      return res.status(404).json({ success: false, error: 'Customer not found' });
    }
    if (!customer.email) {
      return res.status(400).json({ success: false, error: 'Customer has no email on file' });
    }

    const rendered = renderTemplate('quote-sent', {
      customerName: customer.name || customer.full_name || 'there',
      quoteNumber: quote.quote_number,
      quoteId: quote.id,
      title: quote.title,
      total: quote.total,
      validUntil: quote.valid_until,
    });

    await sendEmail({
      to: customer.email,
      subject: rendered.subject,
      html: rendered.html,
      text: rendered.text,
    });

    // Update status + sent_at. Only bump status if still Draft.
    const updates = { sent_at: new Date().toISOString() };
    if (quote.status === 'Draft' || quote.status === 'draft' || !quote.status) {
      updates.status = 'Sent';
    }
    const { error: updateErr } = await supabase
      .from('quotes')
      .update(updates)
      .eq('id', quoteId);
    if (updateErr) {
      // eslint-disable-next-line no-console
      console.warn('[send-quote] status update failed:', updateErr.message);
    }

    return res.json({ success: true });
  } catch (err) {
    return handleError(res, err, 'Failed to send quote', err.status || 500);
  }
});

// POST /api/admin/send-invoice
app.post('/api/admin/send-invoice', emailLimiter, verifyAdmin, async (req, res) => {
  try {
    const invoiceId = requireString(req.body && req.body.invoiceId, 'invoiceId');

    const { data: invoice, error: invoiceErr } = await supabase
      .from('invoices')
      .select('id, invoice_number, total, balance_due, due_date, status, notes, customer_id')
      .eq('id', invoiceId)
      .is('deleted_at', null)
      .single();
    if (invoiceErr || !invoice) {
      return res.status(404).json({ success: false, error: 'Invoice not found' });
    }

    const { data: customer, error: customerErr } = await supabase
      .from('customers')
      .select('id, name, full_name, email')
      .eq('id', invoice.customer_id)
      .single();
    if (customerErr || !customer || !customer.email) {
      return res.status(400).json({ success: false, error: 'Customer has no email on file' });
    }

    const rendered = renderTemplate('invoice-sent', {
      customerName: customer.name || customer.full_name || 'there',
      invoiceNumber: invoice.invoice_number,
      invoiceId: invoice.id,
      total: invoice.total,
      balanceDue: invoice.balance_due,
      dueDate: invoice.due_date,
      notes: invoice.notes,
    });

    await sendEmail({
      to: customer.email,
      subject: rendered.subject,
      html: rendered.html,
      text: rendered.text,
    });

    if (invoice.status === 'Draft' || invoice.status === 'draft' || !invoice.status) {
      const { error: updateErr } = await supabase
        .from('invoices')
        .update({ status: 'Sent' })
        .eq('id', invoiceId);
      if (updateErr) {
        // eslint-disable-next-line no-console
        console.warn('[send-invoice] status update failed:', updateErr.message);
      }
    }

    return res.json({ success: true });
  } catch (err) {
    return handleError(res, err, 'Failed to send invoice', err.status || 500);
  }
});

// POST /api/admin/notify-work-order
app.post('/api/admin/notify-work-order', emailLimiter, verifyAdmin, async (req, res) => {
  try {
    const workOrderId = requireString(req.body && req.body.workOrderId, 'workOrderId');
    const event = requireString(req.body && req.body.event, 'event');
    if (!['scheduled', 'completed'].includes(event)) {
      return res.status(400).json({ success: false, error: 'event must be "scheduled" or "completed"' });
    }

    const { data: workOrder, error: woErr } = await supabase
      .from('work_orders')
      .select('id, work_order_number, description, scheduled_date, completed_at, address, notes, customer_id')
      .eq('id', workOrderId)
      .is('deleted_at', null)
      .single();
    if (woErr || !workOrder) {
      return res.status(404).json({ success: false, error: 'Work order not found' });
    }

    const { data: customer, error: customerErr } = await supabase
      .from('customers')
      .select('id, name, full_name, email')
      .eq('id', workOrder.customer_id)
      .single();
    if (customerErr || !customer || !customer.email) {
      return res.status(400).json({ success: false, error: 'Customer has no email on file' });
    }

    const templateName =
      event === 'scheduled' ? 'work-order-scheduled' : 'work-order-completed';

    const rendered = renderTemplate(templateName, {
      customerName: customer.name || customer.full_name || 'there',
      workOrderNumber: workOrder.work_order_number,
      workOrderId: workOrder.id,
      description: workOrder.description,
      scheduledDate: workOrder.scheduled_date,
      completedAt: workOrder.completed_at,
      address: workOrder.address,
      notes: workOrder.notes,
    });

    await sendEmail({
      to: customer.email,
      subject: rendered.subject,
      html: rendered.html,
      text: rendered.text,
    });

    return res.json({ success: true });
  } catch (err) {
    return handleError(res, err, 'Failed to notify work order', err.status || 500);
  }
});

// ---------------------------------------------------------------------------
// Dev-only template preview
// ---------------------------------------------------------------------------

if (NODE_ENV === 'development') {
  app.get('/debug/preview-email/:template', (req, res) => {
    try {
      const name = req.params.template;
      if (!templates[name]) {
        return res.status(404).send(`Unknown template: ${name}`);
      }

      const sampleData = {
        'quote-sent': {
          customerName: 'Sarah Johnson',
          quoteNumber: 'Q-1042',
          quoteId: 'sample-quote-uuid',
          title: 'Backyard fence install - 120 linear feet cedar privacy',
          total: 4850,
          validUntil: '2026-05-31',
        },
        'quote-revision-request': {
          quoteId: 'sample-quote-uuid',
          quoteNumber: 'Q-1042',
          projectTitle: 'Backyard fence install',
          customerName: 'Sarah Johnson',
          customerEmail: 'sarah@example.com',
          customerPhone: '(832) 555-0199',
          message:
            "Hi - could we drop the gate to a single 4ft pedestrian gate instead of double? Also hold off on the gravel path for now.",
        },
        'invoice-sent': {
          customerName: 'Sarah Johnson',
          invoiceNumber: 'INV-2045',
          invoiceId: 'sample-invoice-uuid',
          total: 4850,
          balanceDue: 2425,
          dueDate: '2026-05-15',
          notes: '50% deposit received 2026-04-14. Balance due on completion.',
        },
        'payment-received': {
          customerName: 'Sarah Johnson',
          invoiceNumber: 'INV-2045',
          amount: 2425,
          paymentMethod: 'ACH Transfer',
          paymentDate: '2026-04-18',
          remainingBalance: 0,
        },
        'work-order-scheduled': {
          customerName: 'Sarah Johnson',
          workOrderNumber: 'WO-3312',
          workOrderId: 'sample-wo-uuid',
          description: 'Install 120 LF cedar privacy fence, west property line',
          scheduledDate: '2026-04-29',
          address: '2114 Pine Ridge Dr, Conroe, TX',
          notes: 'Gate latch on north side. Park on driveway, no street parking.',
        },
        'work-order-completed': {
          customerName: 'Sarah Johnson',
          workOrderNumber: 'WO-3312',
          workOrderId: 'sample-wo-uuid',
          description: '120 LF cedar privacy fence',
          completedAt: '2026-04-30',
        },
        welcome: { customerName: 'Sarah Johnson' },
        'password-reset': {
          resetLink: 'https://customer.terracottaconstruction.com/reset?token=sample',
        },
      };

      const { subject, html } = renderTemplate(name, sampleData[name] || {});
      res.set('Content-Type', 'text/html; charset=utf-8');
      res.set('X-Email-Subject', subject);
      return res.send(html);
    } catch (err) {
      return res.status(500).send(`Preview error: ${err.message}`);
    }
  });
}

// ---------------------------------------------------------------------------
// Error handlers
// ---------------------------------------------------------------------------

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  // eslint-disable-next-line no-console
  console.error('[server] unhandled error:', err);
  res.status(err.status || 500).json({ error: err.message || 'Internal error' });
});

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`[customer-portal-server] v2.0.0 listening on port ${PORT} (${NODE_ENV})`);
});

module.exports = app;
