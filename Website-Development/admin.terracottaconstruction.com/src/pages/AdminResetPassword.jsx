import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import logo from "../assets/logo.png";

// Handles the redirect from a Supabase admin password-reset email.
// Supabase's recovery link arrives with a hash fragment (e.g.
// `#access_token=...&type=recovery`). Our supabase client has
// `detectSessionInUrl: true` so it establishes a session automatically.
// The email template itself is managed in Supabase Auth > Email Templates.
export default function AdminResetPassword() {
  const [checking, setChecking] = useState(true);
  const [hasSession, setHasSession] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!cancelled) {
          setHasSession(Boolean(session));
          setChecking(false);
        }
      } catch (err) {
        console.error("Session check failed:", err);
        if (!cancelled) {
          setHasSession(false);
          setChecking(false);
        }
      }
    })();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (cancelled) return;
        if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN" || event === "INITIAL_SESSION") {
          setHasSession(Boolean(session));
          setChecking(false);
        }
      }
    );

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      });
      if (updateError) throw updateError;

      try {
        await supabase.auth.signOut();
      } catch (signOutErr) {
        console.warn("Sign out after reset failed:", signOutErr?.message);
      }
      setDone(true);
    } catch (err) {
      console.error("Password update failed:", err);
      setError(err.message || "Could not update password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-terracotta"></div>
      </div>
    );
  }

  if (!hasSession && !done) {
    return (
      <div className="min-h-screen bg-white text-charcoal font-body flex items-center justify-center px-4">
        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-8 w-full max-w-md text-center">
          <img src={logo} alt="Terracotta Logo" className="h-14 w-auto mb-4 mx-auto" />
          <h1 className="text-2xl font-heading font-bold text-terracotta mb-2">
            Invalid or expired link
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            This reset link is invalid or has expired. Please request a new one from the admin sign-in page.
          </p>
          <a
            href="/"
            className="inline-block bg-terracotta text-white px-6 py-3 rounded font-medium hover:bg-terracotta/90 transition-all"
          >
            Back to sign in
          </a>
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div className="min-h-screen bg-white text-charcoal font-body flex items-center justify-center px-4">
        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-8 w-full max-w-md text-center">
          <img src={logo} alt="Terracotta Logo" className="h-14 w-auto mb-4 mx-auto" />
          <h1 className="text-2xl font-heading font-bold text-terracotta mb-2">
            Password updated
          </h1>
          <p className="text-sm text-charcoal mb-6">
            You can now sign in with your new password.
          </p>
          <a
            href="/"
            className="inline-block bg-terracotta text-white px-6 py-3 rounded font-medium hover:bg-terracotta/90 transition-all"
          >
            Go to sign in
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-charcoal font-body flex items-center justify-center px-4">
      <div className="bg-white border border-gray-200 rounded-lg shadow-md p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Terracotta Logo" className="h-14 w-auto mb-3" />
          <h1 className="text-2xl font-heading font-bold text-terracotta">
            Set a new password
          </h1>
          <p className="text-sm text-gray-600 mt-2 text-center">
            Please choose a new password for your admin account.
          </p>
        </div>

        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">
              New password
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-terracotta"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">
              Confirm new password
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-terracotta"
            />
            <p className="mt-1 text-xs text-gray-600">Minimum 8 characters.</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-terracotta text-white px-6 py-3 rounded font-medium hover:bg-terracotta/90 transition-all disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update password"}
          </button>
        </form>
      </div>
    </div>
  );
}
