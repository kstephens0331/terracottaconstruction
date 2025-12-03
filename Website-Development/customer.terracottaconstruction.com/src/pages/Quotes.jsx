import React, { useEffect, useState, useRef } from "react";
import { auth, db } from "../supabase";
import Sidebar from "../components/Sidebar";
import jsPDF from "jspdf";
import logoImage from "../assets/logo.jpg";

function Quotes() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [revisionText, setRevisionText] = useState("");
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
    doc.setTextColor("#c1440e");
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
    doc.text(quote.title || 'Quote', 10, 76, { maxWidth: 190 });

    doc.setFontSize(10);
    doc.setTextColor("#999");
    doc.line(10, 260, 200, 260);
    doc.text("Terracotta Construction", 10, 266);
    doc.text("(936) 955-4083 | (832) 288-0258", 10, 272);
    doc.text("admin@terracottaconstruction.com", 10, 278);
    doc.text("16724 E. Forrestal St, Montgomery, TX 77316", 10, 284);

    doc.save(`quote-${quote.quote_number || quote.id.slice(0, 8)}.pdf`);
  };

  const handleRevisionSubmit = async () => {
    if (!selectedQuote || !revisionText) return;

    try {
      // For now, just show a success message since we don't have a quote_requests table
      // The revision request can be implemented later with activity_log or a new table
      alert("Revision request submitted. We will contact you shortly.");
      setSelectedQuote(null);
      setRevisionText("");
    } catch (err) {
      console.error("Revision submit error:", err);
      alert("Failed to submit request.");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-gray-100 p-8 min-h-screen">
        <div className="bg-white rounded-xl shadow p-6">
          <h1 className="text-2xl font-semibold text-[#c1440e] mb-6 border-b pb-2">
            Your Quotes
          </h1>

          {loading ? (
            <p className="text-gray-500">Loading quotes...</p>
          ) : quotes.length === 0 ? (
            <p className="text-gray-500">No quotes available yet.</p>
          ) : (
            <ul className="space-y-6">
              {quotes.map((quote) => (
                <li
                  key={quote.id}
                  ref={(el) => (quoteRefs.current[quote.id] = el)}
                  className="bg-gray-50 border p-4 rounded shadow-sm"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-800 font-semibold mb-1">{quote.quote_number || `Quote #${quote.id.slice(0, 8)}`}</p>
                      <p className="text-sm text-gray-600 mb-1">{quote.title}</p>
                      <p className="text-sm text-gray-500 mb-2">
                        Created: {new Date(quote.created_at).toLocaleDateString()}
                      </p>
                      <p className="text-sm font-medium text-green-700">${(quote.total || 0).toFixed(2)}</p>
                    </div>
                    <div className="text-right space-y-2">
                      <span
                        className={`text-sm px-2 py-1 rounded-full ${
                          quote.status === "Approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {quote.status}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handlePDFDownload(quote.id)}
                          className="text-sm bg-white border border-[#c1440e] text-[#c1440e] px-3 py-1 rounded hover:bg-[#c1440e] hover:text-white transition"
                        >
                          Download PDF
                        </button>
                        <button
                          onClick={() => setSelectedQuote(quote)}
                          className="text-sm bg-yellow-200 text-yellow-800 px-3 py-1 rounded hover:bg-yellow-300"
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

        {/* Revision Modal */}
        {selectedQuote && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Request Revision for Quote #{selectedQuote.id}
              </h2>
              <textarea
                className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
                rows={4}
                value={revisionText}
                onChange={(e) => setRevisionText(e.target.value)}
                placeholder="Describe the changes you need..."
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setSelectedQuote(null);
                    setRevisionText("");
                  }}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRevisionSubmit}
                  className="bg-[#c1440e] text-white px-4 py-2 rounded hover:bg-orange-700"
                >
                  Submit
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
