// lib/email.js
// Branded email shell + Resend send adapter.
const { Resend } = require('resend');

const COMPANY = {
  name: 'Terracotta Construction',
  phonePrimary: '(936) 955-4083',
  phoneAlt: '(832) 288-0258',
  email: 'terracottaconstruction1@gmail.com',
  address: '16724 E. Forrestal St, Montgomery, TX 77316',
  hours: 'Mon-Fri 7AM-6PM | Sat 8AM-2PM',
  publicSite: 'https://terracottaconstruction.com',
  stephensCode: 'https://stephenscode.dev',
};

// Hex tokens pulled from the SEO brand palette.
const BRAND = {
  terracotta: '#924C2E',
  terracottaDark: '#7a3f28',
  charcoal: '#333333',
  body: '#4a4a4a',
  footerBg: '#1f2937',
  pageBg: '#f5f5f5',
  cardBg: '#ffffff',
  muted: '#9ca3af',
  accent: '#C1440E',
};

const FONT_STACK =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

const LOGO_URL = 'https://terracottaconstruction.com/logo-white.png';

function escape(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatCurrency(amount) {
  const num = Number(amount || 0);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(num);
}

function formatDate(value) {
  if (!value) return '';
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Wraps inner content HTML in the branded shell. Returns full HTML document.
function wrapBranded(contentHtml, options = {}) {
  const previewText = options.previewText || '';
  const currentYear = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="color-scheme" content="light only" />
<meta name="supported-color-schemes" content="light" />
<title>${escape(options.title || COMPANY.name)}</title>
<style>
  body { margin: 0; padding: 0; background-color: ${BRAND.pageBg}; font-family: ${FONT_STACK}; -webkit-font-smoothing: antialiased; }
  table { border-collapse: collapse; }
  img { border: 0; display: block; outline: none; text-decoration: none; max-width: 100%; }
  a { color: ${BRAND.terracotta}; }
  .btn:hover { background-color: ${BRAND.terracottaDark} !important; }
  @media (max-width: 600px) {
    .tc-card { padding: 28px 20px !important; }
    .tc-header { padding: 24px 20px !important; }
    .tc-footer { padding: 24px 20px !important; }
    .tc-h1 { font-size: 20px !important; }
    .tc-wordmark { font-size: 20px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background-color:${BRAND.pageBg};font-family:${FONT_STACK};">
  <span style="display:none !important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden;mso-hide:all;">${escape(previewText)}</span>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${BRAND.pageBg};">
    <tr>
      <td align="center" style="padding: 24px 12px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

          <!-- Header band -->
          <tr>
            <td class="tc-header" align="center" style="background-color:${BRAND.terracotta};padding:32px;border-radius:12px 12px 0 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
                <tr>
                  <td align="center">
                    <img src="${LOGO_URL}" alt="${escape(COMPANY.name)}" width="56" height="56" style="display:block;margin:0 auto 12px auto;width:56px;height:56px;" />
                    <div class="tc-wordmark" style="font-family:${FONT_STACK};font-size:24px;font-weight:700;color:#ffffff;letter-spacing:0.5px;line-height:1.2;">
                      ${escape(COMPANY.name)}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main content card -->
          <tr>
            <td class="tc-card" style="background-color:${BRAND.cardBg};padding:40px 32px;border-radius:0 0 12px 12px;box-shadow:0 2px 8px rgba(0,0,0,0.04);color:${BRAND.body};font-family:${FONT_STACK};font-size:16px;line-height:1.6;">
              ${contentHtml}
            </td>
          </tr>

          <!-- Spacer -->
          <tr><td style="height:24px;line-height:24px;font-size:0;">&nbsp;</td></tr>

          <!-- Footer block -->
          <tr>
            <td class="tc-footer" align="center" style="background-color:${BRAND.footerBg};color:#ffffff;padding:32px;border-radius:12px;font-family:${FONT_STACK};font-size:14px;line-height:1.6;">
              <div style="font-weight:700;font-size:16px;margin-bottom:8px;">${escape(COMPANY.name)}</div>
              <div style="color:#d1d5db;">${escape(COMPANY.address)}</div>
              <div style="color:#d1d5db;">${escape(COMPANY.phonePrimary)} &middot; ${escape(COMPANY.phoneAlt)}</div>
              <div style="color:#d1d5db;">
                <a href="mailto:${COMPANY.email}" style="color:#ffffff;text-decoration:underline;">${escape(COMPANY.email)}</a>
              </div>
              <div style="color:#d1d5db;margin-top:4px;">${escape(COMPANY.hours)}</div>
              <div style="margin-top:16px;display:inline-block;padding:4px 12px;border:1px solid rgba(255,255,255,0.25);border-radius:999px;font-size:12px;color:#e5e7eb;letter-spacing:0.4px;">
                Licensed &amp; Insured
              </div>
              <div style="margin-top:20px;font-size:12px;color:#9ca3af;">
                &copy; ${currentYear} ${escape(COMPANY.name)}. All rights reserved.
              </div>
              <div style="margin-top:6px;font-size:12px;color:#9ca3af;">
                Built by <a href="${COMPANY.stephensCode}" style="color:${BRAND.accent};text-decoration:none;">StephensCode LLC</a>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// Primary CTA button - returns inline HTML for a centered button.
function ctaButton(label, href) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:24px auto;">
  <tr>
    <td align="center" bgcolor="${BRAND.terracotta}" style="background-color:${BRAND.terracotta};border-radius:8px;">
      <a class="btn" href="${escape(href)}" style="display:inline-block;padding:14px 32px;font-family:${FONT_STACK};font-size:16px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:8px;background-color:${BRAND.terracotta};">
        ${escape(label)}
      </a>
    </td>
  </tr>
</table>`;
}

// Heading for main content card.
function heading(text) {
  return `<h1 class="tc-h1" style="margin:0 0 16px 0;font-family:${FONT_STACK};font-size:24px;font-weight:700;color:${BRAND.charcoal};line-height:1.3;">${escape(text)}</h1>`;
}

// Paragraph helper. `html` param is pre-escaped/allowed HTML.
function paragraph(html) {
  return `<p style="margin:0 0 16px 0;font-family:${FONT_STACK};font-size:16px;line-height:1.6;color:${BRAND.body};">${html}</p>`;
}

// Label/value line for receipts.
function kvLine(label, value) {
  return `<div style="margin:0 0 8px 0;font-family:${FONT_STACK};font-size:15px;line-height:1.5;color:${BRAND.body};">
    <span style="font-weight:600;color:${BRAND.charcoal};">${escape(label)}:</span>
    <span style="color:${BRAND.body};">&nbsp;${escape(value)}</span>
  </div>`;
}

// Quote/message blockquote for revision-request displays.
function quoteBlock(text) {
  return `<div style="margin:16px 0;padding:16px 20px;background-color:#f9fafb;border-left:4px solid ${BRAND.terracotta};border-radius:4px;font-family:${FONT_STACK};font-size:15px;color:${BRAND.body};line-height:1.6;white-space:pre-wrap;">${escape(text)}</div>`;
}

// Basic HTML -> plain text fallback.
function htmlToText(html) {
  return String(html)
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|h[1-6]|li|tr)>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function textFooter() {
  return (
    `\n\n---\n` +
    `${COMPANY.name}\n` +
    `${COMPANY.address}\n` +
    `${COMPANY.phonePrimary} | ${COMPANY.phoneAlt}\n` +
    `${COMPANY.email}\n` +
    `${COMPANY.hours}\n` +
    `Licensed & Insured\n` +
    `${COMPANY.publicSite}\n`
  );
}

// Send via Resend.
let _resendClient = null;
function getResend() {
  if (_resendClient) return _resendClient;
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error('RESEND_API_KEY is not set');
  }
  _resendClient = new Resend(key);
  return _resendClient;
}

async function sendEmail({ to, subject, html, text, replyTo }) {
  if (!to) throw new Error('sendEmail: "to" is required');
  if (!subject) throw new Error('sendEmail: "subject" is required');
  if (!html) throw new Error('sendEmail: "html" is required');

  const from =
    process.env.RESEND_FROM_EMAIL ||
    'Terracotta Construction <quotes@terracottaconstruction.com>';

  const payload = {
    from,
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
    text: text || htmlToText(html) + textFooter(),
  };
  if (replyTo) payload.reply_to = replyTo;

  const resend = getResend();
  const { data, error } = await resend.emails.send(payload);
  if (error) {
    const msg = (error && error.message) || 'Resend send failed';
    const err = new Error(msg);
    err.cause = error;
    throw err;
  }
  return data;
}

module.exports = {
  COMPANY,
  BRAND,
  FONT_STACK,
  LOGO_URL,
  wrapBranded,
  ctaButton,
  heading,
  paragraph,
  kvLine,
  quoteBlock,
  htmlToText,
  textFooter,
  sendEmail,
  formatCurrency,
  formatDate,
  escape,
};
