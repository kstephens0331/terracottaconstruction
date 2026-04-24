import React, { useState, useEffect } from "react";
import { supabase, auth } from "./lib/supabase";
import { useTranslation } from "react-i18next";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import QuotesList from "./pages/QuotesList";
import QuoteCreate from "./pages/QuoteCreate";
import QuoteDetail from "./pages/QuoteDetail";
import QuoteEdit from "./pages/QuoteEdit";
import WorkOrders from "./pages/WorkOrders";
import Customers from "./pages/Customers";
import Invoices from "./pages/Invoices";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";
import AdminResetPassword from "./pages/AdminResetPassword";
import Sidebar from "./components/Sidebar";
import Toast from "./components/Toast";
import Modal from "./components/Modal";
import logo from "./assets/logo.png";

function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pendingUserId, setPendingUserId] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Forgot-password modal state (admin login)
  const [forgotOpen, setForgotOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);

  const { t, i18n } = useTranslation();

  // Fetch profile when we have a pending user ID
  useEffect(() => {
    if (!pendingUserId) return;

    let cancelled = false;

    const fetchProfile = async () => {
      console.log('Fetching profile for user:', pendingUserId);
      try {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', pendingUserId)
          .single();

        if (cancelled) return;

        console.log('Profile result:', profileError?.message || profileData?.role);

        if (profileError) {
          console.error('Profile error:', profileError.message);
          setLoading(false);
          setPendingUserId(null);
          return;
        }

        if (profileData?.role === 'admin' || profileData?.role === 'employee') {
          setProfile(profileData);
          console.log('Profile loaded, authenticated');
        } else {
          console.log('Not authorized');
          await auth.signOut();
          setUser(null);
        }
      } catch (err) {
        console.error('Profile fetch error:', err);
      } finally {
        if (!cancelled) {
          setLoading(false);
          setPendingUserId(null);
        }
      }
    };

    // Small delay to ensure Supabase is ready
    const timer = setTimeout(fetchProfile, 50);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [pendingUserId]);

  // Listen for auth changes
  useEffect(() => {
    let isMounted = true;

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state change:', event, session?.user?.email);

      if (!isMounted) return;

      if (event === 'INITIAL_SESSION' || event === 'SIGNED_IN') {
        if (session?.user) {
          console.log('Setting user and triggering profile fetch');
          setUser(session.user);
          setPendingUserId(session.user.id);
        } else {
          console.log('No user in session');
          setLoading(false);
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setProfile(null);
        setLoading(false);
        setPendingUserId(null);
      } else if (event === 'TOKEN_REFRESHED') {
        if (session?.user) {
          setUser(session.user);
        }
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { user: authUser } = await auth.signIn(email, password);

      // Get user profile to check role
      const userProfile = await auth.getProfile(authUser.id);

      if (userProfile?.role === 'admin' || userProfile?.role === 'employee') {
        setUser(authUser);
        setProfile(userProfile);
      } else {
        setError("Access denied. Admin privileges required.");
        await auth.signOut();
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await auth.signOut();
    setUser(null);
    setProfile(null);
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "es" : "en";
    i18n.changeLanguage(newLang);
  };

  const openForgot = () => {
    setResetEmail(email);
    setResetError("");
    setResetSuccess(false);
    setForgotOpen(true);
  };

  const closeForgot = () => {
    setForgotOpen(false);
    setResetLoading(false);
  };

  const handleSendReset = async (e) => {
    e.preventDefault();
    setResetError("");
    setResetLoading(true);
    try {
      const { error: resetErr } = await supabase.auth.resetPasswordForEmail(
        resetEmail,
        { redirectTo: window.location.origin + '/admin-reset' }
      );
      if (resetErr) throw resetErr;
      setResetSuccess(true);
    } catch (err) {
      console.error("Password reset error:", err);
      setResetError(err.message || t("login.resetError"));
    } finally {
      setResetLoading(false);
    }
  };

  // `/admin-reset` must be reachable without an admin session because the
  // user arrives there from a password-reset email while signed out.
  // We short-circuit render before the auth gate below.
  if (typeof window !== "undefined" && window.location.pathname === "/admin-reset") {
    return <AdminResetPassword />;
  }

  // Show loading spinner while checking auth or loading profile
  if (loading || (user && !profile)) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-terracotta"></div>
      </div>
    );
  }

  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-white text-charcoal font-body px-4">
        <header className="flex flex-col items-center justify-center py-6 border-b border-gray-200">
          <img src={logo} alt="Terracotta Logo" className="h-14 w-auto mb-2" />
          <h1 className="text-2xl font-heading text-terracotta">Terracotta Construction</h1>
        </header>

        <main className="flex flex-col justify-center items-center mt-20 text-center">
          <h2 className="text-3xl font-heading mb-4">{t("login.title")}</h2>
          <p className="text-lg mb-6">{t("login.prompt")}</p>

          <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-terracotta"
                required
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-terracotta"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-terracotta text-white px-6 py-3 rounded font-medium hover:bg-terracotta/90 transition-all disabled:opacity-50"
            >
              {loading ? "Signing in..." : t("login.button")}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={openForgot}
                className="text-sm text-terracotta hover:underline font-medium"
              >
                {t("login.forgotPassword")}
              </button>
            </div>

            <button
              type="button"
              onClick={toggleLanguage}
              className="w-full bg-primaryYellow text-charcoal px-6 py-3 rounded hover:bg-yellow-400"
            >
              {t("login.toggle")}
            </button>
          </form>
        </main>

        <Modal
          isOpen={forgotOpen}
          onClose={closeForgot}
          title={t("login.resetTitle")}
          size="sm"
        >
          {resetSuccess ? (
            <div className="bg-green-50 border border-green-200 text-green-800 rounded px-4 py-3 text-sm mb-4">
              {t("login.resetSuccess")}
            </div>
          ) : (
            <form onSubmit={handleSendReset} className="space-y-4">
              <p className="text-sm text-gray-600">
                {t("login.resetDescription")}
              </p>

              {resetError && (
                <div className="bg-red-100 border border-red-300 text-red-700 px-3 py-2 rounded text-sm">
                  {resetError}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">
                  {t("login.resetEmailLabel")}
                </label>
                <input
                  type="email"
                  required
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-terracotta"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeForgot}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition"
                >
                  {t("login.resetCancel")}
                </button>
                <button
                  type="submit"
                  disabled={resetLoading}
                  className="px-4 py-2 bg-terracotta text-white rounded font-medium hover:bg-terracotta/90 transition disabled:opacity-50"
                >
                  {resetLoading ? t("login.resetSending") : t("login.resetSend")}
                </button>
              </div>
            </form>
          )}
        </Modal>
      </div>
    );
  }

  return (
    <Router>
      <div className="flex min-h-screen">
        <Sidebar onLogout={handleLogout} user={profile} />
        <div className="flex-grow bg-gray-50">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard user={profile} />} />
            <Route path="/quotes" element={<QuotesList />} />
            <Route path="/quotes/new" element={<QuoteCreate />} />
            <Route path="/quotes/:id" element={<QuoteDetail />} />
            <Route path="/quotes/:id/edit" element={<QuoteEdit />} />
            <Route path="/work-orders" element={<WorkOrders />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Toast />
      </div>
    </Router>
  );
}

export default App;
