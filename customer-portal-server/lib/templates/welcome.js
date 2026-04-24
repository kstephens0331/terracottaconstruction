// templates/welcome.js
// Sent to customer on registration.
const {
  wrapBranded,
  heading,
  paragraph,
  ctaButton,
  escape,
} = require('../email');

function subject() {
  return 'Welcome to Terracotta Construction';
}

function build(data) {
  const { customerName = 'there' } = data;
  const portalUrl = process.env.CUSTOMER_PORTAL_URL || 'https://customer.terracottaconstruction.com';
  const href = `${portalUrl}/login`;

  const body =
    heading(`Welcome aboard, ${String(customerName).split(' ')[0] || 'there'}`) +
    paragraph(
      `Thank you for creating an account with <strong>Terracotta Construction</strong>. Your customer portal is where you will find quotes, invoices, and work-order updates for every project we do together.`
    ) +
    paragraph('In your portal you can:') +
    `<ul style="margin:0 0 16px 20px;padding:0;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;font-size:16px;line-height:1.7;color:#4a4a4a;">
      <li>Review and download quotes as PDFs</li>
      <li>Request revisions on any quote directly from the portal</li>
      <li>Track the status of scheduled and completed work orders</li>
      <li>Submit new work requests any time, day or night</li>
      <li>Update your contact info and language preference</li>
    </ul>` +
    ctaButton('Log In to Your Portal', href) +
    paragraph(
      'If you ever need a hand, reply to this email or call us at <a href="tel:+19369554083" style="color:#924C2E;text-decoration:underline;">(936) 955-4083</a>. We are glad to have you.'
    ) +
    paragraph('Kat &amp; the Terracotta Construction team');

  const html = wrapBranded(body, {
    title: subject(),
    previewText: 'Welcome to Terracotta Construction. Your portal is ready.',
  });

  const text =
    `Welcome to Terracotta Construction\n\n` +
    `Hi ${customerName},\n\n` +
    `Thank you for creating an account. Your customer portal is where you will find quotes, invoices, and work-order updates.\n\n` +
    `In your portal you can:\n` +
    `- Review and download quotes as PDFs\n` +
    `- Request revisions on any quote\n` +
    `- Track scheduled and completed work orders\n` +
    `- Submit new work requests\n` +
    `- Update your contact info\n\n` +
    `Log in: ${href}\n\n` +
    `Questions? Reply to this email or call (936) 955-4083.\n`;

  return { html, text };
}

module.exports = { subject, build };
