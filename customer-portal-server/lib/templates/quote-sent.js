// templates/quote-sent.js
// Sent to customer when a quote is delivered.
const {
  wrapBranded,
  heading,
  paragraph,
  ctaButton,
  kvLine,
  escape,
  formatCurrency,
} = require('../email');

function subject(data) {
  const number = data.quoteNumber || data.quoteId || 'Quote';
  return `Your Quote from Terracotta Construction - #${number}`;
}

function build(data) {
  const {
    customerName = 'there',
    quoteNumber = '',
    quoteId = '',
    title = 'your project',
    total = 0,
    validUntil = '',
  } = data;

  const portalUrl = process.env.CUSTOMER_PORTAL_URL || 'https://customer.terracottaconstruction.com';
  const href = `${portalUrl}/quotes${quoteId ? `?highlight=${encodeURIComponent(quoteId)}` : ''}`;

  const body =
    heading(`Your quote is ready, ${String(customerName).split(' ')[0] || 'there'}`) +
    paragraph(
      `Thank you for choosing <strong>Terracotta Construction</strong>. We have prepared your quote for <strong>${escape(title)}</strong> and it is ready for your review.`
    ) +
    `<div style="margin:20px 0 8px 0;padding:20px;background-color:#faf9f6;border-radius:8px;border:1px solid #ececec;">
      ${kvLine('Quote Number', quoteNumber || quoteId || '-')}
      ${kvLine('Project', title)}
      ${kvLine('Total', formatCurrency(total))}
      ${validUntil ? kvLine('Valid Until', validUntil) : ''}
    </div>` +
    paragraph(
      'You can view the full details, line items, and download a PDF copy from your customer portal. If anything looks off or you would like changes, use the "Request Revision" button in the portal and we will get right on it.'
    ) +
    ctaButton('View Your Quote', href) +
    paragraph(
      'Questions? Call us at <a href="tel:+19369554083" style="color:#924C2E;text-decoration:underline;">(936) 955-4083</a> or reply to this email directly.'
    );

  const html = wrapBranded(body, {
    title: subject(data),
    previewText: `Your quote for ${title} is ready to view.`,
  });

  const text =
    `Hi ${customerName},\n\n` +
    `Your quote from Terracotta Construction is ready.\n\n` +
    `Quote Number: ${quoteNumber || quoteId || '-'}\n` +
    `Project: ${title}\n` +
    `Total: ${formatCurrency(total)}\n` +
    (validUntil ? `Valid Until: ${validUntil}\n` : '') +
    `\nView it in your portal: ${href}\n\n` +
    `Questions? Call (936) 955-4083 or reply to this email.\n`;

  return { html, text };
}

module.exports = { subject, build };
