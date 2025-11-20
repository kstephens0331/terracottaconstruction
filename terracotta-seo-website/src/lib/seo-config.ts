// SEO Configuration for Terracotta Construction
import type { Metadata } from 'next';

export const siteConfig = {
  name: 'Terracotta Construction',
  description: 'Professional construction, landscaping, fencing, handyman services, and metal building installation in Montgomery County, TX and surrounding areas. Licensed, insured, and trusted since day one.',
  url: 'https://terracottaconstruction.com',
  ogImage: '/og-image.jpg',

  // Business Information
  business: {
    name: 'Terracotta Construction',
    legalName: 'Terracotta Construction LLC',
    phone: '(936) 955-4083',
    phoneAlt: '(832) 288-0258',
    email: 'admin@terracottaconstruction.com',
    address: {
      street: '16724 E. Forrestal St',
      city: 'Montgomery',
      state: 'TX',
      zip: '77316',
      country: 'US',
    },
    geo: {
      latitude: 30.3877,
      longitude: -95.6944,
    },
    hours: 'Mo-Fr 07:00-18:00, Sa 08:00-14:00',
    priceRange: '$$',
  },

  // Service Areas
  serviceAreas: [
    { name: 'Montgomery', state: 'TX', slug: 'montgomery-tx' },
    { name: 'Conroe', state: 'TX', slug: 'conroe-tx' },
    { name: 'The Woodlands', state: 'TX', slug: 'the-woodlands-tx' },
    { name: 'Magnolia', state: 'TX', slug: 'magnolia-tx' },
    { name: 'Willis', state: 'TX', slug: 'willis-tx' },
    { name: 'Huntsville', state: 'TX', slug: 'huntsville-tx' },
    { name: 'Tomball', state: 'TX', slug: 'tomball-tx' },
    { name: 'Spring', state: 'TX', slug: 'spring-tx' },
    { name: 'Cypress', state: 'TX', slug: 'cypress-tx' },
    { name: 'Katy', state: 'TX', slug: 'katy-tx' },
  ],

  // Services
  services: [
    {
      name: 'Landscaping & Lawn Care',
      slug: 'landscaping',
      description: 'Professional lawn mowing, trimming, mulching, seasonal cleanup, and tree trimming services.',
      subServices: [
        { name: 'Lawn Mowing', slug: 'lawn-mowing' },
        { name: 'Mulching Services', slug: 'mulching-services' },
        { name: 'Seasonal Cleanup', slug: 'seasonal-cleanup' },
        { name: 'Tree Trimming', slug: 'tree-trimming' },
      ],
    },
    {
      name: 'Fencing Installation & Repair',
      slug: 'fencing',
      description: 'Wood, chain link, and metal fencing installed or repaired with precision and quality materials.',
      subServices: [
        { name: 'Wood Fence Installation', slug: 'wood-fence-installation' },
        { name: 'Chain Link Fencing', slug: 'chain-link-fencing' },
        { name: 'Metal Fence Installation', slug: 'metal-fence-installation' },
        { name: 'Fence Repair', slug: 'fence-repair' },
      ],
    },
    {
      name: 'Handyman Services & Repairs',
      slug: 'handyman',
      description: 'General repairs, drywall work, door installation, mounting, caulking, and more.',
      subServices: [
        { name: 'Drywall Repair', slug: 'drywall-repair' },
        { name: 'Door Installation', slug: 'door-installation' },
        { name: 'General Repairs', slug: 'general-repairs' },
      ],
    },
    {
      name: 'Apartment Turnovers',
      slug: 'apartment-turnovers',
      description: 'Fast, thorough apartment maintenance and make-ready services between tenants.',
      subServices: [
        { name: 'Make Ready Services', slug: 'make-ready-services' },
        { name: 'Property Maintenance', slug: 'property-maintenance' },
      ],
    },
    {
      name: 'Emergency Services (24/7)',
      slug: 'emergency-services',
      description: 'Rapid response for water damage, storm damage, and urgent repair needs.',
      subServices: [
        { name: 'Water Damage', slug: 'water-damage' },
        { name: 'Storm Damage', slug: 'storm-damage' },
        { name: 'Emergency Repairs', slug: 'emergency-repairs' },
      ],
    },
    {
      name: 'Metal Buildings & Custom Projects',
      slug: 'metal-buildings',
      description: 'Custom steel building construction for workshops, storage, and specialized structures.',
      subServices: [
        { name: 'Steel Workshops', slug: 'steel-workshops' },
        { name: 'Storage Buildings', slug: 'storage-buildings' },
        { name: 'Custom Metal Structures', slug: 'custom-metal-structures' },
      ],
    },
  ],

  // Social Links
  social: {
    facebook: '',
    instagram: '',
    linkedin: '',
    twitter: '',
  },
};

// Default metadata for pages
export const defaultMetadata: Metadata = {
  title: {
    default: 'Terracotta Construction | Montgomery TX Construction & Handyman Services',
    template: '%s | Terracotta Construction',
  },
  description: siteConfig.description,
  keywords: [
    'construction company Montgomery TX',
    'handyman services Conroe TX',
    'landscaping The Woodlands TX',
    'fencing installation Montgomery County',
    'metal building construction Texas',
    'emergency repair services',
    'apartment turnovers Texas',
    'lawn care Montgomery TX',
    'fence repair Conroe',
    'drywall repair The Woodlands',
  ],
  authors: [{ name: 'Terracotta Construction' }],
  creator: 'Terracotta Construction',
  publisher: 'Terracotta Construction',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'Terracotta Construction - Professional Construction Services in Montgomery TX',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '', // Add Google Search Console verification
    yandex: '',
    yahoo: '',
  },
};
