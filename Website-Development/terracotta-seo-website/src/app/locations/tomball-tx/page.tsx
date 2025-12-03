import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, MapPin, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/lib/seo-config';
import { generateBreadcrumbSchema, generateLocationSchema, generateFAQSchema } from '@/lib/schema-generators';

export const metadata: Metadata = {
  title: 'Construction Services Tomball TX | Landscaping, Fencing, Handyman',
  description: 'Professional construction, landscaping, fencing, and handyman services in Tomball, TX. Locally owned, licensed & insured. Serving Tomball and Harris County. Call (936) 955-4083.',
  keywords: [
    'construction services Tomball TX',
    'landscaping Tomball Texas',
    'fencing installation Tomball TX',
    'handyman services Tomball',
    'contractor Tomball TX',
    'lawn care Tomball Texas',
    'metal building Tomball TX',
    'emergency repairs Tomball',
  ],
  alternates: {
    canonical: '/locations/tomball-tx',
  },
};

const faqs = [
  {
    question: 'What construction services do you provide in Tomball, TX?',
    answer: 'Terracotta Construction provides comprehensive services in Tomball including landscaping and lawn care, fencing installation and repair, handyman services, apartment turnovers, 24/7 emergency repairs, and custom metal building construction. We serve both the historic downtown Tomball area and the newer master-planned communities surrounding the city.',
  },
  {
    question: 'How quickly can you respond to service calls in Tomball?',
    answer: 'Being based in Montgomery, we can typically respond to Tomball service requests within 24 hours for standard projects and immediately for emergency situations. Our location provides efficient access to all areas of Tomball via Highway 249 and FM 2920.',
  },
  {
    question: 'Do you work with both residential and commercial properties in Tomball?',
    answer: 'Yes, we serve both residential and commercial clients throughout Tomball. Our services range from single-family homes in communities like Northpointe and Lakewood Forest to commercial properties in historic downtown Tomball and along the Highway 249 corridor. We customize our approach based on each property\'s specific needs.',
  },
  {
    question: 'Are you familiar with Tomball TX building codes and regulations?',
    answer: 'Absolutely. We maintain current knowledge of Tomball and Harris County building codes, permit requirements, and regulations. We understand the specific requirements for different Tomball neighborhoods, including HOA standards in master-planned communities and historic district considerations in downtown Tomball.',
  },
  {
    question: 'Do you offer ongoing maintenance contracts in Tomball?',
    answer: 'Yes, we offer flexible maintenance contracts for Tomball properties including weekly lawn care, seasonal landscape maintenance, and property management services. Many Tomball clients in HOA communities prefer regular service plans to maintain their property\'s appearance and meet community standards.',
  },
];

