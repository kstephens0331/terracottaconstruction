import React from "react";

// Inline status banner used across customer portal pages for
// success / error / info messages. Style by `type`. If `onDismiss`
// is provided, a dismiss button (X) is rendered.
const TYPE_STYLES = {
  success: "bg-green-50 text-green-800 border border-green-200",
  error: "bg-red-50 text-red-800 border border-red-200",
  info: "bg-blue-50 text-blue-800 border border-blue-200",
};

function Banner({ type = "info", message, onDismiss, className = "" }) {
  if (!message) return null;

  const role = type === "error" ? "alert" : "status";
  const palette = TYPE_STYLES[type] || TYPE_STYLES.info;

  return (
    <div
      role={role}
      className={`flex items-start justify-between gap-3 px-4 py-3 rounded-md mb-4 font-body text-sm ${palette} ${className}`.trim()}
    >
      <span className="flex-1">{message}</span>
      {onDismiss ? (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="font-bold leading-none hover:opacity-70 transition"
        >
          &times;
        </button>
      ) : null}
    </div>
  );
}

export default Banner;
