'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X, ChevronDown, Phone, LogIn } from 'lucide-react';
import { siteConfig } from '@/lib/seo-config';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-[#924C2E] text-white py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <a href={`tel:${siteConfig.business.phone}`} className="flex items-center gap-1 hover:text-gray-200">
              <Phone className="w-4 h-4" />
              {siteConfig.business.phone}
            </a>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <span>Serving Montgomery County & Greater Houston Area</span>
            <div className="flex items-center gap-4 border-l border-white/30 pl-4">
              <a
                href="https://customer.terracottaconstruction.com"
                className="flex items-center gap-1 hover:text-gray-200 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LogIn className="w-4 h-4" />
                Customer Portal
              </a>
              <a
                href="https://admin.terracottaconstruction.com"
                className="flex items-center gap-1 hover:text-gray-200 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LogIn className="w-4 h-4" />
                Admin
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.jpg"
              alt="Terracotta Construction Logo"
              width={180}
              height={60}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-[#924C2E] font-medium transition">
              Home
            </Link>

            {/* Services Dropdown */}
            <div className="relative group">
              <button
                className="flex items-center gap-1 text-gray-700 hover:text-[#924C2E] font-medium transition"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                Services
                <ChevronDown className="w-4 h-4" />
              </button>
              <div
                className={`absolute top-full left-0 w-64 bg-white shadow-lg rounded-md py-2 ${servicesOpen ? 'block' : 'hidden'} group-hover:block`}
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                {siteConfig.services.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#924C2E]"
                  >
                    {service.name}
                  </Link>
                ))}
                <div className="border-t mt-2 pt-2">
                  <Link
                    href="/services"
                    className="block px-4 py-2 text-[#924C2E] font-medium hover:bg-gray-100"
                  >
                    View All Services
                  </Link>
                </div>
              </div>
            </div>

            <Link href="/locations" className="text-gray-700 hover:text-[#924C2E] font-medium transition">
              Service Areas
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-[#924C2E] font-medium transition">
              About Us
            </Link>
            <Link href="/partners" className="text-gray-700 hover:text-[#924C2E] font-medium transition">
              Partners
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-[#924C2E] font-medium transition">
              Contact
            </Link>
            <Link
              href="/contact"
              className="bg-[#924C2E] text-white px-6 py-2 rounded-md font-medium hover:bg-[#7a3f28] transition"
            >
              Free Estimate
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden pb-4">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-[#924C2E] font-medium"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/services"
                className="text-gray-700 hover:text-[#924C2E] font-medium"
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
              <div className="pl-4 flex flex-col gap-2">
                {siteConfig.services.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="text-gray-600 hover:text-[#924C2E] text-sm"
                    onClick={() => setIsOpen(false)}
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
              <Link
                href="/locations"
                className="text-gray-700 hover:text-[#924C2E] font-medium"
                onClick={() => setIsOpen(false)}
              >
                Service Areas
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-[#924C2E] font-medium"
                onClick={() => setIsOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/partners"
                className="text-gray-700 hover:text-[#924C2E] font-medium"
                onClick={() => setIsOpen(false)}
              >
                Partners
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-[#924C2E] font-medium"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/contact"
                className="bg-[#924C2E] text-white px-6 py-2 rounded-md font-medium text-center hover:bg-[#7a3f28] transition"
                onClick={() => setIsOpen(false)}
              >
                Free Estimate
              </Link>

              {/* Portal Links */}
              <div className="border-t pt-4 mt-2 flex flex-col gap-2">
                <span className="text-sm text-gray-500 font-medium">Portal Login</span>
                <a
                  href="https://customer.terracottaconstruction.com"
                  className="flex items-center gap-2 text-gray-700 hover:text-[#924C2E]"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                >
                  <LogIn className="w-4 h-4" />
                  Customer Portal
                </a>
                <a
                  href="https://admin.terracottaconstruction.com"
                  className="flex items-center gap-2 text-gray-700 hover:text-[#924C2E]"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                >
                  <LogIn className="w-4 h-4" />
                  Admin Portal
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
