// JSON-LD Schema Generators for SEO
import { siteConfig } from './seo-config';

// Local Business Schema
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.business.name,
    legalName: siteConfig.business.legalName,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.business.phone,
    email: siteConfig.business.email,
    priceRange: siteConfig.business.priceRange,
    image: `${siteConfig.url}/logo.jpg`,
    logo: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}/logo.jpg`,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.business.address.street,
      addressLocality: siteConfig.business.address.city,
      addressRegion: siteConfig.business.address.state,
      postalCode: siteConfig.business.address.zip,
      addressCountry: siteConfig.business.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.business.geo.latitude,
      longitude: siteConfig.business.geo.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '08:00',
        closes: '14:00',
      },
    ],
    areaServed: siteConfig.serviceAreas.map((area) => ({
      '@type': 'City',
      name: `${area.name}, ${area.state}`,
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Construction and Handyman Services',
      itemListElement: siteConfig.services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.name,
          description: service.description,
        },
      })),
    },
    sameAs: Object.values(siteConfig.social).filter(Boolean),
  };
}

// Service Schema
export function generateServiceSchema(
  serviceName: string,
  serviceDescription: string,
  serviceUrl: string,
  areaServed?: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: serviceName,
    name: serviceName,
    description: serviceDescription,
    url: `${siteConfig.url}${serviceUrl}`,
    provider: {
      '@type': 'LocalBusiness',
      name: siteConfig.business.name,
      telephone: siteConfig.business.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: siteConfig.business.address.street,
        addressLocality: siteConfig.business.address.city,
        addressRegion: siteConfig.business.address.state,
        postalCode: siteConfig.business.address.zip,
        addressCountry: siteConfig.business.address.country,
      },
    },
    areaServed: areaServed
      ? {
          '@type': 'City',
          name: areaServed,
        }
      : siteConfig.serviceAreas.map((area) => ({
          '@type': 'City',
          name: `${area.name}, ${area.state}`,
        })),
  };
}

// Breadcrumb Schema
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}

// FAQ Schema
export function generateFAQSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// Website Schema
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// Location Page Schema
export function generateLocationSchema(
  cityName: string,
  stateName: string,
  serviceUrl: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `${siteConfig.business.name} - ${cityName}, ${stateName}`,
    description: `Professional construction, landscaping, fencing, and handyman services in ${cityName}, ${stateName}. Licensed, insured, and locally trusted.`,
    url: `${siteConfig.url}${serviceUrl}`,
    telephone: siteConfig.business.phone,
    email: siteConfig.business.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.business.address.street,
      addressLocality: siteConfig.business.address.city,
      addressRegion: siteConfig.business.address.state,
      postalCode: siteConfig.business.address.zip,
      addressCountry: siteConfig.business.address.country,
    },
    areaServed: {
      '@type': 'City',
      name: `${cityName}, ${stateName}`,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `Services in ${cityName}`,
      itemListElement: siteConfig.services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.name,
        },
      })),
    },
  };
}

// Review/Aggregate Rating Schema (for future use)
export function generateAggregateRatingSchema(
  ratingValue: number,
  reviewCount: number
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.business.name,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: ratingValue,
      reviewCount: reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  };
}
