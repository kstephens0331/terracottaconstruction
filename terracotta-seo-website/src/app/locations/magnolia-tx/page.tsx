import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, MapPin, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/lib/seo-config';
import { generateBreadcrumbSchema, generateLocationSchema, generateFAQSchema } from '@/lib/schema-generators';

export const metadata: Metadata = {
  title: 'Construction Services Magnolia TX | Landscaping, Fencing, Handyman',
  description: 'Professional construction, landscaping, fencing, and handyman services in Magnolia, TX. Locally owned, licensed & insured. Serving Magnolia and Montgomery County. Call (936) 955-4083.',
  keywords: [
    'construction services Magnolia TX',
    'landscaping Magnolia Texas',
    'fencing installation Magnolia TX',
    'handyman services Magnolia',
    'contractor Magnolia TX',
    'lawn care Magnolia Texas',
    'metal building Magnolia TX',
    'emergency repairs Magnolia',
  ],
  alternates: {
    canonical: '/locations/magnolia-tx',
  },
};

const faqs = [
  {
    question: 'What construction services do you provide in Magnolia, TX?',
    answer: 'Terracotta Construction provides comprehensive services in Magnolia including landscaping and lawn care, fencing installation and repair, handyman services, apartment turnovers, 24/7 emergency repairs, and custom metal building construction. We understand Magnolia\'s mix of rural acreage and growing suburban neighborhoods and offer services suited to both property types.',
  },
  {
    question: 'How quickly can you respond to service calls in Magnolia?',
    answer: 'Being based in nearby Montgomery, we can typically respond to Magnolia service requests within 24 hours for standard projects and immediately for emergency situations. Our proximity along the FM 1488 corridor allows efficient access to all areas of Magnolia and surrounding communities.',
  },
  {
    question: 'Do you work with both residential and commercial properties in Magnolia?',
    answer: 'Yes, we serve both residential and commercial clients throughout Magnolia. Our services range from suburban homes in master-planned communities to rural properties with acreage, as well as commercial properties along FM 1488 and in downtown Magnolia. We customize our approach based on each property\'s specific needs and setting.',
  },
  {
    question: 'Are you familiar with Magnolia TX building codes and regulations?',
    answer: 'Absolutely. We maintain current knowledge of Montgomery County building codes, permit requirements, and the specific regulations that apply to Magnolia properties. For properties in HOA communities, we ensure compliance with community standards. For rural properties, we understand county requirements for structures, fencing, and agricultural buildings.',
  },
  {
    question: 'Do you offer ongoing maintenance contracts in Magnolia?',
    answer: 'Yes, we offer flexible maintenance contracts for Magnolia properties including weekly lawn care, seasonal landscape maintenance, and property management services. We can accommodate both smaller suburban lots and larger rural acreage with appropriate service plans and pricing.',
  },
];

