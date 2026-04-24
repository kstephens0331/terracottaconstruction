import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiX } from "react-icons/fi";
import { auth } from "../supabase";
import logo from "../assets/logo.jpg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Forgot-password modal state
  const [forgotOpen, setForgotOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await auth.signIn(email, password);
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const openForgot = () => {
    setResetEmail(email);
    setResetError("");
    setResetSent(false);
    setForgotOpen(true);
  };

  const closeForgot = () => {
    setForgotOpen(false);
    setResetLoading(false);
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setResetError("");
    setResetLoading(true);
    try {
      await auth.resetPasswordForEmail(resetEmail);
      setResetSent(true);
    } catch (err) {
      console.error("Password reset error:", err);
      setResetError(err.message || "Could not send reset email. Please try again.");
    } finally {
      setResetLoading(false);
    }
  };

  // Auto-close the modal 3 seconds after a successful send.
  useEffect(() => {
    if (!resetSent) return undefined;
    const t = setTimeout(() => {
      setForgotOpen(false);
      setResetSent(false);
    }, 3000);
    return () => clearTimeout(t);
  }, [resetSent]);

  // Close modal on escape key for parity with admin Modal UX.
  useEffect(() => {
    if (!forgotOpen) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") closeForgot();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [forgotOpen]);

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
            Customer Login
          </h1>
        </div>

        {error && (
          <div className="mb-4 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-terracotta"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-terracotta"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="mt-2 text-right">
              <button
                type="button"
                onClick={openForgot}
                className="text-sm text-terracotta hover:text-terracotta-dark font-medium underline"
              >
                Forgot password?
              </button>
            </div>
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
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-terracotta hover:text-terracotta-dark font-medium underline"
          >
            Register here
          </Link>
        </div>
      </div>

      {forgotOpen && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
          onClick={closeForgot}
        >
          <div
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeForgot}
              aria-label="Close"
              className="absolute top-3 right-3 text-gray-400 hover:text-charcoal transition"
            >
              <FiX size={20} />
            </button>

            <h2 className="font-heading text-xl font-semibold text-charcoal mb-2">
              Reset your password
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Enter your account email and we will send you a link to reset
              your password.
            </p>

            {resetSent ? (
              <div className="bg-green-50 border border-green-200 text-green-800 rounded-md px-4 py-3 text-sm">
                Check your email for a reset link.
              </div>
            ) : (
              <form onSubmit={handleResetSubmit} className="space-y-4">
                {resetError && (
                  <div className="bg-red-100 border border-red-300 text-red-700 px-3 py-2 rounded-md text-sm">
                    {resetError}
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-terracotta"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={closeForgot}
                    className="flex-1 px-4 py-2 border border-gray-300 text-charcoal rounded-md font-medium hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={resetLoading}
                    className={`flex-1 px-4 py-2 rounded-md font-semibold transition ${
                      resetLoading
                        ? "bg-gray-400 cursor-not-allowed text-white"
                        : "bg-terracotta text-white hover:bg-terracotta-dark"
                    }`}
                  >
                    {resetLoading ? "Sending..." : "Send reset link"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
