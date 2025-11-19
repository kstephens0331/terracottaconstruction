import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type LocationContent = {
  title: string;
  hero: string;
  intro: string;
  neighborhoods: string[];
  services: string[];
  differentiators: string[];
};

const locationContent: Record<string, LocationContent> = {
  conroe: {
    title: "Conroe",
    hero:
      "Lake Conroe remodeling, acreage estates, and custom homes with Montgomery County know-how.",
    intro:
      "From waterfront retreats to wooded acreage properties, Terracotta Construction delivers design-build services that respect Conroe’s relaxed pace while elevating every finish. We understand Montgomery County permitting, utility coordination, lake bulkhead setbacks, and POA requirements across communities like Bentwater and April Sound.",
    neighborhoods: [
      "Lake Conroe waterfront (Bentwater, April Sound, Walden)",
      "Grand Central Park & The Woodlands Hills",
      "Historic Downtown Conroe revitalizations",
    ],
    services: [
      "Lake-view kitchens and outdoor living spaces with shade structures and summer kitchens.",
      "Guest casitas, carriage houses, workshops, and barndominium upgrades.",
      "Custom home building on acreage tracts with well/septic coordination.",
    ],
    differentiators: [
      "Boat dock, bulkhead, and retaining wall partnerships for shoreline projects.",
      "Experience with Montgomery County septic, floodplain, and mitigation requirements.",
      "Relationships with local architectural review boards and inspectors to keep schedules moving.",
    ],
  },
  "the-woodlands": {
    title: "The Woodlands",
    hero:
      "Design-forward renovations that meet The Woodlands’ architectural review standards.",
    intro:
      "Whether your home is in Alden Bridge, Creekside Park, Carlton Woods, or Grogan’s Mill, Terracotta Construction navigates the township’s design guidelines, drainage requirements, and environmental standards while delivering elevated design.",
    neighborhoods: [
      "Carlton Woods & Carlton Woods Creekside",
      "Alden Bridge, Indian Springs, Sterling Ridge",
      "Creekside Park & East Shore",
    ],
    services: [
      "Full interior transformations with hidden storage, wellness suites, and custom millwork.",
      "Luxury outdoor living with motorized screens, audio, and resort pools for wooded lots.",
      "Energy upgrades, window replacements, and roofing solutions approved for the township.",
    ],
    differentiators: [
      "Dedicated ARC submittal team familiar with required drawings and samples.",
      "Noise, parking, and cleanliness plans that respect deed restrictions.",
      "Designers skilled at blending contemporary upgrades with the community’s natural aesthetic.",
    ],
  },
  houston: {
    title: "Houston",
    hero:
      "River Oaks, Memorial, Heights, and West University projects tailored to each neighborhood’s architectural DNA.",
    intro:
      "Our Houston portfolio spans modern expressions in the Museum District, historic revivals in The Heights, and luxury additions in River Oaks. We coordinate directly with City of Houston inspections, conservation districts, and private neighborhood associations.",
    neighborhoods: [
      "River Oaks, Tanglewood, Memorial",
      "The Heights & Woodland Heights",
      "West University, Southside Place, Bellaire",
    ],
    services: [
      "Whole-home renovations with structural reconfiguration for open concept living while honoring historic charm.",
      "Penthouse-level kitchens, sculleries, wine rooms, and wellness suites.",
      "Outdoor living terraces, rooftop decks, and city-friendly pools with privacy screening.",
    ],
    differentiators: [
      "Historic preservation experience for The Heights and Boulevard Oaks guidelines.",
      "Coordination with private security districts and concierge communication for busy professionals.",
      "Resource library of luxury finishes, art lighting, and acoustic treatments suited for urban living.",
    ],
  },
  willis: {
    title: "Willis",
    hero:
      "Custom homes and large-scale renovations for Willis, Panorama Village, and northern Montgomery County.",
    intro:
      "Willis homeowners trust Terracotta Construction to deliver lakefront residences, detached garages, bunkhouses, and multi-generational additions that embrace the region’s outdoor lifestyle.",
    neighborhoods: [
      "Bentwater north, Point Aquarius, Seven Coves",
      "Downtown Willis revitalizations",
      "North Montgomery County ranch and acreage tracts",
    ],
    services: [
      "Custom home design-build with energy-efficient envelopes and flexible floorplans.",
      "RV garages, workshops, and barndominium conversions with conditioned spaces.",
      "Storm-ready roofing, backup power integration, and water management for rural properties.",
    ],
    differentiators: [
      "Knowledge of lake elevation requirements, FEMA flood maps, and POA expectations.",
      "Vendor partnerships for metal buildings, smart irrigation, and acreage fencing.",
      "Coordinated permitting for septic, wells, and private road access.",
    ],
  },
  "sugar-land": {
    title: "Sugar Land",
    hero:
      "Sugar Land luxury remodeling and exterior transformations for Sweetwater, Riverstone, and Greatwood.",
    intro:
      "In Fort Bend County we specialize in refined interiors, steel and glass additions, and exterior upgrades engineered for humidity, sun, and seasonal storms. HOA relationships ensure your project glides through approvals.",
    neighborhoods: [
      "Sweetwater & Avalon",
      "Riverstone & Telfair",
      "Greatwood & Sugar Creek",
    ],
    services: [
      "Curated kitchen and bath remodels featuring European cabinetry and statement lighting.",
      "Outdoor living with climate-controlled lanais, summer kitchens, and pools.",
      "Impact-rated windows, roofing, and exterior refreshes that elevate curb appeal.",
    ],
    differentiators: [
      "Fort Bend permitting expertise plus relationships with Sugar Land planners.",
      "On-staff designers fluent in transitional, modern, and Mediterranean styles common to the area.",
      "White-glove project management with neighbor notifications and strict cleanliness protocols.",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(locationContent).map((city) => ({ city }));
}

export function generateMetadata({
  params,
}: {
  params: { city: string };
}): Metadata {
  const content = locationContent[params.city];
  if (!content) {
    return {};
  }
  return {
    title: `${content.title} Remodeling & Custom Homes | Terracotta Construction`,
    description: content.hero,
  };
}

export default function LocationDetail({
  params,
}: {
  params: { city: string };
}) {
  const content = locationContent[params.city];
  if (!content) {
    notFound();
  }

  return (
    <div className="bg-zinc-50">
      <main className="mx-auto max-w-5xl px-6 py-16 lg:px-8 lg:py-20">
        <Link
          href="/locations"
          className="text-sm font-semibold text-amber-700 underline decoration-2 underline-offset-4 hover:text-amber-900"
        >
          Back to locations
        </Link>
        <header className="mt-6 space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
            {content.title}
          </p>
          <h1 className="text-4xl font-semibold text-zinc-900">{content.hero}</h1>
          <p className="text-lg text-zinc-600">{content.intro}</p>
        </header>

        <section className="mt-10 grid gap-8 md:grid-cols-2">
          <article className="rounded-3xl border border-zinc-100 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-zinc-900">
              Neighborhood Focus
            </h2>
            <ul className="mt-4 list-disc space-y-3 pl-6 text-base text-zinc-600">
              {content.neighborhoods.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="rounded-3xl border border-zinc-100 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-zinc-900">
              Popular Services
            </h2>
            <ul className="mt-4 list-disc space-y-3 pl-6 text-base text-zinc-600">
              {content.services.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="mt-10 rounded-3xl border border-zinc-100 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-zinc-900">
            Why homeowners choose Terracotta Construction in {content.title}
          </h2>
          <ul className="mt-4 list-disc space-y-3 pl-6 text-base text-zinc-600">
            {content.differentiators.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mt-10 rounded-3xl bg-zinc-900 p-8 text-white">
          <h2 className="text-2xl font-semibold">
            Start your {content.title} project
          </h2>
          <p className="mt-3 text-base text-zinc-200">
            Schedule a discovery call to review project goals, investment range,
            and schedule considerations for your {content.title} property. Our
            local project managers will outline permitting timelines and
            next-step recommendations within 48 hours.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center rounded-full bg-amber-500 px-6 py-3 text-base font-semibold text-zinc-900 transition hover:bg-amber-300"
          >
            Book a Consultation
          </Link>
        </section>
      </main>
    </div>
  );
}
