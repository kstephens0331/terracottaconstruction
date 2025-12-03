// src/modules/customerStatus.js
// Customer lifecycle and status management

// Customer status definitions
export const CUSTOMER_STATUSES = {
  LEAD: 'Lead',
  PROSPECT: 'Prospect',
  ACTIVE: 'Active',
  VIP: 'VIP',
  INACTIVE: 'Inactive',
  DELETED: 'Deleted'
};

// Status metadata
export const STATUS_CONFIG = {
  Lead: {
    label: 'Lead',
    description: 'New contact, not yet engaged',
    color: 'gray',
    bgClass: 'bg-gray-100',
    textClass: 'text-gray-800',
    icon: 'user-plus',
    nextStatuses: ['Prospect', 'Inactive']
  },
  Prospect: {
    label: 'Prospect',
    description: 'Engaged, received quote',
    color: 'blue',
    bgClass: 'bg-blue-100',
    textClass: 'text-blue-800',
    icon: 'user-check',
    nextStatuses: ['Active', 'Inactive']
  },
  Active: {
    label: 'Active',
    description: 'Completed at least one job',
    color: 'green',
    bgClass: 'bg-green-100',
    textClass: 'text-green-800',
    icon: 'check-circle',
    nextStatuses: ['VIP', 'Inactive']
  },
  VIP: {
    label: 'VIP',
    description: 'High-value repeat customer',
    color: 'purple',
    bgClass: 'bg-purple-100',
    textClass: 'text-purple-800',
    icon: 'star',
    nextStatuses: ['Active', 'Inactive']
  },
  Inactive: {
    label: 'Inactive',
    description: 'No recent activity',
    color: 'yellow',
    bgClass: 'bg-yellow-100',
    textClass: 'text-yellow-800',
    icon: 'clock',
    nextStatuses: ['Lead', 'Prospect', 'Active']
  },
  Deleted: {
    label: 'Deleted',
    description: 'Removed from system',
    color: 'red',
    bgClass: 'bg-red-100',
    textClass: 'text-red-800',
    icon: 'trash',
    nextStatuses: []
  }
};

// Status transition rules
export const STATUS_TRANSITIONS = {
  Lead: ['Prospect', 'Inactive', 'Deleted'],
  Prospect: ['Active', 'Lead', 'Inactive', 'Deleted'],
  Active: ['VIP', 'Inactive', 'Deleted'],
  VIP: ['Active', 'Inactive', 'Deleted'],
  Inactive: ['Lead', 'Prospect', 'Active', 'Deleted'],
  Deleted: [] // Cannot transition from deleted
};

// Check if status transition is valid
export function isValidTransition(currentStatus, newStatus) {
  if (!STATUS_TRANSITIONS[currentStatus]) return false;
  return STATUS_TRANSITIONS[currentStatus].includes(newStatus);
}

// Get available transitions for a status
export function getAvailableTransitions(currentStatus) {
  return STATUS_TRANSITIONS[currentStatus] || [];
}

// Criteria for automatic status updates
export const AUTO_UPDATE_CRITERIA = {
  // Lead -> Prospect: When first quote is sent
  leadToProspect: (customer) => {
    return customer.status === 'Lead' && customer.total_quotes > 0;
  },

  // Prospect -> Active: When first job is completed
  prospectToActive: (customer) => {
    return customer.status === 'Prospect' && customer.completed_jobs > 0;
  },

  // Active -> VIP: Based on revenue or job count
  activeToVIP: (customer) => {
    return customer.status === 'Active' && (
      customer.total_revenue >= 5000 || // $5000+ total revenue
      customer.completed_jobs >= 5 // 5+ completed jobs
    );
  },

  // Any -> Inactive: No activity in 6 months
  toInactive: (customer) => {
    if (['Inactive', 'Deleted'].includes(customer.status)) return false;
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    const lastActivity = new Date(customer.last_activity || customer.created_at);
    return lastActivity < sixMonthsAgo;
  }
};

