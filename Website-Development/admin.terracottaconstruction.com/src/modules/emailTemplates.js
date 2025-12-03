// src/modules/emailTemplates.js
// Email templates for customer communications

// Company info for templates
const COMPANY = {
  name: 'Terracotta Construction',
  phone: '(936) 955-4083',
  email: 'admin@terracottaconstruction.com',
  website: 'https://terracottaconstruction.com',
  address: '16724 E. Forrestal St, Montgomery, TX 77316'
};

// Base email template wrapper
function wrapTemplate(content) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #924C2E; color: white; padding: 20px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; }
    .content { padding: 20px; background-color: #ffffff; }
    .footer { background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666; }
    .button { display: inline-block; background-color: #924C2E; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 10px 0; }
    .button:hover { background-color: #7a3f28; }
    table { width: 100%; border-collapse: collapse; margin: 15px 0; }
    th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
    th { background-color: #f5f5f5; font-weight: bold; }
    .total-row { font-weight: bold; background-color: #f9f9f9; }
    .highlight { color: #924C2E; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${COMPANY.name}</h1>
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      <p><strong>${COMPANY.name}</strong></p>
      <p>${COMPANY.address}</p>
      <p>Phone: ${COMPANY.phone} | Email: ${COMPANY.email}</p>
      <p><a href="${COMPANY.website}">${COMPANY.website}</a></p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

// Format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

// Format date
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Quote sent template
export function quoteEmail(quote) {
  const lineItemsHtml = quote.line_items?.map(item => `
    <tr>
      <td>${item.description}</td>
      <td>${item.quantity}</td>
      <td>${formatCurrency(item.price)}</td>
      <td>${formatCurrency(item.quantity * item.price)}</td>
    </tr>
  `).join('') || '';

  const content = `
    <h2>Quote #${quote.quote_number || quote.id}</h2>
    <p>Dear ${quote.customer_name},</p>
    <p>Thank you for considering ${COMPANY.name} for your project. Please find your quote details below:</p>

    <table>
      <thead>
        <tr>
          <th>Description</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${lineItemsHtml}
        <tr class="total-row">
          <td colspan="3">Total</td>
          <td>${formatCurrency(quote.total)}</td>
        </tr>
      </tbody>
    </table>

    <p><strong>Valid Until:</strong> ${formatDate(quote.valid_until || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000))}</p>

    ${quote.notes ? `<p><strong>Notes:</strong> ${quote.notes}</p>` : ''}

    <p>To accept this quote, please reply to this email or call us at ${COMPANY.phone}.</p>

    <p>Thank you for your business!</p>
    <p>Best regards,<br>${COMPANY.name} Team</p>
  `;

  return {
    subject: `Quote #${quote.quote_number || quote.id} from ${COMPANY.name}`,
    html: wrapTemplate(content),
    text: `Quote #${quote.quote_number || quote.id}\n\nDear ${quote.customer_name},\n\nThank you for considering ${COMPANY.name}. Your quote total is ${formatCurrency(quote.total)}.\n\nPlease call us at ${COMPANY.phone} to accept this quote.\n\nBest regards,\n${COMPANY.name}`
  };
}

// Quote approved notification
export function quoteApprovedEmail(quote) {
  const content = `
    <h2>Quote Approved</h2>
    <p>Dear ${quote.customer_name},</p>
    <p>Great news! Your quote <span class="highlight">#${quote.quote_number || quote.id}</span> has been approved.</p>

    <p><strong>Quote Total:</strong> ${formatCurrency(quote.total)}</p>

    <p>Our team will be in contact shortly to schedule your project. If you have any questions, please don't hesitate to reach out.</p>

    <p>Thank you for choosing ${COMPANY.name}!</p>
    <p>Best regards,<br>${COMPANY.name} Team</p>
  `;

  return {
    subject: `Your Quote #${quote.quote_number || quote.id} Has Been Approved`,
    html: wrapTemplate(content),
    text: `Your quote #${quote.quote_number || quote.id} for ${formatCurrency(quote.total)} has been approved. We will contact you shortly to schedule your project.`
  };
}

// Invoice email
export function invoiceEmail(invoice) {
  const lineItemsHtml = invoice.line_items?.map(item => `
    <tr>
      <td>${item.description}</td>
      <td>${item.quantity}</td>
      <td>${formatCurrency(item.price)}</td>
      <td>${formatCurrency(item.quantity * item.price)}</td>
    </tr>
  `).join('') || '';

  const content = `
    <h2>Invoice #${invoice.invoice_number}</h2>
    <p>Dear ${invoice.customer_name},</p>
    <p>Please find your invoice details below:</p>

    <table>
      <thead>
        <tr>
          <th>Description</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${lineItemsHtml}
        <tr>
          <td colspan="3">Subtotal</td>
          <td>${formatCurrency(invoice.subtotal)}</td>
        </tr>
        ${invoice.tax_amount > 0 ? `
        <tr>
          <td colspan="3">Tax (${invoice.tax_rate}%)</td>
          <td>${formatCurrency(invoice.tax_amount)}</td>
        </tr>
        ` : ''}
        <tr class="total-row">
          <td colspan="3">Total Due</td>
          <td>${formatCurrency(invoice.total)}</td>
        </tr>
      </tbody>
    </table>

    <p><strong>Due Date:</strong> ${formatDate(invoice.due_date)}</p>
    ${invoice.amount_paid > 0 ? `<p><strong>Amount Paid:</strong> ${formatCurrency(invoice.amount_paid)}</p>` : ''}
    <p><strong>Balance Due:</strong> <span class="highlight">${formatCurrency(invoice.balance_due)}</span></p>

    ${invoice.notes ? `<p><strong>Notes:</strong> ${invoice.notes}</p>` : ''}

    <p>Please remit payment by the due date. If you have any questions about this invoice, please contact us.</p>

    <p>Thank you for your business!</p>
    <p>Best regards,<br>${COMPANY.name} Team</p>
  `;

  return {
    subject: `Invoice #${invoice.invoice_number} from ${COMPANY.name}`,
    html: wrapTemplate(content),
    text: `Invoice #${invoice.invoice_number}\n\nTotal Due: ${formatCurrency(invoice.balance_due)}\nDue Date: ${formatDate(invoice.due_date)}\n\nPlease contact us at ${COMPANY.phone} with any questions.`
  };
}

// Payment received confirmation
export function paymentReceivedEmail(invoice, payment) {
  const content = `
    <h2>Payment Received</h2>
    <p>Dear ${invoice.customer_name},</p>
    <p>We have received your payment. Thank you!</p>

    <p><strong>Invoice:</strong> #${invoice.invoice_number}</p>
    <p><strong>Payment Amount:</strong> ${formatCurrency(payment.amount)}</p>
    <p><strong>Payment Method:</strong> ${payment.payment_method}</p>
    <p><strong>Date:</strong> ${formatDate(payment.recorded_at)}</p>

    ${invoice.balance_due > 0 ? `
      <p><strong>Remaining Balance:</strong> ${formatCurrency(invoice.balance_due)}</p>
    ` : `
      <p class="highlight">Your invoice has been paid in full!</p>
    `}

    <p>Thank you for your prompt payment!</p>
    <p>Best regards,<br>${COMPANY.name} Team</p>
  `;

  return {
    subject: `Payment Received - Invoice #${invoice.invoice_number}`,
    html: wrapTemplate(content),
    text: `Payment of ${formatCurrency(payment.amount)} received for Invoice #${invoice.invoice_number}. ${invoice.balance_due > 0 ? `Remaining balance: ${formatCurrency(invoice.balance_due)}` : 'Paid in full!'}`
  };
}

// Work order scheduled notification
export function workOrderScheduledEmail(workOrder) {
  const content = `
    <h2>Work Order Scheduled</h2>
    <p>Dear ${workOrder.customer_name},</p>
    <p>Your work order has been scheduled:</p>

    <p><strong>Work Order:</strong> #${workOrder.work_order_number}</p>
    <p><strong>Scheduled Date:</strong> ${formatDate(workOrder.scheduled_date)}</p>
    <p><strong>Description:</strong> ${workOrder.description}</p>

    ${workOrder.notes ? `<p><strong>Notes:</strong> ${workOrder.notes}</p>` : ''}

    <p>Our team will arrive at the scheduled time. If you need to reschedule, please contact us at ${COMPANY.phone} as soon as possible.</p>

    <p>Thank you!</p>
    <p>Best regards,<br>${COMPANY.name} Team</p>
  `;

  return {
    subject: `Work Order #${workOrder.work_order_number} Scheduled for ${formatDate(workOrder.scheduled_date)}`,
    html: wrapTemplate(content),
    text: `Work Order #${workOrder.work_order_number} scheduled for ${formatDate(workOrder.scheduled_date)}. Call ${COMPANY.phone} to reschedule.`
  };
}

// Work order completed notification
export function workOrderCompletedEmail(workOrder) {
  const content = `
    <h2>Work Order Completed</h2>
    <p>Dear ${workOrder.customer_name},</p>
    <p>We're pleased to inform you that your work order has been completed:</p>

    <p><strong>Work Order:</strong> #${workOrder.work_order_number}</p>
    <p><strong>Description:</strong> ${workOrder.description}</p>
    <p><strong>Completed:</strong> ${formatDate(workOrder.completed_at)}</p>

    <p>We hope you're satisfied with our work. If you have any questions or concerns, please don't hesitate to contact us.</p>

    <p>We appreciate your business and look forward to serving you again!</p>
    <p>Best regards,<br>${COMPANY.name} Team</p>
  `;

  return {
    subject: `Work Order #${workOrder.work_order_number} Completed`,
    html: wrapTemplate(content),
    text: `Work Order #${workOrder.work_order_number} has been completed. Thank you for your business!`
  };
}

// Welcome email for new customers
export function welcomeEmail(customer) {
  const content = `
    <h2>Welcome to ${COMPANY.name}!</h2>
    <p>Dear ${customer.name},</p>
    <p>Thank you for choosing ${COMPANY.name}! We're excited to have you as a customer.</p>

    <p><strong>Your Account Number:</strong> ${customer.account_number}</p>

    <p>At ${COMPANY.name}, we pride ourselves on quality workmanship and exceptional customer service. Whether you need landscaping, fencing, handyman services, or custom construction projects, we're here to help.</p>

    <p><strong>How to reach us:</strong></p>
    <ul>
      <li>Phone: ${COMPANY.phone}</li>
      <li>Email: ${COMPANY.email}</li>
      <li>Website: ${COMPANY.website}</li>
    </ul>

    <p>We look forward to working with you!</p>
    <p>Best regards,<br>${COMPANY.name} Team</p>
  `;

  return {
    subject: `Welcome to ${COMPANY.name}!`,
    html: wrapTemplate(content),
    text: `Welcome to ${COMPANY.name}! Your account number is ${customer.account_number}. Contact us at ${COMPANY.phone} for any of your construction needs.`
  };
}

export default {
  quoteEmail,
  quoteApprovedEmail,
  invoiceEmail,
  paymentReceivedEmail,
  workOrderScheduledEmail,
  workOrderCompletedEmail,
  welcomeEmail,
  COMPANY
};
