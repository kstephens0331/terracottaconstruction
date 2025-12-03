import { Metadata } from 'next';
import Link from 'next/link';
import {
  Leaf,
  Hammer,
  Wrench,
  Home,
  AlertTriangle,
  Warehouse,
  Phone,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { siteConfig } from '@/lib/seo-config';
import { generateBreadcrumbSchema } from '@/lib/schema-generators';

export const metadata: Metadata = {
  title: 'Construction Services Montgomery TX | Landscaping, Fencing, Handyman',
  description: 'Comprehensive construction services in Montgomery County, TX: landscaping, fencing installation, handyman repairs, apartment turnovers, emergency services, and metal building construction. Licensed & insured.',
  keywords: [
    'construction services Montgomery TX',
    'landscaping services Conroe',
    'fencing installation The Woodlands',
    'handyman services Montgomery County',
    'apartment turnovers Texas',
    'emergency repair services',
    'metal building construction',
  ],
  alternates: {
    canonical: '/services',
  },
};

const serviceIcons = {
  landscaping: Leaf,
  fencing: Hammer,
  handyman: Wrench,
  'apartment-turnovers': Home,
  'emergency-services': AlertTriangle,
  'metal-buildings': Warehouse,
};

export default function ServicesPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
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
            <span>Services</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Our Construction & Handyman Services
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            Terracotta Construction provides comprehensive construction, landscaping, and handyman services throughout Montgomery County and the Greater Houston area. From routine maintenance to custom building projects, we deliver quality work at fair prices.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#924C2E] mb-6">
              Full-Service Construction Solutions Under One Roof
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              When you partner with Terracotta Construction, you gain access to a complete range of property improvement and maintenance services. Our diverse capabilities mean you can rely on a single, trusted contractor for all your residential and commercial construction needs, eliminating the hassle of coordinating multiple service providers and ensuring consistent quality across every project.
            </p>
            <p className="text-lg text-gray-700">
              Each service we offer is delivered by skilled professionals with specialized expertise in their respective fields. We invest in ongoing training, quality tools and equipment, and premium materials from trusted suppliers to ensure that every job meets our high standards. Whether you need regular lawn maintenance, a new fence, emergency repairs, or a custom metal building, Terracotta Construction has you covered.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#924C2E] mb-12 text-center">
            Explore Our Service Categories
          </h2>

          <div className="space-y-8">
            {siteConfig.services.map((service) => {
              const IconComponent = serviceIcons[service.slug as keyof typeof serviceIcons] || Wrench;

              return (
                <div key={service.slug} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      <div className="flex-shrink-0">
                        <IconComponent className="w-12 h-12 text-[#924C2E]" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-2xl font-heading font-bold text-[#924C2E] mb-3">
                          {service.name}
                        </h3>
                        <p className="text-gray-700 mb-4">{service.description}</p>

                        {service.subServices && service.subServices.length > 0 && (
                          <div className="mb-4">
                            <h4 className="font-semibold text-gray-800 mb-2">Services Include:</h4>
                            <div className="grid sm:grid-cols-2 gap-2">
                              {service.subServices.map((sub) => (
                                <Link
                                  key={sub.slug}
                                  href={`/services/${service.slug}/${sub.slug}`}
                                  className="flex items-center gap-2 text-gray-700 hover:text-[#924C2E]"
                                >
                                  <ArrowRight className="w-4 h-4" />
                                  {sub.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}

                        <Link
                          href={`/services/${service.slug}`}
                          className="inline-flex items-center gap-2 bg-[#924C2E] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#7a3f28] transition"
                        >
                          Learn More
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#924C2E] mb-6">
                Why Choose Terracotta Construction for Your Next Project
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                Montgomery County property owners choose Terracotta Construction because we deliver consistent quality, transparent communication, and fair pricing on every project. Our comprehensive service offerings, experienced team, and commitment to customer satisfaction set us apart from the competition.
              </p>
              <ul className="space-y-4">
                {[
                  'One trusted contractor for all your property needs',
                  'Licensed, bonded, and fully insured',
                  'Experienced professionals for each service specialty',
                  'Transparent pricing with detailed written estimates',
                  'Quality materials from trusted suppliers',
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
                Request a Free Estimate
              </h3>
              <p className="text-gray-700 mb-6">
                Ready to get started? Contact us today for a free, no-obligation estimate on any of our services. We&apos;ll assess your needs and provide a detailed proposal tailored to your goals and budget.
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

      {/* Service Process */}
      <section className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-12 text-center">
            Our Service Process
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '1',
                title: 'Contact Us',
                description: 'Call or submit an online request describing your project needs and timeline.',
              },
              {
                step: '2',
                title: 'Free Consultation',
                description: 'We visit your property to assess needs, take measurements, and discuss options.',
              },
              {
                step: '3',
                title: 'Detailed Estimate',
                description: 'You receive a comprehensive written proposal with scope, materials, and pricing.',
              },
              {
                step: '4',
                title: 'Quality Execution',
                description: 'Our team completes your project to the highest standards, on time and on budget.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-[#924C2E] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-heading font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#924C2E] mb-8">
            Serving Montgomery County & Greater Houston
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
            Our service area includes Montgomery, Conroe, The Woodlands, Magnolia, Willis, Huntsville, Tomball, Spring, Cypress, Katy, and surrounding communities.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {siteConfig.serviceAreas.map((area) => (
              <Link
                key={area.slug}
                href={`/locations/${area.slug}`}
                className="bg-gray-100 hover:bg-gray-200 rounded-lg p-4 text-center transition"
              >
                <span className="font-semibold text-gray-800">{area.name}</span>
              </Link>
            ))}
          </div>
          <Link
            href="/locations"
            className="inline-block bg-[#924C2E] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#7a3f28] transition"
          >
            View All Service Areas
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#924C2E] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Contact Terracotta Construction today for a free estimate. Our team is ready to help you with landscaping, fencing, handyman services, apartment turnovers, emergency repairs, metal buildings, and more.
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
