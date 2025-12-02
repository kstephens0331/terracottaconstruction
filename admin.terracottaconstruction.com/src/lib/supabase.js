// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Auth helpers
export const auth = {
  // Sign in with email/password
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) throw error;
    return data;
  },

  // Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // Get current user
  getUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  },

  // Get current session
  getSession: async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  },

  // Listen to auth state changes
  onAuthStateChange: (callback) => {
    return supabase.auth.onAuthStateChange(callback);
  },

  // Get user profile with role
  getProfile: async (userId) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    if (error) throw error;
    return data;
  },

  // Check if user is admin
  isAdmin: async (userId) => {
    const profile = await auth.getProfile(userId);
    return profile?.role === 'admin';
  }
};

// Database helpers
export const db = {
  // Customers
  customers: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .is('deleted_at', null)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },

    getById: async (id) => {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    },

    create: async (customer) => {
      const { data, error } = await supabase
        .from('customers')
        .insert(customer)
        .select()
        .single();
      if (error) throw error;
      return data;
    },

    update: async (id, updates) => {
      const { data, error } = await supabase
        .from('customers')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },

    delete: async (id) => {
      const { error } = await supabase
        .from('customers')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', id);
      if (error) throw error;
    }
  },

  // Quotes
  quotes: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('quotes')
        .select(`
          *,
          customer:customers(id, first_name, last_name, email, phone),
          items:quote_items(*)
        `)
        .is('deleted_at', null)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },

    getById: async (id) => {
      const { data, error } = await supabase
        .from('quotes')
        .select(`
          *,
          customer:customers(*),
          items:quote_items(*)
        `)
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    },

    create: async (quote, items = []) => {
      // Start a transaction-like operation
      const { data: quoteData, error: quoteError } = await supabase
        .from('quotes')
        .insert(quote)
        .select()
        .single();

      if (quoteError) throw quoteError;

      // Insert line items if any
      if (items.length > 0) {
        const itemsWithQuoteId = items.map((item, index) => ({
          ...item,
          quote_id: quoteData.id,
          sort_order: index
        }));

        const { error: itemsError } = await supabase
          .from('quote_items')
          .insert(itemsWithQuoteId);

        if (itemsError) throw itemsError;
      }

      return quoteData;
    },

    update: async (id, updates, items = null) => {
      const { data, error } = await supabase
        .from('quotes')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      // Update items if provided
      if (items !== null) {
        // Delete existing items
        await supabase
          .from('quote_items')
          .delete()
          .eq('quote_id', id);

        // Insert new items
        if (items.length > 0) {
          const itemsWithQuoteId = items.map((item, index) => ({
            ...item,
            quote_id: id,
            sort_order: index
          }));

          await supabase
            .from('quote_items')
            .insert(itemsWithQuoteId);
        }
      }

      return data;
    },

    updateStatus: async (id, status) => {
      const updates = { status };
      if (status === 'Sent') updates.sent_at = new Date().toISOString();
      if (status === 'Approved') updates.approved_at = new Date().toISOString();

      const { data, error } = await supabase
        .from('quotes')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    delete: async (id) => {
      const { error } = await supabase
        .from('quotes')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', id);
      if (error) throw error;
    }
  },

  // Work Orders
  workOrders: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('work_orders')
        .select(`
          *,
          customer:customers(id, first_name, last_name, email, phone),
          quote:quotes(id, quote_number, title),
          assigned:profiles(id, full_name, email)
        `)
        .is('deleted_at', null)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },

    getById: async (id) => {
      const { data, error } = await supabase
        .from('work_orders')
        .select(`
          *,
          customer:customers(*),
          quote:quotes(*),
          assigned:profiles(*)
        `)
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    },

    create: async (workOrder) => {
      const { data, error } = await supabase
        .from('work_orders')
        .insert(workOrder)
        .select()
        .single();
      if (error) throw error;
      return data;
    },

    update: async (id, updates) => {
      const { data, error } = await supabase
        .from('work_orders')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },

    updateStatus: async (id, status) => {
      const updates = { status };
      if (status === 'Completed') updates.completed_at = new Date().toISOString();

      const { data, error } = await supabase
        .from('work_orders')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    delete: async (id) => {
      const { error } = await supabase
        .from('work_orders')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', id);
      if (error) throw error;
    }
  },

  // Invoices
  invoices: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('invoices')
        .select(`
          *,
          customer:customers(id, first_name, last_name, email, phone),
          quote:quotes(id, quote_number),
          work_order:work_orders(id, work_order_number),
          items:invoice_items(*),
          payments:payments(*)
        `)
        .is('deleted_at', null)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },

    getById: async (id) => {
      const { data, error } = await supabase
        .from('invoices')
        .select(`
          *,
          customer:customers(*),
          quote:quotes(*),
          work_order:work_orders(*),
          items:invoice_items(*),
          payments:payments(*)
        `)
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    },

    create: async (invoice, items = []) => {
      const { data: invoiceData, error: invoiceError } = await supabase
        .from('invoices')
        .insert(invoice)
        .select()
        .single();

      if (invoiceError) throw invoiceError;

      if (items.length > 0) {
        const itemsWithInvoiceId = items.map((item, index) => ({
          ...item,
          invoice_id: invoiceData.id,
          sort_order: index
        }));

        const { error: itemsError } = await supabase
          .from('invoice_items')
          .insert(itemsWithInvoiceId);

        if (itemsError) throw itemsError;
      }

      return invoiceData;
    },

    update: async (id, updates) => {
      const { data, error } = await supabase
        .from('invoices')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },

    createFromQuote: async (quoteId) => {
      // Get the quote with items
      const quote = await db.quotes.getById(quoteId);

      // Create invoice from quote
      const invoice = {
        quote_id: quote.id,
        customer_id: quote.customer_id,
        title: quote.title,
        description: quote.description,
        subtotal: quote.subtotal,
        tax_rate: quote.tax_rate,
        tax_amount: quote.tax_amount,
        discount_amount: quote.discount_amount,
        total: quote.total,
        balance_due: quote.total,
        due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days
        terms: quote.terms,
        notes: quote.notes
      };

      const items = quote.items?.map(item => ({
        description: item.description,
        quantity: item.quantity,
        unit: item.unit,
        unit_price: item.unit_price,
        total: item.total
      })) || [];

      return db.invoices.create(invoice, items);
    },

    recordPayment: async (invoiceId, payment) => {
      const { data, error } = await supabase
        .from('payments')
        .insert({
          invoice_id: invoiceId,
          ...payment
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    delete: async (id) => {
      const { error } = await supabase
        .from('invoices')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', id);
      if (error) throw error;
    }
  },

  // Services catalog
  services: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('category', { ascending: true })
        .order('name', { ascending: true });
      if (error) throw error;
      return data;
    },

    getByCategory: async (category) => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('category', category)
        .eq('is_active', true)
        .order('name', { ascending: true });
      if (error) throw error;
      return data;
    }
  },

  // Analytics
  analytics: {
    getDashboardStats: async () => {
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

      // Get counts
      const [customers, quotes, workOrders, invoices] = await Promise.all([
        supabase.from('customers').select('id', { count: 'exact' }).is('deleted_at', null),
        supabase.from('quotes').select('id, status, total', { count: 'exact' }).is('deleted_at', null),
        supabase.from('work_orders').select('id, status', { count: 'exact' }).is('deleted_at', null),
        supabase.from('invoices').select('id, status, total, balance_due', { count: 'exact' }).is('deleted_at', null)
      ]);

      // Calculate stats
      const quotesData = quotes.data || [];
      const invoicesData = invoices.data || [];
      const workOrdersData = workOrders.data || [];

      const pendingQuotes = quotesData.filter(q => q.status === 'Pending' || q.status === 'Sent').length;
      const approvedQuotes = quotesData.filter(q => q.status === 'Approved').length;

      const pendingWorkOrders = workOrdersData.filter(w =>
        ['Pending', 'Scheduled', 'In Progress'].includes(w.status)
      ).length;

      const unpaidInvoices = invoicesData.filter(i =>
        ['Sent', 'Partial', 'Overdue'].includes(i.status)
      );
      const totalOutstanding = unpaidInvoices.reduce((sum, i) => sum + parseFloat(i.balance_due || 0), 0);

      const paidInvoices = invoicesData.filter(i => i.status === 'Paid');
      const totalRevenue = paidInvoices.reduce((sum, i) => sum + parseFloat(i.total || 0), 0);

      return {
        totalCustomers: customers.count || 0,
        totalQuotes: quotes.count || 0,
        pendingQuotes,
        approvedQuotes,
        totalWorkOrders: workOrders.count || 0,
        pendingWorkOrders,
        totalInvoices: invoices.count || 0,
        unpaidInvoices: unpaidInvoices.length,
        totalOutstanding,
        totalRevenue
      };
    }
  }
};

export default supabase;
