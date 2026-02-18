import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Trusted Local Partners | Terracotta Construction',
  description:
    'Terracotta Construction is proud to partner with trusted businesses across construction, technology, healthcare, and more in Montgomery County and Greater Houston.',
  openGraph: {
    title: 'Trusted Local Partners | Terracotta Construction',
    description:
      'Meet the businesses Terracotta Construction knows, trusts, and recommends throughout the Greater Houston area.',
    type: 'website',
  },
};

const partners = [
  {
    name: 'AMW Cooling & Heating',
    category: 'HVAC Services',
    description:
      'When our construction projects need heating or cooling work, AMW is the team we call. This veteran-owned HVAC company serves Conroe, TX and surrounding communities with expert AC repair, heating installation, routine maintenance, and around-the-clock emergency service — always licensed and insured.',
    url: 'https://amwairconditioning.com',
  },
  {
    name: 'StephensCode LLC',
    category: 'Web Development',
    description:
      'The veteran-owned development team that built and maintains our website. With more than fourteen years of experience and 2,600 projects shipped, StephensCode creates custom websites, project management tools, and digital solutions for businesses of every size.',
    url: 'https://stephenscode.dev',
  },
  {
    name: 'Forge-X',
    category: 'Contractor Management Software',
    description:
      'The project management platform we rely on to keep our jobs organized. Forge-X combines invoicing, scheduling, daily logs, and payment tracking in one dashboard — making it simple for our crew and customers to stay aligned throughout every project.',
    url: 'https://forge-x.app',
  },
  {
    name: 'C.A.R.S Collision & Refinish',
    category: 'Auto Body & Paint',
    description:
      'A veteran and family-operated body shop in Spring, TX that we trust with our work vehicles. C.A.R.S handles collision repair, custom paint, paintless dent removal, and spray-in bedliners — serving Spring, The Woodlands, and all of North Houston.',
    url: 'https://carscollisionandrefinishshop.com',
  },
  {
    name: 'SACVPN',
    category: 'VPN & Cybersecurity',
    description:
      'Dedicated VPN infrastructure built for business, personal, and gaming use. SACVPN deploys private server instances with enterprise-grade encryption and speeds reaching 700 Mbps — no shared servers, no data logs. Veteran-owned and operated.',
    url: 'https://sacvpn.com',
  },
  {
    name: 'LotSwap',
    category: 'Automotive Marketplace',
    description:
      'A fee-free dealer-to-dealer vehicle marketplace that eliminates auction fees, transport costs, and holding expenses. Dealers list inventory, negotiate directly, and close deals faster — saving an average of $1,500 to $2,500 per vehicle.',
    url: 'https://lotswap.io',
  },
  {
    name: 'Benefit Builder LLC',
    category: 'Employee Benefits',
    description:
      'Benefit Builder helps us offer our employees better benefits at lower cost. They specialize in Section 125 pre-tax benefit plans and supplemental coverage — including life, dental, and vision — structuring packages that reduce tax liability on both sides.',
    url: 'https://benefitbuilderllc.com',
  },
  {
    name: 'ColorFuse Prints',
    category: 'Custom Printing & Apparel',
    description:
      'Need branded workwear for your crew? ColorFuse Prints produces high-quality DTF transfers, sublimation prints, and custom apparel. From company shirts to ready-to-press transfers, they deliver vibrant, durable results shipped right to your door.',
    url: 'https://colorfuseprints.com',
  },
  {
    name: 'FC Photo Houston',
    category: 'Photography',
    description:
      'A Houston-area photography service specializing in portraits, events, professional headshots, and creative projects. FC Photo Houston is our go-to for job-site progress photos, team pictures, and company events.',
    url: 'https://fcphotohouston.com',
  },
  {
    name: 'JustWell Clinical Research',
    category: 'Clinical Research',
    description:
      'Houston\'s trusted partner for ethical and inclusive clinical trials. JustWell conducts IRB-approved studies in cardiology, neurology, dermatology, ophthalmology, and family medicine — with compensation available for qualified participants.',
    url: 'https://justwellclinical.org',
  },
  {
    name: 'GradeStack',
    category: 'SEO & Website Auditing',
    description:
      'A self-hosted platform that audits websites for performance, SEO, security, accessibility, and best practices. GradeStack crawls your site on a schedule and provides clear, step-by-step guidance for fixing every issue it finds.',
    url: 'https://gradestack.dev',
  },
  {
    name: 'Get Step Ready',
    category: 'Medical Education',
    description:
      'A comprehensive USMLE Step 1 preparation platform packed with 50,000-plus flashcards, thousands of practice questions, video lectures, and AI-driven study tools that adapt to each student\'s learning pace.',
    url: 'https://getstepready.com',
  },
];

export default function PartnersPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#924C2E] py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted Local Partners
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            At Terracotta Construction, we believe in supporting the businesses around us.
            These are companies we work with, trust completely, and proudly recommend to
            our customers throughout Montgomery County and Greater Houston.
          </p>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <span className="text-xs text-gray-500 uppercase tracking-wide mb-2 block">
                  {partner.category}
                </span>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {partner.name}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {partner.description}
                </p>
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 bg-[#924C2E] text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-[#7a3f28] transition"
                >
                  Visit Website
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#924C2E] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Need Construction or Handyman Services?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Terracotta Construction handles general contracting, landscaping, fencing,
            apartment turnovers, and emergency repairs across Montgomery County and Greater
            Houston. Licensed, insured, and ready to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-white text-[#924C2E] px-8 py-4 rounded-md font-bold text-lg hover:bg-gray-100 transition"
            >
              Get a Free Estimate
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center bg-white/10 text-white border border-white/30 px-8 py-4 rounded-md font-bold text-lg hover:bg-white/20 transition"
            >
              View Our Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
