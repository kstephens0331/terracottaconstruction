// templates/work-order-completed.js
// Sent to customer when a work order is completed.
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
  return `Work complete - #${data.workOrderNumber || data.workOrderId || ''}`;
}

function build(data) {
  const {
    customerName = 'there',
    workOrderNumber = '',
    workOrderId = '',
    description = '',
    completedAt = '',
  } = data;

  const portalUrl = process.env.CUSTOMER_PORTAL_URL || 'https://customer.terracottaconstruction.com';
  const href = `${portalUrl}/work-orders`;

  const body =
    heading('The work is complete') +
    paragraph(
      `Hi ${escape(String(customerName).split(' ')[0] || 'there')}, your work order has been completed. Thank you for trusting Terracotta Construction with your project.`
    ) +
    `<div style="margin:20px 0 8px 0;padding:20px;background-color:#faf9f6;border-radius:8px;border:1px solid #ececec;">
      ${kvLine('Work Order', `#${workOrderNumber || workOrderId || '-'}`)}
      ${description ? kvLine('Description', description) : ''}
      ${completedAt ? kvLine('Completed', formatDate(completedAt)) : ''}
    </div>` +
    paragraph(
      'A final invoice and any applicable documentation (warranty, photos, maintenance notes) are attached if applicable and available in your portal. Please take a moment to review the work and reach out if anything needs attention - we stand behind our work.'
    ) +
    ctaButton('View Final Details', href) +
    paragraph(
      'If you were happy with our work, a Google review goes a long way for a small business. If anything fell short, reply to this email and we will make it right.'
    );

  const html = wrapBranded(body, {
    title: subject(data),
    previewText: `Your work order #${workOrderNumber || workOrderId} is complete.`,
  });

  const text =
    `Work complete - #${workOrderNumber || workOrderId}\n\n` +
    `Hi ${customerName},\n\n` +
    `Your work order is complete. Thank you for trusting Terracotta Construction.\n\n` +
    (description ? `Description: ${description}\n` : '') +
    (completedAt ? `Completed: ${formatDate(completedAt)}\n` : '') +
    `\nView final details: ${href}\n`;

  return { html, text };
}

module.exports = { subject, build };
