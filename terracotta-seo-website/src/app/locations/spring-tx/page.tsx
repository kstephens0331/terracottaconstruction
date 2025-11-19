import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, MapPin, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/lib/seo-config';
import { generateBreadcrumbSchema, generateLocationSchema, generateFAQSchema } from '@/lib/schema-generators';

export const metadata: Metadata = {
  title: 'Construction Services Spring TX | Landscaping, Fencing, Handyman',
  description: 'Professional construction, landscaping, fencing, and handyman services in Spring, TX. Locally owned, licensed & insured. Serving Spring and Harris County. Call (936) 955-4083.',
  keywords: [
    'construction services Spring TX',
    'landscaping Spring Texas',
    'fencing installation Spring TX',
    'handyman services Spring',
    'contractor Spring TX',
    'lawn care Spring Texas',
    'metal building Spring TX',
    'emergency repairs Spring',
  ],
  alternates: {
    canonical: '/locations/spring-tx',
  },
};

const faqs = [
  {
    question: 'What construction services do you provide in Spring, TX?',
    answer: 'Terracotta Construction provides comprehensive services in Spring including landscaping and lawn care, fencing installation and repair, handyman services, apartment turnovers, 24/7 emergency repairs, and custom metal building construction. We serve both the historic Old Town Spring area and the many master-planned communities throughout greater Spring.',
  },
  {
    question: 'How quickly can you respond to service calls in Spring?',
    answer: 'Being based in Montgomery, we can typically respond to Spring service requests within 24 hours for standard projects and immediately for emergency situations. Our location provides efficient access to all areas of Spring via I-45 and the Grand Parkway.',
  },
  {
    question: 'Do you work with both residential and commercial properties in Spring?',
    answer: 'Yes, we serve both residential and commercial clients throughout Spring. Our services range from single-family homes in communities like Gleannloch Farms, Klein, and Louetta to commercial properties along I-45 and FM 2920. We also serve the unique shops and businesses in Old Town Spring.',
  },
  {
    question: 'Are you familiar with Spring TX building codes and regulations?',
    answer: 'Absolutely. We maintain current knowledge of Harris County building codes, permit requirements, and regulations that apply to Spring properties. We understand the specific requirements for different Spring neighborhoods, including various HOA standards and the considerations for properties in the Old Town Spring area.',
  },
  {
    question: 'Do you offer ongoing maintenance contracts in Spring?',
    answer: 'Yes, we offer flexible maintenance contracts for Spring properties including weekly lawn care, seasonal landscape maintenance, and property management services. Many Spring clients in master-planned communities like Gleannloch Farms prefer regular service plans to maintain their property\'s appearance and meet HOA standards.',
  },
];

