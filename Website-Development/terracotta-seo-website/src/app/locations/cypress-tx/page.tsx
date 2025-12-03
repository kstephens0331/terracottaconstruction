import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, MapPin, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/lib/seo-config';
import { generateBreadcrumbSchema, generateLocationSchema, generateFAQSchema } from '@/lib/schema-generators';

export const metadata: Metadata = {
  title: 'Construction Services Cypress TX | Landscaping, Fencing, Handyman',
  description: 'Professional construction, landscaping, fencing, and handyman services in Cypress, TX. Locally owned, licensed & insured. Serving Cypress and Harris County. Call (936) 955-4083.',
  keywords: [
    'construction services Cypress TX',
    'landscaping Cypress Texas',
    'fencing installation Cypress TX',
    'handyman services Cypress',
    'contractor Cypress TX',
    'lawn care Cypress Texas',
    'metal building Cypress TX',
    'emergency repairs Cypress',
  ],
  alternates: {
    canonical: '/locations/cypress-tx',
  },
};

const faqs = [
  {
    question: 'What construction services do you provide in Cypress, TX?',
    answer: 'Terracotta Construction provides comprehensive services in Cypress including landscaping and lawn care, fencing installation and repair, handyman services, apartment turnovers, 24/7 emergency repairs, and custom metal building construction. We serve Cypress\'s many master-planned communities as well as older established neighborhoods throughout this fast-growing area.',
  },
  {
    question: 'How quickly can you respond to service calls in Cypress?',
    answer: 'Being based in Montgomery, we can typically respond to Cypress service requests within 24 hours for standard projects and immediately for emergency situations. Our location provides efficient access to all areas of Cypress via Highway 290, the Grand Parkway, and FM 1960.',
  },
  {
    question: 'Do you work with both residential and commercial properties in Cypress?',
    answer: 'Yes, we serve both residential and commercial clients throughout Cypress. Our services range from single-family homes in master-planned communities like Bridgeland, Towne Lake, and Fairfield to commercial properties along Highway 290 and the Grand Parkway corridor. We customize our approach based on each property\'s specific needs.',
  },
  {
    question: 'Are you familiar with Cypress TX building codes and regulations?',
    answer: 'Absolutely. We maintain current knowledge of Harris County building codes, permit requirements, and the many HOA standards that govern Cypress\'s master-planned communities. We understand the specific requirements for different Cypress neighborhoods and ensure all our work complies with applicable standards.',
  },
  {
    question: 'Do you offer ongoing maintenance contracts in Cypress?',
    answer: 'Yes, we offer flexible maintenance contracts for Cypress properties including weekly lawn care, seasonal landscape maintenance, and property management services. Given the prevalence of HOA communities in Cypress with strict landscape standards, many residents prefer regular service plans to maintain compliance and curb appeal.',
  },
];

