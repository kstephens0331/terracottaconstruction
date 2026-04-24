// templates/work-order-scheduled.js
// Sent to customer when a work order is scheduled.
const {
  wrapBranded,
  heading,
  paragraph,
  ctaButton,
  kvLine,
  escape,
  formatDate,
} = require('../email');

function subject(data) {
  return `Work order scheduled - #${data.workOrderNumber || data.workOrderId || ''}`;
}

function build(data) {
  const {
    customerName = 'there',
    workOrderNumber = '',
    workOrderId = '',
    description = '',
    scheduledDate = '',
    address = '',
    notes = '',
  } = data;

  const portalUrl = process.env.CUSTOMER_PORTAL_URL || 'https://customer.terracottaconstruction.com';
  const href = `${portalUrl}/work-orders`;

  const body =
    heading('Your work order is scheduled') +
    paragraph(
      `Hi ${escape(String(customerName).split(' ')[0] || 'there')}, your work order has been scheduled. Details below.`
    ) +
    `<div style="margin:20px 0 8px 0;padding:20px;background-color:#faf9f6;border-radius:8px;border:1px solid #ececec;">
      ${kvLine('Work Order', `#${workOrderNumber || workOrderId || '-'}`)}
      ${scheduledDate ? kvLine('Scheduled For', formatDate(scheduledDate)) : ''}
      ${description ? kvLine('Description', description) : ''}
      ${address ? kvLine('Location', address) : ''}
    </div>` +
    (notes ? paragraph(`<strong>Notes:</strong> ${escape(notes)}`) : '') +
    paragraph(
      'Our crew will arrive at the scheduled time. If you need to reschedule or update access instructions, call us at <a href="tel:+19369554083" style="color:#924C2E;text-decoration:underline;">(936) 955-4083</a> as soon as possible.'
    ) +
    ctaButton('View Work Order', href);

  const html = wrapBranded(body, {
    title: subject(data),
    previewText: `Work order #${workOrderNumber || workOrderId} scheduled for ${formatDate(scheduledDate)}`,
  });

  const text =
    `Work order scheduled - #${workOrderNumber || workOrderId}\n\n` +
    `Hi ${customerName},\n\n` +
    (scheduledDate ? `Scheduled For: ${formatDate(scheduledDate)}\n` : '') +
    (description ? `Description: ${description}\n` : '') +
    (address ? `Location: ${address}\n` : '') +
    (notes ? `\nNotes: ${notes}\n` : '') +
    `\nView in portal: ${href}\n\n` +
    `Call (936) 955-4083 to reschedule.\n`;

  return { html, text };
}

module.exports = { subject, build };
