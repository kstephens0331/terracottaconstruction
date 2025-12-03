import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, MapPin, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/lib/seo-config';
import { generateBreadcrumbSchema, generateLocationSchema, generateFAQSchema } from '@/lib/schema-generators';

export const metadata: Metadata = {
  title: 'Construction Services Conroe TX | Landscaping, Fencing, Handyman',
  description: 'Professional construction, landscaping, fencing, and handyman services in Conroe, TX. Locally owned, licensed & insured. Serving Conroe and Montgomery County. Call (936) 955-4083.',
  keywords: [
    'construction services Conroe TX',
    'landscaping Conroe Texas',
    'fencing installation Conroe TX',
    'handyman services Conroe',
    'contractor Conroe TX',
    'lawn care Conroe Texas',
    'metal building Conroe TX',
    'emergency repairs Conroe',
  ],
  alternates: {
    canonical: '/locations/conroe-tx',
  },
};

const faqs = [
  {
    question: 'What construction services do you provide in Conroe, TX?',
    answer: 'Terracotta Construction provides comprehensive services in Conroe including landscaping and lawn care, fencing installation and repair, handyman services, apartment turnovers, 24/7 emergency repairs, and custom metal building construction. As the Montgomery County seat, Conroe is a priority service area with excellent response times from our Montgomery headquarters.',
  },
  {
    question: 'How quickly can you respond to service calls in Conroe?',
    answer: 'Being based in nearby Montgomery, we can typically respond to Conroe service requests within 24 hours for standard projects and immediately for emergency situations. Our proximity to Conroe means efficient travel times and responsive service for residents and businesses throughout the city.',
  },
  {
    question: 'Do you work with both residential and commercial properties in Conroe?',
    answer: 'Yes, we serve both residential and commercial clients throughout Conroe. Our services range from single-family homes in neighborhoods like Grand Central Park and April Sound to commercial properties in downtown Conroe and along the I-45 corridor. We customize our approach based on each property\'s specific needs.',
  },
  {
    question: 'Are you familiar with Conroe TX building codes and regulations?',
    answer: 'Absolutely. We maintain current knowledge of all Conroe and Montgomery County building codes, permit requirements, and HOA regulations. We understand the specific requirements for different Conroe neighborhoods and master-planned communities and ensure all our work complies with local standards.',
  },
  {
    question: 'Do you offer ongoing maintenance contracts in Conroe?',
    answer: 'Yes, we offer flexible maintenance contracts for Conroe properties including weekly lawn care, seasonal landscape maintenance, and property management services. Many Conroe clients, especially those in HOA communities, prefer regular service plans for convenience and to maintain community standards.',
  },
];

