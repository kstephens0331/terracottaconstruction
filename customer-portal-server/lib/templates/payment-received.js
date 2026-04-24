// templates/payment-received.js
// Sent to customer when a payment is recorded. Receipt-style, no CTA.
const {
  wrapBranded,
  heading,
  paragraph,
  kvLine,
  escape,
  formatCurrency,
  formatDate,
} = require('../email');

function subject() {
  return 'Payment received - thank you';
}

function build(data) {
  const {
    customerName = 'there',
    invoiceNumber = '',
    amount = 0,
    paymentMethod = '',
    paymentDate = '',
    remainingBalance,
  } = data;

  const paidInFull =
    remainingBalance === undefined || remainingBalance === null || Number(remainingBalance) <= 0;

  const body =
    heading('Payment received') +
    paragraph(
      `Hi ${escape(String(customerName).split(' ')[0] || 'there')}, we have received your payment and applied it to your account. Thank you.`
    ) +
    `<div style="margin:20px 0 8px 0;padding:20px;background-color:#faf9f6;border-radius:8px;border:1px solid #ececec;">
      ${invoiceNumber ? kvLine('Invoice', `#${invoiceNumber}`) : ''}
      ${kvLine('Amount Received', formatCurrency(amount))}
      ${paymentMethod ? kvLine('Method', paymentMethod) : ''}
      ${paymentDate ? kvLine('Date', formatDate(paymentDate)) : ''}
      ${
        paidInFull
          ? `<div style="margin-top:12px;padding:10px 14px;background-color:#ecfdf5;border-radius:6px;border:1px solid #a7f3d0;color:#065f46;font-weight:600;font-size:14px;">Paid in full. Thank you.</div>`
          : kvLine('Remaining Balance', formatCurrency(remainingBalance))
      }
    </div>` +
    paragraph(
      'This email serves as your receipt. If you need a formal copy, reply to this email and we will send one over.'
    ) +
    paragraph('We appreciate your business.');

  const html = wrapBranded(body, {
    title: subject(),
    previewText: `Receipt: ${formatCurrency(amount)} applied to invoice #${invoiceNumber}`,
  });

  const text =
    `Payment received - thank you\n\n` +
    `Hi ${customerName},\n\n` +
    (invoiceNumber ? `Invoice: #${invoiceNumber}\n` : '') +
    `Amount Received: ${formatCurrency(amount)}\n` +
    (paymentMethod ? `Method: ${paymentMethod}\n` : '') +
    (paymentDate ? `Date: ${formatDate(paymentDate)}\n` : '') +
    (paidInFull
      ? `\nPaid in full. Thank you.\n`
      : `Remaining Balance: ${formatCurrency(remainingBalance)}\n`) +
    `\nThis email serves as your receipt.\n`;

  return { html, text };
}

module.exports = { subject, build };
