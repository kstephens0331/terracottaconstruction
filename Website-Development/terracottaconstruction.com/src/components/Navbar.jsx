import { useState } from 'react';
import logo from '../assets/logo.jpg';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#924C2E] text-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo + Name */}
        <a href="/" className="flex items-center space-x-3 hover:opacity-90">
          <img src={logo} alt="Terracotta Construction logo" className="h-12 w-12 object-contain" />
          <span className="text-xl font-bold tracking-wide">Terracotta Construction</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="/" className="hover:underline">Home</a>
          <a href="/services" className="hover:underline">Services</a>
          <a href="/about" className="hover:underline">About</a>
          <a href="/contact" className="hover:underline">Contact</a>
          <a
            href="https://customer.terracottaconstruction.com"
            className="bg-white text-[#924C2E] px-4 py-2 rounded shadow hover:bg-gray-100 font-semibold"
          >
            Log In
          </a>
        </nav>

        {/* Hamburger (Mobile Only) */}
        <button
  className="md:hidden focus:outline-none"
  onClick={() => setMenuOpen(!menuOpen)}
  aria-label="Toggle menu"
>
 <svg className="w-6 h-6" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
  {menuOpen ? (
    <path d="M6 18L18 6M6 6l12 12" stroke="white" strokeWidth="2" strokeLinecap="round" />
  ) : (
    <path d="M4 6h16M4 12h16M4 18h16" stroke="white" strokeWidth="2" strokeLinecap="round" />
  )}
</svg>
</button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-[#924C2E]">
          <a href="/" className="block hover:underline">Home</a>
          <a href="/services" className="block hover:underline">Services</a>
          <a href="/about" className="block hover:underline">About</a>
          <a href="/contact" className="block hover:underline">Contact</a>
          <a
            href="https://customer.terracottaconstruction.com"
            className="inline-block bg-white text-[#924C2E] px-4 py-2 rounded shadow hover:bg-gray-100 font-semibold"
          >
            Log In
          </a>
        </div>
      )}
    </header>
  );
}

export default Navbar;