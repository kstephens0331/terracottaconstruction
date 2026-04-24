import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, supabase } from "../supabase";
import Sidebar from "../components/Sidebar";

const PHONE_REGEX = /^[\d\s\-\+\(\)]{7,}$/;

const EDITABLE_FIELDS = [
  "first_name",
  "last_name",
  "phone",
  "address",
  "city",
  "state",
  "zip",
];

function Settings() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [validationError, setValidationError] = useState("");

  const loadProfile = async () => {
    setLoading(true);
    setError("");
    try {
      const session = await auth.getSession();
      if (!session?.user) {
        setError("You must be logged in to view this page.");
        setLoading(false);
        return;
      }

      const { data, error: queryError } = await supabase
        .from("customers")
        .select("*")
        .eq("user_id", session.user.id)
        .single();

      if (queryError && queryError.code !== "PGRST116") {
        throw queryError;
      }

      if (!data) {
        setError("No customer profile found for this account.");
        setLoading(false);
        return;
      }

      setProfile(data);
      setFormData(buildFormDataFromProfile(data));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Settings load error:", err);
      setError("Profile could not be loaded. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const buildFormDataFromProfile = (p) => {
    const fd = {};
    EDITABLE_FIELDS.forEach((field) => {
      fd[field] = p?.[field] ?? "";
    });
    return fd;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    setFormData(buildFormDataFromProfile(profile));
    setValidationError("");
    setError("");
    setSuccessMessage("");
    setEditMode(true);
  };

  const handleCancel = () => {
    setFormData(buildFormDataFromProfile(profile));
    setValidationError("");
    setError("");
    setEditMode(false);
  };

  const validate = () => {
    const first = (formData.first_name || "").trim();
    const last = (formData.last_name || "").trim();
    if (!first && !last) {
      return "Please enter a first or last name.";
    }
    const phone = (formData.phone || "").trim();
    if (phone && !PHONE_REGEX.test(phone)) {
      return "Please enter a valid phone number.";
    }
    return "";
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setError("");
    setValidationError("");

    const v = validate();
    if (v) {
      setValidationError(v);
      return;
    }

    if (!profile?.id) {
      setError("Profile id missing - cannot save.");
      return;
    }

    setSaving(true);
    try {
      const updates = {};
      EDITABLE_FIELDS.forEach((field) => {
        const val = (formData[field] ?? "").trim();
        updates[field] = val === "" ? null : val;
      });

      const { data, error: updateError } = await supabase
        .from("customers")
        .update(updates)
        .eq("id", profile.id)
        .select()
        .single();

      if (updateError) throw updateError;

      setProfile(data);
      setFormData(buildFormDataFromProfile(data));
      setEditMode(false);
      setSuccessMessage("Profile updated.");
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Settings save error:", err);
      setError(err?.message || "Failed to save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Sign out error:", err);
      setError("Failed to sign out. Please try again.");
    }
  };

  const inputClass =
    "w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-terracotta";
  const labelClass = "block text-sm font-medium text-charcoal mb-1";

  return (
    <div className="flex min-h-screen bg-cream">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start justify-between mb-6 border-b pb-4">
              <div>
                <h1 className="text-3xl font-heading font-bold text-charcoal">
                  Your Profile
                </h1>
                <p className="text-sm text-gray-600 font-body mt-1">
                  Manage your contact information and account details.
                </p>
              </div>
              {!editMode && profile && (
                <button
                  onClick={handleEdit}
                  className="bg-terracotta text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-terracotta-dark transition"
                >
                  Edit
                </button>
              )}
            </div>

            {error && (
              <div className="mb-4 flex items-start justify-between gap-4 bg-red-600 text-white px-4 py-3 rounded-md">
                <span className="text-sm font-body">{error}</span>
                <button
                  onClick={() => setError("")}
                  className="text-white font-bold hover:opacity-80"
                  aria-label="Dismiss error"
                >
                  x
                </button>
              </div>
            )}

            {successMessage && (
              <div className="mb-4 flex items-start justify-between gap-4 bg-green-100 text-green-800 px-4 py-3 rounded-md">
                <span className="text-sm font-body">{successMessage}</span>
                <button
                  onClick={() => setSuccessMessage("")}
                  className="text-green-800 font-bold hover:opacity-80"
                  aria-label="Dismiss message"
                >
                  x
                </button>
              </div>
            )}

            {validationError && (
              <div className="mb-4 bg-red-100 text-red-800 px-4 py-3 rounded-md text-sm font-body">
                {validationError}
              </div>
            )}

            {loading ? (
              <p className="text-gray-600 font-body">Loading profile...</p>
            ) : !profile ? (
              <p className="text-gray-600 font-body">No profile available.</p>
            ) : editMode ? (
              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass} htmlFor="first_name">
                      First Name
                    </label>
                    <input
                      id="first_name"
                      name="first_name"
                      type="text"
                      value={formData.first_name || ""}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="last_name">
                      Last Name
                    </label>
                    <input
                      id="last_name"
                      name="last_name"
                      type="text"
                      value={formData.last_name || ""}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Email</label>
                  <input
                    type="email"
                    value={profile.email || ""}
                    readOnly
                    disabled
                    className="w-full px-4 py-3 border border-gray-200 bg-gray-100 rounded-md text-gray-600 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1 font-body">
                    Contact us if you need to change your email address.
                  </p>
                </div>

                <div>
                  <label className={labelClass} htmlFor="phone">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone || ""}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="(555) 555-5555"
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor="address">
                    Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={formData.address || ""}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className={labelClass} htmlFor="city">
                      City
                    </label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      value={formData.city || ""}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="state">
                      State
                    </label>
                    <input
                      id="state"
                      name="state"
                      type="text"
                      value={formData.state || ""}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="zip">
                      ZIP
                    </label>
                    <input
                      id="zip"
                      name="zip"
                      type="text"
                      value={formData.zip || ""}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className={`px-6 py-3 rounded-md font-semibold transition ${
                      saving
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-terracotta text-white hover:bg-terracotta-dark"
                    }`}
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={saving}
                    className="px-6 py-3 rounded-md font-semibold border-2 border-terracotta text-terracotta hover:bg-terracotta hover:text-white transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <dl className="grid md:grid-cols-2 gap-6">
                <ProfileField
                  label="First Name"
                  value={profile.first_name}
                />
                <ProfileField
                  label="Last Name"
                  value={profile.last_name}
                />
                <ProfileField label="Email" value={profile.email} />
                <ProfileField label="Phone" value={profile.phone} />
                <ProfileField
                  label="Address"
                  value={profile.address}
                  wide
                />
                <ProfileField label="City" value={profile.city} />
                <ProfileField label="State" value={profile.state} />
                <ProfileField label="ZIP" value={profile.zip} />
                {profile.account_number && (
                  <ProfileField
                    label="Account Number"
                    value={profile.account_number}
                  />
                )}
                {profile.created_at && (
                  <ProfileField
                    label="Member Since"
                    value={new Date(profile.created_at).toLocaleDateString()}
                  />
                )}
              </dl>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h2 className="text-xl font-heading font-semibold text-charcoal mb-2">
              Account
            </h2>
            <p className="text-sm text-gray-600 font-body mb-4">
              Sign out of your customer portal account.
            </p>
            <button
              onClick={handleSignOut}
              className="bg-white text-terracotta border-2 border-terracotta px-6 py-3 rounded-md font-semibold hover:bg-terracotta hover:text-white transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

function ProfileField({ label, value, wide }) {
  return (
    <div className={wide ? "md:col-span-2" : ""}>
      <dt className="text-sm font-medium text-charcoal font-body">{label}</dt>
      <dd className="text-base text-gray-700 font-body mt-1">
        {value || <span className="text-gray-400">Not set</span>}
      </dd>
    </div>
  );
}

export default Settings;
