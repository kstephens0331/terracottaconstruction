import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, Wrench, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/lib/seo-config';
import { generateBreadcrumbSchema, generateServiceSchema, generateFAQSchema } from '@/lib/schema-generators';

export const metadata: Metadata = {
  title: 'Handyman Services Montgomery TX | Home Repairs & Maintenance',
  description: 'Professional handyman services in Montgomery County, TX. Drywall repair, door installation, general repairs, and home maintenance. Licensed & insured. Call (936) 955-4083 for free estimate.',
  keywords: [
    'handyman services Montgomery TX',
    'home repairs Conroe TX',
    'drywall repair The Woodlands',
    'door installation Montgomery County',
    'general repairs Texas',
    'handyman near me',
    'home maintenance services',
    'fix it services Montgomery',
  ],
  alternates: {
    canonical: '/services/handyman',
  },
};

const subServices = [
  {
    name: 'Drywall Repair',
    slug: 'drywall-repair',
    description: 'Hole patching, crack repair, water damage restoration, and texture matching.',
  },
  {
    name: 'Door Installation',
    slug: 'door-installation',
    description: 'Interior and exterior door installation, adjustment, and hardware replacement.',
  },
  {
    name: 'General Repairs',
    slug: 'general-repairs',
    description: 'Comprehensive repair services for all your home maintenance needs.',
  },
];

const faqs = [
  {
    question: 'What types of repairs does your handyman service cover?',
    answer: 'Our handyman services cover a wide range of repairs including drywall patching and repair, door installation and adjustment, window repairs, fixture mounting and installation, caulking and weatherproofing, minor plumbing fixes, basic electrical work, carpentry repairs, painting touch-ups, and general home maintenance tasks.',
  },
  {
    question: 'Do you have minimum job requirements or charges?',
    answer: 'We have a modest minimum service charge to cover travel and setup time, but we welcome jobs of all sizes. Many clients save money by combining several small tasks into one visit. We provide clear pricing upfront so you know exactly what to expect.',
  },
  {
    question: 'Can you help with projects I started but couldn\'t finish?',
    answer: 'Absolutely! We frequently help homeowners complete DIY projects that became more complex than expected. We can assess the work done, determine the best path forward, and complete the project to professional standards.',
  },
  {
    question: 'Do you provide materials or should I purchase them?',
    answer: 'We can handle it either way. We\'re happy to purchase materials and include them in your invoice, or you can provide materials if you prefer. We\'ll advise you on what\'s needed and can recommend specific products for best results.',
  },
  {
    question: 'How do I know if I need a handyman or a specialized contractor?',
    answer: 'Handyman services are ideal for small to medium repairs and maintenance tasks. For major projects like complete bathroom remodels, HVAC work, or significant electrical or plumbing projects, you may need specialized licensed contractors. We\'re happy to assess your project and provide honest guidance.',
  },
];

