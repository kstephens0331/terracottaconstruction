// templates/password-reset.js
// Not sent by this backend. This HTML is intended to be pasted into the
// Supabase Auth > Email Templates > Reset Password UI so reset emails match
// the Terracotta Construction brand. Supabase provides a {{ .ConfirmationURL }}
// variable at send time - that is represented here as the `resetLink` data key
// when rendered locally; in Supabase you would replace `{{RESET_LINK}}` with
// `{{ .ConfirmationURL }}`.
const {
  wrapBranded,
  heading,
  paragraph,
  ctaButton,
  escape,
} = require('../email');

function subject() {
  return 'Reset your Terracotta Construction password';
}

function build(data) {
  const { resetLink = '{{RESET_LINK}}' } = data;

  const body =
    heading('Reset your password') +
    paragraph(
      'We received a request to reset the password for your Terracotta Construction customer portal. If that was you, click the button below. The link will expire shortly for your security.'
    ) +
    ctaButton('Reset Password', resetLink) +
    paragraph(
      'If the button does not work, copy and paste this link into your browser:'
    ) +
    `<div style="margin:0 0 16px 0;padding:12px 16px;background-color:#f9fafb;border-radius:6px;border:1px solid #e5e7eb;font-family:monospace;font-size:13px;word-break:break-all;color:#4a4a4a;">${escape(resetLink)}</div>` +
    paragraph(
      'If you did not request a password reset, you can safely ignore this email - your password will not change.'
    );

  const html = wrapBranded(body, {
    title: subject(),
    previewText: 'Reset your Terracotta Construction password.',
  });

  const text =
    `Reset your password\n\n` +
    `We received a request to reset the password for your Terracotta Construction customer portal.\n\n` +
    `Reset link: ${resetLink}\n\n` +
    `If you did not request this, you can ignore this email.\n`;

  return { html, text };
}

module.exports = { subject, build };