export default function TomballTXPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Service Areas', url: '/locations' },
    { name: 'Tomball, TX', url: '/locations/tomball-tx' },
  ]);

  const locationSchema = generateLocationSchema('Tomball', 'TX', '/locations/tomball-tx');
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
            <span>Tomball, TX</span>
          </nav>
          <div className="flex items-center gap-4 mb-4">
            <MapPin className="w-10 h-10" />
            <h1 className="text-4xl md:text-5xl font-heading font-bold">
              Construction Services in Tomball, TX
            </h1>
          </div>
          <p className="text-xl text-gray-200 max-w-3xl">
            Professional construction, landscaping, and handyman services for Tomball&apos;s historic downtown and growing suburban communities. Terracotta Construction proudly serves this charming Harris County city with quality workmanship.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#924C2E] mb-6">
              Your Trusted Construction Partner in Tomball, Texas
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Tomball, Texas successfully blends small-town charm with modern suburban convenience, creating a community that attracts families, professionals, and businesses alike. With its historic downtown featuring locally-owned shops, antique stores, and the famous Tomball German Heritage Festival, this northwest Harris County city maintains authentic character while benefiting from proximity to Houston and the energy corridor. Terracotta Construction is proud to serve Tomball with professional construction, landscaping, and handyman services that meet the needs of this diverse community.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Operating from our Montgomery headquarters, we provide responsive service to Tomball via Highway 249 and FM 2920. We understand the different character of Tomball&apos;s various areas, from the charming historic properties near downtown and the Depot to master-planned communities like Northpointe, Lakewood Forest, and Rosehill Reserve. Whether you own a vintage bungalow near Main Street, a family home in one of Tomball&apos;s excellent school districts, or commercial property serving this growing population, Terracotta Construction delivers quality workmanship tailored to your property&apos;s specific needs.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Tomball&apos;s growth has brought excellent amenities and services while the city has worked to preserve the downtown character that makes it special. The Tomball Depot Plaza, Farmers Market, seasonal festivals, and local restaurants create a sense of community that larger suburbs often lack. Property owners in Tomball take pride in their homes and businesses, and they deserve contractors who share that commitment to quality. Terracotta Construction provides professional services that help maintain Tomball&apos;s appeal while meeting the practical needs of property ownership.
            </p>
            <p className="text-lg text-gray-700">
              From the German heritage celebrations to the Friday night lights at Tomball High School, Tomball represents Texas community at its finest. Terracotta Construction is honored to serve this special city with construction, landscaping, and handyman services that help Tomball property owners maintain and improve their investments while enjoying all the community has to offer.
            </p>
          </div>
        </div>
      </section>

      {/* Services Available */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-[#924C2E] mb-8 text-center">
            Services Available in Tomball, TX
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
              Comprehensive Property Services for Tomball Residents
            </h2>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Landscaping & Lawn Care in Tomball
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Tomball&apos;s subtropical climate allows for beautiful landscapes but requires consistent professional maintenance. Our comprehensive lawn care services keep Tomball properties looking their best year-round. We provide precision mowing with detailed edging along sidewalks, driveways, and flower beds. Mulching services protect plants during hot Texas summers while adding visual appeal. Seasonal cleanup prepares properties for spring growth and removes fall debris. Expert tree trimming maintains the health and appearance of the mature trees found throughout Tomball&apos;s established neighborhoods. For properties in HOA communities, we ensure compliance with landscape standards and help residents avoid violations.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Fencing Installation & Repair in Tomball
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Fencing serves important purposes for Tomball properties, from privacy and security to pet containment and aesthetic enhancement. We install and repair all fence types to meet Tomball property owners&apos; needs. Wood privacy fences remain popular for backyard seclusion and come in various styles to match property character. Chain link provides economical security for utility areas. Ornamental metal fencing adds elegance and is often preferred in certain subdivisions. For properties on Tomball&apos;s edges with more acreage, we install appropriate rural fencing. All installations use quality materials, proper techniques, and attention to HOA requirements where applicable.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Handyman Services for Tomball Homes and Businesses
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Tomball&apos;s mix of historic properties and newer construction creates diverse repair and improvement needs. Our skilled handymen provide comprehensive services including drywall repair and installation, door installation and adjustment, window repairs and upgrades, fixture mounting, caulking and weatherproofing, painting touch-ups, and general carpentry. For older Tomball homes, we provide sympathetic repairs that respect original character. For newer homes in master-planned communities, we handle improvements and warranty-period touch-ups. For Tomball businesses, we deliver timely repairs that maintain professional appearances with minimal disruption.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Apartment Turnovers in Tomball
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Tomball&apos;s desirability and good schools create strong demand for rental properties. Landlords and property managers need efficient turnover services to minimize vacancy time and attract quality tenants. Terracotta Construction provides thorough make-ready services including professional cleaning, paint touch-ups or complete repainting, carpet cleaning or replacement, fixture updates, lock changes, and detailed inspections. We work efficiently to deliver move-in ready units that justify competitive rental rates in the Tomball market and help landlords maximize their returns.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Emergency Services in Tomball
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              When emergencies strike Tomball properties, fast response is essential to minimize damage and costs. Our 24/7 emergency services address water damage from plumbing failures or storms, wind and storm damage repair, emergency fence repairs after accidents or severe weather, board-ups for broken windows, and other urgent repairs. Tomball&apos;s location in Southeast Texas means exposure to severe thunderstorms, occasional tropical weather, and other events that can damage properties unexpectedly. Our responsive service helps Tomball property owners protect their investments when emergencies occur.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Metal Buildings & Custom Construction in Tomball
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              While much of Tomball consists of residential neighborhoods, some properties can accommodate metal buildings where permitted by zoning and HOA rules. We design and construct custom steel buildings for workshops where Tomball hobbyists and craftspeople can pursue their passions, vehicle and equipment storage, and other appropriate uses. For properties outside HOA restrictions, we offer more flexibility in building size and design. Our metal building projects include quality steel components, proper foundation work, and attention to drainage, electrical, and other requirements that ensure functional, long-lasting structures that serve your needs for decades.
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
                Why Tomball Chooses Terracotta Construction
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Serving Tomball requires understanding of both the historic downtown character and the standards of master-planned communities. Terracotta Construction brings regional expertise and commitment to quality that Tomball property owners appreciate and rely on.
              </p>
              <ul className="space-y-4">
                {[
                  'Serving Tomball from Montgomery with quick response times',
                  'Experience with both historic and new construction',
                  'Knowledge of Tomball neighborhoods and HOA requirements',
                  'Understanding of local standards and expectations',
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
                Contact Your Tomball Contractor
              </h3>
              <p className="text-gray-700 mb-6">
                Ready to discuss your Tomball property project? Contact us for a free estimate and discover why Tomball homeowners and businesses trust Terracotta Construction for quality construction services.
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
            Frequently Asked Questions - Tomball, TX
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
            In addition to Tomball, Terracotta Construction provides the same quality services throughout Montgomery County and the Greater Houston area.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {siteConfig.serviceAreas
              .filter((area) => area.slug !== 'tomball-tx')
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
            Ready to Get Started in Tomball?
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Contact Terracotta Construction for a free estimate on landscaping, fencing, handyman services, or any of our other professional construction services in Tomball, TX.
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
