import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  Leaf,
  Hammer,
  Wrench,
  Home,
  AlertTriangle,
  Warehouse,
  Phone,
  CheckCircle,
  Star,
  Shield,
  Clock,
  Award
} from 'lucide-react';
import { siteConfig } from '@/lib/seo-config';
import { generateFAQSchema } from '@/lib/schema-generators';

export const metadata: Metadata = {
  title: 'Terracotta Construction | Montgomery TX Construction & Handyman Services',
  description: 'Professional construction, landscaping, fencing, handyman services, and metal building installation in Montgomery County, TX. Licensed & insured. Call (936) 955-4083 for a free estimate.',
  keywords: [
    'construction company Montgomery TX',
    'handyman services Montgomery County',
    'landscaping Conroe TX',
    'fencing installation The Woodlands',
    'metal building construction Texas',
    'emergency repair services Montgomery',
    'apartment turnovers Houston area',
  ],
  alternates: {
    canonical: '/',
  },
};

const services = [
  {
    title: 'Landscaping & Lawn Care',
    description: 'Professional mowing, trimming, cleanup, mulching, and seasonal maintenance to keep your property looking immaculate year-round.',
    icon: Leaf,
    href: '/services/landscaping',
  },
  {
    title: 'Fencing Installation & Repair',
    description: 'Wood, chain link, and metal fencing installed or repaired with precision craftsmanship and quality materials.',
    icon: Hammer,
    href: '/services/fencing',
  },
  {
    title: 'Handyman Services & Repairs',
    description: 'General repairs, mounting, drywall, doors, caulking, and comprehensive home maintenance solutions.',
    icon: Wrench,
    href: '/services/handyman',
  },
  {
    title: 'Apartment Turnovers',
    description: 'Fast, thorough apartment maintenance and refreshes between tenants for property managers and landlords.',
    icon: Home,
    href: '/services/apartment-turnovers',
  },
  {
    title: 'Emergency Services (24/7)',
    description: 'Rapid response for leaks, storm damage, break-ins, power loss, and urgent repair needs any time of day.',
    icon: AlertTriangle,
    href: '/services/emergency-services',
  },
  {
    title: 'Metal Buildings & Custom Projects',
    description: 'Custom steel building construction for workshops, storage, garages, and specialized commercial structures.',
    icon: Warehouse,
    href: '/services/metal-buildings',
  },
];

const faqs = [
  {
    question: 'What areas does Terracotta Construction serve in Texas?',
    answer: 'Terracotta Construction proudly serves Montgomery County and the Greater Houston area, including Montgomery, Conroe, The Woodlands, Magnolia, Willis, Huntsville, Tomball, Spring, Cypress, and Katy, TX.',
  },
  {
    question: 'Is Terracotta Construction licensed and insured?',
    answer: 'Yes, Terracotta Construction is fully licensed and insured in the state of Texas. We carry comprehensive liability insurance and workers compensation coverage to protect our clients and team members.',
  },
  {
    question: 'Do you offer free estimates for construction projects?',
    answer: 'Yes, we provide free, no-obligation estimates for all our services. Contact us by phone at (936) 955-4083 or through our online form to schedule your consultation.',
  },
  {
    question: 'What types of fencing do you install?',
    answer: 'We install all types of residential and commercial fencing including wood privacy fences, cedar fencing, chain link fencing, ornamental metal fencing, ranch-style fencing, and custom designs.',
  },
  {
    question: 'Do you provide emergency repair services?',
    answer: 'Yes, we offer 24/7 emergency services for urgent repairs including water damage, storm damage, broken windows, emergency fence repairs, and other critical situations that cannot wait.',
  },
];

