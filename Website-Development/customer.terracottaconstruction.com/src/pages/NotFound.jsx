import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl md:text-7xl font-heading font-bold text-terracotta mb-4">
        404
      </h1>
      <p className="text-lg text-charcoal font-body mb-6">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="bg-terracotta text-white px-6 py-3 rounded-md font-semibold hover:bg-terracotta-dark transition"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}

export default NotFound;
