import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, MapPin, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/lib/seo-config';
import { generateBreadcrumbSchema, generateLocationSchema, generateFAQSchema } from '@/lib/schema-generators';

export const metadata: Metadata = {
  title: 'Construction Services Montgomery TX | Landscaping, Fencing, Handyman',
  description: 'Professional construction, landscaping, fencing, and handyman services in Montgomery, TX. Locally owned, licensed & insured. Serving Montgomery and Montgomery County. Call (936) 955-4083.',
  keywords: [
    'construction services Montgomery TX',
    'landscaping Montgomery Texas',
    'fencing installation Montgomery TX',
    'handyman services Montgomery',
    'contractor Montgomery TX',
    'lawn care Montgomery Texas',
    'metal building Montgomery TX',
    'emergency repairs Montgomery',
  ],
  alternates: {
    canonical: '/locations/montgomery-tx',
  },
};

const faqs = [
  {
    question: 'What construction services do you provide in Montgomery, TX?',
    answer: 'Terracotta Construction provides comprehensive services in Montgomery including landscaping and lawn care, fencing installation and repair, handyman services, apartment turnovers, 24/7 emergency repairs, and custom metal building construction. As our home base, Montgomery receives priority service and quick response times.',
  },
  {
    question: 'How quickly can you respond to service calls in Montgomery?',
    answer: 'Being based in Montgomery, we can typically respond to service requests within 24 hours for standard projects and immediately for emergency situations. Our proximity means shorter travel times and more efficient service for Montgomery residents and businesses.',
  },
  {
    question: 'Do you work with both residential and commercial properties in Montgomery?',
    answer: 'Yes, we serve both residential and commercial clients throughout Montgomery. Our services range from single-family home maintenance to commercial property management, retail centers, and large estates. We customize our approach based on each property\'s specific needs.',
  },
  {
    question: 'Are you familiar with Montgomery TX building codes and regulations?',
    answer: 'Absolutely. As a locally based company, we maintain current knowledge of all Montgomery and Montgomery County building codes, permit requirements, and HOA regulations. We ensure all our work complies with local standards and handle permit applications when required.',
  },
  {
    question: 'Do you offer ongoing maintenance contracts in Montgomery?',
    answer: 'Yes, we offer flexible maintenance contracts for Montgomery properties including weekly lawn care, seasonal landscape maintenance, and property management services. Many Montgomery clients prefer regular service plans for convenience and cost savings.',
  },
];

