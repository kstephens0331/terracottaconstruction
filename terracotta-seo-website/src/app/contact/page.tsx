import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, CheckCircle, MessageSquare } from 'lucide-react';
import { siteConfig } from '@/lib/seo-config';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema-generators';

export const metadata: Metadata = {
  title: 'Contact Terracotta Construction | Free Estimates Montgomery TX',
  description: 'Contact Terracotta Construction for free estimates on construction, landscaping, fencing, and handyman services in Montgomery County, TX. Call (936) 955-4083 or request a quote online.',
  keywords: [
    'contact Terracotta Construction',
    'free estimate Montgomery TX',
    'construction quote Conroe',
    'handyman services quote',
    'landscaping estimate The Woodlands',
    'fencing installation quote Texas',
  ],
  alternates: {
    canonical: '/contact',
  },
};

const faqs = [
  {
    question: 'How quickly can you provide an estimate?',
    answer: 'We typically respond to estimate requests within 24 hours during business days. For most projects, we can schedule an on-site consultation within a few days of your initial contact. Emergency services receive priority response.',
  },
  {
    question: 'Do you charge for estimates?',
    answer: 'No, all our estimates are completely free with no obligation. We provide detailed written proposals that outline the scope of work, materials, timeline, and costs so you can make an informed decision.',
  },
  {
    question: 'What information should I include in my estimate request?',
    answer: 'Please include a description of your project, your address or service location, any relevant photos if available, your preferred timeline, and the best way to contact you. The more details you provide, the more accurate our initial assessment will be.',
  },
  {
    question: 'What forms of payment do you accept?',
    answer: 'We accept cash, checks, and all major credit cards. For larger projects, we offer flexible payment schedules with a deposit to begin work and final payment upon completion and your satisfaction.',
  },
  {
    question: 'Are you available for emergency services outside business hours?',
    answer: 'Yes, we provide 24/7 emergency services for urgent situations such as water damage, storm damage, security issues, and other critical repairs that cannot wait. Call our main number for emergency dispatch.',
  },
];

