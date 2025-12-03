import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, MapPin, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/lib/seo-config';
import { generateBreadcrumbSchema, generateLocationSchema, generateFAQSchema } from '@/lib/schema-generators';

export const metadata: Metadata = {
  title: 'Construction Services Willis TX | Landscaping, Fencing, Handyman',
  description: 'Professional construction, landscaping, fencing, and handyman services in Willis, TX. Locally owned, licensed & insured. Serving Willis and Lake Conroe area. Call (936) 955-4083.',
  keywords: [
    'construction services Willis TX',
    'landscaping Willis Texas',
    'fencing installation Willis TX',
    'handyman services Willis',
    'contractor Willis TX',
    'lawn care Willis Texas',
    'metal building Willis TX',
    'emergency repairs Willis',
  ],
  alternates: {
    canonical: '/locations/willis-tx',
  },
};

const faqs = [
  {
    question: 'What construction services do you provide in Willis, TX?',
    answer: 'Terracotta Construction provides comprehensive services in Willis including landscaping and lawn care, fencing installation and repair, handyman services, apartment turnovers, 24/7 emergency repairs, and custom metal building construction. We serve both the growing residential areas of Willis and the lake properties along Lake Conroe\'s northern shores.',
  },
  {
    question: 'How quickly can you respond to service calls in Willis?',
    answer: 'Being based in nearby Montgomery, we can typically respond to Willis service requests within 24 hours for standard projects and immediately for emergency situations. Our location along the I-45 corridor allows quick access to all areas of Willis and the surrounding Lake Conroe communities.',
  },
  {
    question: 'Do you work with both residential and commercial properties in Willis?',
    answer: 'Yes, we serve both residential and commercial clients throughout Willis. Our services range from single-family homes and lake houses to commercial properties along I-45 and downtown Willis. We also serve rental properties catering to lake visitors and local residents.',
  },
  {
    question: 'Are you familiar with Willis TX building codes and regulations?',
    answer: 'Absolutely. We maintain current knowledge of Willis and Montgomery County building codes, permit requirements, and regulations. For lakefront properties, we understand the specific requirements related to waterfront construction, docks, and structures near Lake Conroe. We ensure all work complies with applicable standards.',
  },
  {
    question: 'Do you offer ongoing maintenance contracts in Willis?',
    answer: 'Yes, we offer flexible maintenance contracts for Willis properties including weekly lawn care, seasonal landscape maintenance, and property management services. Many Willis clients with second homes on Lake Conroe appreciate having a reliable contractor manage their property maintenance while they\'re away.',
  },
];

