import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://terracottaconstruction.com";
const businessName = "Terracotta Construction";
const ogImage =
  "https://images.unsplash.com/photo-1613977256394-89e7f9a20aa2?auto=format&fit=crop&w=1200&q=80";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title:
    "Terracotta Construction | Luxury Home Remodeling & Custom Builders in Houston",
  description:
    "Award-winning remodeling and custom home builder serving Houston, The Woodlands, Conroe, Sugar Land, and surrounding communities with turn-key design-build services.",
  keywords: [
    "Houston home remodeling",
    "luxury custom home builder",
    "kitchen remodeling Conroe",
    "bathroom renovation The Woodlands",
    "outdoor living contractor Houston",
    "roofing and restoration Sugar Land",
    "whole home renovation Willis",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    title:
      "Terracotta Construction | Luxury Remodeling & Custom Homes in Greater Houston",
    description:
      "Design-build remodeling, outdoor living, and custom luxury homes built by Houston's most trusted craftsmen.",
    siteName: businessName,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Terracotta Construction luxury kitchen and living room remodel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Terracotta Construction | Luxury Remodeling & Custom Homes in Greater Houston",
    description:
      "Design-build remodeling, outdoor living, and custom luxury homes built by Houston's most trusted craftsmen.",
    site: "@terracottabuild",
    creator: "@terracottabuild",
    images: [ogImage],
  },
  alternates: {
    canonical: siteUrl,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteUrl}#company`,
  name: businessName,
  description:
    "Design-build general contractor specializing in luxury remodeling, custom homes, and outdoor living environments throughout Greater Houston.",
  url: siteUrl,
  telephone: "+1-713-555-0199",
  priceRange: "$$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "123 Terracotta Way",
    addressLocality: "Conroe",
    addressRegion: "TX",
    postalCode: "77301",
    addressCountry: "US",
  },
  areaServed: [
    "Houston",
    "The Woodlands",
    "Conroe",
    "Willis",
    "Sugar Land",
    "Montgomery County",
  ],
  sameAs: [
    "https://www.facebook.com/terracottaconstruction",
    "https://www.instagram.com/terracottaconstruction",
    "https://www.linkedin.com/company/terracotta-construction",
  ],
  image: ogImage,
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Luxury Kitchen Remodeling",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Custom Home Building",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Outdoor Living Spaces",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </body>
    </html>
  );
}
