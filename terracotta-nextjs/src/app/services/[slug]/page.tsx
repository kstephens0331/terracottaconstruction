import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type ServiceContent = {
  title: string;
  hero: string;
  intro: string;
  highlights: string[];
  process: { title: string; description: string }[];
  faq: { question: string; answer: string }[];
};

const serviceContent: Record<string, ServiceContent> = {
  "kitchen-remodeling": {
    title: "Kitchen Remodeling",
    hero:
      "Luxury kitchen remodeling for Houston, Conroe, The Woodlands, Willis, and Sugar Land homes.",
    intro:
      "We reimagine kitchens as hardworking culinary studios with chef-grade appliances, hidden pantries, custom cabinetry, and layered lighting. Every cabinet box, drawer insert, and stone detail is engineered for daily durability, resale value, and unforgettable gatherings.",
    highlights: [
      "Space planning with traffic flow modeling, daylight mapping, and mechanical coordination.",
      "Fully custom frameless or inset cabinetry, exotic veneers, and furniture-grade islands.",
      "Professional appliance packages, smart induction, steam ovens, and ventilation.",
      "Countertop fabrication with quartzite, porcelain, Dekton, butcher block, and stainless options.",
      "Lighting plans that combine architectural, task, and decorative fixtures tied to smart controls.",
    ],
    process: [
      {
        title: "Design Charrette",
        description:
          "Measure, 3D scan, and collaborate on inspiration boards that set the tone for finishes, flow, and storage goals.",
      },
      {
        title: "Material Curation",
        description:
          "Visit our showroom or partner ateliers to select cabinetry, hardware, plumbing, appliances, tile, and lighting.",
      },
      {
        title: "Precision Build",
        description:
          "We protect adjacent rooms, reroute mechanical systems, and install cabinetry with millwork-level tolerances.",
      },
    ],
    faq: [
      {
        question: "How long does a kitchen remodel take?",
        answer:
          "Average schedules run 10–16 weeks depending on structural updates and custom lead times. We present a milestone schedule before demo so you can plan around family or entertaining commitments.",
      },
      {
        question: "Can we live in the home during construction?",
        answer:
          "Yes. We install dust walls, daily floor protection, negative-air filtration, and provide temporary kitchen solutions when possible.",
      },
    ],
  },
  "bathroom-remodeling": {
    title: "Bathroom Remodeling",
    hero:
      "Spa-level bathroom remodeling with curbless showers, steam suites, and wellness technology.",
    intro:
      "From boutique hotel-inspired powder rooms to expansive primary retreats, we engineer water and humidity control, heated floors, architectural lighting, and storage tailored to your routine.",
    highlights: [
      "Curbless, zero-threshold showers with linear drains and slab-wrapped benches.",
      "Steam, aromatherapy, chromatherapy, and smart digital shower controls.",
      "Custom floating or furniture-style vanities with integrated outlets and organizers.",
      "Stone, porcelain slab, Zellige, or handmade tile installations with book-matched veining.",
      "Smart glass, skylights, and acoustic treatments for privacy and serenity.",
    ],
    process: [
      {
        title: "Wellness Programming",
        description:
          "We align fixture functionality, water pressure, and lighting temperature with how you start and end each day.",
      },
      {
        title: "Permits & Waterproofing",
        description:
          "Our installers follow TCNA standards, Schluter or Wedi waterproofing, and code-compliant ventilation practices.",
      },
      {
        title: "Finishing Touches",
        description:
          "Mirrors, glass enclosures, custom closets, and styling deliver a complete spa experience.",
      },
    ],
    faq: [
      {
        question: "Do you offer universal design features?",
        answer:
          "Absolutely. We integrate wider doorways, blocking for future grab bars, non-slip surfaces, and seated showers without sacrificing design.",
      },
      {
        question: "What about plumbing upgrades?",
        answer:
          "We evaluate existing plumbing stacks and recommend replacements, recirculation systems, or tankless heaters to keep performance and energy efficiency high.",
      },
    ],
  },
  "whole-home-renovations": {
    title: "Whole-Home Renovations",
    hero:
      "Comprehensive home renovations and additions for legacy Houston-area properties.",
    intro:
      "When your home needs a complete rethinking, Terracotta Construction manages structural engineering, design, permitting, and construction sequencing to minimize disruption while maximizing value.",
    highlights: [
      "Structural reconfiguration, steel beam installation, and stair repositioning.",
      "Addition design including second stories, garages, and guest suites.",
      "Mechanical, electrical, and plumbing upgrades to meet current codes.",
      "Energy-efficient windows, insulation, ventilation, and smart-home integrations.",
      "Detailed phasing plans so families can remain in place when feasible.",
    ],
    process: [
      {
        title: "Master Planning",
        description:
          "We align architectural goals, investment ranges, and municipal approvals before any demolition begins.",
      },
      {
        title: "Phased Construction",
        description:
          "Our schedule isolates work zones and coordinates temporary living solutions when necessary.",
      },
      {
        title: "Quality Verification",
        description:
          "Third-party inspections, blower-door tests, and finish checklists protect your investment.",
      },
    ],
    faq: [
      {
        question: "Do you handle historic homes?",
        answer:
          "Yes. We collaborate with preservation boards, replicate millwork profiles, and source period-appropriate materials while discreetly upgrading infrastructure.",
      },
      {
        question: "What if we need financing?",
        answer:
          "We partner with renovation lenders and can provide introduction letters, construction schedules, and draw documentation.",
      },
    ],
  },
  "custom-home-building": {
    title: "Custom Home Building",
    hero: "Ground-up luxury custom homes crafted for Greater Houston lifestyles.",
    intro:
      "From lakefront estates to urban infill homes, we steward the full journey: land feasibility, architectural design, interior selections, smart technology integration, and meticulous construction.",
    highlights: [
      "Site feasibility studies, tree surveys, utility coordination, and floodplain mitigation.",
      "Architectural collaboration or in-house schematic design based on your inspiration.",
      "Energy modeling and high-performance building envelopes tailored for Gulf Coast humidity.",
      "Curated interior design, furnishings, art placement, and styling.",
      "Concierge service with weekly reporting, drone updates, and budget transparency.",
    ],
    process: [
      {
        title: "Discovery & Visioning",
        description:
          "We document program requirements, aesthetic drivers, and lifestyle goals before concept development.",
      },
      {
        title: "Design Development",
        description:
          "Architects, engineers, and interior designers collaborate in BIM to eliminate clashes before field work begins.",
      },
      {
        title: "Build & Commission",
        description:
          "We self-perform critical trades, coordinate trusted partners, and then commission all systems before move-in.",
      },
    ],
    faq: [
      {
        question: "Can you work on our existing land purchase?",
        answer:
          "Yes. We evaluate setbacks, soil reports, and neighborhood guidelines to ensure your vision fits the site.",
      },
      {
        question: "Do you build outside Houston?",
        answer:
          "Our team serves Montgomery, Harris, Walker, and Fort Bend counties. Projects beyond may be considered for the right fit.",
      },
    ],
  },
  "outdoor-living": {
    title: "Outdoor Living & Pools",
    hero:
      "Houston outdoor living environments, pools, and landscape architecture engineered for year-round enjoyment.",
    intro:
      "We blend architecture, landscape, pool design, and outdoor technology to create shade, comfort, and drama. Covered living rooms, summer kitchens, fireplaces, and water features extend your home outward.",
    highlights: [
      "3D site modeling, drainage planning, and structural engineering for patios and decks.",
      "Outdoor kitchens with premium appliances, ventilation, refrigeration, and hospitality storage.",
      "Custom gunite pools, tanning shelves, spas, and water features with automation integration.",
      "Motorized screens, pergolas, fire pits, and audio/visual systems rated for Houston climate.",
      "Landscape lighting, irrigation, and native plant palettes that thrive in Gulf Coast soil.",
    ],
    process: [
      {
        title: "Site Analysis",
        description:
          "Sun studies, prevailing wind analysis, and setback verification ensure your outdoor living plan feels natural and comfortable.",
      },
      {
        title: "Design-Build Coordination",
        description:
          "Pool designers, structural engineers, and craftsmen collaborate to deliver a unified aesthetic.",
      },
      {
        title: "Commissioning & Care",
        description:
          "We balance pool chemistry, program lighting, and train you on smart controls on day one.",
      },
    ],
    faq: [
      {
        question: "Do you handle pool permitting?",
        answer:
          "Yes. We submit engineered drawings, drainage plans, and HOA approvals on your behalf.",
      },
      {
        question: "Can outdoor projects happen simultaneously with interiors?",
        answer:
          "Absolutely. Coordinated schedules reduce disruption and provide cohesive finishes.",
      },
    ],
  },
  "roofing-restoration": {
    title: "Roofing & Insurance Restoration",
    hero:
      "Certified roofing, exterior remodeling, and insurance restoration for storm-impacted homes.",
    intro:
      "Our Haag-certified inspectors document hail, wind, or water damage, then coordinate with your carrier to deliver complete roofing, siding, gutter, and exterior restoration services.",
    highlights: [
      "Detailed inspection reports, drone imagery, and insurance-ready scopes.",
      "Installation of impact-rated shingles, standing seam metal, tile, or flat roofing systems.",
      "Soffit, fascia, gutter, and siding replacement with premium materials.",
      "Temporary drying, water mitigation, and interior repairs when needed.",
      "Assistance with depreciation recovery, supplements, and code upgrades.",
    ],
    process: [
      {
        title: "Assessment & Documentation",
        description:
          "We meet adjusters on-site, share elevations, and ensure damage is thoroughly recorded.",
      },
      {
        title: "Product Selection",
        description:
          "Choose from warrantied roofing systems and exterior palettes that elevate curb appeal.",
      },
      {
        title: "Installation & Closeout",
        description:
          "Crews follow manufacturer specs, provide photos of each layer, and register warranties in your name.",
      },
    ],
    faq: [
      {
        question: "Do you offer emergency response?",
        answer:
          "Yes. Our restoration division provides board-up, tarping, and mitigation within hours across Greater Houston.",
      },
      {
        question: "Can you help us upgrade materials beyond insurance allowances?",
        answer:
          "We outline the difference in cost so you can decide where to invest for longevity and aesthetics.",
      },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(serviceContent).map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const content = serviceContent[params.slug];
  if (!content) {
    return {};
  }
  return {
    title: `${content.title} | Terracotta Construction`,
    description: content.hero,
  };
}

export default function ServiceDetail({
  params,
}: {
  params: { slug: string };
}) {
  const content = serviceContent[params.slug];
  if (!content) {
    notFound();
  }

  return (
    <div className="bg-zinc-50">
      <main className="mx-auto max-w-5xl px-6 py-16 lg:px-8 lg:py-20">
        <Link
          href="/services"
          className="text-sm font-semibold text-amber-700 underline decoration-2 underline-offset-4 hover:text-amber-900"
        >
          Back to services
        </Link>

        <header className="mt-6 space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
            {content.title}
          </p>
          <h1 className="text-4xl font-semibold text-zinc-900">{content.hero}</h1>
          <p className="text-lg text-zinc-600">{content.intro}</p>
        </header>

        <section className="mt-10 rounded-3xl border border-zinc-100 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-zinc-900">
            What&apos;s included
          </h2>
          <ul className="mt-4 list-disc space-y-3 pl-6 text-base text-zinc-600">
            {content.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-3">
          {content.process.map((phase) => (
            <article
              key={phase.title}
              className="rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-zinc-900">
                {phase.title}
              </h3>
              <p className="mt-2 text-base text-zinc-600">{phase.description}</p>
            </article>
          ))}
        </section>

        <section className="mt-10 rounded-3xl border border-zinc-100 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-zinc-900">FAQ</h2>
          <div className="mt-4 space-y-4">
            {content.faq.map((item) => (
              <article key={item.question}>
                <h3 className="text-lg font-semibold text-zinc-900">
                  {item.question}
                </h3>
                <p className="mt-2 text-base text-zinc-600">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-3xl bg-zinc-900 p-8 text-white">
          <h2 className="text-2xl font-semibold">
            Plan your {content.title.toLowerCase()} with Terracotta Construction.
          </h2>
          <p className="mt-3 text-base text-zinc-200">
            Share inspiration photos, timelines, and investment goals. Our
            preconstruction team will outline design paths, permitting
            considerations, and transparent budgets for homes in Conroe, The
            Woodlands, Houston, Willis, and Sugar Land.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center rounded-full bg-amber-500 px-6 py-3 text-base font-semibold text-zinc-900 transition hover:bg-amber-300"
          >
            Request a Consultation
          </Link>
        </section>
      </main>
    </div>
  );
}