export default function CypressTXPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Service Areas', url: '/locations' },
    { name: 'Cypress, TX', url: '/locations/cypress-tx' },
  ]);

  const locationSchema = generateLocationSchema('Cypress', 'TX', '/locations/cypress-tx');
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
            <span>Cypress, TX</span>
          </nav>
          <div className="flex items-center gap-4 mb-4">
            <MapPin className="w-10 h-10" />
            <h1 className="text-4xl md:text-5xl font-heading font-bold">
              Construction Services in Cypress, TX
            </h1>
          </div>
          <p className="text-xl text-gray-200 max-w-3xl">
            Professional construction, landscaping, and handyman services for one of Houston&apos;s fastest-growing communities. Terracotta Construction proudly serves Cypress&apos;s master-planned neighborhoods with quality workmanship.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#924C2E] mb-6">
              Your Trusted Construction Partner in Cypress, Texas
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Cypress, Texas has emerged as one of the Houston metropolitan area&apos;s most desirable communities, attracting families with its excellent Cy-Fair ISD schools, abundant amenities, and quality master-planned developments. This unincorporated area of northwest Harris County has transformed from rural farmland and cypress tree wetlands into a thriving suburban hub with resort-style communities, championship golf courses, and convenient access to Houston&apos;s energy corridor. Terracotta Construction proudly serves Cypress with professional construction, landscaping, and handyman services suited to this dynamic community&apos;s high standards.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Operating from our Montgomery headquarters, we serve Cypress via Highway 290 and the Grand Parkway with responsive, professional service. We understand the character of Cypress&apos;s varied neighborhoods, from the flagship communities of Bridgeland and Towne Lake with their lakes, trails, and resort amenities, to established developments like Copperfield and Fairfield, to newer neighborhoods continuing to grow along the Highway 290 corridor. Each community has different standards and requirements, and Terracotta Construction understands and respects these distinctions.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Cypress&apos;s rapid growth has brought world-class amenities including dining, shopping, entertainment, and recreational facilities that rival any Houston suburb. The Boardwalk at Towne Lake, Bridgeland&apos;s extensive trail system, and numerous golf courses provide abundant outdoor activities. Houston Premium Outlets and countless restaurants serve the area&apos;s large population. Cy-Fair ISD&apos;s highly rated schools make Cypress a top choice for families. Property owners in this competitive market benefit from professional maintenance that protects investments and maintains the community appeal that makes Cypress special.
            </p>
            <p className="text-lg text-gray-700">
              Whether you own a home in a lake-front community, a property adjacent to one of Cypress&apos;s many green spaces, a family home in an established neighborhood, or commercial property serving this growing population, Terracotta Construction provides the professional services you need. We take pride in serving Cypress with quality workmanship that meets the high standards this exceptional community expects and deserves.
            </p>
          </div>
        </div>
      </section>

      {/* Services Available */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-[#924C2E] mb-8 text-center">
            Services Available in Cypress, TX
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
              Comprehensive Property Services for Cypress Residents
            </h2>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Landscaping & Lawn Care in Cypress
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Cypress&apos;s master-planned communities maintain high landscape standards that contribute to property values and community appeal. Our comprehensive lawn care services help Cypress homeowners meet and exceed these standards. Precision mowing with detailed edging creates the manicured appearance that HOAs expect and neighbors appreciate. Mulching services protect plants during Texas&apos; intense summers while adding visual appeal to landscape beds in your front and back yards. Seasonal cleanup prepares landscapes for spring growth and removes fall debris that detracts from curb appeal. Expert tree trimming maintains the health and appearance of ornamental and shade trees throughout your property. For communities like Bridgeland and Towne Lake with specific landscape requirements, we ensure compliance while enhancing your property&apos;s beauty.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Fencing Installation & Repair in Cypress
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Fencing in Cypress must meet both functional needs and strict community standards. Cypress&apos;s HOAs typically specify approved fence styles, heights, materials, and colors, and we understand and comply with these requirements. We install and repair wood privacy fences in approved configurations that provide backyard seclusion while meeting community guidelines. Ornamental metal fencing adds elegance for front yards or areas where community standards restrict solid fencing. Pool fencing meets safety requirements while complementing property aesthetics. All our fence installations use quality materials, proper construction techniques including adequate post depth and concrete footings, and attention to HOA specifications that result in long-lasting, compliant fencing.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Handyman Services for Cypress Homes and Businesses
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Cypress&apos;s newer homes benefit from professional handyman services that address warranty-period touch-ups and improvements that personalize your space. Our skilled team provides comprehensive services including drywall repair and installation, door installation and adjustment, window repairs, fixture mounting and installation, caulking and weatherproofing, painting touch-ups, and general carpentry. We help Cypress homeowners address the settling and finishing issues common in new construction while also handling improvements and upgrades that enhance livability and value. For Cypress businesses, we provide timely repairs that maintain professional appearances and minimize disruption.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Apartment Turnovers in Cypress
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Cypress&apos;s desirability and strong economy create robust demand for rental housing. Landlords and property managers throughout Cypress need efficient turnover services that minimize vacancy time while preparing units to attract quality tenants. Terracotta Construction provides thorough make-ready services including professional cleaning, paint touch-ups or complete repainting, carpet cleaning or replacement, fixture updates, lock changes, and detailed inspections. We work efficiently to deliver move-in ready units that justify the premium rents that Cypress&apos;s competitive rental market commands.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Emergency Services in Cypress
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              When emergencies strike Cypress properties, fast professional response protects your investment from further damage. Our 24/7 emergency services address water damage from plumbing failures or storms, wind and storm damage repair, emergency fence repairs after accidents or severe weather, board-ups for broken windows, and other urgent needs. Cypress&apos;s location in Southeast Texas means exposure to severe thunderstorms, occasional tropical weather, and the flooding that has affected some areas in major storms. Our responsive service helps Cypress property owners address emergencies quickly and effectively.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Metal Buildings & Custom Construction in Cypress
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              While Cypress&apos;s HOA communities generally restrict accessory buildings, some properties can accommodate metal structures where permitted by community rules and county regulations. We design and construct custom steel buildings for workshops, vehicle storage including space for boats and recreational vehicles, and other appropriate uses. For properties outside HOA restrictions, we offer more flexibility in building size and design. Our metal building projects include quality steel components with appropriate coatings, proper foundation work engineered for Cypress&apos;s clay soils, and attention to appearance, drainage, and other requirements that ensure long-lasting, functional structures.
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
                Why Cypress Chooses Terracotta Construction
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Serving Cypress requires understanding of the high standards that characterize this community&apos;s master-planned developments. Terracotta Construction brings regional expertise, commitment to quality, and knowledge of HOA requirements that Cypress property owners depend on.
              </p>
              <ul className="space-y-4">
                {[
                  'Serving Cypress from Montgomery with reliable response times',
                  'Knowledge of Cypress HOA requirements and standards',
                  'Experience with master-planned community expectations',
                  'Understanding of newer home construction needs',
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
                Contact Your Cypress Contractor
              </h3>
              <p className="text-gray-700 mb-6">
                Ready to discuss your Cypress property project? Contact us for a free estimate and discover why homeowners and businesses throughout Cypress trust Terracotta Construction.
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
            Frequently Asked Questions - Cypress, TX
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
            In addition to Cypress, Terracotta Construction provides the same quality services throughout Montgomery County and the Greater Houston area.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {siteConfig.serviceAreas
              .filter((area) => area.slug !== 'cypress-tx')
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
            Ready to Get Started in Cypress?
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Contact Terracotta Construction for a free estimate on landscaping, fencing, handyman services, or any of our other professional construction services in Cypress, TX.
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
