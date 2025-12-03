import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, Layers, ArrowLeft } from 'lucide-react';
import { siteConfig } from '@/lib/seo-config';
import { generateBreadcrumbSchema, generateServiceSchema, generateFAQSchema } from '@/lib/schema-generators';

export const metadata: Metadata = {
  title: 'Mulching Services Montgomery TX | Professional Mulch Installation',
  description: 'Professional mulching services in Montgomery County, TX. Quality mulch installation for beds, trees & landscapes. Multiple mulch types available. Licensed & insured. Call (936) 955-4083.',
  keywords: [
    'mulching services Montgomery TX',
    'mulch installation Conroe TX',
    'landscape mulching The Woodlands',
    'hardwood mulch Montgomery County',
    'cedar mulch installation Texas',
    'flower bed mulching Houston area',
    'professional mulching service',
    'mulch delivery and installation near me',
  ],
  alternates: {
    canonical: '/services/landscaping/mulching-services',
  },
};

const faqs = [
  {
    question: 'What types of mulch do you offer?',
    answer: 'We offer a variety of mulch options including natural hardwood mulch, pine bark mulch, cedar mulch, and colored mulches (black, brown, red). Each type has specific benefits—cedar repels insects, hardwood breaks down to improve soil, and colored mulches provide long-lasting aesthetics. We help you choose based on your needs.',
  },
  {
    question: 'How deep should mulch be applied?',
    answer: 'We typically apply mulch 2-3 inches deep for optimal results. This depth is enough to suppress weeds and retain moisture without suffocating plant roots. Around trees, we create a donut shape keeping mulch away from the trunk to prevent rot. Too much mulch can actually harm plants.',
  },
  {
    question: 'How often should mulch be replaced?',
    answer: 'Most mulch should be refreshed annually or every 18 months. Natural mulches decompose over time (which is good for soil) and need topping off. Before adding new mulch, we fluff existing material to prevent matting. We can set up annual mulching as part of your maintenance plan.',
  },
  {
    question: 'Do you remove old mulch before applying new?',
    answer: 'Usually, we don&apos;t need to remove old mulch—we fluff it and add new material on top. However, if the existing mulch is diseased, matted beyond repair, or too deep, we&apos;ll remove some before applying fresh mulch. We assess each situation and recommend the best approach.',
  },
  {
    question: 'Can mulching help with weed control?',
    answer: 'Yes, a proper 2-3 inch layer of mulch significantly reduces weed germination by blocking sunlight. For best results, we recommend applying pre-emergent herbicide before mulching in spring. This combination provides excellent weed control throughout the growing season.',
  },
];

export default function MulchingServicesPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Landscaping', url: '/services/landscaping' },
    { name: 'Mulching Services', url: '/services/landscaping/mulching-services' },
  ]);

  const serviceSchema = generateServiceSchema(
    'Mulching Services',
    'Professional mulch installation services including bed preparation, weed removal, and quality mulch application for landscapes in Montgomery County, TX.',
    '/services/landscaping/mulching-services'
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
            <span>Mulching Services</span>
          </nav>
          <div className="flex items-center gap-4 mb-4">
            <Layers className="w-12 h-12" />
            <h1 className="text-4xl md:text-5xl font-heading font-bold">
              Mulching Services
            </h1>
          </div>
          <p className="text-xl text-gray-200 max-w-3xl">
            Professional mulch installation that protects your plants, suppresses weeds, and enhances your landscape&apos;s curb appeal. Quality mulch products expertly applied by Terracotta Construction.
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
              Professional Mulching Services in Montgomery County, Texas
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Mulch is one of the most beneficial investments you can make in your landscape. A properly applied layer of quality mulch conserves soil moisture during our hot Texas summers, moderates soil temperature extremes, suppresses weed growth, prevents erosion, and gives your landscape beds a finished, professional appearance.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              At Terracotta Construction, our mulching service goes beyond just dumping mulch in your beds. We prepare the area properly, remove existing weeds, edge the beds for clean lines, and apply mulch at the correct depth and away from plant crowns. The result is a landscape that looks great and stays healthier with less maintenance.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4 mt-8">
              Our Complete Mulching Service Includes
            </h3>
            <ul className="space-y-3 mb-8">
              {[
                'Bed edging and border definition',
                'Removal of existing weeds and debris',
                'Soil amendment recommendations if needed',
                'Quality mulch application at proper 2-3 inch depth',
                'Careful placement around plants to prevent crown rot',
                'Tree rings shaped properly away from trunk',
                'Complete cleanup of all work areas',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Mulch Types We Offer
            </h3>
            <p className="text-lg text-gray-700 mb-4">
              We carry a variety of mulch products to suit different needs and preferences:
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Hardwood mulch - Natural brown color, breaks down to improve soil',
                'Pine bark mulch - Slightly acidic, great for azaleas and camellias',
                'Cedar mulch - Natural insect repellent properties, aromatic',
                'Colored mulches - Black, brown, or red for consistent long-lasting color',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Benefits of Professional Mulching
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              <strong>Moisture Conservation:</strong> Mulch reduces water evaporation from soil by up to 70%, meaning less watering and healthier plants during Texas heat waves. This saves water and money while keeping your landscape thriving.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              <strong>Weed Suppression:</strong> A proper mulch layer blocks sunlight from reaching weed seeds, dramatically reducing germination. Combined with pre-emergent treatments, mulching provides excellent season-long weed control.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              <strong>Soil Temperature Regulation:</strong> Mulch insulates soil, keeping roots cooler in summer and warmer in winter. This reduces plant stress and promotes better growth year-round.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              <strong>Curb Appeal:</strong> Fresh mulch instantly enhances your property&apos;s appearance. It provides a clean, unified look that makes plants pop and shows you care about your property.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg p-8 shadow-md max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-heading font-bold text-[#924C2E] mb-4">
              Get Your Free Mulching Estimate
            </h2>
            <p className="text-gray-700 mb-6">
              Ready to enhance your landscape with professional mulching? Contact us today for a free estimate. We&apos;ll assess your beds and recommend the best mulch type and quantity for your property.
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
            Frequently Asked Questions About Mulching
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
            Transform Your Landscape with Fresh Mulch
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Give your property the finished, professional look it deserves. Contact Terracotta Construction today for quality mulching services in Montgomery County.
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