export default function ConroeTXPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Service Areas', url: '/locations' },
    { name: 'Conroe, TX', url: '/locations/conroe-tx' },
  ]);

  const locationSchema = generateLocationSchema('Conroe', 'TX', '/locations/conroe-tx');
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(locationSchema) }}
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
            <Link href="/locations" className="hover:text-white">Service Areas</Link>
            <span className="mx-2">/</span>
            <span>Conroe, TX</span>
          </nav>
          <div className="flex items-center gap-4 mb-4">
            <MapPin className="w-10 h-10" />
            <h1 className="text-4xl md:text-5xl font-heading font-bold">
              Construction Services in Conroe, TX
            </h1>
          </div>
          <p className="text-xl text-gray-200 max-w-3xl">
            Professional construction, landscaping, and handyman services for the Montgomery County seat. Terracotta Construction proudly serves Conroe&apos;s thriving residential and commercial communities with quality workmanship and reliable service.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#924C2E] mb-6">
              Your Trusted Construction Partner in Conroe, Texas
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Conroe, Texas stands as one of the fastest-growing cities in America, and Terracotta Construction is proud to support this dynamic community with professional construction, landscaping, and handyman services. As the Montgomery County seat and a city with a rich history dating back to 1881, Conroe combines small-town Texas charm with modern amenities and unprecedented growth. From the historic downtown district to master-planned communities like Grand Central Park and Woodforest, Conroe offers diverse neighborhoods that each present unique property service needs.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Located just minutes from our Montgomery headquarters, Conroe is one of our most active service areas. We understand the specific characteristics of Conroe&apos;s various neighborhoods, from the established homes near downtown and in Panorama Village to the newer developments along the Loop 336 corridor. Whether you own a waterfront property on Lake Conroe, a family home in one of Conroe&apos;s many subdivisions, or commercial property serving this growing population, Terracotta Construction provides the professional services you need to maintain and enhance your investment.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Conroe&apos;s subtropical climate presents both opportunities and challenges for property owners. The warm weather allows for year-round outdoor enjoyment, but it also means landscapes require consistent attention and properties face ongoing maintenance needs. Our team understands local soil conditions, common pest issues, native and adaptive plant species, and the seasonal patterns that affect Conroe properties. This regional expertise allows us to provide better recommendations and more effective solutions for our Conroe clients.
            </p>
            <p className="text-lg text-gray-700">
              From the vibrant downtown area with its local shops and restaurants to the sprawling residential communities near Lake Conroe, Terracotta Construction serves all of Conroe with the same commitment to quality, reliability, and customer satisfaction. We take pride in contributing to Conroe&apos;s continued growth and helping property owners maintain beautiful, functional spaces throughout this exceptional Texas city.
            </p>
          </div>
        </div>
      </section>

      {/* Services Available */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-[#924C2E] mb-8 text-center">
            Services Available in Conroe, TX
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteConfig.services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition group"
              >
                <h3 className="text-xl font-heading font-semibold text-[#924C2E] mb-3 flex items-center justify-between">
                  {service.name}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </h3>
                <p className="text-gray-700 text-sm">{service.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Services */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-heading font-bold text-[#924C2E] mb-6">
              Comprehensive Property Services for Conroe Residents
            </h2>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Landscaping & Lawn Care in Conroe
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Conroe&apos;s growing population means more homes and businesses requiring professional landscape maintenance. Our comprehensive lawn care services keep Conroe properties looking their best year-round. We provide precision lawn mowing with detailed edging along sidewalks, driveways, and flower beds. Our mulching services help protect plants during Conroe&apos;s hot summers while adding visual appeal to landscape beds. Seasonal cleanup prepares properties for spring growth and removes fall debris, while our expert tree trimming maintains the health and appearance of the mature trees found throughout Conroe&apos;s established neighborhoods. For properties in HOA communities like Grand Central Park, Woodforest, or April Sound, we ensure our work meets community standards and helps residents avoid compliance issues.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Fencing Installation & Repair in Conroe
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              With Conroe&apos;s rapid growth and diverse property types, fencing serves numerous important functions from privacy and security to pet containment and aesthetic enhancement. We install and repair all fence types to meet Conroe property owners&apos; needs. Wood privacy fences remain popular in Conroe neighborhoods, providing seclusion and classic appeal. Chain link fencing offers economical security for both residential and commercial applications. Ornamental metal fencing adds elegance to Conroe homes and is often required in certain subdivisions. For larger properties on Conroe&apos;s outskirts, we install ranch-style fencing for livestock and property delineation. All our fence installations use quality materials, proper concrete footings, and professional techniques that ensure years of reliable service in Conroe&apos;s climate.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Handyman Services for Conroe Homes and Businesses
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Conroe&apos;s mix of historic homes and new construction means property owners face a wide range of repair and improvement needs. Our skilled handymen handle projects large and small throughout Conroe. Services include drywall repair and installation, interior and exterior door installation and adjustment, window repairs and upgrades, fixture mounting and installation, caulking and weatherproofing, painting touch-ups, and general carpentry. For Conroe&apos;s older homes near downtown, we provide sympathetic repairs that respect original character while improving functionality. For newer homes, we handle warranty-period touch-ups and improvements that personalize your space.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Apartment Turnovers in Conroe
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Conroe&apos;s population growth has driven significant demand for rental housing, creating opportunities for landlords and property managers. Terracotta Construction helps Conroe property owners maximize their rental income through fast, thorough apartment turnovers. Our make-ready services include comprehensive cleaning, paint touch-ups or complete repainting, carpet cleaning or replacement, fixture updates, lock changes, and detailed inspections. We work efficiently to minimize vacancy time while ensuring units are truly move-in ready. Our attention to detail helps Conroe landlords attract quality tenants and justify competitive rental rates in this growing market.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Emergency Services in Conroe
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              When emergencies strike Conroe properties, fast response is essential to minimize damage and costs. Our 24/7 emergency services address urgent situations including water damage from plumbing failures or storms, wind and storm damage repair, emergency fence repairs after accidents or severe weather, board-ups for broken windows, and other critical repairs. Conroe&apos;s location in Southeast Texas means exposure to severe thunderstorms, occasional tropical weather, and other events that can damage properties unexpectedly. Our proximity to Conroe allows rapid response when you need help most.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Metal Buildings & Custom Construction in Conroe
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Metal buildings serve Conroe property owners seeking durable, versatile, and low-maintenance structures. We design and construct custom steel buildings for workshops where Conroe hobbyists and craftspeople can pursue their passions, storage buildings for equipment and vehicles, agricultural structures for properties on Conroe&apos;s rural edges, and small commercial buildings for businesses. Our metal building projects include quality steel components, proper foundation work engineered for Conroe&apos;s soil conditions, and attention to drainage, ventilation, insulation, and electrical requirements. The result is a functional space that serves your needs for decades with minimal maintenance.
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
                Why Conroe Chooses Terracotta Construction
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                As a locally based contractor serving Conroe from nearby Montgomery, Terracotta Construction offers the personalized attention and regional expertise that national chains cannot match. Our understanding of Conroe&apos;s neighborhoods, climate, and community standards makes us the smart choice for your construction and maintenance needs.
              </p>
              <ul className="space-y-4">
                {[
                  'Based in Montgomery, minutes from Conroe',
                  'Quick response times throughout the Conroe area',
                  'Knowledge of Conroe neighborhoods and HOA requirements',
                  'Experience with both new construction and historic properties',
                  'Licensed, bonded, and fully insured',
                  'Transparent pricing with detailed estimates',
                  'Quality materials from regional suppliers',
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
              <h3 className="text-2xl font-heading font-bold text-[#924C2E] mb-4">
                Contact Your Conroe Contractor
              </h3>
              <p className="text-gray-700 mb-6">
                Ready to discuss your Conroe property project? Contact us for a free estimate and discover why Conroe homeowners and businesses trust Terracotta Construction.
              </p>
              <address className="not-italic text-gray-700 mb-6">
                <p className="font-semibold">{siteConfig.business.name}</p>
                <p>{siteConfig.business.address.street}</p>
                <p>
                  {siteConfig.business.address.city}, {siteConfig.business.address.state} {siteConfig.business.address.zip}
                </p>
              </address>
              <div className="space-y-3">
                <a
                  href={`tel:${siteConfig.business.phone}`}
                  className="flex items-center gap-3 text-lg font-semibold text-[#924C2E] hover:text-[#7a3f28]"
                >
                  <Phone className="w-5 h-5" />
                  {siteConfig.business.phone}
                </a>
              </div>
              <Link
                href="/contact"
                className="inline-block w-full bg-[#924C2E] text-white px-6 py-3 rounded-md font-semibold text-center hover:bg-[#7a3f28] transition mt-6"
              >
                Request Free Estimate
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-[#924C2E] mb-8 text-center">
            Frequently Asked Questions - Conroe, TX
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

      {/* Nearby Areas */}
      <section className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-heading font-bold mb-8">
            Also Serving Nearby Communities
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
            In addition to Conroe, Terracotta Construction provides the same quality services throughout Montgomery County and the Greater Houston area.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {siteConfig.serviceAreas
              .filter((area) => area.slug !== 'conroe-tx')
              .map((area) => (
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
          <h2 className="text-3xl font-heading font-bold mb-6">
            Ready to Get Started in Conroe?
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Contact Terracotta Construction for a free estimate on landscaping, fencing, handyman services, or any of our other professional construction services in Conroe, TX.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-[#924C2E] px-8 py-4 rounded-md font-semibold text-lg hover:bg-gray-100 transition inline-block"
            >
              Request Free Estimate
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
