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
            db.getWorkOrders(customer.id),
          ]);

          setQuotes(quotesData);
          setWorkOrders(ordersData);
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const statusPill = (status) => {
    const s = (status || "").toLowerCase();
    if (s === "completed" || s === "approved") {
      return "bg-green-100 text-green-800";
    }
    if (s === "cancelled" || s === "rejected") {
      return "bg-red-100 text-red-800";
    }
    return "bg-yellow-100 text-yellow-800";
  };

  return (
    <div className="flex min-h-screen bg-cream">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-6 border-b pb-4">
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-charcoal">
                Customer Dashboard
              </h1>
              <p className="text-sm text-gray-600 font-body mt-1">
                A quick look at your recent quotes and active work orders.
              </p>
            </div>

            {loading ? (
              <p className="text-gray-600 font-body">Loading...</p>
            ) : (
              <>
                {/* Quotes */}
                <div className="mb-8">
                  <h2 className="text-xl font-heading font-semibold text-charcoal mb-3">
                    Recent Quotes
                  </h2>
                  {quotes.length === 0 ? (
                    <p className="text-gray-600 font-body">
                      No quotes available.
                    </p>
                  ) : (
                    <ul className="space-y-4">
                      {quotes.map((quote) => (
                        <li
                          key={quote.id}
                          className="bg-cream p-4 rounded-md border border-gray-200"
                        >
                          <div className="flex justify-between items-start gap-4">
                            <div>
                              <p className="text-charcoal font-body font-medium">
                                {quote.quote_number ||
                                  `Quote #${quote.id.slice(0, 8)}`}
                              </p>
                              <p className="text-sm text-gray-600 font-body">
                                Total: ${quote.total?.toFixed(2) || "0.00"}
                              </p>
                            </div>
                            <span
                              className={`text-xs px-3 py-1 rounded-full font-medium ${statusPill(
                                quote.status
                              )}`}
                            >
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
                  <h2 className="text-xl font-heading font-semibold text-charcoal mb-3">
                    Active Work Orders
                  </h2>
                  {workOrders.length === 0 ? (
                    <p className="text-gray-600 font-body">
                      No active work orders.
                    </p>
                  ) : (
                    <ul className="space-y-4">
                      {workOrders.map((order) => (
                        <li
                          key={order.id}
                          className="bg-cream p-4 rounded-md border border-gray-200"
                        >
                          <div className="flex justify-between items-start gap-4">
                            <div>
                              <p className="text-charcoal font-body font-medium">
                                {order.work_order_number ||
                                  `Order #${order.id.slice(0, 8)}`}
                              </p>
                              <p className="text-sm text-gray-600 font-body">
                                Created:{" "}
                                {new Date(
                                  order.created_at
                                ).toLocaleDateString()}
                              </p>
                            </div>
                            <span
                              className={`text-xs px-3 py-1 rounded-full font-medium ${statusPill(
                                order.status
                              )}`}
                            >
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
        </div>
      </main>
    </div>
  );
}

export default Home;
