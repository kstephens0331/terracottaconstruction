import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { siteConfig } from '@/lib/seo-config';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Image
              src="/logo.jpg"
              alt="Terracotta Construction Logo"
              width={180}
              height={60}
              className="h-12 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-gray-300 text-sm mb-4">
              Professional construction, landscaping, and handyman services in Montgomery County, TX.
              Licensed, insured, and committed to quality craftsmanship.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a
                href={`tel:${siteConfig.business.phone}`}
                className="flex items-center gap-2 text-gray-300 hover:text-[#C1440E]"
              >
                <Phone className="w-4 h-4" />
                {siteConfig.business.phone}
              </a>
              <a
                href={`tel:${siteConfig.business.phoneAlt}`}
                className="flex items-center gap-2 text-gray-300 hover:text-[#C1440E]"
              >
                <Phone className="w-4 h-4" />
                {siteConfig.business.phoneAlt}
              </a>
              <a
                href={`mailto:${siteConfig.business.email}`}
                className="flex items-center gap-2 text-gray-300 hover:text-[#C1440E]"
              >
                <Mail className="w-4 h-4" />
                {siteConfig.business.email}
              </a>
              <div className="flex items-start gap-2 text-gray-300">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>
                  {siteConfig.business.address.street}<br />
                  {siteConfig.business.address.city}, {siteConfig.business.address.state} {siteConfig.business.address.zip}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Clock className="w-4 h-4" />
                Mon-Fri: 7AM-6PM | Sat: 8AM-2PM
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2 text-sm">
              {siteConfig.services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-gray-300 hover:text-[#C1440E] transition"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Service Areas</h3>
            <ul className="space-y-2 text-sm">
              {siteConfig.serviceAreas.slice(0, 8).map((area) => (
                <li key={area.slug}>
                  <Link
                    href={`/locations/${area.slug}`}
                    className="text-gray-300 hover:text-[#C1440E] transition"
                  >
                    {area.name}, {area.state}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/locations"
                  className="text-[#C1440E] hover:text-white transition font-medium"
                >
                  View All Areas →
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-300 hover:text-[#C1440E] transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-[#C1440E] transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-[#C1440E] transition">
                  All Services
                </Link>
              </li>
              <li>
                <Link href="/locations" className="text-gray-300 hover:text-[#C1440E] transition">
                  Service Areas
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-[#C1440E] transition">
                  Contact Us
                </Link>
              </li>
            </ul>

            {/* CTA */}
            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-block bg-[#924C2E] text-white px-6 py-3 rounded-md font-medium hover:bg-[#7a3f28] transition text-sm"
              >
                Get Free Estimate
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
              <p>
                © {currentYear} {siteConfig.business.name}. All rights reserved.
              </p>
              <span className="hidden md:inline">|</span>
              <p>
                Built by{' '}
                <a
                  href="https://stephenscode.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C1440E] hover:text-white transition"
                >
                  StephensCode LLC
                </a>
              </p>
            </div>
            <div className="flex gap-4">
              <Link href="/privacy-policy" className="hover:text-white transition">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:text-white transition">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
