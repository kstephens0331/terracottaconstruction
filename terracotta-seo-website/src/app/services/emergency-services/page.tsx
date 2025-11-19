import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/lib/seo-config';
import { generateBreadcrumbSchema, generateServiceSchema, generateFAQSchema } from '@/lib/schema-generators';

export const metadata: Metadata = {
  title: 'Emergency Repair Services Montgomery TX | 24/7 Storm & Water Damage',
  description: '24/7 emergency repair services in Montgomery County, TX. Water damage, storm damage, and urgent repairs. Fast response, licensed & insured. Call (936) 955-4083 now.',
  keywords: [
    'emergency repairs Montgomery TX',
    'storm damage repair Conroe',
    'water damage restoration The Woodlands',
    '24/7 emergency services Montgomery County',
    'emergency contractor Texas',
    'urgent home repairs',
    'flood damage repair',
    'emergency board up services',
  ],
  alternates: {
    canonical: '/services/emergency-services',
  },
};

const subServices = [
  {
    name: 'Water Damage',
    slug: 'water-damage',
    description: 'Emergency water extraction, drying, and damage repair from floods and leaks.',
  },
  {
    name: 'Storm Damage',
    slug: 'storm-damage',
    description: 'Rapid response for wind, hail, and storm damage repair and restoration.',
  },
  {
    name: 'Emergency Repairs',
    slug: 'emergency-repairs',
    description: 'Urgent repairs for security issues, broken systems, and critical damage.',
  },
];

const faqs = [
  {
    question: 'How quickly can you respond to an emergency?',
    answer: 'We provide 24/7 emergency response with typical arrival times of 1-2 hours for Montgomery County locations. We prioritize emergencies involving active water intrusion, security breaches, and situations that threaten property or safety.',
  },
  {
    question: 'What should I do while waiting for emergency services?',
    answer: 'If safe to do so, shut off water at the source for leaks, turn off electricity to affected areas for water damage, move valuables away from damage, and document the damage with photos. Don\'t enter areas with structural damage or standing water with electrical hazards.',
  },
  {
    question: 'Do you work with insurance companies?',
    answer: 'Yes, we work with all major insurance companies and can provide detailed documentation for your claim including photos, measurements, moisture readings, and itemized repair estimates. We help streamline the claims process while ensuring proper repairs.',
  },
  {
    question: 'What types of emergencies do you handle?',
    answer: 'We handle water damage from plumbing failures, storms, and appliances; wind and hail damage; fallen trees on structures; fire and smoke damage; security breaches like broken windows and doors; emergency fence repairs; and any urgent situation that threatens property integrity or occupant safety.',
  },
  {
    question: 'Is emergency service more expensive than regular service?',
    answer: 'Emergency services include a premium for immediate response, after-hours availability, and expedited work. However, fast response typically reduces overall damage and repair costs. We provide transparent pricing and work with insurance to minimize your out-of-pocket expenses.',
  },
];

