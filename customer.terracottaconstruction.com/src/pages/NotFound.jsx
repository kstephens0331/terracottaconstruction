import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-[#c1440e] mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="bg-[#c1440e] text-white px-6 py-2 rounded hover:bg-orange-700 transition"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}

export default NotFound;
