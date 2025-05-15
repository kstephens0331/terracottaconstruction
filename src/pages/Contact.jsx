import React from 'react';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8 space-y-8">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-semibold text-[#924C2E]">Contact Terracotta Construction</h2>
          <p className="text-sm text-gray-700">
            We’re here to help. Reach out by phone, email, or the form below.
          </p>
        </div>

        <div className="bg-gray-50 rounded-md p-4 border border-gray-200">
          <h3 className="text-lg font-medium text-[#924C2E] mb-2">Business Info</h3>
          <ul className="space-y-1 text-sm text-gray-800">
            <li><strong>Phone:</strong> (936) 955-4083</li>
            <li><strong>Phone:</strong> (832) 288-0258</li>
            <li><strong>Email:</strong> <a href="mailto:admin@terracottaconstruction.com" className="text-blue-600 underline">admin@terracottaconstruction.com</a></li>
            <li><strong>Address:</strong> 16724 E. Forrestal St, Montgomery, TX 77316</li>
          </ul>
        </div>

        <form
          action="https://formspree.io/f/xgvkvnqj"
          method="POST"
          className="space-y-5"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-md shadow-sm focus:ring-[#924C2E] focus:border-[#924C2E] focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-md shadow-sm focus:ring-[#924C2E] focus:border-[#924C2E] focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-md shadow-sm focus:ring-[#924C2E] focus:border-[#924C2E] focus:outline-none"
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-[#924C2E] text-white py-3 rounded-md font-medium hover:bg-[#7a3f28] transition duration-200"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