export default function SpringTXPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Service Areas', url: '/locations' },
    { name: 'Spring, TX', url: '/locations/spring-tx' },
  ]);

  const locationSchema = generateLocationSchema('Spring', 'TX', '/locations/spring-tx');
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
            <span>Spring, TX</span>
          </nav>
          <div className="flex items-center gap-4 mb-4">
            <MapPin className="w-10 h-10" />
            <h1 className="text-4xl md:text-5xl font-heading font-bold">
              Construction Services in Spring, TX
            </h1>
          </div>
          <p className="text-xl text-gray-200 max-w-3xl">
            Professional construction, landscaping, and handyman services for Spring&apos;s diverse neighborhoods from Old Town to master-planned communities. Terracotta Construction proudly serves this vibrant Harris County area.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#924C2E] mb-6">
              Your Trusted Construction Partner in Spring, Texas
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Spring, Texas encompasses a vast and diverse area of north Harris County, home to hundreds of thousands of residents in communities ranging from the charming shops and restaurants of Old Town Spring to sprawling master-planned developments with golf courses and resort-style amenities. This unincorporated area has grown dramatically while retaining the Texas character that gives it its name—a reference to the natural springs that once drew settlers to this region. Terracotta Construction proudly serves the entire Spring area with professional construction, landscaping, and handyman services suited to this community&apos;s diverse properties.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Operating from our Montgomery headquarters with easy access via I-45 and the Grand Parkway, we serve Spring&apos;s many distinct neighborhoods. The Klein area offers established neighborhoods with mature trees and excellent schools. Gleannloch Farms provides resort-style living with lakes, trails, and amenities. Champions Forest and Champions area feature golf course communities. Vintage Park and the FM 2920 corridor offer newer development with commercial conveniences. Old Town Spring maintains its unique historic character with Victorian-era charm. Each area has different characteristics and requirements, and Terracotta Construction understands these distinctions.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Spring&apos;s location along the I-45 corridor has made it one of Houston&apos;s most desirable suburban areas, with excellent schools in both Spring ISD and Klein ISD, convenient access to downtown Houston and the energy corridor, and abundant shopping, dining, and entertainment options. This desirability means property values remain strong, and property owners benefit from maintaining their investments with professional services that preserve and enhance both function and appeal.
            </p>
            <p className="text-lg text-gray-700">
              Whether you own a home near Old Town Spring with its festivals and shops, a family property in one of Spring&apos;s many excellent school districts, a vacation home in a golf course community, or commercial property serving Spring&apos;s large population, Terracotta Construction provides the professional services you need. We take pride in serving this dynamic area with quality workmanship that meets the high standards Spring property owners expect.
            </p>
          </div>
        </div>
      </section>

      {/* Services Available */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-[#924C2E] mb-8 text-center">
            Services Available in Spring, TX
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
              Comprehensive Property Services for Spring Residents
            </h2>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Landscaping & Lawn Care in Spring
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Spring&apos;s subtropical climate and diverse neighborhoods create varied landscape maintenance needs. Our comprehensive services keep Spring properties looking their best throughout the year. Precision mowing with detailed edging creates clean, professional appearances that satisfy HOA requirements and personal pride. Mulching services protect plants during Texas&apos; intense summers while adding visual appeal to landscape beds. Seasonal cleanup addresses the significant leaf drop from Spring&apos;s mature trees and prepares properties for seasonal changes. Expert tree trimming maintains the health and appearance of the large oaks, pines, and other species found throughout Spring&apos;s established neighborhoods. For communities like Gleannloch Farms with specific landscape standards, we ensure compliance while enhancing your property&apos;s beauty.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Fencing Installation & Repair in Spring
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Fencing serves important purposes throughout Spring, from privacy and security to pet containment and aesthetic definition. Spring&apos;s many HOA communities often have specific fencing requirements, and we understand and comply with these standards. We install and repair wood privacy fences in approved styles and heights, providing backyard seclusion while meeting community guidelines. Chain link offers economical utility fencing where appropriate. Ornamental metal fencing adds elegance and is often required in front yards or visible areas. Pool fencing meets safety requirements while complementing property aesthetics. All our fence installations use quality materials, proper construction techniques, and attention to community standards that result in long-lasting, compliant fencing.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Handyman Services for Spring Homes and Businesses
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Spring&apos;s homes range from brand-new construction to properties built decades ago, each with different repair and maintenance needs. Our skilled handymen provide comprehensive services including drywall repair and installation, door installation and adjustment, window repairs and upgrades, fixture mounting and installation, caulking and weatherproofing, painting touch-ups, and general carpentry. For newer Spring homes, we handle warranty-period touch-ups and improvements that personalize your space. For older properties, we address settling, weathering, and normal wear with professional repairs that restore function and appearance. For Spring businesses, we provide timely repairs that maintain professional appearances.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Apartment Turnovers in Spring
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Spring&apos;s large population and strong economy create significant demand for rental housing. Landlords and property managers throughout Spring need efficient turnover services that minimize vacancy time while preparing units to attract quality tenants. Terracotta Construction provides thorough make-ready services including professional cleaning, paint touch-ups or complete repainting, carpet cleaning or replacement, fixture updates, lock changes, and detailed inspections. We work efficiently to deliver move-in ready units that justify competitive rents in the strong Spring rental market. For property managers overseeing multiple units, we provide consistent quality and responsive scheduling.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Emergency Services in Spring
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              When emergencies strike Spring properties, rapid response protects your investment from further damage. Our 24/7 emergency services address water damage from plumbing failures or storms, wind and storm damage repair, emergency fence repairs, board-ups, and other urgent needs. Spring&apos;s location in Southeast Texas means exposure to severe thunderstorms, occasional tropical weather, and flooding risks in low-lying areas. Our responsive service helps Spring property owners address emergencies quickly, minimizing damage and beginning recovery as soon as possible.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Metal Buildings & Custom Construction in Spring
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              While much of Spring consists of HOA communities with building restrictions, some properties can accommodate metal buildings for workshops, vehicle storage, and other uses where permitted. We design and construct custom steel buildings that meet applicable requirements and serve your specific needs. Workshop buildings provide space for hobbies and projects. Vehicle garages protect cars, boats, and recreational vehicles. Storage buildings house equipment and seasonal items. Our metal building projects include quality steel components, proper foundation work engineered for Spring&apos;s soil conditions, and attention to appearance, drainage, and other requirements that ensure long-lasting, functional structures.
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
                Why Spring Chooses Terracotta Construction
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Serving Spring&apos;s diverse neighborhoods requires understanding of different community standards, property types, and homeowner expectations. Terracotta Construction brings regional expertise and commitment to quality that Spring property owners depend on for their construction and maintenance needs.
              </p>
              <ul className="space-y-4">
                {[
                  'Serving Spring from Montgomery with quick response times',
                  'Knowledge of Spring\'s many neighborhoods and HOA requirements',
                  'Experience with both older and newer construction',
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
                Contact Your Spring Contractor
              </h3>
              <p className="text-gray-700 mb-6">
                Ready to discuss your Spring property project? Contact us for a free estimate and discover why homeowners and businesses throughout Spring trust Terracotta Construction.
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
            Frequently Asked Questions - Spring, TX
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
            In addition to Spring, Terracotta Construction provides the same quality services throughout Montgomery County and the Greater Houston area.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {siteConfig.serviceAreas
              .filter((area) => area.slug !== 'spring-tx')
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
            Ready to Get Started in Spring?
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Contact Terracotta Construction for a free estimate on landscaping, fencing, handyman services, or any of our other professional construction services in Spring, TX.
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
