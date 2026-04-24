// templates/invoice-sent.js
// Sent to customer when an invoice is delivered.
const {
  wrapBranded,
  heading,
  paragraph,
  ctaButton,
  kvLine,
  escape,
  formatCurrency,
  formatDate,
} = require('../email');

function subject(data) {
  return `Invoice #${data.invoiceNumber || data.invoiceId || ''} from Terracotta Construction`;
}

function build(data) {
  const {
    customerName = 'there',
    invoiceNumber = '',
    invoiceId = '',
    total = 0,
    balanceDue,
    dueDate = '',
    notes = '',
  } = data;

  const portalUrl = process.env.CUSTOMER_PORTAL_URL || 'https://customer.terracottaconstruction.com';
  const href = `${portalUrl}`;
  const amountToShow = balanceDue !== undefined && balanceDue !== null ? balanceDue : total;

  const body =
    heading(`Invoice #${invoiceNumber || invoiceId || ''}`) +
    paragraph(
      `Hi ${escape(String(customerName).split(' ')[0] || 'there')}, your invoice from Terracotta Construction is ready.`
    ) +
    `<div style="margin:20px 0 8px 0;padding:20px;background-color:#faf9f6;border-radius:8px;border:1px solid #ececec;">
      ${kvLine('Invoice Number', invoiceNumber || invoiceId || '-')}
      ${kvLine('Amount Due', formatCurrency(amountToShow))}
      ${dueDate ? kvLine('Due Date', formatDate(dueDate)) : ''}
    </div>` +
    (notes ? paragraph(`<strong>Notes:</strong> ${escape(notes)}`) : '') +
    paragraph(
      'Please remit payment by the due date. If you have any questions about this invoice, reply to this email or call us at <a href="tel:+19369554083" style="color:#924C2E;text-decoration:underline;">(936) 955-4083</a>.'
    ) +
    ctaButton('View Invoice', href) +
    paragraph('Thank you for your business.');

  const html = wrapBranded(body, {
    title: subject(data),
    previewText: `Invoice #${invoiceNumber || invoiceId}: ${formatCurrency(amountToShow)} due ${formatDate(dueDate)}`,
  });

  const text =
    `Invoice #${invoiceNumber || invoiceId}\n\n` +
    `Hi ${customerName},\n\n` +
    `Amount Due: ${formatCurrency(amountToShow)}\n` +
    (dueDate ? `Due Date: ${formatDate(dueDate)}\n` : '') +
    (notes ? `\nNotes: ${notes}\n` : '') +
    `\nView in portal: ${href}\n\n` +
    `Questions? Call (936) 955-4083.\n`;

  return { html, text };
}

module.exports = { subject, build };