export default function ContactPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact' },
  ]);

  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      {/* Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      {/* Hero Section */}
      <section className="bg-[#924C2E] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <nav className="text-sm mb-4 text-gray-200">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span>Contact</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Contact Terracotta Construction
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            Get in touch for free estimates, project consultations, or emergency services. We&apos;re here to help with all your construction, landscaping, and handyman needs in Montgomery County and the Greater Houston area.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-heading font-bold text-[#924C2E] mb-6">
                Request Your Free Estimate
              </h2>
              <p className="text-gray-700 mb-6">
                Complete the form below to request a free, no-obligation estimate for your project. Please provide as much detail as possible about your needs, and we&apos;ll respond within 24 hours during business days. For emergency services, please call us directly at {siteConfig.business.phone}.
              </p>

              <form
                action="https://formspree.io/f/xgvkvnqj"
                method="POST"
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full border border-gray-300 px-4 py-3 rounded-md focus:ring-[#924C2E] focus:border-[#924C2E] focus:outline-none"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      className="w-full border border-gray-300 px-4 py-3 rounded-md focus:ring-[#924C2E] focus:border-[#924C2E] focus:outline-none"
                      placeholder="(123) 456-7890"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full border border-gray-300 px-4 py-3 rounded-md focus:ring-[#924C2E] focus:border-[#924C2E] focus:outline-none"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Service Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="w-full border border-gray-300 px-4 py-3 rounded-md focus:ring-[#924C2E] focus:border-[#924C2E] focus:outline-none"
                    placeholder="Street address, City, TX ZIP"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                    Service Needed *
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    className="w-full border border-gray-300 px-4 py-3 rounded-md focus:ring-[#924C2E] focus:border-[#924C2E] focus:outline-none"
                  >
                    <option value="">Select a service</option>
                    <option value="landscaping">Landscaping & Lawn Care</option>
                    <option value="fencing">Fencing Installation & Repair</option>
                    <option value="handyman">Handyman Services & Repairs</option>
                    <option value="apartment-turnovers">Apartment Turnovers</option>
                    <option value="emergency">Emergency Services</option>
                    <option value="metal-buildings">Metal Buildings & Custom Projects</option>
                    <option value="multiple">Multiple Services</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full border border-gray-300 px-4 py-3 rounded-md focus:ring-[#924C2E] focus:border-[#924C2E] focus:outline-none"
                    placeholder="Please describe your project, including any relevant details about scope, timeline, or specific requirements..."
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Timeline
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    className="w-full border border-gray-300 px-4 py-3 rounded-md focus:ring-[#924C2E] focus:border-[#924C2E] focus:outline-none"
                  >
                    <option value="">Select timeline</option>
                    <option value="emergency">Emergency (ASAP)</option>
                    <option value="this-week">This Week</option>
                    <option value="this-month">This Month</option>
                    <option value="flexible">Flexible</option>
                    <option value="planning">Just Planning</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#924C2E] text-white py-4 rounded-md font-semibold text-lg hover:bg-[#7a3f28] transition"
                >
                  Submit Request
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-heading font-bold text-[#924C2E] mb-6">
                Contact Information
              </h2>
              <p className="text-gray-700 mb-8">
                Prefer to speak with us directly? We&apos;re available during business hours for consultations and questions, and 24/7 for emergency services. Choose your preferred method of contact below.
              </p>

              <div className="space-y-6">
                {/* Phone */}
                <div className="bg-gray-100 rounded-lg p-6">
                  <h3 className="text-xl font-heading font-semibold text-[#924C2E] mb-4 flex items-center gap-2">
                    <Phone className="w-6 h-6" />
                    Phone Numbers
                  </h3>
                  <div className="space-y-3">
                    <a
                      href={`tel:${siteConfig.business.phone}`}
                      className="block text-lg font-semibold text-gray-800 hover:text-[#924C2E]"
                    >
                      {siteConfig.business.phone} (Primary)
                    </a>
                    <a
                      href={`tel:${siteConfig.business.phoneAlt}`}
                      className="block text-lg font-semibold text-gray-800 hover:text-[#924C2E]"
                    >
                      {siteConfig.business.phoneAlt} (Alternate)
                    </a>
                    <p className="text-sm text-gray-600">
                      For emergencies, call any time. We provide 24/7 emergency response for urgent repairs.
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-gray-100 rounded-lg p-6">
                  <h3 className="text-xl font-heading font-semibold text-[#924C2E] mb-4 flex items-center gap-2">
                    <Mail className="w-6 h-6" />
                    Email
                  </h3>
                  <a
                    href={`mailto:${siteConfig.business.email}`}
                    className="block text-lg font-semibold text-gray-800 hover:text-[#924C2E]"
                  >
                    {siteConfig.business.email}
                  </a>
                  <p className="text-sm text-gray-600 mt-2">
                    We respond to emails within 24 hours during business days.
                  </p>
                </div>

                {/* Address */}
                <div className="bg-gray-100 rounded-lg p-6">
                  <h3 className="text-xl font-heading font-semibold text-[#924C2E] mb-4 flex items-center gap-2">
                    <MapPin className="w-6 h-6" />
                    Office Address
                  </h3>
                  <address className="not-italic text-gray-800">
                    <p className="font-semibold">{siteConfig.business.name}</p>
                    <p>{siteConfig.business.address.street}</p>
                    <p>
                      {siteConfig.business.address.city}, {siteConfig.business.address.state} {siteConfig.business.address.zip}
                    </p>
                  </address>
                </div>

                {/* Hours */}
                <div className="bg-gray-100 rounded-lg p-6">
                  <h3 className="text-xl font-heading font-semibold text-[#924C2E] mb-4 flex items-center gap-2">
                    <Clock className="w-6 h-6" />
                    Business Hours
                  </h3>
                  <div className="space-y-2 text-gray-800">
                    <p><strong>Monday - Friday:</strong> 7:00 AM - 6:00 PM</p>
                    <p><strong>Saturday:</strong> 8:00 AM - 2:00 PM</p>
                    <p><strong>Sunday:</strong> Closed (Emergency calls only)</p>
                    <p className="text-sm text-gray-600 mt-2">
                      24/7 emergency services available for urgent repairs
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#924C2E] mb-8 text-center">
            What to Expect When You Contact Us
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 bg-[#924C2E] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-lg font-heading font-semibold text-[#924C2E] mb-2">Quick Response</h3>
              <p className="text-gray-700 text-sm">
                We respond to all inquiries within 24 hours during business days. Emergency calls receive immediate attention.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 bg-[#924C2E] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-lg font-heading font-semibold text-[#924C2E] mb-2">On-Site Consultation</h3>
              <p className="text-gray-700 text-sm">
                For most projects, we schedule a visit to assess your needs, take measurements, and discuss options in detail.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 bg-[#924C2E] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-lg font-heading font-semibold text-[#924C2E] mb-2">Detailed Estimate</h3>
              <p className="text-gray-700 text-sm">
                You receive a comprehensive written proposal with scope, materials, timeline, and pricing—no hidden fees.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 bg-[#924C2E] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="text-lg font-heading font-semibold text-[#924C2E] mb-2">Project Scheduling</h3>
              <p className="text-gray-700 text-sm">
                Once approved, we schedule your project to fit your timeline and keep you informed every step of the way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#924C2E] mb-8 text-center">
            Our Service Areas in Texas
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-8">
            Terracotta Construction serves residential and commercial clients throughout Montgomery County and the Greater Houston metropolitan area. Our primary service areas include:
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {siteConfig.serviceAreas.map((area) => (
              <Link
                key={area.slug}
                href={`/locations/${area.slug}`}
                className="bg-gray-100 hover:bg-gray-200 rounded-lg p-4 text-center transition"
              >
                <span className="font-semibold text-gray-800">{area.name}, {area.state}</span>
              </Link>
            ))}
          </div>

          <p className="text-center text-gray-700">
            If your area isn&apos;t listed, please contact us—we likely serve your community and are happy to confirm availability.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#924C2E] mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-heading font-semibold text-[#924C2E] mb-3 flex items-start gap-2">
                  <MessageSquare className="w-5 h-5 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 ml-7">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#924C2E] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Let&apos;s Discuss Your Project
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Whether you have a specific project in mind or need advice on the best approach, we&apos;re here to help. Contact Terracotta Construction today and experience the difference that quality craftsmanship and genuine customer care make.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${siteConfig.business.phone}`}
              className="bg-white text-[#924C2E] px-8 py-4 rounded-md font-semibold text-lg hover:bg-gray-100 transition inline-flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call {siteConfig.business.phone}
            </a>
            <a
              href={`mailto:${siteConfig.business.email}`}
              className="border-2 border-white text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-white/10 transition inline-flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Email Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
