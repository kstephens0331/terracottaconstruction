import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, MapPin, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/lib/seo-config';
import { generateBreadcrumbSchema, generateLocationSchema, generateFAQSchema } from '@/lib/schema-generators';

export const metadata: Metadata = {
  title: 'Construction Services Katy TX | Landscaping, Fencing, Handyman',
  description: 'Professional construction, landscaping, fencing, and handyman services in Katy, TX. Locally owned, licensed & insured. Serving Katy and Harris County. Call (936) 955-4083.',
  keywords: [
    'construction services Katy TX',
    'landscaping Katy Texas',
    'fencing installation Katy TX',
    'handyman services Katy',
    'contractor Katy TX',
    'lawn care Katy Texas',
    'metal building Katy TX',
    'emergency repairs Katy',
  ],
  alternates: {
    canonical: '/locations/katy-tx',
  },
};

const faqs = [
  {
    question: 'What construction services do you provide in Katy, TX?',
    answer: 'Terracotta Construction provides comprehensive services in Katy including landscaping and lawn care, fencing installation and repair, handyman services, apartment turnovers, 24/7 emergency repairs, and custom metal building construction. We serve Katy\'s numerous master-planned communities as well as Old Town Katy and surrounding areas.',
  },
  {
    question: 'How quickly can you respond to service calls in Katy?',
    answer: 'Being based in Montgomery, we can typically respond to Katy service requests within 24 hours for standard projects and immediately for emergency situations. Our location provides access to Katy via Highway 290, I-10, and the Grand Parkway.',
  },
  {
    question: 'Do you work with both residential and commercial properties in Katy?',
    answer: 'Yes, we serve both residential and commercial clients throughout Katy. Our services range from single-family homes in communities like Cinco Ranch, Cross Creek Ranch, and Elyson to commercial properties along I-10 and the Grand Parkway. We customize our approach based on each property\'s specific requirements.',
  },
  {
    question: 'Are you familiar with Katy TX building codes and regulations?',
    answer: 'Absolutely. We maintain current knowledge of building codes, permit requirements, and HOA standards across Katy\'s many communities spanning Harris, Fort Bend, and Waller counties. We understand the specific requirements for different Katy neighborhoods and ensure all our work complies with applicable standards.',
  },
  {
    question: 'Do you offer ongoing maintenance contracts in Katy?',
    answer: 'Yes, we offer flexible maintenance contracts for Katy properties including weekly lawn care, seasonal landscape maintenance, and property management services. Given the strict HOA standards in Katy\'s master-planned communities, many residents prefer regular service plans to maintain compliance and protect property values.',
  },
];

