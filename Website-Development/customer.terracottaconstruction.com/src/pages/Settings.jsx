import React, { useEffect, useState } from "react";
import { auth, db } from "../supabase";
import Sidebar from "../components/Sidebar";

function Settings() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const session = await auth.getSession();
        if (!session?.user) {
          setError("User not found.");
          return;
        }

        const customer = await db.getCustomerByEmail(session.user.email);
        if (customer) {
          setProfile(customer);
        } else {
          setError("Profile could not be loaded.");
        }
      } catch (err) {
        console.error("Supabase error:", err);
        setError("Profile could not be loaded.");
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-gray-100 min-h-screen p-8">
        <div className="bg-white shadow rounded-xl p-6 max-w-xl mx-auto">
          <h1 className="text-2xl font-semibold text-[#c1440e] mb-6 border-b pb-2">Your Profile</h1>

          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

          {profile ? (
            <ul className="space-y-3 text-sm text-gray-700">
              <li><strong>Full Name:</strong> {profile.first_name} {profile.last_name}</li>
              <li><strong>Email:</strong> {profile.email}</li>
              <li><strong>Phone:</strong> {profile.phone || "—"}</li>
              <li><strong>Address:</strong> {profile.address_street || "—"}</li>
              <li><strong>Account #:</strong> {profile.account_number || "—"}</li>
              <li><strong>Joined:</strong> {new Date(profile.created_at).toLocaleDateString()}</li>
            </ul>
          ) : (
            !error && <p className="text-gray-500">Loading profile…</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Settings;
