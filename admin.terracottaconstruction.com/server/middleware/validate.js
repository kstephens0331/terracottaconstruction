// server/middleware/validate.js

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex (US format)
const PHONE_REGEX = /^[\d\s\-\(\)\+\.]{10,20}$/;

// Sanitize string input
const sanitize = (str) => {
  if (typeof str !== 'string') return str;
  return str
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .trim();
};

// Validate quote creation
export const validateQuote = (req, res, next) => {
  const { customerName, customerEmail, quoteItems, total } = req.body;
  const errors = [];

  if (!customerName || typeof customerName !== 'string' || customerName.trim().length < 2) {
    errors.push('Customer name is required (minimum 2 characters)');
  }

  if (!customerEmail || !EMAIL_REGEX.test(customerEmail)) {
    errors.push('Valid customer email is required');
  }

  if (!quoteItems || !Array.isArray(quoteItems) || quoteItems.length === 0) {
    errors.push('At least one quote item is required');
  } else {
    quoteItems.forEach((item, index) => {
      if (!item.description || item.description.trim().length < 2) {
        errors.push(`Item ${index + 1}: Description is required`);
      }
      if (typeof item.quantity !== 'number' || item.quantity <= 0) {
        errors.push(`Item ${index + 1}: Valid quantity is required`);
      }
      if (typeof item.cost !== 'number' || item.cost < 0) {
        errors.push(`Item ${index + 1}: Valid cost is required`);
      }
      if (typeof item.price !== 'number' || item.price < 0) {
        errors.push(`Item ${index + 1}: Valid price is required`);
      }
    });
  }

  if (typeof total !== 'number' || total < 0) {
    errors.push('Valid total is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  // Sanitize inputs
  req.body.customerName = sanitize(customerName);
  req.body.customerEmail = customerEmail.toLowerCase().trim();
  req.body.quoteItems = quoteItems.map(item => ({
    ...item,
    description: sanitize(item.description)
  }));

  next();
};

// Validate customer creation
export const validateCustomer = (req, res, next) => {
  const { name, email, phone, address } = req.body;
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push('Customer name is required (minimum 2 characters)');
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    errors.push('Valid email is required');
  }

  if (phone && !PHONE_REGEX.test(phone)) {
    errors.push('Invalid phone number format');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  // Sanitize inputs
  req.body.name = sanitize(name);
  req.body.email = email.toLowerCase().trim();
  if (phone) req.body.phone = phone.replace(/[^\d\-\(\)\+\s]/g, '');
  if (address) req.body.address = sanitize(address);

  next();
};

// Validate work order creation
export const validateWorkOrder = (req, res, next) => {
  const { customer_name, customer_email, description, scheduled_date } = req.body;
  const errors = [];

  if (!customer_name || typeof customer_name !== 'string' || customer_name.trim().length < 2) {
    errors.push('Customer name is required (minimum 2 characters)');
  }

  if (!customer_email || !EMAIL_REGEX.test(customer_email)) {
    errors.push('Valid customer email is required');
  }

  if (!description || typeof description !== 'string' || description.trim().length < 10) {
    errors.push('Description is required (minimum 10 characters)');
  }

  if (scheduled_date && isNaN(Date.parse(scheduled_date))) {
    errors.push('Invalid scheduled date format');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  // Sanitize inputs
  req.body.customer_name = sanitize(customer_name);
  req.body.customer_email = customer_email.toLowerCase().trim();
  req.body.description = sanitize(description);

  next();
};

// Validate status update
export const validateStatus = (validStatuses) => {
  return (req, res, next) => {
    const { status } = req.body;

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    next();
  };
};

// Validate invoice creation
export const validateInvoice = (req, res, next) => {
  const { quote_id, due_date, notes } = req.body;
  const errors = [];

  if (!quote_id || typeof quote_id !== 'string') {
    errors.push('Quote ID is required');
  }

  if (due_date && isNaN(Date.parse(due_date))) {
    errors.push('Invalid due date format');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  if (notes) req.body.notes = sanitize(notes);

  next();
};

export default {
  validateQuote,
  validateCustomer,
  validateWorkOrder,
  validateStatus,
  validateInvoice
};
