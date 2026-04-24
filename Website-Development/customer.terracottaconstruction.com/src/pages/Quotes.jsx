import React, { useEffect, useState, useRef } from "react";
import { auth, db } from "../supabase";
import Sidebar from "../components/Sidebar";
import Banner from "../components/Banner";
import jsPDF from "jspdf";
import logoImage from "../assets/logo.jpg";

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

function Quotes() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [revisionText, setRevisionText] = useState("");
  const [revisionSubmitting, setRevisionSubmitting] = useState(false);
  const [revisionError, setRevisionError] = useState("");
  const [revisionSuccess, setRevisionSuccess] = useState("");
  const quoteRefs = useRef({});

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const session = await auth.getSession();
        if (!session?.user) return;

        // Get customer profile
        const customer = await db.getCustomerByEmail(session.user.email);
        if (customer) {
          const data = await db.getQuotes(customer.id);
          setQuotes(data);
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("Error loading quotes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  const handlePDFDownload = async (id) => {
    const quote = quotes.find((q) => q.id === id);
    if (!quote) return;

    const doc = new jsPDF();

    const logo = new Image();
    logo.src = logoImage;
    await new Promise((res) => (logo.onload = res));
    doc.addImage(logo, "PNG", 10, 10, 40, 15);

    doc.setFontSize(18);
    doc.setTextColor("#924C2E");
    doc.text("Official Quote", 60, 20);

    doc.setFontSize(12);
    doc.setTextColor("#000");
    doc.text(`Quote #: ${quote.quote_number || quote.id.slice(0, 8)}`, 10, 35);
    doc.text(`Status: ${quote.status}`, 10, 42);
    doc.text(`Date: ${new Date(quote.created_at).toLocaleDateString()}`, 10, 49);
    doc.text(`Total: $${(quote.total || 0).toFixed(2)}`, 10, 56);

    doc.setFontSize(11);
    doc.setTextColor("#333");
    doc.text("Title:", 10, 70);
    doc.setFontSize(10);
    doc.text(quote.title || "Quote", 10, 76, { maxWidth: 190 });

    doc.setFontSize(10);
    doc.setTextColor("#999");
    doc.line(10, 260, 200, 260);
    doc.text("Terracotta Construction", 10, 266);
    doc.text("(936) 955-4083 | (832) 288-0258", 10, 272);
    doc.text("terracottaconstruction@gmail.com", 10, 278);
    doc.text("16724 E. Forrestal St, Montgomery, TX 77316", 10, 284);

    doc.save(`quote-${quote.quote_number || quote.id.slice(0, 8)}.pdf`);
  };

  const handleRevisionSubmit = async () => {
    if (!selectedQuote || !revisionText.trim()) return;

    setRevisionSubmitting(true);
    setRevisionError("");
    setRevisionSuccess("");

    try {
      const session = await auth.getSession();
      if (!session || !session.access_token) {
        setRevisionError(
          "Your session has expired. Please log in again and retry."
        );
        setRevisionSubmitting(false);
        return;
      }

      const response = await fetch(`${BACKEND_URL}/api/quote-revisions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          quoteId: selectedQuote.id,
          message: revisionText.trim(),
        }),
      });

      let payload = null;
      try {
        payload = await response.json();
      } catch (_parseErr) {
        payload = null;
      }

      if (!response.ok || !payload || payload.success !== true) {
        const msg =
          (payload && payload.error) ||
          `Request failed (HTTP ${response.status}).`;
        setRevisionError(msg);
        setRevisionSubmitting(false);
        return;
      }

      setSelectedQuote(null);
      setRevisionText("");
      setRevisionSuccess(
        "Revision request submitted. We will be in touch shortly."
      );
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Revision submit error:", err);
      setRevisionError(
        "We could not reach the server. Please check your connection and try again."
      );
    } finally {
      setRevisionSubmitting(false);
    }
  };

  const statusPill = (status) => {
    const s = (status || "").toLowerCase();
    if (s === "approved") return "bg-green-100 text-green-800";
    if (s === "rejected" || s === "cancelled") return "bg-red-100 text-red-800";
    return "bg-yellow-100 text-yellow-800";
  };

  return (
    <div className="flex min-h-screen bg-cream">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-6 border-b pb-4">
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-charcoal">
                Your Quotes
              </h1>
              <p className="text-sm text-gray-600 font-body mt-1">
                Review and download quotes from Terracotta Construction.
              </p>
            </div>

            <Banner
              type="success"
              message={revisionSuccess}
              onDismiss={() => setRevisionSuccess("")}
            />

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin h-10 w-10 rounded-full border-b-2 border-terracotta"></div>
              </div>
            ) : quotes.length === 0 ? (
              <div className="bg-cream border border-gray-200 rounded-md py-12 px-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-terracotta/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-terracotta"
                    aria-hidden="true"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <h3 className="text-lg font-heading font-semibold text-charcoal mb-2">
                  No quotes yet
                </h3>
                <p className="text-sm text-gray-600 font-body">
                  Your account manager will send your first quote soon. You will
                  see it here when it arrives.
                </p>
              </div>
            ) : (
              <ul className="space-y-6">
                {quotes.map((quote) => (
                  <li
                    key={quote.id}
                    ref={(el) => (quoteRefs.current[quote.id] = el)}
                    className="bg-cream border border-gray-200 p-4 rounded-md"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <p className="text-charcoal font-body font-semibold mb-1">
                          {quote.quote_number ||
                            `Quote #${quote.id.slice(0, 8)}`}
                        </p>
                        <p className="text-sm text-gray-700 font-body mb-1">
                          {quote.title}
                        </p>
                        <p className="text-sm text-gray-600 font-body mb-2">
                          Created:{" "}
                          {new Date(quote.created_at).toLocaleDateString()}
                        </p>
                        <p className="text-sm font-semibold text-charcoal font-body">
                          ${(quote.total || 0).toFixed(2)}
                        </p>
                      </div>
                      <div className="text-right space-y-2">
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-medium ${statusPill(
                            quote.status
                          )}`}
                        >
                          {quote.status}
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handlePDFDownload(quote.id)}
                            className="text-sm bg-white border-2 border-terracotta text-terracotta px-3 py-1 rounded-md font-medium hover:bg-terracotta hover:text-white transition"
                          >
                            Download PDF
                          </button>
                          <button
                            onClick={() => setSelectedQuote(quote)}
                            className="text-sm bg-terracotta text-white px-3 py-1 rounded-md font-medium hover:bg-terracotta-dark transition"
                          >
                            Request Revision
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Revision Modal */}
        {selectedQuote && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Request Revision for Quote #{selectedQuote.id}
              </h2>
              <Banner type="error" message={revisionError} />

              <textarea
                className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
                rows={4}
                value={revisionText}
                onChange={(e) => setRevisionText(e.target.value)}
                placeholder="Describe the changes you need..."
                disabled={revisionSubmitting}
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setSelectedQuote(null);
                    setRevisionText("");
                    setRevisionError("");
                  }}
                  disabled={revisionSubmitting}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 disabled:opacity-60"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRevisionSubmit}
                  disabled={revisionSubmitting || !revisionText.trim()}
                  className="bg-[#c1440e] text-white px-4 py-2 rounded hover:bg-orange-700 disabled:opacity-60"
                >
                  {revisionSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Quotes;
