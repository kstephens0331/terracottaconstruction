// src/modules/notificationUtils.js
// Toast notification utilities for the admin portal

// Notification types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

// Default durations (ms)
export const DURATIONS = {
  short: 3000,
  medium: 5000,
  long: 8000,
  persistent: 0 // Must be manually dismissed
};

// Notification store (simple state management)
let notifications = [];
let listeners = [];
let nextId = 1;

// Subscribe to notification changes
export function subscribe(listener) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter(l => l !== listener);
  };
}

// Notify all listeners
function notifyListeners() {
  listeners.forEach(listener => listener([...notifications]));
}

// Add a notification
export function addNotification(options) {
  const notification = {
    id: nextId++,
    type: options.type || NOTIFICATION_TYPES.INFO,
    title: options.title || '',
    message: options.message || '',
    duration: options.duration ?? DURATIONS.medium,
    dismissible: options.dismissible ?? true,
    action: options.action || null,
    timestamp: Date.now()
  };

  notifications = [...notifications, notification];
  notifyListeners();

  // Auto-dismiss if duration is set
  if (notification.duration > 0) {
    setTimeout(() => {
      removeNotification(notification.id);
    }, notification.duration);
  }

  return notification.id;
}

// Remove a notification
export function removeNotification(id) {
  notifications = notifications.filter(n => n.id !== id);
  notifyListeners();
}

// Clear all notifications
export function clearAllNotifications() {
  notifications = [];
  notifyListeners();
}

// Get current notifications
export function getNotifications() {
  return [...notifications];
}

// Convenience methods for common notification types
export function success(message, options = {}) {
  return addNotification({
    type: NOTIFICATION_TYPES.SUCCESS,
    message,
    ...options
  });
}

export function error(message, options = {}) {
  return addNotification({
    type: NOTIFICATION_TYPES.ERROR,
    message,
    duration: DURATIONS.long,
    ...options
  });
}

export function warning(message, options = {}) {
  return addNotification({
    type: NOTIFICATION_TYPES.WARNING,
    message,
    ...options
  });
}

export function info(message, options = {}) {
  return addNotification({
    type: NOTIFICATION_TYPES.INFO,
    message,
    ...options
  });
}

// Pre-defined notification messages
export const messages = {
  // CRUD operations
  created: (item) => success(`${item} created successfully`),
  updated: (item) => success(`${item} updated successfully`),
  deleted: (item) => success(`${item} deleted successfully`),
  saved: () => success('Changes saved successfully'),

  // Status changes
  statusUpdated: (status) => success(`Status updated to ${status}`),

  // Quotes
  quoteSent: (number) => success(`Quote ${number} sent successfully`),
  quoteApproved: (number) => success(`Quote ${number} approved`),
  quoteRejected: (number) => warning(`Quote ${number} rejected`),

  // Invoices
  invoiceCreated: (number) => success(`Invoice ${number} created`),
  invoiceSent: (number) => success(`Invoice ${number} sent successfully`),
  paymentRecorded: (amount) => success(`Payment of ${amount} recorded`),

  // Work orders
  workOrderCreated: (number) => success(`Work Order ${number} created`),
  workOrderScheduled: (date) => success(`Work order scheduled for ${date}`),
  workOrderCompleted: (number) => success(`Work Order ${number} completed`),

  // Customers
  customerAdded: (name) => success(`Customer ${name} added`),

  // Errors
  fetchError: (item) => error(`Failed to fetch ${item}. Please try again.`),
  saveError: (item) => error(`Failed to save ${item}. Please try again.`),
  deleteError: (item) => error(`Failed to delete ${item}. Please try again.`),
  validationError: (message) => error(message || 'Please check your input and try again.'),
  networkError: () => error('Network error. Please check your connection.'),
  authError: () => error('Authentication failed. Please log in again.'),
  permissionError: () => error('You do not have permission to perform this action.'),

  // Warnings
  unsavedChanges: () => warning('You have unsaved changes'),
  lowMargin: (margin) => warning(`Margin of ${margin}% is below minimum threshold`),
  overdue: (item) => warning(`${item} is overdue`),

  // Info
  loading: (item) => info(`Loading ${item}...`, { duration: DURATIONS.short }),
  processing: () => info('Processing...', { duration: DURATIONS.short }),
  noResults: () => info('No results found'),
  copied: () => info('Copied to clipboard', { duration: DURATIONS.short })
};

// Notification style config (for UI components)
export const styleConfig = {
  success: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-800',
    icon: 'text-green-400'
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-800',
    icon: 'text-red-400'
  },
  warning: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    text: 'text-yellow-800',
    icon: 'text-yellow-400'
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-800',
    icon: 'text-blue-400'
  }
};

export default {
  NOTIFICATION_TYPES,
  DURATIONS,
  subscribe,
  addNotification,
  removeNotification,
  clearAllNotifications,
  getNotifications,
  success,
  error,
  warning,
  info,
  messages,
  styleConfig
};
