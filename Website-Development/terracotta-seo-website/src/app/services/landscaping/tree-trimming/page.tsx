import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, TreeDeciduous, ArrowLeft } from 'lucide-react';
import { siteConfig } from '@/lib/seo-config';
import { generateBreadcrumbSchema, generateServiceSchema, generateFAQSchema } from '@/lib/schema-generators';

export const metadata: Metadata = {
  title: 'Tree Trimming Services Montgomery TX | Professional Tree & Shrub Pruning',
  description: 'Professional tree trimming and shrub pruning services in Montgomery County, TX. Expert tree care for health, safety & aesthetics. Licensed & insured. Call (936) 955-4083.',
  keywords: [
    'tree trimming Montgomery TX',
    'tree pruning Conroe TX',
    'shrub trimming The Woodlands',
    'tree care Montgomery County',
    'hedge trimming Texas',
    'tree branch removal Houston area',
    'professional tree trimming',
    'tree service near me',
  ],
  alternates: {
    canonical: '/services/landscaping/tree-trimming',
  },
};

const faqs = [
  {
    question: 'When is the best time to trim trees in Texas?',
    answer: 'Most trees are best pruned during dormancy (late winter, January-February) when they&apos;re not actively growing. However, dead or hazardous branches should be removed immediately regardless of season. Some flowering trees should be pruned right after blooming. We advise on the best timing for each species.',
  },
  {
    question: 'How much of a tree can be trimmed at once?',
    answer: 'We follow the industry standard of removing no more than 25% of a tree&apos;s canopy in a single year. Removing too much stresses the tree and can trigger excessive sprouting or decline. For trees that need significant reduction, we develop a multi-year plan.',
  },
  {
    question: 'Do you remove large trees?',
    answer: 'Our tree trimming service focuses on pruning and maintenance trimming that can be done safely from the ground or with orchard ladders. For large tree removal or work requiring climbing/bucket trucks, we can refer you to trusted arborist partners who specialize in that work.',
  },
  {
    question: 'What&apos;s included in shrub trimming service?',
    answer: 'Our shrub trimming includes shaping and size control, removal of dead or diseased branches, thinning for air circulation, cleanup of all clippings, and recommendations for ongoing care. We can maintain formal shapes or naturalistic forms depending on your preference.',
  },
  {
    question: 'How often should shrubs and hedges be trimmed?',
    answer: 'Most hedges need trimming 2-4 times during the growing season to maintain a neat appearance. Individual shrubs typically need pruning 1-2 times per year. Fast-growing plants like privet need more frequent attention than slow-growers like boxwood.',
  },
];

export default function TreeTrimmingPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Landscaping', url: '/services/landscaping' },
    { name: 'Tree Trimming', url: '/services/landscaping/tree-trimming' },
  ]);

  const serviceSchema = generateServiceSchema(
    'Tree Trimming Services',
    'Professional tree trimming and shrub pruning services for health, safety, and aesthetics in Montgomery County, TX.',
    '/services/landscaping/tree-trimming'
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
            <span>Tree Trimming</span>
          </nav>
          <div className="flex items-center gap-4 mb-4">
            <TreeDeciduous className="w-12 h-12" />
            <h1 className="text-4xl md:text-5xl font-heading font-bold">
              Tree Trimming Services
            </h1>
          </div>
          <p className="text-xl text-gray-200 max-w-3xl">
            Expert tree and shrub trimming for health, safety, and beauty. Professional pruning techniques that enhance your Montgomery County landscape.
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
              Professional Tree Trimming in Montgomery County, Texas
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Proper pruning is one of the most important things you can do for the long-term health and beauty of your trees and shrubs. At Terracotta Construction, we use correct pruning techniques that promote plant health, maintain natural form, ensure safety, and enhance your property&apos;s appearance.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Unlike topping or excessive trimming that damages trees, professional pruning removes only what&apos;s necessary—dead, diseased, or crossing branches, plus selective thinning to improve structure and light penetration. The result is healthier plants that require less maintenance over time.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4 mt-8">
              Our Tree Trimming Services Include
            </h3>
            <ul className="space-y-3 mb-8">
              {[
                'Dead and diseased branch removal',
                'Crown thinning to improve air circulation',
                'Clearance from structures, walkways, and utilities',
                'Removal of crossing and rubbing branches',
                'Proper pruning cuts that promote healing',
                'Storm damage cleanup and restoration pruning',
                'Small tree shaping and training',
                'Complete cleanup and debris removal',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Shrub & Hedge Trimming
            </h3>
            <p className="text-lg text-gray-700 mb-4">
              Our shrub maintenance services keep your plantings healthy and attractive:
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Formal hedge shaping for clean geometric lines',
                'Naturalistic pruning that maintains plant character',
                'Renewal pruning for overgrown shrubs',
                'Deadheading and light shaping of flowering shrubs',
                'Size control to prevent crowding',
                'Removal of dead and diseased branches',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Why Proper Pruning Matters
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              <strong>Tree Health:</strong> Removing dead and diseased branches prevents decay organisms from spreading. Proper cuts allow trees to compartmentalize wounds and heal effectively.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              <strong>Safety:</strong> Dead branches can fall without warning. Branches rubbing on roofs or blocking sightlines create hazards. Regular trimming addresses these issues before they become problems.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              <strong>Aesthetics:</strong> Professional pruning enhances the natural beauty of trees and shrubs while maintaining appropriate scale with your home and landscape.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              <strong>Light & Air:</strong> Thinning improves air circulation (reducing disease) and allows more light to reach turf and other plantings beneath the tree canopy.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg p-8 shadow-md max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-heading font-bold text-[#924C2E] mb-4">
              Get Your Free Tree Trimming Estimate
            </h2>
            <p className="text-gray-700 mb-6">
              Ready to enhance your trees and shrubs with professional pruning? Contact us today for a free estimate on tree trimming services.
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
            Frequently Asked Questions About Tree Trimming
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
            Keep Your Trees Healthy & Beautiful
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Professional tree trimming protects your investment and enhances your landscape. Contact Terracotta Construction today.
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
