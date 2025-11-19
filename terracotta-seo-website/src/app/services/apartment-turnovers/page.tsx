import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, Home, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/lib/seo-config';
import { generateBreadcrumbSchema, generateServiceSchema, generateFAQSchema } from '@/lib/schema-generators';

export const metadata: Metadata = {
  title: 'Apartment Turnover Services Montgomery TX | Make Ready & Property Maintenance',
  description: 'Fast, thorough apartment turnover and make-ready services in Montgomery County, TX. Minimize vacancy time with professional cleaning, repairs, and maintenance. Call (936) 955-4083.',
  keywords: [
    'apartment turnover Montgomery TX',
    'make ready services Conroe',
    'rental property maintenance The Woodlands',
    'apartment maintenance Montgomery County',
    'property turnover services Texas',
    'rental unit preparation',
    'landlord services Houston area',
    'vacancy turnover cleaning',
  ],
  alternates: {
    canonical: '/services/apartment-turnovers',
  },
};

const subServices = [
  {
    name: 'Make Ready Services',
    slug: 'make-ready-services',
    description: 'Complete unit preparation including cleaning, repairs, and updates for new tenants.',
  },
  {
    name: 'Property Maintenance',
    slug: 'property-maintenance',
    description: 'Ongoing maintenance programs for rental properties and apartment communities.',
  },
];

const faqs = [
  {
    question: 'How quickly can you turn over an apartment unit?',
    answer: 'Standard turnovers typically take 2-5 days depending on the unit condition and scope of work required. For rush situations, we offer expedited service with extended hours to minimize your vacancy time. We work with you to meet your scheduling needs.',
  },
  {
    question: 'What is included in your make-ready service?',
    answer: 'Our comprehensive make-ready service includes thorough cleaning of all areas, paint touch-ups or full repainting, carpet cleaning or replacement, appliance cleaning and testing, fixture repairs and updates, HVAC filter changes, lock rekeying, and final inspection. We customize services based on unit needs and your budget.',
  },
  {
    question: 'Do you work with property management companies?',
    answer: 'Yes, we work extensively with property management companies, landlords, and real estate investors throughout Montgomery County. We offer volume pricing, priority scheduling, and streamlined communication for property managers handling multiple units.',
  },
  {
    question: 'Can you handle large apartment communities?',
    answer: 'Absolutely. We have the capacity to handle turnover and maintenance for large apartment communities with multiple simultaneous units. We scale our crews and resources to meet your needs while maintaining consistent quality.',
  },
  {
    question: 'Do you provide ongoing maintenance after turnover?',
    answer: 'Yes, we offer ongoing property maintenance services including routine inspections, preventive maintenance, on-call repairs, and seasonal services. Many property managers find that regular maintenance reduces costly emergency repairs and extends the life of property components.',
  },
];

