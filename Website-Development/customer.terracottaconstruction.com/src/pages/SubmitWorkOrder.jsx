import React, { useState } from "react";
import { auth, db } from "../supabase";
import Sidebar from "../components/Sidebar";

function SubmitWorkOrder() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const session = await auth.getSession();
      if (!session?.user) {
        setMessage("You must be logged in.");
        return;
      }

      // Get customer profile
      const customer = await db.getCustomerByEmail(session.user.email);
      if (!customer) {
        setMessage("Customer profile not found.");
        return;
      }

      await db.submitWorkOrder({
        customer_id: customer.id,
        title: title || "Work Order Request",
        description,
        service_address: address,
        status: "pending"
      });

      setMessage("Work order submitted successfully!");
      setTitle("");
      setDescription("");
      setAddress("");
    } catch (error) {
      console.error(error);
      setMessage("Failed to submit work order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-gray-100 min-h-screen p-8">
        <div className="bg-white shadow rounded-xl p-6 max-w-xl mx-auto">
          <h1 className="text-2xl font-semibold text-[#c1440e] mb-4">Submit a Work Order</h1>

          {message && (
            <div className={`mb-4 text-sm ${message.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                placeholder="e.g., Fence Repair, Lawn Mowing"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#c1440e]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Service Address</label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#c1440e]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description of Issue</label>
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#c1440e]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`py-2 px-4 rounded transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#c1440e] text-white hover:bg-orange-700"
              }`}
            >
              {loading ? "Submitting..." : "Submit Request"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default SubmitWorkOrder;
