import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, MapPin, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/lib/seo-config';
import { generateBreadcrumbSchema, generateLocationSchema, generateFAQSchema } from '@/lib/schema-generators';

export const metadata: Metadata = {
  title: 'Construction Services The Woodlands TX | Landscaping, Fencing, Handyman',
  description: 'Professional construction, landscaping, fencing, and handyman services in The Woodlands, TX. Locally owned, licensed & insured. Serving The Woodlands master-planned community. Call (936) 955-4083.',
  keywords: [
    'construction services The Woodlands TX',
    'landscaping The Woodlands Texas',
    'fencing installation The Woodlands TX',
    'handyman services The Woodlands',
    'contractor The Woodlands TX',
    'lawn care The Woodlands Texas',
    'metal building The Woodlands TX',
    'emergency repairs The Woodlands',
  ],
  alternates: {
    canonical: '/locations/the-woodlands-tx',
  },
};

const faqs = [
  {
    question: 'What construction services do you provide in The Woodlands, TX?',
    answer: 'Terracotta Construction provides comprehensive services in The Woodlands including landscaping and lawn care, fencing installation and repair, handyman services, apartment turnovers, 24/7 emergency repairs, and custom metal building construction. We understand the unique standards of this master-planned community and ensure all work meets The Woodlands Township and village association requirements.',
  },
  {
    question: 'How quickly can you respond to service calls in The Woodlands?',
    answer: 'Being based in nearby Montgomery, we can typically respond to The Woodlands service requests within 24 hours for standard projects and immediately for emergency situations. Our familiarity with The Woodlands extensive trail system, villages, and neighborhoods allows for efficient navigation and quick arrival times.',
  },
  {
    question: 'Do you work with both residential and commercial properties in The Woodlands?',
    answer: 'Yes, we serve both residential and commercial clients throughout The Woodlands. Our services range from single-family homes in villages like Alden Bridge, Creekside Park, and Sterling Ridge to commercial properties in Town Center, Research Forest, and Hughes Landing. We customize our approach based on each property\'s specific requirements and community standards.',
  },
  {
    question: 'Are you familiar with The Woodlands community standards and regulations?',
    answer: 'Absolutely. We maintain current knowledge of The Woodlands Township requirements, Development Standards Committee guidelines, and individual village association standards. We understand the aesthetic standards that make The Woodlands unique and ensure all our work complies with these requirements, including proper permit applications when needed.',
  },
  {
    question: 'Do you offer ongoing maintenance contracts in The Woodlands?',
    answer: 'Yes, we offer flexible maintenance contracts for The Woodlands properties including weekly lawn care, seasonal landscape maintenance, and property management services. Given the high standards of The Woodlands community, many residents prefer regular service plans to maintain their property\'s appearance and protect their investment.',
  },
];

