import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useLanguage } from "../context/LanguageContext";

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
  const user = auth.currentUser;

  return (
    <div className="w-64 min-w-[250px] bg-[#c1440e] text-white min-h-screen flex flex-col justify-between">
      <div>
        <div className="p-6 font-bold text-2xl border-b border-orange-300">
          Terracotta Construction
        </div>

        {user && (
          <div className="px-6 py-3 text-sm text-white border-b border-orange-300">
            Logged in as <br />
            <span className="font-semibold">{user.email}</span>
          </div>
        )}

        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-4 py-2 rounded font-medium ${
                location.pathname === item.path
                  ? "bg-white text-[#c1440e]"
                  : "hover:bg-orange-500"
              }`}
            >
              {item.name[language]}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 space-y-4">
        <button
          onClick={toggleLanguage}
          className="w-full bg-white text-[#c1440e] py-2 rounded font-semibold hover:bg-orange-200"
        >
          {language === "en" ? "Español" : "English"}
        </button>

        <button
          onClick={() => signOut(auth)}
          className="w-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          <FiLogOut className="mr-2" />
          {language === "en" ? "Logout" : "Cerrar sesión"}
        </button>
      </div>
    </div>
  );
}
