import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, Leaf, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/lib/seo-config';
import { generateBreadcrumbSchema, generateServiceSchema, generateFAQSchema } from '@/lib/schema-generators';

export const metadata: Metadata = {
  title: 'Landscaping & Lawn Care Services Montgomery TX | Professional Yard Maintenance',
  description: 'Professional landscaping and lawn care services in Montgomery County, TX. Lawn mowing, trimming, mulching, seasonal cleanup, and tree trimming. Licensed & insured. Call (936) 955-4083.',
  keywords: [
    'landscaping services Montgomery TX',
    'lawn care Conroe TX',
    'lawn mowing The Woodlands',
    'mulching services Montgomery County',
    'tree trimming Texas',
    'seasonal cleanup Houston area',
    'yard maintenance service',
    'professional landscaper near me',
  ],
  alternates: {
    canonical: '/services/landscaping',
  },
};

const subServices = [
  {
    name: 'Lawn Mowing',
    slug: 'lawn-mowing',
    description: 'Professional lawn mowing with precision cutting, edging, and cleanup.',
  },
  {
    name: 'Mulching Services',
    slug: 'mulching-services',
    description: 'Quality mulch installation to protect plants and enhance curb appeal.',
  },
  {
    name: 'Seasonal Cleanup',
    slug: 'seasonal-cleanup',
    description: 'Comprehensive spring and fall cleanup to prepare your property.',
  },
  {
    name: 'Tree Trimming',
    slug: 'tree-trimming',
    description: 'Expert tree and shrub trimming for health, safety, and aesthetics.',
  },
];

const faqs = [
  {
    question: 'How often should I have my lawn mowed in Montgomery County?',
    answer: 'During the growing season in Texas (typically March through October), we recommend weekly mowing for most lawns. In the off-season, bi-weekly or monthly service is usually sufficient. We customize mowing schedules based on your grass type, property size, and preferences.',
  },
  {
    question: 'What types of mulch do you use for landscaping?',
    answer: 'We offer various mulch options including hardwood mulch, pine bark mulch, cedar mulch, and colored mulches. We recommend specific types based on your landscape design, plant types, and aesthetic preferences. All our mulches are quality products that provide excellent moisture retention and weed suppression.',
  },
  {
    question: 'Do you offer one-time landscaping services or only contracts?',
    answer: 'We offer both one-time services and ongoing maintenance contracts. Whether you need a single cleanup, seasonal mulching, or year-round lawn care, we customize our services to meet your needs and budget. Many clients start with one-time services and transition to regular maintenance.',
  },
  {
    question: 'Can you work on commercial properties as well as residential?',
    answer: 'Yes, Terracotta Construction provides landscaping services for both residential and commercial properties throughout Montgomery County. We handle everything from single-family homes to apartment complexes, retail centers, and office buildings with the same attention to quality.',
  },
  {
    question: 'What is included in seasonal cleanup services?',
    answer: 'Our seasonal cleanup services typically include leaf removal, debris clearing, bed edging and cleaning, pruning of shrubs and perennials, gutter clearing, and preparation for the upcoming season. Spring cleanups focus on preparing for growth while fall cleanups protect your landscape through winter.',
  },
];