export default function MagnoliaTXPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Service Areas', url: '/locations' },
    { name: 'Magnolia, TX', url: '/locations/magnolia-tx' },
  ]);

  const locationSchema = generateLocationSchema('Magnolia', 'TX', '/locations/magnolia-tx');
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
            <span>Magnolia, TX</span>
          </nav>
          <div className="flex items-center gap-4 mb-4">
            <MapPin className="w-10 h-10" />
            <h1 className="text-4xl md:text-5xl font-heading font-bold">
              Construction Services in Magnolia, TX
            </h1>
          </div>
          <p className="text-xl text-gray-200 max-w-3xl">
            Professional construction, landscaping, and handyman services for Magnolia&apos;s rural estates and growing suburban communities. Terracotta Construction proudly serves properties of all sizes throughout the Magnolia area.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#924C2E] mb-6">
              Your Trusted Construction Partner in Magnolia, Texas
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Magnolia, Texas offers a unique blend of rural character and convenient suburban access that attracts residents seeking space, privacy, and a country lifestyle within reach of Houston&apos;s amenities. Terracotta Construction proudly serves this distinctive community with construction, landscaping, and handyman services suited to Magnolia&apos;s diverse property types. From sprawling ranches along FM 1774 to newer master-planned communities like Magnolia Ridge and Westwood Magnolia, we provide professional services that meet each property&apos;s specific needs.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Located just west of our Montgomery headquarters along FM 1488, Magnolia falls squarely within our core service area. We understand Magnolia&apos;s character and the different requirements of its varied properties. Historic farmhouses near downtown Magnolia need different approaches than new construction in suburban subdivisions. Large acreage properties require different equipment and planning than quarter-acre lots. Ranch properties have different fencing needs than residential privacy fences. Our experience with all these property types allows us to provide appropriate solutions for any Magnolia project.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Magnolia&apos;s growth has brought new residents attracted by the excellent Magnolia ISD schools, rural atmosphere, and larger lot sizes than typically found closer to Houston. This growth has also brought new commercial development along FM 1488 and FM 2978 to serve this expanding population. Whether you&apos;re a longtime Magnolia resident maintaining a family property, a newcomer settling into a new home, or a business owner serving the Magnolia community, Terracotta Construction provides the professional services you need to maintain and improve your property.
            </p>
            <p className="text-lg text-gray-700">
              From the historic downtown with its antique shops and restaurants to the quiet country roads lined with horse farms and ranches, Magnolia represents Texas at its most authentic. Terracotta Construction is honored to serve this community with professional services that respect Magnolia&apos;s character while meeting modern standards for quality and reliability.
            </p>
          </div>
        </div>
      </section>

      {/* Services Available */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-[#924C2E] mb-8 text-center">
            Services Available in Magnolia, TX
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
              Comprehensive Property Services for Magnolia Residents
            </h2>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Landscaping & Lawn Care in Magnolia
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Magnolia properties range from modest suburban lots to multi-acre estates, and our landscaping services scale accordingly. For suburban properties in communities like Magnolia Ridge, Sierra Vista, or Woodridge Forest, we provide precision lawn mowing with detailed edging, mulching, seasonal cleanup, and tree trimming that maintains curb appeal and meets HOA standards. For larger rural properties, we offer field mowing, pasture maintenance, fence line clearing, and larger-scale tree work. Our crews have the equipment and expertise to handle properties of any size throughout the Magnolia area. We understand local soil conditions, native plants, and the specific challenges of maintaining landscapes in Magnolia&apos;s climate.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Fencing Installation & Repair in Magnolia
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Fencing needs vary dramatically across Magnolia&apos;s diverse properties. Suburban homeowners typically need wood privacy fences for backyard seclusion and pet containment. Rural property owners often need extensive runs of farm fencing, pipe fencing for horses, or game fencing for wildlife management. We install and repair all fence types to serve Magnolia&apos;s varied needs. Wood privacy fences in approved styles for HOA communities. Chain link for utility applications. Ornamental metal for enhanced curb appeal. Ranch-style pipe and cable fencing for livestock. Game-proof fencing for hunting properties. All our installations use quality materials and proper techniques, including adequate post depth and concrete footings essential for Magnolia&apos;s soil conditions.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Handyman Services for Magnolia Homes and Businesses
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Magnolia&apos;s homes range from historic farmhouses to brand-new construction, each with different maintenance and repair needs. Our skilled handymen provide comprehensive services including drywall repair, door installation and adjustment, window repairs, fixture mounting, caulking, painting, and general carpentry. For older Magnolia homes, we provide sympathetic repairs that respect original character. For newer homes, we handle finishing work and improvements. For Magnolia businesses, we provide timely repairs that maintain professional appearances. No job is too small or too large for our versatile team.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Apartment Turnovers in Magnolia
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              While Magnolia remains primarily a community of single-family homes, rental properties exist throughout the area. Landlords and property managers trust Terracotta Construction for thorough apartment and rental home turnovers that minimize vacancy time. Our make-ready services include professional cleaning, paint touch-ups or complete repainting, carpet cleaning, fixture updates, lock changes, and detailed inspections. We prepare units to attract quality tenants and justify competitive rents in Magnolia&apos;s desirable market.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Emergency Services in Magnolia
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              When emergencies strike Magnolia properties, our 24/7 response protects your investment. We address water damage from plumbing failures or storms, wind and storm damage repair, emergency fence repairs after accidents or weather events, board-ups, and other urgent needs. Magnolia&apos;s rural areas can be particularly vulnerable during severe weather, with trees falling on structures or fences, flooding in low-lying areas, and other damage that requires immediate attention. Our proximity allows rapid response when you need help most.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Metal Buildings & Custom Construction in Magnolia
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Magnolia&apos;s rural character and larger properties make it ideal for metal building construction. We design and construct custom steel buildings for workshops where Magnolia hobbyists, craftspeople, and mechanics can pursue their passions. Equipment storage buildings protect tractors, implements, ATVs, and other investments from weather. Agricultural buildings serve Magnolia&apos;s active farming and ranching community. Horse barns and hay storage serve the area&apos;s equestrian properties. Commercial metal buildings serve businesses along FM 1488 and throughout Magnolia. Our metal building projects include quality steel components, proper foundations engineered for local soil conditions, and attention to drainage, electrical, and other requirements that ensure functional, long-lasting structures.
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
                Why Magnolia Chooses Terracotta Construction
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Serving Magnolia&apos;s diverse properties requires versatility, appropriate equipment, and understanding of both suburban and rural needs. Terracotta Construction brings the experience and resources to handle any Magnolia project effectively.
              </p>
              <ul className="space-y-4">
                {[
                  'Based in Montgomery, easily serving all of Magnolia',
                  'Equipment for properties from suburban lots to large acreage',
                  'Experience with both residential and agricultural projects',
                  'Quick response times throughout the Magnolia area',
                  'Licensed, bonded, and fully insured',
                  'Transparent pricing with detailed estimates',
                  'Quality materials suited to each application',
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
                Contact Your Magnolia Contractor
              </h3>
              <p className="text-gray-700 mb-6">
                Ready to discuss your Magnolia property project? Contact us for a free estimate and discover why property owners throughout Magnolia trust Terracotta Construction for quality work.
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
            Frequently Asked Questions - Magnolia, TX
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
            In addition to Magnolia, Terracotta Construction provides the same quality services throughout Montgomery County and the Greater Houston area.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {siteConfig.serviceAreas
              .filter((area) => area.slug !== 'magnolia-tx')
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
            Ready to Get Started in Magnolia?
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Contact Terracotta Construction for a free estimate on landscaping, fencing, handyman services, or any of our other professional construction services in Magnolia, TX.
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
