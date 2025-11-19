import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, Calendar, ArrowLeft } from 'lucide-react';
import { siteConfig } from '@/lib/seo-config';
import { generateBreadcrumbSchema, generateServiceSchema, generateFAQSchema } from '@/lib/schema-generators';

export const metadata: Metadata = {
  title: 'Seasonal Cleanup Services Montgomery TX | Spring & Fall Yard Cleanup',
  description: 'Professional seasonal cleanup services in Montgomery County, TX. Spring & fall yard cleanup, leaf removal, bed preparation & debris clearing. Licensed & insured. Call (936) 955-4083.',
  keywords: [
    'seasonal cleanup Montgomery TX',
    'fall cleanup Conroe TX',
    'spring cleanup The Woodlands',
    'leaf removal Montgomery County',
    'yard cleanup service Texas',
    'fall leaf removal Houston area',
    'spring bed preparation',
    'seasonal yard maintenance near me',
  ],
  alternates: {
    canonical: '/services/landscaping/seasonal-cleanup',
  },
};

const faqs = [
  {
    question: 'When is the best time for spring cleanup in Montgomery County?',
    answer: 'In Montgomery County, we typically recommend spring cleanup in late February to early March, after the last frost but before the growing season kicks in. This timing allows us to remove winter debris, cut back dead perennials, and prepare beds for spring growth and mulching.',
  },
  {
    question: 'What is included in fall cleanup service?',
    answer: 'Our fall cleanup includes multiple leaf removal visits, cutting back perennials and ornamental grasses, removing annual plants, clearing debris from beds and lawns, gutter cleaning, and final pruning of shrubs. We prepare your landscape to withstand winter and emerge healthy in spring.',
  },
  {
    question: 'How many times do you come for leaf removal in fall?',
    answer: 'We typically schedule 2-4 leaf removal visits during fall, depending on the tree coverage on your property. We can time visits after major leaf drop periods for efficiency, or provide weekly service for properties with heavy tree cover that need to maintain appearance.',
  },
  {
    question: 'Do you haul away the debris from cleanup?',
    answer: 'Yes, debris removal is included in our seasonal cleanup service. We haul away all leaves, branches, dead plants, and other organic material we remove from your property. Your property will be completely clean when we finish.',
  },
  {
    question: 'Can you combine seasonal cleanup with other services?',
    answer: 'Absolutely! Many clients combine spring cleanup with mulching and pre-emergent weed treatment for a complete spring preparation package. Fall cleanup often pairs well with final fertilization and overseeding. We can create a custom package for your needs.',
  },
];

export default function SeasonalCleanupPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Landscaping', url: '/services/landscaping' },
    { name: 'Seasonal Cleanup', url: '/services/landscaping/seasonal-cleanup' },
  ]);

  const serviceSchema = generateServiceSchema(
    'Seasonal Cleanup Services',
    'Professional spring and fall cleanup services including leaf removal, bed preparation, debris clearing, and landscape winterization in Montgomery County, TX.',
    '/services/landscaping/seasonal-cleanup'
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
            <Link href="/services/landscaping" className="hover:text-white">Landscaping</Link>
            <span className="mx-2">/</span>
            <span>Seasonal Cleanup</span>
          </nav>
          <div className="flex items-center gap-4 mb-4">
            <Calendar className="w-12 h-12" />
            <h1 className="text-4xl md:text-5xl font-heading font-bold">
              Seasonal Cleanup Services
            </h1>
          </div>
          <p className="text-xl text-gray-200 max-w-3xl">
            Comprehensive spring and fall cleanup to prepare your Montgomery County property for the season ahead. From leaf removal to bed preparation, we handle it all.
          </p>
        </div>
      </section>

      {/* Back Link */}
      <section className="py-4 px-4 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/services/landscaping"
            className="inline-flex items-center gap-2 text-[#924C2E] hover:text-[#7a3f28] font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Landscaping Services
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#924C2E] mb-6">
              Professional Seasonal Cleanup in Montgomery County, Texas
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Each season brings specific maintenance needs to keep your landscape healthy and attractive. At Terracotta Construction, our seasonal cleanup services prepare your property for what&apos;s ahead—whether that&apos;s the explosive growth of spring or the dormancy of winter.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Texas landscapes don&apos;t get the harsh winters of northern states, but they still need seasonal attention. Dead plant material, fallen leaves, and accumulated debris can harbor pests and diseases, smother turf, and create an unkempt appearance. Our cleanup services address these issues while preparing your landscape to thrive in the coming months.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4 mt-8">
              Spring Cleanup Services
            </h3>
            <p className="text-lg text-gray-700 mb-4">
              Spring cleanup prepares your property for the growing season:
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Removal of leaves and winter debris from beds and lawn',
                'Cutting back dead perennials and ornamental grasses',
                'Pruning winter-damaged branches from shrubs and trees',
                'Bed edging and border definition',
                'Removal of last season&apos;s annual plants',
                'Raking and dethatching lawn areas',
                'Clearing gutters and downspout areas',
                'Preparation for spring mulching and planting',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Fall Cleanup Services
            </h3>
            <p className="text-lg text-gray-700 mb-4">
              Fall cleanup protects your landscape through winter:
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Multiple leaf removal visits throughout the season',
                'Cutting back perennials and ornamental grasses',
                'Removal of spent annual plants',
                'Final pruning of shrubs and hedges',
                'Bed clearing and cleanup',
                'Gutter cleaning and debris removal',
                'Lawn aeration preparation',
                'Winterization recommendations for irrigation',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Why Seasonal Cleanup Matters
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              <strong>Disease Prevention:</strong> Accumulated leaves and debris create damp conditions that harbor fungal diseases. Removing this material helps keep your plants healthy.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              <strong>Pest Control:</strong> Many insects overwinter in leaf litter and dead plant material. Fall cleanup reduces pest populations for the following year.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              <strong>Turf Health:</strong> Leaves left on lawns block sunlight and trap moisture, causing dead spots and disease. Proper removal keeps your lawn green and healthy.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              <strong>Curb Appeal:</strong> A clean, well-maintained property looks great year-round and maintains your home&apos;s value.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg p-8 shadow-md max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-heading font-bold text-[#924C2E] mb-4">
              Schedule Your Seasonal Cleanup
            </h2>
            <p className="text-gray-700 mb-6">
              Don&apos;t let accumulated debris harm your landscape. Contact us today to schedule spring or fall cleanup service for your Montgomery County property.
            </p>
            <div className="space-y-4">
              <a
                href={`tel:${siteConfig.business.phone}`}
                className="flex items-center justify-center gap-3 text-lg font-semibold text-[#924C2E] hover:text-[#7a3f28]"
              >
                <Phone className="w-6 h-6" />
                {siteConfig.business.phone}
              </a>
              <Link
                href="/contact"
                className="inline-block w-full bg-[#924C2E] text-white px-6 py-3 rounded-md font-semibold text-center hover:bg-[#7a3f28] transition"
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
            Frequently Asked Questions About Seasonal Cleanup
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

      {/* Final CTA */}
      <section className="bg-[#924C2E] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Prepare Your Property for the Season Ahead
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Professional seasonal cleanup keeps your landscape healthy and beautiful year-round. Contact Terracotta Construction today.
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
