import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, Warehouse, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/lib/seo-config';
import { generateBreadcrumbSchema, generateServiceSchema, generateFAQSchema } from '@/lib/schema-generators';

export const metadata: Metadata = {
  title: 'Metal Building Construction Montgomery TX | Steel Workshops & Storage',
  description: 'Custom metal building construction in Montgomery County, TX. Steel workshops, storage buildings, and custom structures. Quality construction, licensed & insured. Call (936) 955-4083.',
  keywords: [
    'metal building construction Montgomery TX',
    'steel building Conroe TX',
    'metal workshop The Woodlands',
    'storage building Montgomery County',
    'custom metal structures Texas',
    'steel garage construction',
    'metal barn building',
    'commercial metal buildings',
  ],
  alternates: {
    canonical: '/services/metal-buildings',
  },
};

const subServices = [
  {
    name: 'Steel Workshops',
    slug: 'steel-workshops',
    description: 'Custom steel workshops for hobbies, crafts, and professional use.',
  },
  {
    name: 'Storage Buildings',
    slug: 'storage-buildings',
    description: 'Durable metal storage for equipment, vehicles, and inventory.',
  },
  {
    name: 'Custom Metal Structures',
    slug: 'custom-metal-structures',
    description: 'Tailored metal buildings for unique residential and commercial needs.',
  },
];

const faqs = [
  {
    question: 'How long does it take to construct a metal building?',
    answer: 'Timeline varies by size and complexity, but most residential metal buildings are completed in 2-6 weeks after permits are secured and materials arrive. This includes foundation work, erection, and finishing. We provide detailed timelines during the planning process.',
  },
  {
    question: 'Do metal buildings require a concrete foundation?',
    answer: 'Yes, metal buildings require a properly designed and constructed concrete foundation. The foundation must be level, properly sized for the building, and include anchor points for the steel frame. We handle complete foundation work as part of our metal building service.',
  },
  {
    question: 'Can metal buildings be insulated and climate controlled?',
    answer: 'Absolutely. We install insulation in walls and roof, vapor barriers, and provisions for HVAC systems. Climate-controlled metal buildings are common for workshops, offices, and storage of temperature-sensitive items. Proper insulation also reduces energy costs significantly.',
  },
  {
    question: 'Are metal buildings customizable in appearance?',
    answer: 'Yes, modern metal buildings offer extensive customization. Choose from various colors, door and window configurations, wainscoting, cupolas, overhangs, and other design elements. We can also incorporate masonry, wood, or other materials for a custom look that complements your property.',
  },
  {
    question: 'Do I need permits for a metal building?',
    answer: 'Yes, metal buildings typically require building permits in Montgomery County. Permit requirements depend on building size, location, and intended use. We handle the permit application process and ensure your building meets all local codes and regulations.',
  },
];