export default function LandscapingPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Landscaping & Lawn Care', url: '/services/landscaping' },
  ]);

  const serviceSchema = generateServiceSchema(
    'Landscaping & Lawn Care Services',
    'Professional landscaping and lawn care services including lawn mowing, mulching, seasonal cleanup, and tree trimming in Montgomery County, TX.',
    '/services/landscaping'
  );

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
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
            <Link href="/services" className="hover:text-white">Services</Link>
            <span className="mx-2">/</span>
            <span>Landscaping & Lawn Care</span>
          </nav>
          <div className="flex items-center gap-4 mb-4">
            <Leaf className="w-12 h-12" />
            <h1 className="text-4xl md:text-5xl font-heading font-bold">
              Landscaping & Lawn Care Services
            </h1>
          </div>
          <p className="text-xl text-gray-200 max-w-3xl">
            Professional lawn care and landscaping services that keep your Montgomery County property looking its best year-round. From weekly mowing to comprehensive seasonal maintenance, trust Terracotta Construction for all your outdoor needs.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#924C2E] mb-6">
              Professional Landscaping Services in Montgomery County, Texas
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              A well-maintained landscape does more than enhance your property&apos;s visual appeal—it creates welcoming outdoor spaces, increases property value, and reflects the pride you take in your home or business. At Terracotta Construction, we provide comprehensive landscaping and lawn care services designed to keep residential and commercial properties throughout Montgomery County and the Greater Houston area looking their absolute best in every season.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              The Texas Gulf Coast climate presents unique challenges for property owners. Hot, humid summers stress turf and plants, while unpredictable weather patterns can create maintenance challenges throughout the year. Our experienced landscaping professionals understand these local conditions and apply proven techniques to maintain healthy, attractive landscapes despite the environmental demands. We use appropriate grass varieties, optimize watering and fertilization schedules for our climate, and time seasonal tasks to maximize their effectiveness.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Whether you own a single-family home in Montgomery, manage an apartment complex in Conroe, operate a retail business in The Woodlands, or maintain a rural estate in Magnolia, Terracotta Construction delivers reliable landscaping services tailored to your property&apos;s specific needs. We handle everything from routine mowing and edging to comprehensive landscape maintenance programs that include mulching, pruning, seasonal cleanup, and more.
            </p>
            <p className="text-lg text-gray-700">
              Our team approaches every property with the same commitment to quality, regardless of size. We arrive on schedule, use professional-grade equipment properly maintained for optimal performance, and leave your property looking pristine after every visit. When you choose Terracotta Construction for your landscaping needs, you partner with professionals who take genuine pride in their work and treat your property as if it were their own.
            </p>
          </div>
        </div>
      </section>

      {/* Sub-Services */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#924C2E] mb-8 text-center">
            Our Landscaping Services
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {subServices.map((service) => (
              <Link
                key={service.slug}
                href={`/services/landscaping/${service.slug}`}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition group"
              >
                <h3 className="text-xl font-heading font-semibold text-[#924C2E] mb-3 flex items-center gap-2">
                  {service.name}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </h3>
                <p className="text-gray-700">{service.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Service Description */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-heading font-bold text-[#924C2E] mb-6">
              Comprehensive Lawn Care for Every Season
            </h2>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Professional Lawn Mowing and Edging
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Regular mowing is the foundation of a healthy, attractive lawn. Our lawn mowing service includes precision cutting at the optimal height for your grass type, clean edging along sidewalks, driveways, and landscape beds, string trimming around obstacles and in areas the mower cannot reach, and thorough cleanup of all clippings and debris. We adjust mowing height seasonally to promote healthy root development and stress resistance, and we vary our mowing patterns to prevent soil compaction and uneven growth. The result is a consistently manicured appearance that enhances your property&apos;s curb appeal week after week.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Mulching for Plant Health and Aesthetics
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Properly applied mulch provides numerous benefits for your landscape. It conserves soil moisture during our hot Texas summers, reduces weed germination and growth, moderates soil temperature extremes, prevents soil erosion, and adds a finished, professional appearance to landscape beds. Our mulching service includes bed preparation, removal of existing weeds, proper mulch depth application (typically 2-3 inches), and careful placement around plants to prevent crown rot. We offer a variety of mulch types and colors to complement your home&apos;s architecture and existing landscape design.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Seasonal Cleanup Services
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Each season brings specific maintenance requirements to keep your landscape healthy and attractive. Our spring cleanup services prepare your property for the growing season with debris removal, bed cleaning and edging, pruning of winter-damaged plants, pre-emergent weed control, and fresh mulch application. Fall cleanup services protect your landscape through winter with leaf removal, final pruning of perennials and shrubs, clearing of annual beds, gutter cleaning, and preparation of irrigation systems for cold weather. These seasonal services ensure your property transitions smoothly from one season to the next without accumulated debris or deferred maintenance issues.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Tree and Shrub Trimming
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Proper pruning maintains the health, safety, and appearance of your trees and shrubs. Our tree trimming services include removal of dead, diseased, or crossing branches, shaping to promote natural growth habits, clearance from structures and walkways, and crown thinning to improve air circulation and light penetration. For shrubs and hedges, we provide both formal shaping for manicured looks and naturalistic pruning that maintains plant health while controlling size. We time our pruning to each plant&apos;s growth cycle to avoid stress and promote vigorous regrowth. Safety is paramount in all tree work, and we use proper techniques and equipment to protect your property and our team members.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Additional Landscaping Services
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Beyond our core services, Terracotta Construction offers additional landscaping solutions to meet your property&apos;s needs. These include flower bed installation and seasonal color rotations, new plant installation and transplanting, sod installation and lawn renovation, basic irrigation repairs and adjustments, leaf removal and debris hauling, and storm damage cleanup. We work with you to develop a customized maintenance program that addresses all aspects of your landscape care within your budget.
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
                Why Choose Terracotta Construction for Landscaping
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Montgomery County property owners trust Terracotta Construction for landscaping services because we deliver consistent quality, reliable service, and genuine value. Our approach to lawn care and landscape maintenance reflects our core values of professionalism, integrity, and customer satisfaction.
              </p>
              <ul className="space-y-4">
                {[
                  'Experienced professionals who understand Texas landscapes',
                  'Reliable, on-time service you can count on',
                  'Professional-grade equipment properly maintained',
                  'Customized service plans to fit your needs and budget',
                  'Quality materials and proven techniques',
                  'Clear communication and responsive customer service',
                  'Licensed, bonded, and fully insured',
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
              <h3 className="text-2xl font-heading font-bold text-[#924C2E] mb-6">
                Request Your Free Estimate
              </h3>
              <p className="text-gray-700 mb-6">
                Ready to transform your landscape? Contact us today for a free, no-obligation estimate on lawn care and landscaping services. We&apos;ll visit your property, assess your needs, and provide a detailed proposal.
              </p>
              <div className="space-y-4">
                <a
                  href={`tel:${siteConfig.business.phone}`}
                  className="flex items-center gap-3 text-lg font-semibold text-[#924C2E] hover:text-[#7a3f28]"
                >
                  <Phone className="w-6 h-6" />
                  {siteConfig.business.phone}
                </a>
              </div>
              <Link
                href="/contact"
                className="inline-block w-full bg-[#924C2E] text-white px-6 py-3 rounded-md font-semibold text-center hover:bg-[#7a3f28] transition mt-6"
              >
                Get Your Free Estimate
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-[#924C2E] mb-8 text-center">
            Frequently Asked Questions About Landscaping Services
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

      {/* Service Areas */}
      <section className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-heading font-bold mb-8">
            Landscaping Services Throughout Montgomery County
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
            Terracotta Construction provides professional landscaping and lawn care services in Montgomery, Conroe, The Woodlands, Magnolia, Willis, Huntsville, Tomball, Spring, Cypress, Katy, and surrounding communities.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {siteConfig.serviceAreas.map((area) => (
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
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Ready for a More Beautiful Landscape?
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Contact Terracotta Construction today to discuss your landscaping needs. Whether you need weekly lawn maintenance or a complete landscape overhaul, we&apos;re here to help you achieve the outdoor space you&apos;ve always wanted.
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