export default function TheWoodlandsTXPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Service Areas', url: '/locations' },
    { name: 'The Woodlands, TX', url: '/locations/the-woodlands-tx' },
  ]);

  const locationSchema = generateLocationSchema('The Woodlands', 'TX', '/locations/the-woodlands-tx');
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
            <span>The Woodlands, TX</span>
          </nav>
          <div className="flex items-center gap-4 mb-4">
            <MapPin className="w-10 h-10" />
            <h1 className="text-4xl md:text-5xl font-heading font-bold">
              Construction Services in The Woodlands, TX
            </h1>
          </div>
          <p className="text-xl text-gray-200 max-w-3xl">
            Professional construction, landscaping, and handyman services for America&apos;s premier master-planned community. Terracotta Construction proudly serves The Woodlands with quality workmanship that meets the community&apos;s exceptional standards.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#924C2E] mb-6">
              Your Trusted Construction Partner in The Woodlands, Texas
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              The Woodlands, Texas represents the gold standard in master-planned community development, and Terracotta Construction is proud to serve this exceptional community with construction, landscaping, and handyman services that match its high standards. Since George Mitchell&apos;s visionary development began in 1974, The Woodlands has grown into a world-class community known for its preserved forests, extensive trail system, outstanding schools, and quality of life that consistently ranks among the best in America. From Grogan&apos;s Mill to Creekside Park, each village offers unique character while maintaining the natural beauty and community standards that define The Woodlands.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Operating from our Montgomery headquarters, Terracotta Construction brings deep regional expertise to The Woodlands property owners. We understand the community&apos;s emphasis on maintaining natural aesthetics, the specific requirements of the Development Standards Committee, and the individual standards of village associations throughout the community. Whether you own a home in an established village like Indian Springs or Panther Creek, a newer property in Creekside Park or Sterling Ridge, or commercial space in Town Center, Hughes Landing, or Research Forest, we provide services that protect your investment and enhance your property.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              The Woodlands&apos; unique environment presents specific property maintenance considerations. The preserved forest canopy provides beautiful shade but requires careful tree maintenance. The extensive landscaping that characterizes The Woodlands demands regular professional attention to maintain community standards. The high-quality homes throughout the community deserve equally high-quality maintenance and repairs. Terracotta Construction provides all these services with the attention to detail that Woodlands residents expect and deserve.
            </p>
            <p className="text-lg text-gray-700">
              From Market Street to The Cynthia Woods Mitchell Pavilion, from the scenic waterway at Hughes Landing to the tree-lined streets of every village, The Woodlands represents Texas at its finest. Terracotta Construction is honored to serve this community with professional services that help maintain the exceptional quality of life that makes The Woodlands such a special place to live, work, and play.
            </p>
          </div>
        </div>
      </section>

      {/* Services Available */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-[#924C2E] mb-8 text-center">
            Services Available in The Woodlands, TX
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
              Comprehensive Property Services for The Woodlands Residents
            </h2>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Landscaping & Lawn Care in The Woodlands
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              The Woodlands is renowned for its integration of natural beauty with residential development, and maintaining this aesthetic requires professional landscape care. Our comprehensive lawn services keep Woodlands properties looking their best while meeting community standards. We provide precision mowing with detailed edging that creates clean lines along pathways and flower beds. Our mulching services use quality materials that complement The Woodlands&apos; natural environment while protecting plants during Texas&apos; hot summers. Seasonal cleanup addresses pine needles, leaves, and debris that accumulate under The Woodlands&apos; extensive tree canopy. Expert tree trimming maintains the health and appearance of the native pines, oaks, and magnolias that define the community while ensuring clearance from structures and pathways. For properties in communities with specific landscape requirements, we ensure compliance with all applicable standards.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Fencing Installation & Repair in The Woodlands
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Fencing in The Woodlands must meet both functional needs and community aesthetic standards. We install and repair fencing that complies with Development Standards Committee requirements and village association guidelines. Wood privacy fences in approved styles provide seclusion while maintaining The Woodlands&apos; natural character. Where permitted, ornamental metal fencing adds elegance without blocking views. Pool fencing meets safety requirements while complementing property aesthetics. For commercial properties, we install appropriate fencing that provides security while meeting Town Center, Hughes Landing, or Research Forest standards. All our fence installations use quality materials, proper construction techniques, and attention to detail that Woodlands residents expect.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Handyman Services for The Woodlands Homes and Businesses
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              The high-quality homes throughout The Woodlands deserve expert maintenance and repairs. Our skilled handymen provide comprehensive services including drywall repair and installation, door installation and adjustment, window repairs and upgrades, fixture mounting, caulking and weatherproofing, painting touch-ups, and general carpentry. We work carefully to protect interior finishes and ensure repairs match existing quality. For The Woodlands businesses, we provide timely repairs that maintain professional appearances and minimize disruption. Whether you need to address settling cracks in a newer Creekside Park home or update fixtures in an established Grogan&apos;s Mill property, our handymen deliver quality results.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Apartment Turnovers in The Woodlands
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              The Woodlands&apos; desirability creates strong demand for rental properties, and landlords need efficient turnover services to minimize vacancy time. Terracotta Construction provides thorough make-ready services including professional cleaning, paint touch-ups, carpet cleaning or replacement, fixture updates, lock changes, and comprehensive inspections. We understand the expectations of Woodlands renters and prepare units to meet these standards. For property managers overseeing multiple units in communities like Hughes Landing apartments or other Woodlands rental properties, we provide consistent quality and efficient scheduling that maximizes rental income.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Emergency Services in The Woodlands
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              When emergencies strike The Woodlands properties, rapid professional response protects your investment. Our 24/7 emergency services address water damage from plumbing failures or storms, wind and storm damage repair, emergency fence repairs, board-ups, and other urgent needs. The Woodlands&apos; extensive tree coverage creates particular vulnerability during severe weather, with wind and lightning causing tree damage that requires immediate attention. Our proximity and familiarity with The Woodlands allows us to respond quickly when you need help most, minimizing damage and getting your property secured.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Metal Buildings & Custom Construction in The Woodlands
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              While The Woodlands primarily consists of residential neighborhoods and commercial districts, some properties can accommodate accessory structures where permitted. We design and construct custom metal buildings that meet The Woodlands&apos; aesthetic and regulatory requirements. Workshop buildings provide space for hobbies and projects while complementing property aesthetics. Storage structures offer protection for vehicles, equipment, and seasonal items. All our metal building projects include quality components, proper foundation work, and attention to appearance, drainage, and other requirements that ensure compliance with community standards while providing functional space.
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
                Why The Woodlands Chooses Terracotta Construction
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Serving The Woodlands requires understanding of both technical construction skills and community standards. Terracotta Construction brings regional expertise, commitment to quality, and knowledge of Woodlands requirements that ensure your project succeeds from start to finish.
              </p>
              <ul className="space-y-4">
                {[
                  'Based in Montgomery, serving The Woodlands with local expertise',
                  'Knowledge of Woodlands village and township standards',
                  'Quick response times throughout all villages',
                  'Experience with The Woodlands architectural styles',
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
                Contact Your Woodlands Contractor
              </h3>
              <p className="text-gray-700 mb-6">
                Ready to discuss your project in The Woodlands? Contact us for a free estimate and discover why Woodlands homeowners and businesses trust Terracotta Construction for quality construction services.
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
            Frequently Asked Questions - The Woodlands, TX
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
            In addition to The Woodlands, Terracotta Construction provides the same quality services throughout Montgomery County and the Greater Houston area.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {siteConfig.serviceAreas
              .filter((area) => area.slug !== 'the-woodlands-tx')
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
            Ready to Get Started in The Woodlands?
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Contact Terracotta Construction for a free estimate on landscaping, fencing, handyman services, or any of our other professional construction services in The Woodlands, TX.
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
