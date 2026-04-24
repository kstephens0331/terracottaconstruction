// templates/quote-revision-request.js
// Sent to admin when a customer requests a revision from the customer portal.
const {
  wrapBranded,
  heading,
  paragraph,
  ctaButton,
  kvLine,
  quoteBlock,
  escape,
} = require('../email');

function subject(data) {
  const number = data.quoteNumber || data.quoteId || '';
  return `Revision requested on Quote #${number}`;
}

function build(data) {
  const {
    quoteId = '',
    quoteNumber = '',
    customerName = 'A customer',
    customerEmail = '',
    customerPhone = '',
    message = '',
    projectTitle = '',
  } = data;

  const adminUrl = process.env.ADMIN_PORTAL_URL || 'https://admin.terracottaconstruction.com';
  const href = `${adminUrl}/quotes/${encodeURIComponent(quoteId)}`;

  const body =
    heading('Revision requested') +
    paragraph(
      `<strong>${escape(customerName)}</strong> has requested a revision on a quote. Details below.`
    ) +
    `<div style="margin:20px 0 8px 0;padding:20px;background-color:#faf9f6;border-radius:8px;border:1px solid #ececec;">
      ${kvLine('Quote Number', quoteNumber || quoteId || '-')}
      ${projectTitle ? kvLine('Project', projectTitle) : ''}
      ${kvLine('Customer', customerName)}
      ${customerEmail ? kvLine('Email', customerEmail) : ''}
      ${customerPhone ? kvLine('Phone', customerPhone) : ''}
    </div>` +
    paragraph('<strong>Customer message:</strong>') +
    quoteBlock(message || '(no message provided)') +
    ctaButton('Open in Admin Portal', href) +
    paragraph(
      'This quote has been marked as <strong>Revision Requested</strong> in the admin portal. Update it and resend when ready.'
    );

  const html = wrapBranded(body, {
    title: subject(data),
    previewText: `Revision request from ${customerName}`,
  });

  const text =
    `Revision requested on Quote #${quoteNumber || quoteId}\n\n` +
    `Customer: ${customerName}\n` +
    (customerEmail ? `Email: ${customerEmail}\n` : '') +
    (customerPhone ? `Phone: ${customerPhone}\n` : '') +
    (projectTitle ? `Project: ${projectTitle}\n` : '') +
    `\nMessage:\n${message || '(no message provided)'}\n\n` +
    `Open in admin: ${href}\n`;

  return { html, text };
}

module.exports = { subject, build };