export default function MontgomeryTXPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Service Areas', url: '/locations' },
    { name: 'Montgomery, TX', url: '/locations/montgomery-tx' },
  ]);

  const locationSchema = generateLocationSchema('Montgomery', 'TX', '/locations/montgomery-tx');
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
            <span>Montgomery, TX</span>
          </nav>
          <div className="flex items-center gap-4 mb-4">
            <MapPin className="w-10 h-10" />
            <h1 className="text-4xl md:text-5xl font-heading font-bold">
              Construction Services in Montgomery, TX
            </h1>
          </div>
          <p className="text-xl text-gray-200 max-w-3xl">
            Your hometown construction, landscaping, and handyman experts. Terracotta Construction is proud to be based in Montgomery, Texas, providing professional services to our neighbors and community.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#924C2E] mb-6">
              Your Local Construction Partner in Montgomery, Texas
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Montgomery, Texas holds a special place in our hearts—it&apos;s not just where we work, it&apos;s where we live and raise our families. Terracotta Construction is headquartered right here in Montgomery, giving us an unmatched understanding of our community&apos;s needs and allowing us to provide the fastest, most responsive service to our neighbors. When you hire Terracotta Construction, you&apos;re not just getting a contractor; you&apos;re partnering with fellow Montgomery residents who genuinely care about maintaining and improving our town.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              As the seat of Montgomery County, our city combines small-town charm with convenient access to the amenities and opportunities of the Greater Houston area. Whether you own a historic home near downtown Montgomery, a property in one of the newer subdivisions, a ranch on the outskirts of town, or a commercial building serving our growing community, Terracotta Construction provides the professional services you need to maintain and enhance your investment.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Our deep roots in Montgomery mean we understand the local climate conditions, soil characteristics, common pest and disease issues, architectural styles, and community standards that affect your property. We&apos;re familiar with local HOA requirements, Montgomery County regulations, and the specific challenges that Texas weather presents throughout the year. This local expertise translates into better recommendations, more efficient work, and results that truly fit our community.
            </p>
            <p className="text-lg text-gray-700">
              From routine lawn maintenance that keeps your property looking its best to emergency repairs when disaster strikes, Terracotta Construction is here for Montgomery. We take pride in serving our hometown and building lasting relationships with our neighbors based on quality work, honest service, and genuine care for our community&apos;s well-being.
            </p>
          </div>
        </div>
      </section>

      {/* Services Available */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-[#924C2E] mb-8 text-center">
            Services Available in Montgomery, TX
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
              Comprehensive Property Services for Montgomery Residents
            </h2>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Landscaping & Lawn Care in Montgomery
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Montgomery&apos;s subtropical climate means lawns and landscapes require consistent attention throughout most of the year. Our landscaping services include professional lawn mowing with precision edging, mulching to protect plants and retain moisture during our hot summers, seasonal cleanup to prepare your property for spring and fall, and expert tree trimming to maintain the health and appearance of your trees and shrubs. Whether you have a modest suburban lot or a sprawling estate property, we provide the regular maintenance your landscape needs to thrive.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Fencing Installation & Repair in Montgomery
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Fencing is essential for Montgomery properties, whether you need privacy, security, pet containment, or simply improved curb appeal. We install and repair all types of fencing including classic wood privacy fences popular in Montgomery neighborhoods, durable chain link for utility and security applications, ornamental metal fencing that adds elegance and value, and ranch-style fencing for rural Montgomery properties. Our fence installations include proper post setting with concrete footings, level construction, and quality hardware that ensures years of reliable performance.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Handyman Services for Montgomery Homes and Businesses
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              From minor repairs to significant improvements, our handyman services keep Montgomery properties in top condition. We handle drywall repair and installation, door installation and adjustment, window repairs, fixture mounting, caulking, painting touch-ups, and general carpentry. No job is too small—we understand that small issues become big problems when left unaddressed, so we respond promptly and complete work efficiently to keep your property well-maintained.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Apartment Turnovers in Montgomery
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Montgomery landlords and property managers trust us for fast, thorough apartment turnovers that minimize vacancy time. Our make-ready services include cleaning, paint touch-ups, carpet cleaning, fixture updates, lock changes, and comprehensive inspections. We work on your schedule to deliver move-in ready units that attract quality tenants and command competitive rental rates in the Montgomery market.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Emergency Services in Montgomery
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              When emergency strikes, Montgomery residents can count on Terracotta Construction for immediate response. Our 24/7 emergency services address water damage from plumbing failures or storms, wind and storm damage repair, emergency fence repairs after accidents or severe weather, board-ups for broken windows, and other urgent repairs that cannot wait. Being based in Montgomery means we can reach you quickly when you need us most.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Metal Buildings & Custom Construction in Montgomery
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Metal buildings are increasingly popular in Montgomery for their durability, versatility, and low maintenance. We design and construct custom steel buildings for workshops, hobby spaces, equipment storage, vehicle garages, agricultural applications, and small commercial uses. Our metal building projects include quality steel components, proper foundation work, and attention to drainage, ventilation, and electrical requirements to create functional spaces that serve your needs for decades.
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
                Why Montgomery Chooses Terracotta Construction
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                As your hometown contractor, Terracotta Construction offers advantages that outside companies simply cannot match. Our local presence, community investment, and firsthand knowledge of Montgomery make us the smart choice for your construction and maintenance needs.
              </p>
              <ul className="space-y-4">
                {[
                  'Headquartered right here in Montgomery, TX',
                  'Fastest response times for Montgomery residents',
                  'Deep knowledge of local conditions and regulations',
                  'Established reputation in our home community',
                  'Licensed, bonded, and fully insured',
                  'Transparent pricing with no surprises',
                  'Quality materials from local suppliers',
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
                Contact Your Montgomery Contractor
              </h3>
              <p className="text-gray-700 mb-6">
                Ready to discuss your project? As your neighbors, we&apos;re always happy to talk about your property needs and provide free estimates for Montgomery residents and businesses.
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
            Frequently Asked Questions - Montgomery, TX
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
            In addition to Montgomery, Terracotta Construction provides the same quality services throughout Montgomery County and the Greater Houston area.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {siteConfig.serviceAreas
              .filter((area) => area.slug !== 'montgomery-tx')
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
            Ready to Get Started in Montgomery?
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Contact your neighbors at Terracotta Construction for a free estimate on landscaping, fencing, handyman services, or any of our other professional construction services in Montgomery, TX.
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
