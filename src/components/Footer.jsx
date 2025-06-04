import React from 'react';
import logo from '../assets/logo.jpg'; // Update path if different
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-[#924C2E] text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
        
        {/* Left: Company Info */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          <img src={logo} alt="Terracotta Construction Logo" className="w-16 h-16 object-contain" />
          <p className="text-sm sm:text-base font-semibold">Terracotta Construction</p>
          <p className="text-sm">Montgomery, TX</p>
          <p className="text-sm">936-955-4083</p>
        </div>

        {/* Center: Built by (hidden backlink) */}
        <div className="relative text-xs font-light">
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

        {/* Right: Navigation */}
        <div className="flex justify-center md:justify-end space-x-6">
          <Link to="/about" className="hover:underline text-sm">About</Link>
          <Link to="/services" className="hover:underline text-sm">Services</Link>
          <Link to="/contact" className="hover:underline text-sm">Contact</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
