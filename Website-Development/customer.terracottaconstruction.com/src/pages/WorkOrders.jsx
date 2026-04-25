import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../supabase";
import Sidebar from "../components/Sidebar";
import Banner from "../components/Banner";
import jsPDF from "jspdf";
import logo from "../assets/logo.jpg";

function WorkOrders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [banner, setBanner] = useState(null); // { type: 'success' | 'error', message }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const session = await auth.getSession();
        if (!session?.user) return;

        const customer = await db.getCustomerByEmail(session.user.email);
        if (customer) {
          const data = await db.getWorkOrders(customer.id);
          setOrders(data);
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("Error fetching work orders:", err);
        setBanner({
          type: "error",
          message: "Unable to load work orders. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleCancel = async (id) => {
    try {
      await db.cancelWorkOrder(id);
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status: "cancelled" } : o))
      );
      setBanner({ type: "success", message: "Work order cancelled." });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Error cancelling order:", err);
      setBanner({
        type: "error",
        message: "Failed to cancel work order. Please try again.",
      });
    }
  };

  const handlePDFDownload = async (order) => {
    const doc = new jsPDF();

    const image = new Image();
    image.src = logo;
    await new Promise((res) => (image.onload = res));
    doc.addImage(image, "PNG", 10, 10, 40, 15);

    doc.setFontSize(18);
    doc.setTextColor("#924C2E");
    doc.text("Work Order Summary", 60, 20);

    doc.setFontSize(12);
    doc.setTextColor("#000");
    doc.text(
      `Order #: ${order.work_order_number || order.id.slice(0, 8)}`,
      10,
      35
    );
    doc.text(`Status: ${order.status}`, 10, 42);
    doc.text(
      `Created: ${new Date(order.created_at).toLocaleDateString()}`,
      10,
      49
    );

    doc.setFontSize(11);
    doc.setTextColor("#333");
    doc.text("Title:", 10, 63);
    doc.setFontSize(10);
    doc.text(order.title || "Work Order", 10, 70, { maxWidth: 190 });

    doc.setFontSize(11);
    doc.text("Description:", 10, 85);
    doc.setFontSize(10);
    doc.text(order.description || "", 10, 92, { maxWidth: 190 });

    doc.setFontSize(10);
    doc.setTextColor("#999");
    doc.line(10, 260, 200, 260);
    doc.text("Terracotta Construction", 10, 266);
    doc.text("(936) 955-4083 | (832) 288-0258", 10, 272);
    doc.text("terracottaconstruction1@gmail.com", 10, 278);
    doc.text("16724 E. Forrestal St, Montgomery, TX 77316", 10, 284);

    doc.save(
      `workorder-${order.work_order_number || order.id.slice(0, 8)}.pdf`
    );
  };

  const filteredOrders =
    filter === "All"
      ? orders
      : orders.filter((order) => order.status === filter.toLowerCase());

  const statusPill = (status) => {
    const s = (status || "").toLowerCase();
    if (s === "completed") return "bg-green-100 text-green-800";
    if (s === "in_progress") return "bg-yellow-100 text-yellow-800";
    if (s === "cancelled") return "bg-red-100 text-red-800";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="flex min-h-screen bg-cream">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-wrap gap-4 justify-between items-center mb-6 border-b pb-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-heading font-bold text-charcoal">
                  Your Work Orders
                </h1>
                <p className="text-sm text-gray-600 font-body mt-1">
                  Track the status of active and past service requests.
                </p>
              </div>
              <select
                className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-terracotta"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="All">All</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Complete</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {banner && (
              <Banner
                type={banner.type}
                message={banner.message}
                onDismiss={() => setBanner(null)}
              />
            )}

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin h-10 w-10 rounded-full border-b-2 border-terracotta"></div>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="bg-cream border border-gray-200 rounded-md py-12 px-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-terracotta/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-terracotta"
                    aria-hidden="true"
                  >
                    <path d="M9 11h6" />
                    <path d="M9 15h4" />
                    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                    <path d="M5 8a2 2 0 0 1 2-2h7l5 5v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-heading font-semibold text-charcoal mb-2">
                  No work orders to show
                </h3>
                <p className="text-sm text-gray-600 font-body mb-5">
                  {filter === "All"
                    ? "Submit a work order request to get started."
                    : `You have no ${filter
                        .toLowerCase()
                        .replace("_", " ")} work orders right now.`}
                </p>
                {filter === "All" && (
                  <Link
                    to="/submit-work-order"
                    className="inline-block bg-terracotta text-white px-6 py-3 rounded-md font-semibold hover:bg-terracotta-dark transition"
                  >
                    Submit a Work Order
                  </Link>
                )}
              </div>
            ) : (
              <ul className="space-y-4">
                {filteredOrders.map((order) => (
                  <li
                    key={order.id}
                    className="bg-cream p-4 rounded-md border border-gray-200"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <p className="text-charcoal font-body font-semibold">
                          {order.work_order_number ||
                            `Order #${order.id.slice(0, 8)}`}
                        </p>
                        <p className="text-sm text-gray-700 font-body mb-1">
                          {order.title}
                        </p>
                        <p className="text-sm text-gray-600 font-body mb-1">
                          {order.description}
                        </p>
                        <p className="text-sm text-gray-600 font-body">
                          Created:{" "}
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="text-right space-y-2">
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-medium ${statusPill(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>

                        <div className="flex flex-col items-end gap-2">
                          {(order.status === "pending" ||
                            order.status === "in_progress") && (
                            <button
                              onClick={() => handleCancel(order.id)}
                              className="text-xs text-red-700 border border-red-300 bg-white px-3 py-1 rounded-md font-medium hover:bg-red-50 transition"
                            >
                              Cancel Order
                            </button>
                          )}

                          <button
                            onClick={() => handlePDFDownload(order)}
                            className="text-xs bg-white border-2 border-terracotta text-terracotta px-3 py-1 rounded-md font-medium hover:bg-terracotta hover:text-white transition"
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
        </div>
      </main>
    </div>
  );
}

export default WorkOrders;