export default function HomePage() {
  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/metal_building.jpg"
            alt="Professional metal building construction by Terracotta Construction in Montgomery TX"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 max-w-3xl">
            Montgomery County&apos;s Trusted Construction & Handyman Experts
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl text-gray-200">
            Professional construction, landscaping, fencing, and repair services built on trust and hard work. Serving the Greater Houston area since day one.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="bg-[#924C2E] text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-[#7a3f28] transition inline-block text-center"
            >
              Get Your Free Estimate
            </Link>
            <a
              href={`tel:${siteConfig.business.phone}`}
              className="bg-white text-[#924C2E] px-8 py-4 rounded-md font-semibold text-lg hover:bg-gray-100 transition inline-flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call {siteConfig.business.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-[#924C2E] text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Shield className="w-8 h-8 mb-2" />
              <span className="font-semibold">Licensed & Insured</span>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="w-8 h-8 mb-2" />
              <span className="font-semibold">24/7 Emergency Service</span>
            </div>
            <div className="flex flex-col items-center">
              <Star className="w-8 h-8 mb-2" />
              <span className="font-semibold">5-Star Reviews</span>
            </div>
            <div className="flex flex-col items-center">
              <Award className="w-8 h-8 mb-2" />
              <span className="font-semibold">Quality Guaranteed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#924C2E] mb-6">
              Your Complete Construction Partner in Montgomery County, Texas
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Welcome to Terracotta Construction, your premier source for professional construction, landscaping, and handyman services in Montgomery County and the Greater Houston metropolitan area. As a locally owned and operated company based in Montgomery, Texas, we understand the unique needs of Texas property owners and bring decades of combined experience to every project we undertake.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Whether you need comprehensive landscaping services to transform your outdoor living space, professional fence installation to enhance your property&apos;s security and curb appeal, reliable handyman services for those essential repairs and improvements, or custom metal building construction for your workshop, storage, or commercial needs, Terracotta Construction delivers exceptional results with honest pricing and transparent communication throughout every phase of your project.
            </p>
            <p className="text-lg text-gray-700">
              Our commitment to quality craftsmanship, customer satisfaction, and community values has made us one of Montgomery County&apos;s most trusted names in residential and commercial construction services. We treat every property as if it were our own, ensuring meticulous attention to detail and work that stands the test of time.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#924C2E] mb-4">
              Our Comprehensive Construction Services
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              From routine lawn maintenance to complex custom metal building construction, Terracotta Construction offers a full spectrum of services designed to meet all your property improvement needs under one roof.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition group"
              >
                <service.icon className="w-10 h-10 text-[#924C2E] mb-4 group-hover:scale-110 transition" />
                <h3 className="text-xl font-heading font-semibold text-[#924C2E] mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-700 mb-4">{service.description}</p>
                <span className="text-[#924C2E] font-medium group-hover:underline">
                  Learn More →
                </span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/services"
              className="inline-block bg-[#924C2E] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#7a3f28] transition"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#924C2E] mb-6">
                Why Montgomery County Chooses Terracotta Construction
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                At Terracotta Construction, we believe that exceptional construction services begin with a commitment to our customers and our community. When you choose us for your next project, you&apos;re partnering with a team that genuinely cares about delivering results that exceed your expectations.
              </p>
              <p className="text-lg text-gray-700 mb-8">
                Our approach combines traditional Texas craftsmanship with modern techniques and materials, ensuring your investment provides lasting value and performance. We stand behind every project with our quality guarantee, and our transparent pricing means no surprises—just honest work at fair prices.
              </p>
              <ul className="space-y-4">
                {[
                  'Locally owned and operated in Montgomery, TX',
                  'Fully licensed, bonded, and insured',
                  'Transparent pricing with detailed written estimates',
                  'Quality materials from trusted suppliers',
                  'Experienced crews with specialized expertise',
                  'Responsive communication throughout your project',
                  '24/7 emergency services available',
                  'Satisfaction guaranteed on all work',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-100 rounded-lg p-8">
              <h3 className="text-2xl font-heading font-bold text-[#924C2E] mb-6">
                Request Your Free Estimate Today
              </h3>
              <p className="text-gray-700 mb-6">
                Ready to get started on your next project? Contact us today for a free, no-obligation estimate. Our team will assess your needs and provide a detailed proposal tailored to your goals and budget.
              </p>
              <div className="space-y-4">
                <a
                  href={`tel:${siteConfig.business.phone}`}
                  className="flex items-center gap-3 text-lg font-semibold text-[#924C2E] hover:text-[#7a3f28]"
                >
                  <Phone className="w-6 h-6" />
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

      {/* Service Areas Section */}
      <section className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Serving Montgomery County & the Greater Houston Area
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Terracotta Construction proudly serves residential and commercial clients throughout Montgomery County and surrounding communities. Our service area includes but is not limited to the following locations:
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {siteConfig.serviceAreas.map((area) => (
              <Link
                key={area.slug}
                href={`/locations/${area.slug}`}
                className="bg-white/10 hover:bg-white/20 rounded-lg p-4 text-center transition"
              >
                <span className="font-semibold">{area.name}, {area.state}</span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-300 mb-4">
              Don&apos;t see your area listed? We likely serve your community too. Contact us to confirm service availability in your location.
            </p>
            <Link
              href="/locations"
              className="inline-block bg-[#924C2E] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#7a3f28] transition"
            >
              View All Service Areas
            </Link>
          </div>
        </div>
      </section>

      {/* Detailed Services Description */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#924C2E] mb-8 text-center">
            Comprehensive Solutions for Every Property Need
          </h2>

          <div className="prose prose-lg max-w-none text-gray-700">
            <h3 className="text-2xl font-heading font-bold text-[#924C2E] mb-4">
              Professional Landscaping & Lawn Care Services
            </h3>
            <p className="mb-6">
              A well-maintained landscape enhances your property&apos;s curb appeal, increases its value, and creates inviting outdoor spaces for your family and guests to enjoy. Our professional landscaping team provides comprehensive lawn care services including precision mowing, edging, and trimming to maintain a manicured appearance throughout the growing season. We offer seasonal cleanup services to prepare your property for spring growth or winter dormancy, mulching to protect plant roots and reduce weed growth, and expert tree trimming to maintain the health and aesthetics of your trees and shrubs.
            </p>

            <h3 className="text-2xl font-heading font-bold text-[#924C2E] mb-4">
              Expert Fence Installation & Repair
            </h3>
            <p className="mb-6">
              Quality fencing provides security, privacy, and defines your property boundaries while adding significant aesthetic value. Terracotta Construction installs and repairs all types of residential and commercial fencing, including classic wood privacy fences that offer timeless beauty and maximum privacy, durable chain link fencing ideal for security applications and pet containment, elegant ornamental metal fencing that combines security with sophisticated style, and traditional ranch-style fencing for rural properties. Our fence installation process includes proper post setting with concrete footings, level and plumb construction, and premium hardware that ensures decades of reliable performance.
            </p>

            <h3 className="text-2xl font-heading font-bold text-[#924C2E] mb-4">
              Reliable Handyman Services for Home & Business
            </h3>
            <p className="mb-6">
              From minor repairs to major improvements, our skilled handyman professionals handle projects of all sizes with the same attention to detail. Our services include drywall installation, repair, and texturing, door installation and adjustment, window repairs and replacements, fixture mounting and installation, caulking and weatherproofing, painting touch-ups, and general carpentry work. We understand that small problems can become big issues if left unaddressed, which is why we respond promptly to service requests and complete work efficiently without cutting corners.
            </p>

            <h3 className="text-2xl font-heading font-bold text-[#924C2E] mb-4">
              Apartment Turnover & Property Maintenance
            </h3>
            <p className="mb-6">
              Property managers and landlords trust Terracotta Construction for fast, thorough apartment turnovers that minimize vacancy time while ensuring units meet the highest standards. Our make-ready services include deep cleaning, paint touch-ups or full repaints, carpet cleaning or replacement, appliance cleaning and repair, fixture updates, lock changes, and comprehensive inspections. We work on your schedule and deliver move-in ready units that attract quality tenants and command top rental rates.
            </p>

            <h3 className="text-2xl font-heading font-bold text-[#924C2E] mb-4">
              Custom Metal Building Construction
            </h3>
            <p className="mb-6">
              Metal buildings offer exceptional durability, low maintenance, and versatile applications for residential and commercial use. Terracotta Construction designs and builds custom steel structures including workshops and hobby spaces, equipment storage buildings, vehicle garages and carports, agricultural buildings, and small commercial structures. Our metal building projects feature quality steel components, proper foundation work, and attention to details like drainage, ventilation, and electrical rough-in to create functional spaces that serve your needs for decades.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#924C2E] mb-8 text-center">
            Frequently Asked Questions About Our Services
          </h2>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-heading font-semibold text-[#924C2E] mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-[#924C2E] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Ready to Start Your Next Project?
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Contact Terracotta Construction today for a free estimate on landscaping, fencing, handyman services, metal buildings, or any of our other professional construction services. Our team is ready to help you transform your property.
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
