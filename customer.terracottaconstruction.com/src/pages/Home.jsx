import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { supabase } from "../supabase";
import Sidebar from "../components/Sidebar";

function Home() {
  const [quotes, setQuotes] = useState([]);
  const [workOrders, setWorkOrders] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      const email = user.email;

      // Fetch quotes
      const { data: quoteData, error: quoteError } = await supabase
        .from("quotes")
        .select("*")
        .eq("email", email);

      // Fetch work orders
      const { data: workOrderData, error: workOrderError } = await supabase
        .from("work_orders")
        .select("*")
        .eq("email", email);

      if (quoteError || workOrderError) {
        console.error("Supabase error:", quoteError || workOrderError);
      } else {
        setQuotes(quoteData || []);
        setWorkOrders(workOrderData || []);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 bg-gray-100 p-8 min-h-screen">
        <div className="bg-white rounded-xl shadow p-6">
          <h1 className="text-2xl font-semibold text-[#c1440e] mb-6 border-b pb-2">
            Customer Dashboard
          </h1>

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
                        <p className="text-gray-800 font-medium">Quote #{quote.id}</p>
                        <p className="text-sm text-gray-500">Total: ${quote.total}</p>
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
                        <p className="text-gray-800 font-medium">Work Order #{order.id}</p>
                        <p className="text-sm text-gray-500">Requested: {order.request_date}</p>
                      </div>
                      <span className={`text-sm px-2 py-1 rounded ${
                        order.status === 'Complete'
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
        </div>
      </main>
    </div>
  );
}

export default Home;