export default function EmergencyServicesPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Emergency Services', url: '/services/emergency-services' },
  ]);

  const serviceSchema = generateServiceSchema(
    '24/7 Emergency Repair Services',
    'Emergency repair services for water damage, storm damage, and urgent repairs in Montgomery County, TX. Fast 24/7 response.',
    '/services/emergency-services'
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
            <span>Emergency Services (24/7)</span>
          </nav>
          <div className="flex items-center gap-4 mb-4">
            <AlertTriangle className="w-12 h-12" />
            <h1 className="text-4xl md:text-5xl font-heading font-bold">
              24/7 Emergency Services
            </h1>
          </div>
          <p className="text-xl text-gray-200 max-w-3xl">
            When disaster strikes, Terracotta Construction provides rapid emergency response throughout Montgomery County. Water damage, storm damage, and urgent repairs—we&apos;re here when you need us most.
          </p>
          <div className="mt-6">
            <a
              href={`tel:${siteConfig.business.phone}`}
              className="inline-flex items-center gap-2 bg-white text-[#924C2E] px-8 py-4 rounded-md font-bold text-xl hover:bg-gray-100 transition"
            >
              <Phone className="w-6 h-6" />
              CALL NOW: {siteConfig.business.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#924C2E] mb-6">
              Fast Emergency Response in Montgomery County, Texas
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Emergencies don&apos;t wait for convenient timing. When a pipe bursts at midnight, a storm tears off part of your roof, or a tree crashes through your fence, you need help immediately. Terracotta Construction provides 24/7 emergency response throughout Montgomery County and the Greater Houston area, delivering fast professional assistance when your property and peace of mind are on the line.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              The Texas Gulf Coast is prone to severe weather including hurricanes, tropical storms, heavy thunderstorms, and tornadoes. These events cause water intrusion, wind damage, fallen trees, and other property emergencies that require immediate attention to prevent further damage. Even in calm weather, emergencies occur—burst pipes, failed water heaters, broken windows from accidents or break-ins, and similar urgent situations that can&apos;t wait for regular business hours.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Our emergency crews are experienced in rapid damage assessment, immediate mitigation to prevent further damage, temporary repairs to secure and protect your property, and planning for complete restoration. We arrive with the equipment and materials needed to address common emergencies, and we have relationships with specialty contractors and suppliers for situations requiring additional resources.
            </p>
            <p className="text-lg text-gray-700">
              Fast response is critical in emergencies because damage often compounds quickly. Water damage, in particular, worsens by the hour as materials absorb moisture and mold begins to grow. Our goal is to reach you quickly, stop ongoing damage, and begin the mitigation and repair process as soon as possible. This approach minimizes total damage, reduces repair costs, and gets your property back to normal faster.
            </p>
          </div>
        </div>
      </section>

      {/* Sub-Services */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#924C2E] mb-8 text-center">
            Our Emergency Services
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {subServices.map((service) => (
              <Link
                key={service.slug}
                href={`/services/emergency-services/${service.slug}`}
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
              Comprehensive Emergency Response Solutions
            </h2>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Water Damage Emergency Response
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Water damage is the most common property emergency and one of the most destructive. Whether from burst pipes, failed appliances, roof leaks during storms, or flooding, water quickly damages flooring, drywall, insulation, and belongings while creating conditions for mold growth. Our water damage response includes emergency water extraction using professional pumps and extractors, structural drying with industrial dehumidifiers and air movers, moisture monitoring to ensure complete drying, removal of unsalvageable materials, antimicrobial treatment to prevent mold, and content moving and protection. We document everything for your insurance claim and can provide detailed moisture readings and drying logs. Complete restoration follows initial mitigation, including drywall replacement, flooring repair or replacement, painting, and any other work needed to return your property to pre-damage condition.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Storm Damage Response
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Texas storms cause wind damage, hail damage, fallen trees, lightning strikes, and flooding. Our storm damage response includes emergency tarping of roof damage to prevent further water intrusion, board-up of broken windows and doors, tree and debris removal from structures, temporary structural supports if needed, and damage assessment and documentation. We understand the urgency that follows major storms and mobilize additional crews when needed to serve multiple clients. Once immediate dangers are addressed, we provide complete repair and restoration services to return your property to pre-storm condition.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Security Emergencies
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Broken windows, damaged doors, and compromised locks leave your property vulnerable. Our emergency response includes board-up services for broken windows and glass doors, emergency door repair or replacement, lock replacement and rekeying, temporary security measures, and damaged fence repairs that restore boundary security. We respond quickly to secure your property and protect your family, belongings, and peace of mind. Permanent repairs follow to restore your property&apos;s appearance and full security.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Other Emergency Services
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              We respond to a variety of other urgent situations including fire and smoke damage assessment and mitigation, emergency plumbing repairs to stop active leaks, HVAC emergencies in extreme weather, dangerous tree limbs threatening structures, and any situation that poses immediate risk to property or occupants. If you&apos;re unsure whether your situation qualifies as an emergency, call us—we&apos;ll help you assess the urgency and determine the best response.
            </p>

            <h3 className="text-2xl font-heading font-semibold text-[#924C2E] mb-4">
              Insurance Documentation and Coordination
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Emergency damage often involves insurance claims, and proper documentation is critical. We provide comprehensive documentation including timestamped photographs, detailed damage reports, moisture readings and drying logs, itemized repair estimates, and progress reports throughout the restoration process. We work with all insurance companies and can communicate directly with adjusters to facilitate your claim. Our goal is to make the process as smooth as possible during a stressful time.
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
                Why Choose Terracotta Construction for Emergencies
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                In an emergency, you need a contractor who responds quickly, works competently, and treats you with care during a difficult time. Terracotta Construction delivers all three.
              </p>
              <ul className="space-y-4">
                {[
                  'True 24/7 availability with fast response times',
                  'Experienced crews equipped for common emergencies',
                  'Immediate mitigation to prevent further damage',
                  'Complete restoration from start to finish',
                  'Detailed insurance documentation',
                  'Direct communication with insurance adjusters',
                  'Licensed, bonded, and fully insured',
                  'Compassionate service during stressful situations',
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
                Emergency? Call Now
              </h3>
              <p className="text-gray-700 mb-6">
                Don&apos;t wait—call us immediately for emergency service. We&apos;re available 24/7 to respond to your urgent situation.
              </p>
              <div className="space-y-4">
                <a
                  href={`tel:${siteConfig.business.phone}`}
                  className="flex items-center gap-3 text-xl font-bold text-[#924C2E] hover:text-[#7a3f28]"
                >
                  <Phone className="w-8 h-8" />
                  {siteConfig.business.phone}
                </a>
                <a
                  href={`tel:${siteConfig.business.phoneAlt}`}
                  className="flex items-center gap-3 text-lg font-semibold text-[#924C2E] hover:text-[#7a3f28]"
                >
                  <Phone className="w-6 h-6" />
                  {siteConfig.business.phoneAlt}
                </a>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Available 24 hours a day, 7 days a week
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-[#924C2E] mb-8 text-center">
            Frequently Asked Questions About Emergency Services
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
            Emergency Services Throughout Montgomery County
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
            Terracotta Construction provides 24/7 emergency response in Montgomery, Conroe, The Woodlands, Magnolia, Willis, Huntsville, Tomball, Spring, Cypress, Katy, and surrounding areas.
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
            Have an Emergency? Call Now
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Terracotta Construction provides 24/7 emergency response for water damage, storm damage, and urgent repairs. Don&apos;t wait—fast action prevents further damage.
          </p>
          <a
            href={`tel:${siteConfig.business.phone}`}
            className="inline-flex items-center gap-3 bg-white text-[#924C2E] px-10 py-5 rounded-md font-bold text-2xl hover:bg-gray-100 transition"
          >
            <Phone className="w-8 h-8" />
            {siteConfig.business.phone}
          </a>
        </div>
      </section>
    </>
  );
}
