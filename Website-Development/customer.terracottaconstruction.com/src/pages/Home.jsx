import React, { useEffect, useState } from "react";
import { auth, db } from "../supabase";
import Sidebar from "../components/Sidebar";

function Home() {
  const [quotes, setQuotes] = useState([]);
  const [workOrders, setWorkOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const session = await auth.getSession();
        if (!session?.user) return;

        // Get customer profile by email
        const customer = await db.getCustomerByEmail(session.user.email);
        if (customer) {
          // Fetch quotes and work orders for this customer
          const [quotesData, ordersData] = await Promise.all([
            db.getQuotes(customer.id),
            db.getWorkOrders(customer.id)
          ]);

          setQuotes(quotesData);
          setWorkOrders(ordersData);
        }
      } catch (err) {
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 bg-gray-100 p-8 min-h-screen">
        <div className="bg-white rounded-xl shadow p-6">
          <h1 className="text-2xl font-semibold text-[#c1440e] mb-6 border-b pb-2">
            Customer Dashboard
          </h1>

          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : (
            <>
          {/* Quotes */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Recent Quotes</h2>
            {quotes.length === 0 ? (
              <p className="text-gray-500">No quotes available.</p>
            ) : (
              <ul className="space-y-4">
                {quotes.map((quote) => (
                  <li key={quote.id} className="bg-gray-50 p-4 rounded border shadow-sm">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-gray-800 font-medium">{quote.quote_number || `Quote #${quote.id.slice(0, 8)}`}</p>
                        <p className="text-sm text-gray-500">Total: ${quote.total?.toFixed(2) || '0.00'}</p>
                      </div>
                      <span className="text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded">
                        {quote.status}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Work Orders */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Active Work Orders</h2>
            {workOrders.length === 0 ? (
              <p className="text-gray-500">No active work orders.</p>
            ) : (
              <ul className="space-y-4">
                {workOrders.map((order) => (
                  <li key={order.id} className="bg-gray-50 p-4 rounded border shadow-sm">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-gray-800 font-medium">{order.work_order_number || `Order #${order.id.slice(0, 8)}`}</p>
                        <p className="text-sm text-gray-500">Created: {new Date(order.created_at).toLocaleDateString()}</p>
                      </div>
                      <span className={`text-sm px-2 py-1 rounded ${
                        order.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Home;
