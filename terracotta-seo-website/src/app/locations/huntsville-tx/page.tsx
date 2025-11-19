import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, MapPin, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/lib/seo-config';
import { generateBreadcrumbSchema, generateLocationSchema, generateFAQSchema } from '@/lib/schema-generators';

export const metadata: Metadata = {
  title: 'Construction Services Huntsville TX | Landscaping, Fencing, Handyman',
  description: 'Professional construction, landscaping, fencing, and handyman services in Huntsville, TX. Locally owned, licensed & insured. Serving Huntsville and Walker County. Call (936) 955-4083.',
  keywords: [
    'construction services Huntsville TX',
    'landscaping Huntsville Texas',
    'fencing installation Huntsville TX',
    'handyman services Huntsville',
    'contractor Huntsville TX',
    'lawn care Huntsville Texas',
    'metal building Huntsville TX',
    'emergency repairs Huntsville',
  ],
  alternates: {
    canonical: '/locations/huntsville-tx',
  },
};

const faqs = [
  {
    question: 'What construction services do you provide in Huntsville, TX?',
    answer: 'Terracotta Construction provides comprehensive services in Huntsville including landscaping and lawn care, fencing installation and repair, handyman services, apartment turnovers, 24/7 emergency repairs, and custom metal building construction. We serve residential properties, rental housing near Sam Houston State University, commercial properties, and rural acreage throughout Walker County.',
  },
  {
    question: 'How quickly can you respond to service calls in Huntsville?',
    answer: 'Being based in Montgomery, we can typically respond to Huntsville service requests within 24-48 hours for standard projects and as quickly as possible for emergency situations. Our location along the I-45 corridor allows direct access to Huntsville, approximately 35 minutes north of our headquarters.',
  },
  {
    question: 'Do you work with both residential and commercial properties in Huntsville?',
    answer: 'Yes, we serve both residential and commercial clients throughout Huntsville. Our services range from single-family homes and student rental properties near Sam Houston State University to commercial properties in downtown Huntsville and along I-45, as well as rural properties throughout Walker County.',
  },
  {
    question: 'Are you familiar with Huntsville TX building codes and regulations?',
    answer: 'Absolutely. We maintain current knowledge of Huntsville and Walker County building codes, permit requirements, and regulations. We understand the specific requirements for properties near the university, historic district considerations in downtown Huntsville, and rural property regulations throughout Walker County.',
  },
  {
    question: 'Do you offer ongoing maintenance contracts in Huntsville?',
    answer: 'Yes, we offer flexible maintenance contracts for Huntsville properties including weekly lawn care, seasonal landscape maintenance, and property management services. Landlords with student rental properties particularly appreciate regular maintenance plans that keep their investments in top condition throughout the academic year and summer.',
  },
];

