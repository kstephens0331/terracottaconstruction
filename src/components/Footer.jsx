import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Update path if needed

function Footer() {
  return (
    <footer className="bg-[#924C2E] text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Left: Company Info */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          <img src={logo} alt="Terracotta Construction Logo" className="w-16 h-16 object-contain" />
          <p className="text-sm sm:text-base font-semibold">Terracotta Construction</p>
          <p className="text-sm">Montgomery, TX</p>
          <p className="text-sm">936-955-4083</p>
          <p className="text-sm break-words">admin@terracottaconstruction.com</p>
        </div>

        {/* Center: Rights + Hidden Backlink */}
        <div className="relative text-xs text-white text-center flex flex-col justify-center items-center">
          <p>© 2025 Terracotta Construction. All rights reserved.</p>
          <span className="sr-only">Built by StephensCode LLC</span>
          <a
            href="https://stephenscode.dev"
            style={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '1px',
              color: 'transparent',
              userSelect: 'none',
              pointerEvents: 'none'
            }}
          >
            Built by StephensCode LLC
          </a>
        </div>

        {/* Right: Navigation links (stacked) */}
        <div className="flex flex-col items-center md:items-end space-y-2">
          <Link to="/about" className="hover:underline text-sm">About</Link>
          <Link to="/services" className="hover:underline text-sm">Services</Link>
          <Link to="/contact" className="hover:underline text-sm">Contact</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
