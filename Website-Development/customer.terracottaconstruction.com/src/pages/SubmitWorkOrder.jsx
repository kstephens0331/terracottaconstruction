import React, { useState } from "react";
import { supabase } from "../supabase";
import { auth } from "../firebase";
import Sidebar from "../components/Sidebar";

function SubmitWorkOrder() {
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const user = auth.currentUser;
    if (!user) {
      setMessage("You must be logged in.");
      return;
    }

    const { error } = await supabase.from("work_orders").insert([
      {
        email: user.email,
        description,
        address,
        status: "Pending",
        submitted_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error(error);
      setMessage("Failed to submit work order.");
    } else {
      setMessage("Work order submitted successfully!");
      setDescription("");
      setAddress("");
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
              className="bg-[#c1440e] text-white py-2 px-4 rounded hover:bg-orange-700 transition"
            >
              Submit Request
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default SubmitWorkOrder;
