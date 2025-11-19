import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, Users, Target, Heart, Shield, Award, Clock, Wrench } from 'lucide-react';
import { siteConfig } from '@/lib/seo-config';
import { generateBreadcrumbSchema } from '@/lib/schema-generators';

export const metadata: Metadata = {
  title: 'About Terracotta Construction | Montgomery TX Construction Company',
  description: 'Learn about Terracotta Construction, Montgomery County\'s trusted construction, landscaping, and handyman service provider. Locally owned, licensed, insured, and committed to quality craftsmanship.',
  keywords: [
    'about Terracotta Construction',
    'Montgomery TX construction company',
    'local contractor Montgomery County',
    'licensed contractor Texas',
    'construction company history',
    'Montgomery County handyman',
  ],
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'About Us', url: '/about' },
  ]);

  return (
    <>
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* Hero Section */}
      <section className="bg-[#924C2E] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <nav className="text-sm mb-4 text-gray-200">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span>About Us</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            About Terracotta Construction
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            Montgomery County&apos;s trusted partner for quality construction, landscaping, and handyman services. Built on trust, hard work, and a commitment to our community.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#924C2E] mb-6">
              Our Story: Building Trust in Montgomery County
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Terracotta Construction was founded with a simple but powerful vision: to provide Montgomery County and the Greater Houston area with construction, landscaping, and handyman services that property owners can truly rely on. Based in Montgomery, Texas, we understand the unique challenges and opportunities that come with maintaining and improving properties in our region, from the humid Gulf Coast climate to the diverse architectural styles that define our communities.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Our founders brought together decades of combined experience in residential and commercial construction, landscape design and maintenance, fencing installation, property management services, and emergency repairs. They recognized that too many homeowners and business owners struggled to find contractors who would show up on time, communicate clearly, deliver quality work, and stand behind their commitments. Terracotta Construction was created to be different—a company where every client receives the attention, transparency, and craftsmanship they deserve.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              The name &quot;Terracotta&quot; reflects our connection to the earth and the enduring, natural building materials that have served communities for thousands of years. Just as terracotta represents durability, warmth, and timeless beauty, our company is built on principles that stand the test of time: honesty, hard work, respect for our clients, and pride in our craft.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Today, Terracotta Construction serves residential and commercial clients throughout Montgomery County, including Montgomery, Conroe, The Woodlands, Magnolia, Willis, and Huntsville, as well as neighboring communities in Harris County such as Tomball, Spring, Cypress, and Katy. Our team has grown to include skilled professionals specializing in every service we offer, yet we maintain the personalized attention and accountability that defined us from day one.
            </p>
            <p className="text-lg text-gray-700">
              Whether you need regular lawn maintenance to keep your property looking its best, a new fence to enhance security and curb appeal, reliable handyman services for repairs and improvements, make-ready services for your rental properties, emergency repairs when disaster strikes, or a custom metal building for your workshop or storage needs, Terracotta Construction is here to deliver results that exceed your expectations.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#924C2E] mb-4">
              Our Mission and Core Values
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              At Terracotta Construction, our mission is to improve properties and enhance lives through exceptional construction services, delivered with integrity and professionalism.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Target className="w-10 h-10 text-[#924C2E] mb-4" />
              <h3 className="text-xl font-heading font-semibold text-[#924C2E] mb-3">Quality Craftsmanship</h3>
              <p className="text-gray-700">
                We take pride in every project, regardless of size. From a simple repair to a complete metal building installation, our work meets the highest standards of quality and durability. We use premium materials from trusted suppliers and employ proven techniques that ensure lasting results.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <Heart className="w-10 h-10 text-[#924C2E] mb-4" />
              <h3 className="text-xl font-heading font-semibold text-[#924C2E] mb-3">Customer-First Approach</h3>
              <p className="text-gray-700">
                Your satisfaction is our top priority. We listen to your needs, provide honest recommendations, communicate clearly throughout your project, and stand behind our work. Our goal is not just to complete a job, but to earn your trust and become your go-to contractor for years to come.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <Shield className="w-10 h-10 text-[#924C2E] mb-4" />
              <h3 className="text-xl font-heading font-semibold text-[#924C2E] mb-3">Integrity & Transparency</h3>
              <p className="text-gray-700">
                We believe in honest, upfront pricing with no hidden fees or surprise charges. Our detailed written estimates clearly outline the scope of work, materials, and costs. If anything changes during your project, we communicate immediately and get your approval before proceeding.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <Clock className="w-10 h-10 text-[#924C2E] mb-4" />
              <h3 className="text-xl font-heading font-semibold text-[#924C2E] mb-3">Reliability & Timeliness</h3>
              <p className="text-gray-700">
                When we commit to a schedule, we keep it. We understand that your time is valuable and that delays can be costly and frustrating. Our team shows up when promised, works efficiently, and completes projects on time. For emergencies, we provide rapid 24/7 response.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <Users className="w-10 h-10 text-[#924C2E] mb-4" />
              <h3 className="text-xl font-heading font-semibold text-[#924C2E] mb-3">Community Commitment</h3>
              <p className="text-gray-700">
                As a locally owned business, we&apos;re invested in the success and well-being of Montgomery County. We hire local workers, support local suppliers, and take pride in improving the properties and neighborhoods that make our community special. Your success is our success.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <Award className="w-10 h-10 text-[#924C2E] mb-4" />
              <h3 className="text-xl font-heading font-semibold text-[#924C2E] mb-3">Continuous Improvement</h3>
              <p className="text-gray-700">
                We&apos;re always learning and evolving to better serve our clients. Our team stays current with industry best practices, new materials and techniques, safety standards, and customer service excellence. We invest in training and tools to deliver the best possible results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#924C2E] mb-6">
                What Sets Terracotta Construction Apart
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                In a market filled with contractors and service providers, Terracotta Construction distinguishes itself through our comprehensive capabilities, professional approach, and unwavering commitment to client satisfaction. Here&apos;s what makes us the preferred choice for property owners throughout Montgomery County and the Greater Houston area:
              </p>
              <ul className="space-y-4">
                {[
                  'Full-service capabilities: One call handles landscaping, fencing, handyman work, turnovers, emergencies, and metal buildings',
                  'Licensed, bonded, and insured for your protection and peace of mind',
                  'Experienced professionals with specialized skills for each service category',
                  'Transparent pricing with detailed written estimates and no hidden charges',
                  'Flexible scheduling to accommodate your timeline and minimize disruption',
                  'Premium materials from trusted suppliers for lasting quality',
                  '24/7 emergency response for urgent repairs that cannot wait',
                  'Bilingual team members for clear communication with all clients',
                  'Satisfaction guarantee on all completed work',
                  'Long-term relationships with repeat clients who trust us year after year',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-100 rounded-lg p-8">
              <h3 className="text-2xl font-heading font-bold text-[#924C2E] mb-4">Our Service Guarantees</h3>
              <p className="text-gray-700 mb-6">
                When you hire Terracotta Construction, you receive our commitment to excellence through these service guarantees:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Wrench className="w-5 h-5 text-[#924C2E] flex-shrink-0 mt-1" />
                  <span className="text-gray-700"><strong>Quality Assurance:</strong> Work completed to professional standards or we make it right</span>
                </li>
                <li className="flex items-start gap-3">
                  <Wrench className="w-5 h-5 text-[#924C2E] flex-shrink-0 mt-1" />
                  <span className="text-gray-700"><strong>Clear Communication:</strong> Regular updates and responsive answers to your questions</span>
                </li>
                <li className="flex items-start gap-3">
                  <Wrench className="w-5 h-5 text-[#924C2E] flex-shrink-0 mt-1" />
                  <span className="text-gray-700"><strong>Site Cleanliness:</strong> We clean up after ourselves and leave your property better than we found it</span>
                </li>
                <li className="flex items-start gap-3">
                  <Wrench className="w-5 h-5 text-[#924C2E] flex-shrink-0 mt-1" />
                  <span className="text-gray-700"><strong>Respect for Property:</strong> Careful work that protects your landscaping, structures, and belongings</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Overview */}
      <section className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Comprehensive Services for Every Property Need
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Terracotta Construction offers a complete range of services to maintain, improve, and protect your residential or commercial property. Our diverse capabilities mean you can rely on one trusted partner for all your construction and maintenance needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteConfig.services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="bg-white/10 hover:bg-white/20 rounded-lg p-6 transition"
              >
                <h3 className="text-xl font-heading font-semibold mb-2">{service.name}</h3>
                <p className="text-gray-300 text-sm">{service.description}</p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/services"
              className="inline-block bg-[#924C2E] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#7a3f28] transition"
            >
              Explore All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#924C2E] mb-4">
              Proudly Serving Montgomery County and Beyond
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              From our base in Montgomery, Texas, we provide construction, landscaping, and handyman services throughout Montgomery County and the northern Greater Houston area. Our service territory includes both urban neighborhoods and rural properties, from established communities to new developments.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
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

          <div className="text-center mt-8">
            <p className="text-gray-700 mb-4">
              Don&apos;t see your community listed? Contact us to confirm service availability in your area. We&apos;re happy to discuss your project regardless of location.
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

      {/* CTA Section */}
      <section className="bg-[#924C2E] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Ready to Experience the Terracotta Difference?
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Contact us today to discuss your project and receive a free, no-obligation estimate. We look forward to showing you why so many Montgomery County property owners trust Terracotta Construction for their construction, landscaping, and handyman needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-[#924C2E] px-8 py-4 rounded-md font-semibold text-lg hover:bg-gray-100 transition inline-block"
            >
              Contact Us Today
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