export default function WillisTXPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Service Areas', url: '/locations' },
    { name: 'Willis, TX', url: '/locations/willis-tx' },
  ]);

  const locationSchema = generateLocationSchema('Willis', 'TX', '/locations/willis-tx');
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
            <span>Willis, TX</span>
          </nav>
          <div className="flex items-center gap-4 mb-4">
            <MapPin className="w-10 h-10" />
            <h1 className="text-4xl md:text-5xl font-heading font-bold">
              Construction Services in Willis, TX
            </h1>
          </div>
          <p className="text-xl text-gray-200 max-w-3xl">
            Professional construction, landscaping, and handyman services for Willis and the Lake Conroe area. Terracotta Construction proudly serves this growing community with quality workmanship and reliable service.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#924C2E] mb-6">
              Your Trusted Construction Partner in Willis, Texas
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Willis, Texas sits at the northern end of Lake Conroe, offering residents and visitors access to one of Southeast Texas&apos;s premier recreational lakes while maintaining authentic small-town Texas character. Terracotta Construction proudly serves this community with construction, landscaping, and handyman services that meet the diverse needs of Willis property owners. From waterfront homes with stunning lake views to downtown properties near Willis&apos; historic center, we provide professional services throughout the greater Willis area.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Operating from our Montgomery headquarters just down I-45, Terracotta Construction provides responsive service to Willis and the surrounding lake communities. We understand the specific needs of this area, from lakefront properties that require special attention to waterfront features and moisture considerations, to the newer residential developments attracting families to Willis ISD schools. Whether you own a weekend lake house, a primary residence in one of Willis&apos;s growing neighborhoods, or commercial property serving the lake community, we deliver the quality workmanship you need.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Lake Conroe creates unique opportunities and challenges for Willis property owners. The lake draws visitors year-round, supporting a strong rental market for those with investment properties. Waterfront locations require careful attention to erosion, drainage, moisture management, and landscape choices that thrive in lakeside conditions. The active outdoor lifestyle around the lake means decks, fences, and outdoor spaces see heavy use and need regular maintenance. Terracotta Construction understands these lakeside considerations and provides appropriate solutions for Willis properties.
            </p>
            <p className="text-lg text-gray-700">
              Willis continues to grow as more people discover the appeal of lake living and small-town atmosphere within an easy commute to Houston via I-45. Terracotta Construction is proud to serve this growing community with professional construction, landscaping, and handyman services that help Willis property owners maintain and improve their investments while enjoying all this special area has to offer.
            </p>
          </div>
        </div>
      </section>

      {/* Services Available */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-[#924C2E] mb-8 text-center">
            Services Available in Willis, TX
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
              Comprehensive Property Services for Willis Residents
            </h2>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Landscaping & Lawn Care in Willis
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Willis properties require thoughtful landscape care that addresses both aesthetic and environmental considerations, particularly for lakefront locations. Our comprehensive services include precision lawn mowing with detailed edging, mulching to protect plants and retain moisture, seasonal cleanup to maintain property appearance, and expert tree trimming to preserve lake views while maintaining tree health. For waterfront properties, we understand which plants thrive in lakeside conditions and can help manage vegetation along shorelines. We work with property owners to develop appropriate maintenance schedules, including services for vacation homes that need care while owners are away.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Fencing Installation & Repair in Willis
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Fencing serves important purposes for Willis properties, from privacy and security to pet containment and defining property boundaries, particularly important in lakefront communities. We install and repair all fence types suited to Willis properties. Wood privacy fences provide seclusion for yards and outdoor living spaces. Chain link offers economical security and pet containment. Ornamental metal adds elegance and maintains views. For larger properties, we install ranch-style fencing. All our fence installations account for Willis&apos;s proximity to the lake, using appropriate materials and techniques that resist moisture and humidity for longer service life.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Handyman Services for Willis Homes and Businesses
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Willis properties need reliable handyman services for repairs and improvements. Our skilled team handles drywall repair and installation, door installation and adjustment, window repairs, fixture mounting, caulking and weatherproofing, painting, and general carpentry. Lake homes face particular challenges from humidity and moisture that can cause paint failure, wood swelling, and other issues requiring professional attention. We provide timely repairs that address these conditions before they become major problems. For Willis businesses, we maintain professional appearances with efficient repairs that minimize disruption.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Apartment Turnovers in Willis
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Willis&apos;s location on Lake Conroe creates strong demand for rental properties, from long-term residences to vacation rentals serving lake visitors. Terracotta Construction provides thorough turnover services that maximize rental income by minimizing vacancy time. Our make-ready services include professional cleaning, paint touch-ups, carpet cleaning, fixture updates, lock changes, and detailed inspections. For vacation rentals with frequent turnover, we provide efficient service that keeps units available for the next guests. For long-term rentals, we prepare units to attract quality tenants in Willis&apos;s competitive rental market.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Emergency Services in Willis
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Emergencies require fast response to protect Willis properties from further damage. Our 24/7 emergency services address water damage from plumbing failures or storms, wind and storm damage repair, emergency fence repairs, board-ups, and other urgent needs. Lake Conroe&apos;s location in Southeast Texas means exposure to severe thunderstorms, occasional tropical weather, and the potential for flooding in low-lying areas. Our proximity to Willis allows rapid response when emergencies strike, helping property owners secure their investments and begin recovery quickly.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Metal Buildings & Custom Construction in Willis
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Metal buildings serve Willis property owners seeking durable, versatile structures. We design and construct custom steel buildings for workshops, boat and watercraft storage essential for lake properties, vehicle garages, equipment storage, and commercial applications. Our metal building projects include quality steel components with appropriate coatings for the humid lakeside environment, proper foundation work, and attention to drainage, ventilation, and electrical requirements. The result is a functional structure that serves your needs for decades while resisting the moisture and weather conditions common to the Lake Conroe area.
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
                Why Willis Chooses Terracotta Construction
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Serving Willis and the Lake Conroe area requires understanding of both standard construction practices and the special considerations of lakeside properties. Terracotta Construction brings regional expertise and commitment to quality that Willis property owners depend on.
              </p>
              <ul className="space-y-4">
                {[
                  'Based in Montgomery, serving Willis with quick response times',
                  'Experience with lakefront and waterfront properties',
                  'Understanding of lake area conditions and requirements',
                  'Available for property management and vacation home care',
                  'Licensed, bonded, and fully insured',
                  'Transparent pricing with detailed estimates',
                  'Quality materials suited to lakeside conditions',
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
                Contact Your Willis Contractor
              </h3>
              <p className="text-gray-700 mb-6">
                Ready to discuss your Willis property project? Contact us for a free estimate and discover why Willis homeowners and businesses trust Terracotta Construction for quality construction services.
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
            Frequently Asked Questions - Willis, TX
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
            In addition to Willis, Terracotta Construction provides the same quality services throughout Montgomery County and the Greater Houston area.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {siteConfig.serviceAreas
              .filter((area) => area.slug !== 'willis-tx')
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
            Ready to Get Started in Willis?
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Contact Terracotta Construction for a free estimate on landscaping, fencing, handyman services, or any of our other professional construction services in Willis, TX.
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
