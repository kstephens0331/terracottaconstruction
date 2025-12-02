// src/pages/Invoices.jsx
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { db } from '../lib/supabase';
import { messages, success, error } from '../modules/notificationUtils';
import Modal, { ConfirmDialog } from '../components/Modal';

export default function Invoices() {
  const { t } = useTranslation();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentData, setPaymentData] = useState({
    amount: '',
    payment_method: 'Check',
    reference: '',
    notes: ''
  });

  const statusColors = {
    Draft: 'bg-gray-100 text-gray-800',
    Sent: 'bg-blue-100 text-blue-800',
    Viewed: 'bg-indigo-100 text-indigo-800',
    Partial: 'bg-yellow-100 text-yellow-800',
    Paid: 'bg-green-100 text-green-800',
    Overdue: 'bg-red-100 text-red-800',
    Cancelled: 'bg-gray-100 text-gray-500'
  };

  useEffect(() => {
    loadInvoices();
  }, [filter]);

  const loadInvoices = async () => {
    setLoading(true);
    try {
      let data = await db.invoices.getAll();
      // Apply filter if set
      if (filter) {
        data = data.filter(inv => inv.status === filter);
      }
      setInvoices(data || []);
    } catch (err) {
      console.error('Failed to load invoices:', err);
      messages.fetchError('invoices');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (invoiceId, newStatus) => {
    try {
      await db.invoices.update(invoiceId, { status: newStatus });
      success(`Invoice status updated to ${newStatus}`);
      loadInvoices();
    } catch (err) {
      error('Failed to update invoice status');
    }
  };

  const handleRecordPayment = async (e) => {
    e.preventDefault();
    if (!selectedInvoice || !paymentData.amount) return;

    try {
      await db.invoices.recordPayment(selectedInvoice.id, {
        amount: parseFloat(paymentData.amount),
        payment_method: paymentData.payment_method,
        reference_number: paymentData.reference,
        notes: paymentData.notes
      });

      messages.paymentRecorded(formatCurrency(paymentData.amount));
      setShowPaymentModal(false);
      setPaymentData({ amount: '', payment_method: 'Check', reference: '', notes: '' });
      loadInvoices();
    } catch (err) {
      error('Failed to record payment');
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-charcoal">Invoices</h1>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded-md px-3 py-2"
        >
          <option value="">All Invoices</option>
          <option value="Draft">Draft</option>
          <option value="Sent">Sent</option>
          <option value="Partial">Partial Payment</option>
          <option value="Paid">Paid</option>
          <option value="Overdue">Overdue</option>
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-terracotta"></div>
        </div>
      ) : invoices.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>No invoices found</p>
          <p className="text-sm mt-2">Invoices are created from approved quotes</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Invoice #</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Customer</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Due Date</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">Total</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">Balance</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium">
                    {invoice.invoice_number}
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium">{invoice.customer ? `${invoice.customer.first_name} ${invoice.customer.last_name}` : 'N/A'}</p>
                    <p className="text-xs text-gray-500">{invoice.customer?.email}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {formatDate(invoice.created_at)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {formatDate(invoice.due_date)}
                  </td>
                  <td className="px-4 py-3 text-sm text-right font-medium">
                    {formatCurrency(invoice.total)}
                  </td>
                  <td className="px-4 py-3 text-sm text-right font-medium">
                    {invoice.balance_due > 0 ? (
                      <span className="text-red-600">{formatCurrency(invoice.balance_due)}</span>
                    ) : (
                      <span className="text-green-600">Paid</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[invoice.status]}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <select
                        value={invoice.status}
                        onChange={(e) => handleStatusChange(invoice.id, e.target.value)}
                        className="text-xs border rounded px-2 py-1"
                      >
                        <option value="Draft">Draft</option>
                        <option value="Sent">Sent</option>
                        <option value="Viewed">Viewed</option>
                        <option value="Partial">Partial</option>
                        <option value="Paid">Paid</option>
                        <option value="Overdue">Overdue</option>
                      </select>
                      {invoice.balance_due > 0 && (
                        <button
                          onClick={() => {
                            setSelectedInvoice(invoice);
                            setShowPaymentModal(true);
                          }}
                          className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                        >
                          Payment
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Payment Modal */}
      <Modal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        title={`Record Payment - ${selectedInvoice?.invoice_number}`}
        size="md"
      >
        <form onSubmit={handleRecordPayment} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount Due: {selectedInvoice && formatCurrency(selectedInvoice.balance_due)}
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Amount *
            </label>
            <input
              type="number"
              step="0.01"
              value={paymentData.amount}
              onChange={(e) => setPaymentData({ ...paymentData, amount: e.target.value })}
              className="w-full border rounded-md px-3 py-2"
              placeholder="0.00"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Method
            </label>
            <select
              value={paymentData.payment_method}
              onChange={(e) => setPaymentData({ ...paymentData, payment_method: e.target.value })}
              className="w-full border rounded-md px-3 py-2"
            >
              <option value="Check">Check</option>
              <option value="Cash">Cash</option>
              <option value="Credit Card">Credit Card</option>
              <option value="ACH">ACH/Bank Transfer</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reference # (optional)
            </label>
            <input
              type="text"
              value={paymentData.reference}
              onChange={(e) => setPaymentData({ ...paymentData, reference: e.target.value })}
              className="w-full border rounded-md px-3 py-2"
              placeholder="Check # or confirmation"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes (optional)
            </label>
            <textarea
              value={paymentData.notes}
              onChange={(e) => setPaymentData({ ...paymentData, notes: e.target.value })}
              className="w-full border rounded-md px-3 py-2"
              rows={2}
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowPaymentModal(false)}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Record Payment
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
