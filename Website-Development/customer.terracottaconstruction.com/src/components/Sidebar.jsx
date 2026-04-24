import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { auth } from "../supabase";
import { useLanguage } from "../context/LanguageContext";
import logo from "../assets/logo.jpg";

const navItems = [
  { name: { en: "Dashboard", es: "Tablero" }, path: "/" },
  { name: { en: "Quotes", es: "Cotizaciones" }, path: "/quotes" },
  { name: { en: "Work Orders", es: "Órdenes" }, path: "/work-orders" },
  { name: { en: "Submit Request", es: "Enviar Orden" }, path: "/submit-work-order" },
  { name: { en: "Settings", es: "Configuración" }, path: "/settings" },
];

export default function Sidebar() {
  const location = useLocation();
  const { language, toggleLanguage } = useLanguage();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const session = await auth.getSession();
      setUser(session?.user || null);
    };
    getUser();
  }, []);

  return (
    <div className="w-64 min-w-[250px] bg-charcoal text-white min-h-screen flex flex-col justify-between">
      <div>
        <div className="p-4 border-b border-gray-700">
          <div className="bg-white rounded-md p-3 flex items-center justify-center">
            <img src={logo} alt="Terracotta Construction" className="h-12 w-auto" />
          </div>
          <h2 className="font-heading text-lg font-semibold text-center mt-3">
            Customer Portal
          </h2>
        </div>

        {user && (
          <div className="px-6 py-3 text-sm text-gray-300 border-b border-gray-700 font-body">
            {language === "en" ? "Logged in as" : "Conectado como"}
            <br />
            <span className="font-semibold text-white">{user.email}</span>
          </div>
        )}

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-2 rounded font-body font-medium transition ${
                  isActive
                    ? "bg-terracotta text-white"
                    : "text-gray-200 hover:bg-gray-100 hover:text-charcoal"
                }`}
              >
                {item.name[language]}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 space-y-3">
        <button
          onClick={toggleLanguage}
          className="w-full border-2 border-terracotta text-terracotta bg-white py-2 rounded-full font-body font-semibold hover:bg-terracotta hover:text-white transition"
        >
          {language === "en" ? "Español" : "English"}
        </button>

        <button
          onClick={() => auth.signOut()}
          className="w-full flex items-center justify-center bg-terracotta hover:bg-terracotta-dark text-white px-4 py-2 rounded font-body font-semibold transition"
        >
          <FiLogOut className="mr-2" />
          {language === "en" ? "Logout" : "Cerrar sesión"}
        </button>
      </div>
    </div>
  );
}
