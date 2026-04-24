import React, { useState } from "react";
import { auth, db } from "../supabase";
import Sidebar from "../components/Sidebar";

function SubmitWorkOrder() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [banner, setBanner] = useState(null); // { type: 'success' | 'error', message }
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBanner(null);
    setLoading(true);

    try {
      const session = await auth.getSession();
      if (!session?.user) {
        setBanner({ type: "error", message: "You must be logged in." });
        return;
      }

      const customer = await db.getCustomerByEmail(session.user.email);
      if (!customer) {
        setBanner({
          type: "error",
          message: "Customer profile not found.",
        });
        return;
      }

      await db.submitWorkOrder({
        customer_id: customer.id,
        title: title || "Work Order Request",
        description,
        service_address: address,
        status: "pending",
      });

      setBanner({
        type: "success",
        message: "Work order submitted successfully. We will be in touch soon.",
      });
      setTitle("");
      setDescription("");
      setAddress("");
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      setBanner({
        type: "error",
        message: "Failed to submit work order. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-terracotta";
  const labelClass = "block text-sm font-medium text-charcoal mb-1";

  return (
    <div className="flex min-h-screen bg-cream">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-6 border-b pb-4">
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-charcoal">
                Submit a Work Order
              </h1>
              <p className="text-sm text-gray-600 font-body mt-1">
                Tell us what you need - we will review and follow up shortly.
              </p>
            </div>

            {banner && (
              <div
                className={`mb-4 flex items-start justify-between gap-4 px-4 py-3 rounded-md ${
                  banner.type === "success"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-600 text-white"
                }`}
              >
                <span className="text-sm font-body">{banner.message}</span>
                <button
                  onClick={() => setBanner(null)}
                  className="font-bold hover:opacity-80"
                  aria-label="Dismiss message"
                >
                  x
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={labelClass} htmlFor="title">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="e.g., Fence Repair, Lawn Mowing"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="address">
                  Service Address
                </label>
                <input
                  id="address"
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="description">
                  Description of Issue
                </label>
                <textarea
                  id="description"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className={inputClass}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-3 rounded-md font-semibold transition ${
                  loading
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-terracotta text-white hover:bg-terracotta-dark"
                }`}
              >
                {loading ? "Submitting..." : "Submit Request"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SubmitWorkOrder;
