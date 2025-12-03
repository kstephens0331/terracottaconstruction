// src/services/api.js
// API service for communicating with the backend

import { auth } from '../firebase';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Get auth token
async function getAuthToken() {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  return user.getIdToken();
}

// Base fetch wrapper with auth
async function apiFetch(endpoint, options = {}) {
  const token = await getAuthToken();

  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers
    }
  };

  const response = await fetch(`${API_BASE}${endpoint}`, config);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
}

// Quotes API
export const quotesAPI = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/api/quotes${query ? `?${query}` : ''}`);
  },

  getById: (id) => apiFetch(`/api/quotes/${id}`),

  create: (data) => apiFetch('/api/quotes', {
    method: 'POST',
    body: JSON.stringify(data)
  }),

  update: (id, data) => apiFetch(`/api/quotes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),

  updateStatus: (id, status, notes) => apiFetch(`/api/quotes/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status, notes })
  }),

  delete: (id) => apiFetch(`/api/quotes/${id}`, {
    method: 'DELETE'
  }),

  duplicate: (id) => apiFetch(`/api/quotes/${id}/duplicate`, {
    method: 'POST'
  })
};

// Customers API
export const customersAPI = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/api/customers${query ? `?${query}` : ''}`);
  },

  getById: (id) => apiFetch(`/api/customers/${id}`),

  create: (data) => apiFetch('/api/customers', {
    method: 'POST',
    body: JSON.stringify(data)
  }),

  update: (id, data) => apiFetch(`/api/customers/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),

  updateStatus: (id, status) => apiFetch(`/api/customers/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status })
  }),

  delete: (id) => apiFetch(`/api/customers/${id}`, {
    method: 'DELETE'
  })
};

// Work Orders API
export const workOrdersAPI = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/api/workorders${query ? `?${query}` : ''}`);
  },

  getById: (id) => apiFetch(`/api/workorders/${id}`),

  create: (data) => apiFetch('/api/workorders', {
    method: 'POST',
    body: JSON.stringify(data)
  }),

  update: (id, data) => apiFetch(`/api/workorders/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),

  updateStatus: (id, status, notes) => apiFetch(`/api/workorders/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status, notes })
  }),

  delete: (id) => apiFetch(`/api/workorders/${id}`, {
    method: 'DELETE'
  })
};

// Invoices API
export const invoicesAPI = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/api/invoices${query ? `?${query}` : ''}`);
  },

  getById: (id) => apiFetch(`/api/invoices/${id}`),

  createFromQuote: (data) => apiFetch('/api/invoices/from-quote', {
    method: 'POST',
    body: JSON.stringify(data)
  }),

  updateStatus: (id, status) => apiFetch(`/api/invoices/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status })
  }),

  recordPayment: (id, payment) => apiFetch(`/api/invoices/${id}/payment`, {
    method: 'POST',
    body: JSON.stringify(payment)
  }),

  getStats: () => apiFetch('/api/invoices/stats/summary')
};

// Analytics API
export const analyticsAPI = {
  getDashboard: () => apiFetch('/api/analytics/dashboard'),

  getRevenue: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/api/analytics/revenue${query ? `?${query}` : ''}`);
  },

  getQuoteConversion: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/api/analytics/quotes/conversion${query ? `?${query}` : ''}`);
  },

  getWorkOrderCompletion: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/api/analytics/workorders/completion${query ? `?${query}` : ''}`);
  },

  getCustomerAcquisition: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/api/analytics/customers/acquisition${query ? `?${query}` : ''}`);
  },

  getTopCustomers: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/api/analytics/customers/top${query ? `?${query}` : ''}`);
  }
};

// Health check
export const healthCheck = () => fetch(`${API_BASE}/health`).then(r => r.json());

export default {
  quotesAPI,
  customersAPI,
  workOrdersAPI,
  invoicesAPI,
  analyticsAPI,
  healthCheck
};
