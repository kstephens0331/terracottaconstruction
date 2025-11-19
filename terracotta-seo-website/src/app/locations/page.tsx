import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, MapPin, CheckCircle } from 'lucide-react';
import { siteConfig } from '@/lib/seo-config';
import { generateBreadcrumbSchema } from '@/lib/schema-generators';

export const metadata: Metadata = {
  title: 'Service Areas | Construction Services Montgomery County & Houston TX',
  description: 'Terracotta Construction serves Montgomery County and Greater Houston including Montgomery, Conroe, The Woodlands, Magnolia, Willis, Tomball, Spring, Cypress, and Katy TX. Licensed & insured.',
  keywords: [
    'construction services Montgomery County TX',
    'handyman services Conroe TX',
    'landscaping The Woodlands TX',
    'fencing installation Houston area',
    'contractor near me Texas',
    'service areas Montgomery County',
  ],
  alternates: {
    canonical: '/locations',
  },
};

export default function LocationsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Service Areas', url: '/locations' },
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
            <span>Service Areas</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Our Service Areas in Texas
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            Terracotta Construction provides professional construction, landscaping, and handyman services throughout Montgomery County and the Greater Houston metropolitan area.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#924C2E] mb-6">
              Serving Montgomery County & Beyond
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              From our base in Montgomery, Texas, Terracotta Construction proudly serves residential and commercial clients throughout Montgomery County and the northern Greater Houston area. Our service territory encompasses established neighborhoods, growing suburbs, and rural properties, allowing us to meet the diverse needs of Texas property owners across the region.
            </p>
            <p className="text-lg text-gray-700">
              Each community we serve has unique characteristics—from the master-planned neighborhoods of The Woodlands to the rural estates of Willis and Magnolia. We understand these local differences and tailor our services accordingly, providing solutions that fit each property&apos;s specific needs and local requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Service Areas Grid */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-[#924C2E] mb-8 text-center">
            Communities We Serve
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteConfig.serviceAreas.map((area) => (
              <Link
                key={area.slug}
                href={`/locations/${area.slug}`}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="w-6 h-6 text-[#924C2E]" />
                  <h3 className="text-xl font-heading font-semibold text-[#924C2E]">
                    {area.name}, {area.state}
                  </h3>
                </div>
                <p className="text-gray-700 text-sm mb-3">
                  Full construction, landscaping, and handyman services available.
                </p>
                <span className="text-[#924C2E] font-medium group-hover:underline text-sm">
                  View Services in {area.name} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services Available */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-[#924C2E] mb-8 text-center">
            Services Available in All Locations
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteConfig.services.map((service) => (
              <div key={service.slug} className="bg-gray-100 rounded-lg p-6">
                <h3 className="text-lg font-heading font-semibold text-[#924C2E] mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-700 text-sm mb-3">{service.description}</p>
                <Link
                  href={`/services/${service.slug}`}
                  className="text-[#924C2E] font-medium hover:underline text-sm"
                >
                  Learn More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Local Matters */}
      <section className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-heading font-bold mb-6">
              Why Choose a Local Contractor
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              As a locally owned and operated company, Terracotta Construction offers advantages that regional or national companies cannot match:
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              {[
                'Deep understanding of local climate, soil, and building conditions',
                'Familiarity with local codes, permits, and regulations',
                'Established relationships with local suppliers for quality materials',
                'Quick response times without long travel distances',
                'Accountability to our neighbors and community',
                'Investment in local economy through hiring and purchasing',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-[#924C2E] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-heading font-bold mb-6">
            Not Sure If We Serve Your Area?
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            If your community isn&apos;t listed, please contact us. We likely serve your area and are happy to confirm availability and discuss your project needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-[#924C2E] px-8 py-4 rounded-md font-semibold text-lg hover:bg-gray-100 transition inline-block"
            >
              Contact Us
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
