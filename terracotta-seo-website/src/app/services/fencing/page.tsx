import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, Hammer, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/lib/seo-config';
import { generateBreadcrumbSchema, generateServiceSchema, generateFAQSchema } from '@/lib/schema-generators';

export const metadata: Metadata = {
  title: 'Fence Installation & Repair Montgomery TX | Wood, Chain Link, Metal Fencing',
  description: 'Professional fence installation and repair in Montgomery County, TX. Wood privacy fences, chain link, metal fencing, and custom designs. Licensed & insured. Call (936) 955-4083 for free estimate.',
  keywords: [
    'fence installation Montgomery TX',
    'fence repair Conroe TX',
    'wood fence installation The Woodlands',
    'chain link fence Montgomery County',
    'metal fence Texas',
    'privacy fence installation',
    'fence contractor near me',
    'cedar fence installation',
  ],
  alternates: {
    canonical: '/services/fencing',
  },
};

const subServices = [
  {
    name: 'Wood Fence Installation',
    slug: 'wood-fence-installation',
    description: 'Classic cedar and pine privacy fences with quality craftsmanship.',
  },
  {
    name: 'Chain Link Fencing',
    slug: 'chain-link-fencing',
    description: 'Durable chain link for security, pet containment, and commercial use.',
  },
  {
    name: 'Metal Fence Installation',
    slug: 'metal-fence-installation',
    description: 'Ornamental iron and aluminum fencing for elegance and security.',
  },
  {
    name: 'Fence Repair',
    slug: 'fence-repair',
    description: 'Expert repair services for storm damage, rot, and wear.',
  },
];

const faqs = [
  {
    question: 'How long does fence installation take in Montgomery County?',
    answer: 'Most residential fence installations are completed within 1-3 days, depending on the fence length, terrain, and material type. Larger commercial projects or custom designs may take longer. We provide accurate timeline estimates during your free consultation.',
  },
  {
    question: 'What type of fence is best for Texas weather?',
    answer: 'Cedar wood fences are excellent for Texas due to their natural resistance to rot and insects. Metal fences (aluminum or steel) also perform well in our climate. We help you choose the best material based on your priorities for appearance, durability, maintenance, and budget.',
  },
  {
    question: 'Do I need a permit for fence installation in Montgomery County?',
    answer: 'Permit requirements vary by location and HOA. Many areas in Montgomery County require permits for fences over a certain height. We handle permit research and applications as part of our service to ensure your fence meets all local requirements.',
  },
  {
    question: 'How deep should fence posts be set?',
    answer: 'We typically set fence posts 2-3 feet deep with concrete footings, depending on fence height and soil conditions. Proper post depth is critical for fence stability and longevity, especially in the clay soils common in Montgomery County.',
  },
  {
    question: 'Can you match my existing fence for repairs or extensions?',
    answer: 'Yes, we carefully match materials, styles, and finishes when repairing or extending existing fences. We source matching lumber, hardware, and paint or stain to ensure seamless integration with your current fencing.',
  },
];

