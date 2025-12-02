import React, { useState, useEffect } from "react";
import { supabase, auth } from "./lib/supabase";
import { useTranslation } from "react-i18next";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Quotes from "./pages/Quotes";
import WorkOrders from "./pages/WorkOrders";
import Customers from "./pages/Customers";
import Invoices from "./pages/Invoices";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";
import Sidebar from "./components/Sidebar";
import Toast from "./components/Toast";
import logo from "./assets/logo.png";

function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { t, i18n } = useTranslation();

  // Check for existing session on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const session = await auth.getSession();
        if (session?.user) {
          const userProfile = await auth.getProfile(session.user.id);
          if (userProfile?.role === 'admin' || userProfile?.role === 'employee') {
            setUser(session.user);
            setProfile(userProfile);
          } else {
            // Not authorized
            await auth.signOut();
          }
        }
      } catch (err) {
        console.error('Auth init error:', err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // Listen for auth changes
    const { data: { subscription } } = auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        try {
          const userProfile = await auth.getProfile(session.user.id);
          if (userProfile?.role === 'admin' || userProfile?.role === 'employee') {
            setUser(session.user);
            setProfile(userProfile);
          } else {
            setError("Access denied. Admin privileges required.");
            await auth.signOut();
          }
        } catch (err) {
          console.error('Profile fetch error:', err);
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
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

  // Show loading spinner while checking auth
  if (loading && !user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-terracotta"></div>
      </div>
    );
  }

  if (!user) {
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

            <button
              type="button"
              onClick={toggleLanguage}
              className="w-full bg-primaryYellow text-charcoal px-6 py-3 rounded hover:bg-yellow-400"
            >
              {t("login.toggle")}
            </button>
          </form>
        </main>
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
            <Route path="/quotes" element={<Quotes />} />
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
