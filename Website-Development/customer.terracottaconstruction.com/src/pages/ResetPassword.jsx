import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import { auth, supabase } from "../supabase";
import logo from "../assets/logo.jpg";

// Handles the redirect from a Supabase password-reset email.
// Supabase's recovery link arrives with a hash fragment (e.g.
// `#access_token=...&type=recovery`). Our supabase client has
// `detectSessionInUrl: true` so it establishes a session automatically.
// The email template itself is managed in Supabase Auth > Email Templates.
function ResetPassword() {
  const [checking, setChecking] = useState(true);
  const [hasSession, setHasSession] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;

    // Initial check - may race with the URL fragment handler, so we
    // also listen for auth state changes below.
    (async () => {
      try {
        const session = await auth.getSession();
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
      await auth.updatePassword(newPassword);
      // Sign out so the user re-authenticates with the new password.
      try {
        await auth.signOut();
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
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md text-center">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin h-10 w-10 rounded-full border-b-2 border-terracotta"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!hasSession && !done) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md text-center">
          <div className="flex flex-col items-center mb-4">
            <img
              src={logo}
              alt="Terracotta Construction"
              className="h-12 w-auto mb-4"
            />
            <h1 className="font-heading text-2xl font-bold text-charcoal mb-2">
              Invalid or expired link
            </h1>
            <p className="text-sm text-gray-600">
              This reset link is invalid or has expired. Please request a new one.
            </p>
          </div>
          <Link
            to="/login"
            className="inline-block bg-terracotta text-white px-6 py-3 rounded-md font-semibold hover:bg-terracotta-dark transition"
          >
            Back to login
          </Link>
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md text-center">
          <div className="flex flex-col items-center mb-6">
            <img
              src={logo}
              alt="Terracotta Construction"
              className="h-12 w-auto mb-4"
            />
            <FiCheckCircle className="text-terracotta mb-3" size={64} />
            <h1 className="font-heading text-3xl font-bold text-charcoal mb-2">
              Password updated
            </h1>
            <p className="text-sm text-charcoal">
              You can now log in with your new password.
            </p>
          </div>
          <Link
            to="/login"
            className="inline-block bg-terracotta text-white px-6 py-3 rounded-md font-semibold hover:bg-terracotta-dark transition"
          >
            Go to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <img
            src={logo}
            alt="Terracotta Construction"
            className="h-12 w-auto mb-3"
          />
          <h1 className="font-heading text-3xl font-bold text-charcoal text-center">
            Set a new password
          </h1>
          <p className="text-sm text-gray-600 mt-2 text-center">
            Please choose a new password for your account.
          </p>
        </div>

        {error && (
          <div className="mb-4 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-md text-sm">
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
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-terracotta"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-terracotta"
            />
            <p className="mt-1 text-xs text-gray-600">
              Minimum 8 characters.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full px-6 py-3 rounded-md font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-terracotta text-white hover:bg-terracotta-dark"
            }`}
          >
            {loading ? "Updating..." : "Update password"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <Link
            to="/login"
            className="text-terracotta hover:text-terracotta-dark font-medium underline"
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
