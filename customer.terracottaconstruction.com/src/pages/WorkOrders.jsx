import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { supabase } from "../supabase";
import Sidebar from "../components/Sidebar";
import jsPDF from "jspdf";
import logo from "../assets/logo.jpg";

function WorkOrders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const { data, error } = await supabase
        .from("work_orders")
        .select("*")
        .eq("email", user.email)
        .order("submitted_at", { ascending: false });

      if (error) {
        console.error("Error fetching work orders:", error);
      } else {
        setOrders(data || []);
      }

      setLoading(false);
    };

    fetchOrders();
  }, []);

  const handleCancel = async (id) => {
    const { error } = await supabase
      .from("work_orders")
      .update({ status: "Cancelled" })
      .eq("id", id);

    if (!error) {
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status: "Cancelled" } : o))
      );
    }
  };

  const handlePDFDownload = async (order) => {
    const doc = new jsPDF();

    const image = new Image();
    image.src = logo;
    await new Promise((res) => (image.onload = res));
    doc.addImage(image, "PNG", 10, 10, 40, 15);

    doc.setFontSize(18);
    doc.setTextColor("#c1440e");
    doc.text("Work Order Summary", 60, 20);

    doc.setFontSize(12);
    doc.setTextColor("#000");
    doc.text(`Order ID: ${order.id}`, 10, 35);
    doc.text(`Status: ${order.status}`, 10, 42);
    doc.text(`Submitted: ${new Date(order.submitted_at).toLocaleDateString()}`, 10, 49);
    doc.text(`Address: ${order.address}`, 10, 56);

    doc.setFontSize(11);
    doc.setTextColor("#333");
    doc.text("Description:", 10, 70);
    doc.setFontSize(10);
    doc.text(order.description, 10, 76, { maxWidth: 190 });

    doc.setFontSize(10);
    doc.setTextColor("#999");
    doc.line(10, 260, 200, 260);
    doc.text("Terracotta Construction", 10, 266);
    doc.text("(936) 955-4083 | (832) 288-0258", 10, 272);
    doc.text("admin@terracottaconstruction.com", 10, 278);
    doc.text("16724 E. Forrestal St, Montgomery, TX 77316", 10, 284);

    doc.save(`workorder-${order.id}.pdf`);
  };

  const filteredOrders =
    filter === "All"
      ? orders
      : orders.filter((order) => order.status === filter);

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-gray-100 min-h-screen p-8">
        <div className="bg-white shadow rounded-xl p-6 max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-[#c1440e]">Your Work Orders</h1>
            <select
              className="border rounded px-3 py-1 text-sm"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Complete">Complete</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {loading ? (
            <p className="text-gray-500">Loading work orders...</p>
          ) : filteredOrders.length === 0 ? (
            <p className="text-gray-500">No work orders found for this filter.</p>
          ) : (
            <ul className="space-y-4">
              {filteredOrders.map((order) => (
                <li key={order.id} className="bg-gray-50 p-4 rounded border shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-800 font-semibold">Order #{order.id}</p>
                      <p className="text-sm text-gray-600 mb-1">{order.description}</p>
                      <p className="text-sm text-gray-500 mb-1">
                        Address: {order.address}
                      </p>
                      <p className="text-sm text-gray-500">
                        Submitted: {new Date(order.submitted_at).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="text-right space-y-2">
                      <span className={`text-sm px-3 py-1 rounded-full ${
                        order.status === "Complete"
                          ? "bg-green-100 text-green-800"
                          : order.status === "In Progress"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "Cancelled"
                          ? "bg-red-100 text-red-600"
                          : "bg-gray-200 text-gray-800"
                      }`}>
                        {order.status}
                      </span>

                      <div className="flex flex-col items-end gap-2">
                        {(order.status === "Pending" || order.status === "In Progress") && (
                          <button
                            onClick={() => handleCancel(order.id)}
                            className="text-xs text-red-600 border border-red-300 px-3 py-1 rounded hover:bg-red-50"
                          >
                            Cancel Order
                          </button>
                        )}

                        <button
                          onClick={() => handlePDFDownload(order)}
                          className="text-xs text-[#c1440e] border border-[#c1440e] px-3 py-1 rounded hover:bg-orange-100"
                        >
                          Download Summary
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}

export default WorkOrders;