export default function HandymanPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Handyman Services & Repairs', url: '/services/handyman' },
  ]);

  const serviceSchema = generateServiceSchema(
    'Handyman Services & Repairs',
    'Professional handyman services including drywall repair, door installation, and general home repairs in Montgomery County, TX.',
    '/services/handyman'
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
            <span>Handyman Services & Repairs</span>
          </nav>
          <div className="flex items-center gap-4 mb-4">
            <Wrench className="w-12 h-12" />
            <h1 className="text-4xl md:text-5xl font-heading font-bold">
              Handyman Services & Repairs
            </h1>
          </div>
          <p className="text-xl text-gray-200 max-w-3xl">
            Professional handyman services for all your home repair and maintenance needs in Montgomery County. From minor fixes to major improvements, our skilled technicians handle it all with quality and care.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#924C2E] mb-6">
              Reliable Handyman Services in Montgomery County, Texas
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Every home and business accumulates a list of repairs and improvements that need attention. That sticky door, the holes in the drywall from the old TV mount, the bathroom caulk that&apos;s seen better days, the ceiling fan that needs installation—these tasks pile up and become overwhelming. At Terracotta Construction, our professional handyman services help you tackle that to-do list efficiently and affordably, with skilled technicians who take the same pride in small repairs as they do in major projects.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Finding a reliable handyman can be challenging. You need someone who shows up when promised, does quality work, charges fairly, and treats your home with respect. Terracotta Construction meets all these requirements and more. Our handyman technicians are experienced professionals with diverse skills covering carpentry, drywall, basic plumbing and electrical, painting, and general repairs. They arrive with fully stocked trucks, work cleanly and efficiently, and don&apos;t leave until the job is done right.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              We serve homeowners throughout Montgomery County and the Greater Houston area, handling everything from single small repairs to comprehensive maintenance projects that address multiple issues in one visit. Many of our clients schedule regular maintenance visits to stay ahead of problems and keep their properties in top condition. Whether you&apos;re a busy professional who lacks time for repairs, a senior who needs help with tasks that have become difficult, or simply someone who prefers professional results, our handyman services are designed for you.
            </p>
            <p className="text-lg text-gray-700">
              As part of Terracotta Construction&apos;s full-service offerings, our handyman services complement our landscaping, fencing, and construction capabilities. This means we can handle virtually any property need you have, providing convenience and consistency in service quality. We&apos;re fully licensed, bonded, and insured, giving you peace of mind that your home is in capable, trustworthy hands.
            </p>
          </div>
        </div>
      </section>

      {/* Sub-Services */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#924C2E] mb-8 text-center">
            Our Handyman Services
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {subServices.map((service) => (
              <Link
                key={service.slug}
                href={`/services/handyman/${service.slug}`}
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
              Comprehensive Handyman Solutions for Home and Business
            </h2>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Drywall Repair and Installation
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Drywall damage is one of the most common repair needs in any home. Holes from door knobs, anchors, and accidents; cracks from settling; water stains and damage; and worn textures all detract from your home&apos;s appearance. Our drywall services include patching holes of all sizes from nail holes to large openings, repairing cracks and seams, replacing water-damaged sections, matching existing textures (orange peel, knockdown, smooth, etc.), and priming and painting repaired areas to blend seamlessly. We take care to protect your flooring and furniture, and we clean up thoroughly after every job.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Door Installation and Repair
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Doors that stick, don&apos;t latch properly, or have damaged hardware are annoying and can compromise security. Our door services include installing new interior and exterior doors, adjusting doors that stick or don&apos;t close properly, replacing hinges, knobs, locks, and other hardware, installing weatherstripping and door sweeps, repairing door frames and trim, and installing pet doors and mail slots. Whether you&apos;re upgrading to new doors, improving security, or simply need adjustments to existing doors, we ensure smooth operation and proper fit.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              General Repairs and Maintenance
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Our general handyman services cover the full spectrum of home repair and maintenance needs. These include window repairs and screen replacement, caulking around tubs, sinks, windows, and doors, fixture mounting (TVs, shelves, mirrors, curtain rods), minor plumbing repairs (faucet replacement, toilet repairs, drain clearing), basic electrical work (outlets, switches, light fixtures, ceiling fans), furniture assembly and anchoring, weatherproofing and insulation improvements, garage repairs and organization systems, and pressure washing decks, patios, and siding. No job is too small, and we encourage clients to combine multiple tasks into one visit for efficiency and cost savings.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Carpentry and Woodwork
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Many repairs involve carpentry skills, and our handymen are experienced woodworkers capable of handling a variety of carpentry tasks. We repair and replace trim, baseboards, and moldings, fix squeaky floors and stairs, repair cabinets and drawers, build and install shelving, repair wooden decks and fences, and handle custom woodwork for unique needs. Our carpentry work is precise and professional, matching existing millwork and finishes for seamless results.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Painting and Touch-Ups
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Sometimes you don&apos;t need a full paint job—just touch-ups and small area painting to refresh your space. Our painting services include touch-up painting to cover repairs and scuffs, accent wall painting, painting doors, trim, and cabinets, exterior touch-ups and small area painting, and staining and sealing wood surfaces. We carefully match colors, use quality paints, and apply proper techniques for lasting, professional results.
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
                Why Choose Terracotta Construction for Handyman Services
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                A good handyman makes your life easier by solving problems quickly and correctly. Terracotta Construction&apos;s handyman services deliver that convenience along with the professionalism and reliability you deserve.
              </p>
              <ul className="space-y-4">
                {[
                  'Skilled technicians with broad repair experience',
                  'Fully equipped trucks for efficient service',
                  'Honest pricing with no surprise charges',
                  'Respectful of your home and belongings',
                  'Thorough cleanup after every job',
                  'Reliable scheduling and on-time arrival',
                  'Licensed, bonded, and fully insured',
                  'Satisfaction guaranteed on all work',
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
                Schedule Your Handyman Service
              </h3>
              <p className="text-gray-700 mb-6">
                Have a to-do list that needs attention? Contact us to schedule handyman services. We&apos;ll discuss your needs and provide upfront pricing.
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
            Frequently Asked Questions About Handyman Services
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
            Handyman Services Throughout Montgomery County
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
            Terracotta Construction provides professional handyman services in Montgomery, Conroe, The Woodlands, Magnolia, Willis, Huntsville, Tomball, Spring, Cypress, Katy, and surrounding areas.
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
            Ready to Tackle Your To-Do List?
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Contact Terracotta Construction today to schedule handyman services. From small repairs to comprehensive maintenance, we&apos;re here to help keep your home in top condition.
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