export default function FencingPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Fencing Installation & Repair', url: '/services/fencing' },
  ]);

  const serviceSchema = generateServiceSchema(
    'Fence Installation & Repair Services',
    'Professional fence installation and repair including wood privacy fences, chain link, and ornamental metal fencing in Montgomery County, TX.',
    '/services/fencing'
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
            <span>Fencing Installation & Repair</span>
          </nav>
          <div className="flex items-center gap-4 mb-4">
            <Hammer className="w-12 h-12" />
            <h1 className="text-4xl md:text-5xl font-heading font-bold">
              Fence Installation & Repair Services
            </h1>
          </div>
          <p className="text-xl text-gray-200 max-w-3xl">
            Professional fence installation and repair throughout Montgomery County. From classic wood privacy fences to ornamental metal designs, we build fences that enhance your property&apos;s security, privacy, and curb appeal.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#924C2E] mb-6">
              Expert Fence Installation in Montgomery County, Texas
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              A quality fence is one of the most valuable improvements you can make to your property. Whether you&apos;re seeking privacy from neighbors, security for your family and pets, a defined boundary for your land, or simply enhanced curb appeal, the right fence delivers multiple benefits while adding significant value to your home or business. At Terracotta Construction, we specialize in professional fence installation and repair services throughout Montgomery County and the Greater Houston area, delivering superior craftsmanship that stands up to Texas weather and the test of time.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Choosing the right fence involves balancing many factors: your primary purpose (privacy, security, aesthetics, or containment), your budget, your property&apos;s architecture and landscape, local HOA requirements, and maintenance preferences. Our experienced team guides you through these decisions, helping you select the ideal fence type, materials, height, and style for your specific situation. We take the time to understand your goals and provide honest recommendations based on our extensive experience with Montgomery County properties.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              From the initial consultation through final installation, Terracotta Construction handles every aspect of your fencing project with professionalism and attention to detail. We begin with accurate measurements and careful planning, proceed with proper post setting and construction techniques, and finish with thorough cleanup and a final walkthrough to ensure your complete satisfaction. Our fences are built to last, using quality materials and proven methods that deliver decades of reliable performance.
            </p>
            <p className="text-lg text-gray-700">
              Whether you need a new fence for your Montgomery home, repair for storm-damaged fencing in Conroe, a security fence for your Woodlands business, or ranch fencing for your Magnolia property, Terracotta Construction has the expertise to deliver outstanding results. We&apos;re fully licensed, bonded, and insured, and we stand behind every fence we build with our quality guarantee.
            </p>
          </div>
        </div>
      </section>

      {/* Sub-Services */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#924C2E] mb-8 text-center">
            Our Fencing Services
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {subServices.map((service) => (
              <Link
                key={service.slug}
                href={`/services/fencing/${service.slug}`}
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
              Comprehensive Fencing Solutions for Every Need
            </h2>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Wood Fence Installation
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Wood fences remain the most popular choice for residential properties in Montgomery County, offering timeless beauty, excellent privacy, and versatile design options. We install all styles of wood fencing including traditional privacy fences with dog-ear or flat-top pickets, board-on-board designs that look beautiful from both sides, shadow box fences that allow airflow while maintaining privacy, and decorative picket fences for front yards and gardens. Our wood fence installations feature premium cedar or treated pine lumber selected for straight grain and minimal defects, posts set in concrete at proper depth for stability, precision-cut pickets installed with consistent spacing, and quality hardware including galvanized or stainless steel fasteners. We offer various cap and trim options to customize your fence&apos;s appearance, and can apply stain or sealant to protect the wood and enhance its natural beauty.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Chain Link Fence Installation
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Chain link fencing provides an economical, durable solution for security, pet containment, sports facilities, and commercial applications. While often considered purely utilitarian, modern chain link fences can be quite attractive, especially with vinyl coating in black or green that blends with landscaping. Our chain link installations include galvanized or vinyl-coated fabric in various gauges and mesh sizes, sturdy terminal and line posts properly set in concrete, tension bars, bands, and ties for secure fabric attachment, and gates in swing or rolling configurations to fit your access needs. We also install privacy slats and windscreen for applications requiring visual screening. Chain link is an excellent choice for large areas where cost-effectiveness is important, and properly installed chain link fencing provides decades of low-maintenance service.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Metal and Ornamental Fence Installation
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Ornamental metal fencing combines security with sophisticated style, making it ideal for front yards, pool enclosures, and properties where appearance is paramount. We install both aluminum and steel ornamental fencing in a variety of styles from simple and modern to elaborate traditional designs. Aluminum fencing offers excellent corrosion resistance and comes in numerous colors and styles, making it perfect for decorative applications. Steel or wrought iron fencing provides maximum strength and security, with options for custom designs and decorative elements. Our metal fence installations include proper post setting, precise panel alignment, secure connections, and gates that operate smoothly. We ensure all installations meet local pool codes and safety requirements where applicable.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Fence Repair Services
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Texas weather can be tough on fences. High winds, heavy rain, fallen trees, and the natural aging process all take their toll. Terracotta Construction provides comprehensive fence repair services to restore your fence&apos;s function and appearance. We repair storm damage including fallen sections, broken posts, and damaged gates. We replace rotted or warped boards, reset leaning posts, repair or replace damaged gates and hardware, address rust and corrosion on metal fences, and match materials and finishes for seamless repairs. When damage is extensive, we provide honest assessments of whether repair or replacement makes more sense for your situation. Our goal is always to deliver the most cost-effective solution that meets your needs.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Additional Fencing Services
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Beyond our core fence installation and repair services, we offer gate installation and automation, fence staining and sealing, post replacement, fence extensions and modifications, temporary construction fencing, and farm and ranch fencing including pipe, cable, and wire options. Whatever your fencing need, Terracotta Construction has the expertise and equipment to handle it professionally.
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
                Why Choose Terracotta Construction for Your Fence
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Your fence is a significant investment that you&apos;ll see and use every day for years to come. Choosing the right contractor ensures you get a fence that looks great, performs well, and lasts. Terracotta Construction brings the expertise, materials, and commitment to quality that delivers outstanding fencing results.
              </p>
              <ul className="space-y-4">
                {[
                  'Experienced fence installers who take pride in their craft',
                  'Quality materials from trusted lumber yards and suppliers',
                  'Proper construction techniques for lasting durability',
                  'Clean, professional job sites and thorough cleanup',
                  'Clear communication and on-time project completion',
                  'Knowledge of local codes, HOA requirements, and permits',
                  'Licensed, bonded, and fully insured',
                  'Satisfaction guaranteed on all fence installations',
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
                Get Your Free Fence Estimate
              </h3>
              <p className="text-gray-700 mb-6">
                Ready for a new fence or need repairs? Contact us today for a free, no-obligation estimate. We&apos;ll visit your property, discuss your needs, and provide a detailed proposal with options.
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
            Frequently Asked Questions About Fence Installation
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
            Fence Installation Throughout Montgomery County
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
            Terracotta Construction installs and repairs fences in Montgomery, Conroe, The Woodlands, Magnolia, Willis, Huntsville, Tomball, Spring, Cypress, Katy, and surrounding communities.
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
            Ready for Your New Fence?
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Contact Terracotta Construction today to discuss your fencing project. Whether you need a privacy fence, security fence, decorative fence, or repairs to existing fencing, we&apos;re here to deliver quality results.
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