// Calculate recommended status based on customer data
export function getRecommendedStatus(customer) {
  // Check auto-update criteria in order
  if (AUTO_UPDATE_CRITERIA.toInactive(customer)) {
    return 'Inactive';
  }

  if (AUTO_UPDATE_CRITERIA.activeToVIP(customer)) {
    return 'VIP';
  }

  if (AUTO_UPDATE_CRITERIA.prospectToActive(customer)) {
    return 'Active';
  }

  if (AUTO_UPDATE_CRITERIA.leadToProspect(customer)) {
    return 'Prospect';
  }

  return customer.status;
}

// Check if customer status should be updated
export function shouldUpdateStatus(customer) {
  const recommended = getRecommendedStatus(customer);
  return recommended !== customer.status;
}

// Get status badge props for UI
export function getStatusBadge(status) {
  const config = STATUS_CONFIG[status];
  if (!config) return null;

  return {
    label: config.label,
    className: `${config.bgClass} ${config.textClass} px-2 py-1 rounded-full text-xs font-medium`
  };
}

// Calculate customer health score (0-100)
export function calculateHealthScore(customer) {
  let score = 50; // Base score

  // Positive factors
  if (customer.status === 'VIP') score += 20;
  else if (customer.status === 'Active') score += 15;
  else if (customer.status === 'Prospect') score += 5;

  // Revenue factor (up to +15)
  if (customer.total_revenue >= 10000) score += 15;
  else if (customer.total_revenue >= 5000) score += 10;
  else if (customer.total_revenue >= 1000) score += 5;

  // Job completion factor (up to +10)
  if (customer.completed_jobs >= 10) score += 10;
  else if (customer.completed_jobs >= 5) score += 7;
  else if (customer.completed_jobs >= 1) score += 3;

  // Recent activity factor (up to +10)
  if (customer.last_activity) {
    const daysSinceActivity = Math.floor(
      (Date.now() - new Date(customer.last_activity).getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysSinceActivity <= 30) score += 10;
    else if (daysSinceActivity <= 90) score += 5;
    else if (daysSinceActivity > 180) score -= 10;
  }

  // Negative factors
  if (customer.status === 'Inactive') score -= 20;

  // Clamp to 0-100
  return Math.max(0, Math.min(100, score));
}

// Get health score label
export function getHealthLabel(score) {
  if (score >= 80) return { label: 'Excellent', color: 'green' };
  if (score >= 60) return { label: 'Good', color: 'blue' };
  if (score >= 40) return { label: 'Fair', color: 'yellow' };
  if (score >= 20) return { label: 'Poor', color: 'orange' };
  return { label: 'Critical', color: 'red' };
}

// Customer activity types
export const ACTIVITY_TYPES = {
  QUOTE_SENT: 'quote_sent',
  QUOTE_APPROVED: 'quote_approved',
  INVOICE_SENT: 'invoice_sent',
  PAYMENT_RECEIVED: 'payment_received',
  WORK_ORDER_CREATED: 'work_order_created',
  WORK_ORDER_COMPLETED: 'work_order_completed',
  NOTE_ADDED: 'note_added',
  STATUS_CHANGED: 'status_changed',
  EMAIL_SENT: 'email_sent',
  CALL_LOGGED: 'call_logged'
};

// Create activity log entry
export function createActivityEntry(type, details, userId) {
  return {
    type,
    details,
    user_id: userId,
    timestamp: new Date().toISOString()
  };
}

// Get customer summary for dashboard
export function getCustomerSummary(customer) {
  const healthScore = calculateHealthScore(customer);
  const healthLabel = getHealthLabel(healthScore);

  return {
    id: customer.id,
    name: customer.name,
    email: customer.email,
    status: customer.status,
    statusBadge: getStatusBadge(customer.status),
    healthScore,
    healthLabel,
    totalRevenue: customer.total_revenue || 0,
    completedJobs: customer.completed_jobs || 0,
    lastActivity: customer.last_activity,
    recommendedStatus: getRecommendedStatus(customer),
    needsStatusUpdate: shouldUpdateStatus(customer)
  };
}

export default {
  CUSTOMER_STATUSES,
  STATUS_CONFIG,
  STATUS_TRANSITIONS,
  isValidTransition,
  getAvailableTransitions,
  getRecommendedStatus,
  shouldUpdateStatus,
  getStatusBadge,
  calculateHealthScore,
  getHealthLabel,
  ACTIVITY_TYPES,
  createActivityEntry,
  getCustomerSummary
};