export default function ApartmentTurnoversPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Apartment Turnovers', url: '/services/apartment-turnovers' },
  ]);

  const serviceSchema = generateServiceSchema(
    'Apartment Turnover & Make Ready Services',
    'Professional apartment turnover and make-ready services for property managers and landlords in Montgomery County, TX.',
    '/services/apartment-turnovers'
  );

  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      {/* Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="bg-[#924C2E] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <nav className="text-sm mb-4 text-gray-200">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="hover:text-white">Services</Link>
            <span className="mx-2">/</span>
            <span>Apartment Turnovers</span>
          </nav>
          <div className="flex items-center gap-4 mb-4">
            <Home className="w-12 h-12" />
            <h1 className="text-4xl md:text-5xl font-heading font-bold">
              Apartment Turnover Services
            </h1>
          </div>
          <p className="text-xl text-gray-200 max-w-3xl">
            Fast, thorough apartment turnovers and make-ready services for property managers and landlords throughout Montgomery County. Minimize vacancy time and maximize rental appeal with professional turnover solutions.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#924C2E] mb-6">
              Professional Apartment Turnover Services in Montgomery County
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Every day a rental unit sits vacant is money lost. Property managers and landlords throughout Montgomery County trust Terracotta Construction to turn over apartments quickly and thoroughly, minimizing vacancy periods while ensuring units are move-in ready for quality tenants. Our comprehensive make-ready services address every aspect of unit preparation, from deep cleaning to repairs to cosmetic updates, delivering rent-ready results that help you command competitive rental rates and attract reliable tenants.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              The turnover process presents a critical opportunity to address maintenance issues, make improvements, and refresh the unit&apos;s appearance. Rushed or incomplete turnovers lead to tenant complaints, maintenance callbacks, and negative reviews. Terracotta Construction&apos;s systematic approach ensures nothing is missed, with trained crews who know exactly what needs attention and how to complete it efficiently without sacrificing quality.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              We understand the economics of rental property management. Our goal is to deliver turnovers that represent the best value—not the cheapest price, but the smartest investment in terms of speed, quality, and long-term property condition. We help you balance immediate costs against factors like tenant retention, competitive positioning, and avoided maintenance issues down the road.
            </p>
            <p className="text-lg text-gray-700">
              Whether you manage a single rental house, a small multifamily property, or a large apartment community, Terracotta Construction has the resources and expertise to handle your turnover needs. We offer flexible scheduling, volume pricing for multiple units, and consistent quality that property managers rely on.
            </p>
          </div>
        </div>
      </section>

      {/* Sub-Services */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#924C2E] mb-8 text-center">
            Our Apartment Services
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {subServices.map((service) => (
              <Link
                key={service.slug}
                href={`/services/apartment-turnovers/${service.slug}`}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition group"
              >
                <h3 className="text-xl font-heading font-semibold text-[#924C2E] mb-3 flex items-center gap-2">
                  {service.name}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </h3>
                <p className="text-gray-700">{service.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Service Description */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-heading font-bold text-[#924C2E] mb-6">
              Comprehensive Turnover and Property Maintenance Solutions
            </h2>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Complete Make-Ready Services
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Our make-ready service transforms vacated units into move-in ready homes that impress prospective tenants. The process begins with a thorough assessment to identify all work needed, followed by systematic completion of each task. Cleaning includes deep cleaning of kitchens with appliance interiors, bathrooms with grout and fixture detailing, all flooring, windows inside and out, and all surfaces and fixtures throughout the unit. We clean HVAC vents and replace filters, ensuring good air quality from day one.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Painting services include touch-ups to address scuffs, marks, and nail holes, or full repainting when needed. We use quality, durable paints in neutral colors that appeal to a broad range of tenants while hiding wear. Our painters work efficiently to minimize turnover time while delivering clean, professional results.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Flooring services address carpet cleaning, stretching, or replacement; vinyl and tile cleaning, repair, or replacement; and hardwood cleaning and refinishing. We assess flooring condition honestly and recommend the most cost-effective approach that meets your standards and budget.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Repairs and Fixture Updates
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Turnovers are the ideal time to address maintenance issues and make updates that improve the unit&apos;s appeal. Our repair services include drywall patching and repair, door and window adjustments, cabinet repairs and hardware replacement, plumbing fixture repairs and replacement, electrical outlet and switch replacement, appliance testing and minor repairs, caulking in kitchens and bathrooms, and weatherstripping replacement. We also handle fixture updates like modern light fixtures, new faucets, updated cabinet hardware, and fresh outlet and switch covers that give the unit a newer, more cared-for appearance at modest cost.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Security and Safety
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Security is paramount in rental properties. Our turnover service includes rekeying all locks or installing new locksets, testing smoke and carbon monoxide detectors (replacing batteries or units as needed), checking window locks and security features, inspecting balcony and stair railings, and verifying exterior lighting functions. These steps protect your tenants and reduce your liability.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Ongoing Property Maintenance
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Beyond turnover services, we provide ongoing maintenance to keep your properties in excellent condition. Regular maintenance programs include HVAC service and filter changes, gutter cleaning, exterior cleaning and pressure washing, landscape maintenance, common area upkeep, and on-call repairs. Preventive maintenance extends equipment life, prevents costly emergency repairs, and keeps tenants satisfied. We offer customized maintenance programs based on your properties&apos; needs and your budget.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Emergency and On-Call Services
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Property emergencies don&apos;t wait for business hours. We provide emergency response for your rental properties including water damage mitigation, emergency repairs to restore habitability, storm damage cleanup, and security issues like broken windows or doors. Fast response protects your property and your tenants while demonstrating your commitment to their well-being.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold text-[#924C2E] mb-6">
                Why Property Managers Choose Terracotta Construction
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Managing rental properties requires reliable service providers who understand the business. Terracotta Construction is a trusted partner to property managers and landlords throughout Montgomery County because we deliver consistent quality, reliable scheduling, and fair pricing.
              </p>
              <ul className="space-y-4">
                {[
                  'Fast turnovers that minimize vacancy time',
                  'Thorough make-ready that attracts quality tenants',
                  'Consistent quality across all units and properties',
                  'Flexible scheduling including rush service',
                  'Volume pricing for multiple units',
                  'Clear communication and detailed reporting',
                  'Licensed, bonded, and fully insured',
                  'Single point of contact for all property needs',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-md">
              <h3 className="text-2xl font-heading font-bold text-[#924C2E] mb-6">
                Schedule Turnover Services
              </h3>
              <p className="text-gray-700 mb-6">
                Have units that need turnover? Contact us to discuss your needs. We&apos;ll assess your properties and provide competitive pricing.
              </p>
              <div className="space-y-4">
                <a
                  href={`tel:${siteConfig.business.phone}`}
                  className="flex items-center gap-3 text-lg font-semibold text-[#924C2E] hover:text-[#7a3f28]"
                >
                  <Phone className="w-6 h-6" />
                  {siteConfig.business.phone}
                </a>
              </div>
              <Link
                href="/contact"
                className="inline-block w-full bg-[#924C2E] text-white px-6 py-3 rounded-md font-semibold text-center hover:bg-[#7a3f28] transition mt-6"
              >
                Request Service
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-[#924C2E] mb-8 text-center">
            Frequently Asked Questions About Apartment Turnovers
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-100 rounded-lg p-6">
                <h3 className="text-xl font-heading font-semibold text-[#924C2E] mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-heading font-bold mb-8">
            Apartment Turnover Services Throughout Montgomery County
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
            Terracotta Construction provides apartment turnover and property maintenance services in Montgomery, Conroe, The Woodlands, Magnolia, Willis, Huntsville, Tomball, Spring, Cypress, Katy, and surrounding areas.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {siteConfig.serviceAreas.map((area) => (
              <Link
                key={area.slug}
                href={`/locations/${area.slug}`}
                className="bg-white/10 hover:bg-white/20 rounded-lg p-3 transition"
              >
                <span className="font-semibold">{area.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#924C2E] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Ready to Streamline Your Turnovers?
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Contact Terracotta Construction today to discuss your apartment turnover and property maintenance needs. We&apos;ll help you minimize vacancy time and maximize your rental income.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-[#924C2E] px-8 py-4 rounded-md font-semibold text-lg hover:bg-gray-100 transition inline-block"
            >
              Schedule Service
            </Link>
            <a
              href={`tel:${siteConfig.business.phone}`}
              className="border-2 border-white text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-white/10 transition inline-flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              {siteConfig.business.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
