import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, Scissors, ArrowLeft } from 'lucide-react';
import { siteConfig } from '@/lib/seo-config';
import { generateBreadcrumbSchema, generateServiceSchema, generateFAQSchema } from '@/lib/schema-generators';

export const metadata: Metadata = {
  title: 'Lawn Mowing Services Montgomery TX | Professional Grass Cutting & Edging',
  description: 'Professional lawn mowing services in Montgomery County, TX. Weekly mowing, precision edging, trimming & cleanup. Residential & commercial. Licensed & insured. Call (936) 955-4083.',
  keywords: [
    'lawn mowing Montgomery TX',
    'grass cutting Conroe TX',
    'lawn mowing service The Woodlands',
    'weekly lawn care Montgomery County',
    'residential lawn mowing Texas',
    'commercial grass cutting Houston area',
    'lawn edging service',
    'professional lawn mowing near me',
  ],
  alternates: {
    canonical: '/services/landscaping/lawn-mowing',
  },
};

const faqs = [
  {
    question: 'How often should I have my lawn mowed in Montgomery County?',
    answer: 'During the Texas growing season (March through October), we recommend weekly mowing for most lawns. In the cooler months, bi-weekly service is usually sufficient. We adjust the schedule based on grass growth rates, weather conditions, and your preferences.',
  },
  {
    question: 'What height do you cut the grass?',
    answer: 'Cutting height depends on your grass type. For St. Augustine (common in our area), we typically cut at 3-4 inches. Bermuda grass is cut at 1-2 inches. We adjust heights seasonally—cutting slightly higher in summer to reduce heat stress and promote deeper root growth.',
  },
  {
    question: 'Do you bag or mulch the clippings?',
    answer: 'We typically mulch clippings back into the lawn, which returns nutrients to the soil and reduces waste. However, if you prefer bagging or if excessive growth requires it (like after rain delays), we can bag and remove clippings for an additional fee.',
  },
  {
    question: 'What is included in your lawn mowing service?',
    answer: 'Our complete lawn mowing service includes mowing at the proper height, edging along sidewalks, driveways, and beds, string trimming around obstacles and borders, blowing off hard surfaces, and debris cleanup. We leave your property looking pristine after every visit.',
  },
  {
    question: 'Do you offer one-time mowing or only contracts?',
    answer: 'We offer both options. While most clients prefer recurring service for consistent results, we also provide one-time mowing for special occasions, vacation coverage, or to try our service. Contact us to discuss what works best for your situation.',
  },
];

export default function LawnMowingPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Landscaping', url: '/services/landscaping' },
    { name: 'Lawn Mowing', url: '/services/landscaping/lawn-mowing' },
  ]);

  const serviceSchema = generateServiceSchema(
    'Lawn Mowing Services',
    'Professional lawn mowing services including precision cutting, edging, trimming and cleanup for residential and commercial properties in Montgomery County, TX.',
    '/services/landscaping/lawn-mowing'
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
            <span>Lawn Mowing</span>
          </nav>
          <div className="flex items-center gap-4 mb-4">
            <Scissors className="w-12 h-12" />
            <h1 className="text-4xl md:text-5xl font-heading font-bold">
              Lawn Mowing Services
            </h1>
          </div>
          <p className="text-xl text-gray-200 max-w-3xl">
            Professional lawn mowing with precision cutting, clean edging, and thorough cleanup. Keep your Montgomery County property looking its best with reliable weekly service from Terracotta Construction.
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
              Professional Lawn Mowing in Montgomery County, Texas
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              A well-maintained lawn is the foundation of beautiful landscaping. At Terracotta Construction, our professional lawn mowing service delivers the consistent, quality care your property deserves. We understand that regular mowing isn&apos;t just about aesthetics—it&apos;s about maintaining healthy turf that can withstand the demands of the Texas climate.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Our experienced crews arrive on schedule with professional-grade equipment that&apos;s properly maintained for optimal cutting performance. We don&apos;t just mow and go—we take pride in the details that make the difference between an average lawn and a standout property.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4 mt-8">
              Our Complete Lawn Mowing Service Includes
            </h3>
            <ul className="space-y-3 mb-8">
              {[
                'Precision mowing at the optimal height for your grass type',
                'Clean, crisp edging along sidewalks, driveways, and landscape beds',
                'String trimming around trees, fences, posts, and other obstacles',
                'Blowing off all hard surfaces—driveways, sidewalks, patios',
                'Removal of debris and cleanup after every service',
                'Alternating mowing patterns to prevent ruts and soil compaction',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Why Proper Mowing Matters
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Cutting your lawn at the correct height and frequency is crucial for turf health. Mowing too short weakens grass, allowing weeds to take hold and making your lawn vulnerable to heat stress and disease. Mowing too infrequently results in removing too much blade at once, shocking the grass and causing brown tips.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Our professionals know the ideal cutting heights for common Texas grasses including St. Augustine, Bermuda, Zoysia, and Buffalo grass. We adjust mowing heights seasonally—slightly higher in summer to shade roots and conserve moisture, slightly lower in cooler months to prevent matting and disease.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Residential & Commercial Lawn Mowing
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Whether you own a single-family home in Montgomery, manage an apartment complex in Conroe, or operate a commercial property in The Woodlands, Terracotta Construction provides reliable lawn mowing service tailored to your needs. We handle properties of all sizes and can accommodate specific scheduling requirements for commercial clients.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg p-8 shadow-md max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-heading font-bold text-[#924C2E] mb-4">
              Get Your Free Lawn Mowing Estimate
            </h2>
            <p className="text-gray-700 mb-6">
              Ready for a perfectly manicured lawn without the hassle? Contact us today for a free estimate on recurring lawn mowing service.
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
            Frequently Asked Questions About Lawn Mowing
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
            Start Your Weekly Lawn Service Today
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Join dozens of satisfied Montgomery County homeowners and businesses who trust Terracotta Construction for reliable, professional lawn mowing service.
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