export default function KatyTXPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Service Areas', url: '/locations' },
    { name: 'Katy, TX', url: '/locations/katy-tx' },
  ]);

  const locationSchema = generateLocationSchema('Katy', 'TX', '/locations/katy-tx');
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
            <span>Katy, TX</span>
          </nav>
          <div className="flex items-center gap-4 mb-4">
            <MapPin className="w-10 h-10" />
            <h1 className="text-4xl md:text-5xl font-heading font-bold">
              Construction Services in Katy, TX
            </h1>
          </div>
          <p className="text-xl text-gray-200 max-w-3xl">
            Professional construction, landscaping, and handyman services for one of Texas&apos; most desirable communities. Terracotta Construction proudly serves Katy&apos;s award-winning master-planned neighborhoods with quality workmanship.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#924C2E] mb-6">
              Your Trusted Construction Partner in Katy, Texas
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Katy, Texas has earned its reputation as one of the most desirable communities in Texas, consistently ranking among the best places to live in the Houston metropolitan area and the entire state. Home to Katy ISD, one of Texas&apos; top-rated school districts, and featuring numerous award-winning master-planned communities, Katy attracts families seeking excellent schools, abundant amenities, and quality of life in a welcoming suburban environment. Terracotta Construction proudly serves this exceptional community with professional construction, landscaping, and handyman services that meet Katy&apos;s high standards.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              From our Montgomery headquarters, we serve Katy via Highway 290, I-10, and the Grand Parkway with professional, responsive service. We understand the character of Katy&apos;s varied communities, from the flagship developments of Cinco Ranch with its comprehensive amenities and excellent schools to the newer communities of Cross Creek Ranch, Elyson, and Cane Island, to the charming historic Old Town Katy district. Each area has different characteristics and requirements, and Terracotta Construction understands and respects these distinctions while delivering consistent quality throughout Katy.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Greater Katy spans three counties—Harris, Fort Bend, and Waller—creating a diverse regulatory landscape that requires experienced contractors. The area&apos;s explosive growth has brought world-class amenities including Katy Mills Mall, LaCenterra at Cinco Ranch, countless restaurants and entertainment venues, and sports facilities that host events at the regional and national level. Property owners in this competitive market benefit from professional maintenance that protects investments and maintains the community appeal that makes Katy a perennial top choice for relocating families.
            </p>
            <p className="text-lg text-gray-700">
              Whether you own a home in an established Cinco Ranch village, a property in one of Katy&apos;s newer master-planned communities, a historic home in Old Town Katy, or commercial property serving this large and affluent population, Terracotta Construction provides the professional services you need. We take pride in serving Katy with quality workmanship that meets the high standards this community expects and deserves.
            </p>
          </div>
        </div>
      </section>

      {/* Services Available */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-[#924C2E] mb-8 text-center">
            Services Available in Katy, TX
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
              Comprehensive Property Services for Katy Residents
            </h2>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Landscaping & Lawn Care in Katy
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Katy&apos;s master-planned communities maintain rigorous landscape standards that protect property values and community aesthetics. Our comprehensive lawn care services help Katy homeowners meet these standards with professional results. Precision mowing with detailed edging creates the manicured appearance that HOAs require and neighbors expect. Mulching services protect plants during Texas&apos; intense summer heat while adding visual appeal to landscape beds. Seasonal cleanup addresses debris and prepares landscapes for optimal seasonal appearance. Expert tree trimming maintains the health and shape of ornamental and shade trees throughout your property. For communities like Cinco Ranch, Cross Creek Ranch, and Elyson with specific landscape guidelines, we ensure compliance while enhancing your property&apos;s beauty and value.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Fencing Installation & Repair in Katy
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Fencing in Katy must meet both functional needs and strict community aesthetic standards. Katy&apos;s HOAs typically specify approved fence styles, heights, materials, stain colors, and placement, and we understand and comply with these requirements across the area&apos;s many communities. We install and repair wood privacy fences in approved configurations that provide backyard seclusion while meeting community guidelines. Ornamental metal fencing adds elegance for front yards and areas where HOA standards restrict solid fencing. Pool fencing meets safety code requirements while complementing property aesthetics. All our fence installations use quality materials, proper construction techniques including adequate post depth and concrete footings for Katy&apos;s clay soils, and attention to HOA specifications that result in durable, compliant fencing.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Handyman Services for Katy Homes and Businesses
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Katy&apos;s homes, whether in established villages or the newest master-planned sections, benefit from professional handyman services that maintain quality and address issues before they become problems. Our skilled team provides comprehensive services including drywall repair and installation, door installation and adjustment, window repairs, fixture mounting and installation, caulking and weatherproofing, painting touch-ups, and general carpentry. We help Katy homeowners with both warranty-period touch-ups on newer homes and maintenance needs in established properties. For Katy businesses, we provide timely repairs that maintain professional appearances and minimize disruption to operations.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Apartment Turnovers in Katy
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Katy&apos;s desirability, excellent schools, and strong economy create significant demand for rental housing at all price points. Landlords and property managers throughout Katy need efficient turnover services that minimize vacancy time while preparing units to attract and retain quality tenants. Terracotta Construction provides thorough make-ready services including professional cleaning, paint touch-ups or complete repainting, carpet cleaning or replacement, fixture updates, lock changes, and detailed inspections. We work efficiently to deliver move-in ready units that justify premium rents in Katy&apos;s competitive rental market. Our attention to detail helps landlords attract quality tenants who will care for the property.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Emergency Services in Katy
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              When emergencies strike Katy properties, rapid professional response is essential to minimize damage and protect your investment. Our 24/7 emergency services address water damage from plumbing failures or storms, wind and storm damage repair, emergency fence repairs after accidents or severe weather, board-ups for broken windows, and other urgent needs. Katy&apos;s location in the Houston area means exposure to severe thunderstorms, occasional tropical weather, and the flooding that severely affected parts of the area during Hurricane Harvey. Our responsive service helps Katy property owners address emergencies quickly, minimizing damage and beginning recovery promptly.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Metal Buildings & Custom Construction in Katy
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              While Katy&apos;s master-planned communities generally restrict accessory buildings, some properties—particularly in older areas, on larger lots, or outside strict HOA control—can accommodate metal structures where permitted. We design and construct custom steel buildings for workshops, vehicle storage including space for RVs, boats, and car collections, and other appropriate uses. For properties in Old Town Katy or other areas with more flexibility, we can create functional outbuildings that serve your needs. Our metal building projects include quality steel components with appropriate coatings for Houston&apos;s climate, proper foundation work engineered for Katy&apos;s clay soils, and attention to appearance, drainage, and regulations that ensure successful projects.
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
                Why Katy Chooses Terracotta Construction
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Serving Katy requires understanding of the high standards that characterize this community&apos;s nationally recognized master-planned developments. Terracotta Construction brings regional expertise, commitment to quality, and knowledge of diverse HOA requirements that Katy property owners depend on.
              </p>
              <ul className="space-y-4">
                {[
                  'Serving Katy from Montgomery with reliable response times',
                  'Knowledge of Katy\'s numerous HOA requirements',
                  'Experience with award-winning community standards',
                  'Understanding of multi-county regulatory requirements',
                  'Licensed, bonded, and fully insured',
                  'Transparent pricing with detailed estimates',
                  'Quality materials that meet community standards',
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
                Contact Your Katy Contractor
              </h3>
              <p className="text-gray-700 mb-6">
                Ready to discuss your Katy property project? Contact us for a free estimate and discover why homeowners and businesses throughout Katy trust Terracotta Construction for quality construction services.
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
            Frequently Asked Questions - Katy, TX
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
            In addition to Katy, Terracotta Construction provides the same quality services throughout Montgomery County and the Greater Houston area.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {siteConfig.serviceAreas
              .filter((area) => area.slug !== 'katy-tx')
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
            Ready to Get Started in Katy?
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Contact Terracotta Construction for a free estimate on landscaping, fencing, handyman services, or any of our other professional construction services in Katy, TX.
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