export default function HuntsvilleTXPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Service Areas', url: '/locations' },
    { name: 'Huntsville, TX', url: '/locations/huntsville-tx' },
  ]);

  const locationSchema = generateLocationSchema('Huntsville', 'TX', '/locations/huntsville-tx');
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
            <span>Huntsville, TX</span>
          </nav>
          <div className="flex items-center gap-4 mb-4">
            <MapPin className="w-10 h-10" />
            <h1 className="text-4xl md:text-5xl font-heading font-bold">
              Construction Services in Huntsville, TX
            </h1>
          </div>
          <p className="text-xl text-gray-200 max-w-3xl">
            Professional construction, landscaping, and handyman services for Huntsville and Walker County. Terracotta Construction proudly serves this historic Texas city, home to Sam Houston State University.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#924C2E] mb-6">
              Your Trusted Construction Partner in Huntsville, Texas
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Huntsville, Texas holds a distinguished place in Texas history as the home of Sam Houston, the iconic leader whose legacy is commemorated by the towering statue that welcomes visitors to this Walker County seat. Today, Huntsville thrives as a university town, home to Sam Houston State University with its 20,000+ students, while maintaining its historic character and serving as the gateway between the Houston metroplex and the Piney Woods of East Texas. Terracotta Construction proudly extends our services to Huntsville, providing professional construction, landscaping, and handyman services to this vibrant community.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Operating from our Montgomery headquarters via the I-45 corridor, we bring the same quality workmanship and reliable service to Huntsville that we provide throughout Montgomery County. We understand the diverse property needs of this unique city, from the historic homes near downtown and the Sam Houston Memorial Museum to student rental properties surrounding the university campus, from growing residential neighborhoods to commercial properties along I-45 and throughout downtown Huntsville.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Huntsville&apos;s strong rental market, driven by the university population, creates particular opportunities for property investors. Student housing requires regular maintenance and efficient turnovers between lease periods to maximize rental income. Commercial properties serving the university community need to maintain attractive appearances. Family homes throughout Huntsville deserve the same professional care as properties anywhere in our service area. Terracotta Construction serves all these needs with professionalism and attention to detail.
            </p>
            <p className="text-lg text-gray-700">
              Beyond the city limits, Walker County offers beautiful rolling hills, forests, and rural properties that attract those seeking land and privacy within reach of urban amenities. From acreage properties requiring agricultural fencing and metal buildings to lake properties on Lake Raven in Huntsville State Park&apos;s vicinity, Terracotta Construction provides comprehensive services throughout greater Huntsville and Walker County.
            </p>
          </div>
        </div>
      </section>

      {/* Services Available */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-[#924C2E] mb-8 text-center">
            Services Available in Huntsville, TX
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
              Comprehensive Property Services for Huntsville Residents
            </h2>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Landscaping & Lawn Care in Huntsville
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Huntsville&apos;s location at the edge of the Piney Woods creates distinctive landscaping opportunities and challenges. The area&apos;s East Texas character means different soil conditions, vegetation, and climate patterns than areas closer to Houston. Our comprehensive lawn care services address these specific conditions with precision mowing and edging, mulching suited to local conditions, seasonal cleanup of pine needles and leaves, and expert tree trimming for the pines, oaks, and hardwoods common throughout Huntsville. For rental properties, we provide reliable recurring service that maintains curb appeal and keeps tenants satisfied. For larger properties, we offer acreage mowing and pasture maintenance.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Fencing Installation & Repair in Huntsville
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Fencing needs vary across Huntsville&apos;s diverse property types. Residential properties typically need wood privacy fences for backyards and pet containment. Rental properties often need durable fencing that can handle tenant turnover. Rural Walker County properties require agricultural fencing for livestock and property boundaries. We install and repair all fence types to serve Huntsville&apos;s varied needs, including wood privacy fences, chain link for utility and security, ornamental metal for enhanced aesthetics, and farm fencing including pipe, cable, and wire options for agricultural applications. All installations use quality materials and proper techniques for long-lasting results.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Handyman Services for Huntsville Homes and Businesses
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Huntsville&apos;s mix of historic homes, university-area rentals, and newer construction creates diverse repair and improvement needs. Our skilled handymen provide comprehensive services including drywall repair, door installation, window repairs, fixture mounting, caulking, painting, and general carpentry. For rental property owners, we provide efficient repairs between tenants and responsive service for maintenance issues during occupancy. For historic properties near downtown, we provide careful work that respects original character. For commercial properties, we deliver timely repairs that maintain professional appearances.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Apartment Turnovers in Huntsville
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Huntsville&apos;s university population creates a strong rental market with predictable turnover cycles tied to the academic calendar. Landlords and property managers need efficient turnover services to prepare units between tenants, particularly during the busy summer months when leases commonly end and begin. Terracotta Construction provides thorough make-ready services including professional cleaning, paint touch-ups, carpet cleaning, fixture updates, lock changes, and detailed inspections. We understand the importance of timing in the student rental market and work efficiently to minimize vacancy and maximize rental income from Huntsville investment properties.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Emergency Services in Huntsville
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              When emergencies strike Huntsville properties, quick response minimizes damage and costs. Our 24/7 emergency services address water damage from plumbing failures or storms, wind and storm damage repair, emergency fence repairs, board-ups, and other urgent needs. Huntsville&apos;s East Texas location means exposure to severe thunderstorms, occasional ice storms in winter, and other weather events that can damage properties. For landlords with multiple rental properties, we provide consistent emergency response that protects investments and satisfies tenants.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Metal Buildings & Custom Construction in Huntsville
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Walker County&apos;s rural areas offer excellent opportunities for metal building construction. We design and construct custom steel buildings for workshops and hobby spaces, equipment and vehicle storage, agricultural applications including hay barns and livestock shelters, and small commercial uses. Our metal building projects include quality steel components, proper foundations engineered for Walker County soil conditions, and attention to drainage, electrical, and other requirements. Whether you need a building on your Huntsville city lot or a large structure on Walker County acreage, we deliver durable, functional buildings that serve your needs for decades.
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
                Why Huntsville Chooses Terracotta Construction
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Serving Huntsville from Montgomery County means bringing professional services to a market that deserves quality workmanship. Terracotta Construction provides Huntsville property owners with reliable service, fair pricing, and results that protect and enhance their investments.
              </p>
              <ul className="space-y-4">
                {[
                  'Easily serving Huntsville via I-45 from Montgomery',
                  'Experience with rental properties and student housing',
                  'Understanding of university town service needs',
                  'Capable of handling Walker County rural properties',
                  'Licensed, bonded, and fully insured',
                  'Transparent pricing with detailed estimates',
                  'Quality materials for long-lasting results',
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
                Contact Your Huntsville Contractor
              </h3>
              <p className="text-gray-700 mb-6">
                Ready to discuss your Huntsville property project? Contact us for a free estimate and discover why property owners throughout Huntsville and Walker County trust Terracotta Construction.
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
            Frequently Asked Questions - Huntsville, TX
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
            In addition to Huntsville, Terracotta Construction provides the same quality services throughout Montgomery County and the Greater Houston area.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {siteConfig.serviceAreas
              .filter((area) => area.slug !== 'huntsville-tx')
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
            Ready to Get Started in Huntsville?
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Contact Terracotta Construction for a free estimate on landscaping, fencing, handyman services, or any of our other professional construction services in Huntsville, TX.
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