export default function MetalBuildingsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Metal Buildings & Custom Projects', url: '/services/metal-buildings' },
  ]);

  const serviceSchema = generateServiceSchema(
    'Metal Building & Steel Structure Construction',
    'Custom metal building construction including steel workshops, storage buildings, and custom structures in Montgomery County, TX.',
    '/services/metal-buildings'
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
            <span>Metal Buildings & Custom Projects</span>
          </nav>
          <div className="flex items-center gap-4 mb-4">
            <Warehouse className="w-12 h-12" />
            <h1 className="text-4xl md:text-5xl font-heading font-bold">
              Metal Buildings & Custom Projects
            </h1>
          </div>
          <p className="text-xl text-gray-200 max-w-3xl">
            Custom steel building construction throughout Montgomery County. From workshops and storage buildings to agricultural and commercial structures, we deliver durable metal buildings built to your specifications.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#924C2E] mb-6">
              Custom Metal Building Construction in Montgomery County, Texas
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Metal buildings offer an exceptional combination of durability, versatility, and value that makes them ideal for a wide range of applications. Whether you need a workshop for your hobbies or business, storage for equipment and vehicles, an agricultural building for your ranch, or a commercial structure for your enterprise, Terracotta Construction designs and builds custom metal buildings that meet your specific needs and exceed your expectations.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Steel construction provides significant advantages over traditional wood-frame buildings. Metal buildings resist fire, termites, and rot; they require minimal maintenance; they offer clear-span interiors without load-bearing walls; and they can be erected relatively quickly once materials arrive. Modern metal building systems also offer extensive design flexibility, allowing for attractive structures that enhance your property rather than detract from it.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Terracotta Construction handles every aspect of your metal building project from initial design through final completion. We begin with careful site evaluation and needs assessment, help you select the right building size and configuration, manage permits and engineering, construct proper foundations, erect the steel structure, and complete all finishing work including doors, windows, electrical, insulation, and interior build-out as desired.
            </p>
            <p className="text-lg text-gray-700">
              We work with quality metal building manufacturers to provide engineered steel structures that meet local building codes and wind load requirements—critical in our Gulf Coast region. Our experienced crews ensure proper erection and finishing that protects your investment and provides decades of reliable service. From modest storage buildings to large commercial structures, Terracotta Construction delivers metal building excellence throughout Montgomery County.
            </p>
          </div>
        </div>
      </section>

      {/* Sub-Services */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#924C2E] mb-8 text-center">
            Our Metal Building Services
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {subServices.map((service) => (
              <Link
                key={service.slug}
                href={`/services/metal-buildings/${service.slug}`}
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
              Metal Building Solutions for Every Application
            </h2>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Steel Workshop Construction
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              A dedicated workshop provides space for hobbies, crafts, vehicle restoration, woodworking, metalworking, and countless other pursuits. Our steel workshops feature clear-span designs that maximize usable space, durable steel construction that withstands heavy use, customizable door configurations including roll-up doors for vehicle access, provisions for electrical, lighting, and climate control, and attractive finishes that complement your home. We design workshops around how you&apos;ll actually use the space, ensuring adequate room, appropriate access, proper electrical capacity, and any specialized features your activities require. From modest hobby shops to professional-grade facilities, we build workshops that help you work efficiently and enjoyably.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Storage Building Construction
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Metal storage buildings protect equipment, vehicles, inventory, and other valuable items from weather, theft, and damage. Applications include vehicle storage for cars, boats, RVs, and trailers; equipment storage for lawn equipment, tools, and machinery; agricultural storage for feed, hay, and farm equipment; and commercial storage for inventory and supplies. We construct storage buildings in all sizes with appropriate access doors, security features, and optional climate control. Our storage buildings provide secure, accessible space that frees up your garage, protects your investments, and keeps your property organized.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Agricultural Metal Buildings
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Montgomery County&apos;s rural areas include many properties with agricultural needs. We construct metal barns, equipment sheds, hay storage, livestock shelters, and other agricultural buildings designed for working ranches and farms. Agricultural buildings feature durable construction that withstands heavy use, wide door openings for equipment access, ventilation appropriate to the application, and practical layouts based on actual use. We understand agricultural requirements and build structures that serve working properties effectively.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Commercial Metal Buildings
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Metal buildings provide cost-effective, versatile solutions for commercial applications including retail, office, warehouse, and light manufacturing uses. Commercial benefits include faster construction than traditional methods, lower construction and maintenance costs, flexible floor plans that adapt as needs change, and modern aesthetics with various finish options. We work with commercial clients to design buildings that meet their operational needs, comply with commercial codes, and project the professional image they require.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Complete Project Services
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Terracotta Construction provides turnkey metal building services including site preparation and grading, concrete foundation construction, steel building erection, roofing and siding installation, doors, windows, and trim, electrical rough-in and finish, insulation and vapor barriers, interior finishing as desired, and exterior improvements like gravel drives and landscaping. We manage the entire project so you have a single point of contact and consistent quality throughout. When your building is complete, it&apos;s ready to use.
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
                Why Choose Terracotta Construction for Metal Buildings
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Metal building construction requires expertise in foundations, steel erection, and finishing to deliver a structure that looks good, functions well, and lasts for decades. Terracotta Construction brings that expertise along with complete project management.
              </p>
              <ul className="space-y-4">
                {[
                  'Complete turnkey construction from design to finish',
                  'Quality engineered steel building systems',
                  'Proper foundations for lasting stability',
                  'Experienced steel erection crews',
                  'Attention to finishing details',
                  'Knowledge of local codes and permit requirements',
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
                Plan Your Metal Building Project
              </h3>
              <p className="text-gray-700 mb-6">
                Ready to add a metal building to your property? Contact us to discuss your needs. We&apos;ll help you plan the right building and provide a detailed estimate.
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
                Request Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-[#924C2E] mb-8 text-center">
            Frequently Asked Questions About Metal Buildings
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
            Metal Building Construction Throughout Montgomery County
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
            Terracotta Construction builds custom metal buildings in Montgomery, Conroe, The Woodlands, Magnolia, Willis, Huntsville, Tomball, Spring, Cypress, Katy, and surrounding areas.
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
            Ready to Build Your Metal Structure?
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Contact Terracotta Construction today to discuss your metal building project. We&apos;ll help you design and build the perfect structure for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-[#924C2E] px-8 py-4 rounded-md font-semibold text-lg hover:bg-gray-100 transition inline-block"
            >
              Request Consultation
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
