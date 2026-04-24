// templates/index.js
// Named registry for all email templates.
const quoteSent = require('./quote-sent');
const quoteRevisionRequest = require('./quote-revision-request');
const invoiceSent = require('./invoice-sent');
const paymentReceived = require('./payment-received');
const workOrderScheduled = require('./work-order-scheduled');
const workOrderCompleted = require('./work-order-completed');
const welcome = require('./welcome');
const passwordReset = require('./password-reset');

const templates = {
  'quote-sent': quoteSent,
  'quote-revision-request': quoteRevisionRequest,
  'invoice-sent': invoiceSent,
  'payment-received': paymentReceived,
  'work-order-scheduled': workOrderScheduled,
  'work-order-completed': workOrderCompleted,
  welcome,
  'password-reset': passwordReset,
};

function renderTemplate(name, data = {}) {
  const tpl = templates[name];
  if (!tpl) throw new Error(`Unknown email template: ${name}`);
  const subject = typeof tpl.subject === 'function' ? tpl.subject(data) : tpl.subject;
  const { html, text } = tpl.build(data);
  return { subject, html, text };
}

module.exports = { templates, renderTemplate };
