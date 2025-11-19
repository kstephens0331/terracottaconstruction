import Link from "next/link";

const services = [
  {
    slug: "kitchen-remodeling",
    title: "Kitchen Remodeling",
    summary:
      "Chef-inspired layouts with custom cabinetry, hidden storage, luxury appliances, and layered lighting for effortless entertaining.",
  },
  {
    slug: "bathroom-remodeling",
    title: "Bathroom Remodeling",
    summary:
      "Steam showers, heated floors, curbless entries, and bespoke vanities transform bathrooms into restorative retreats.",
  },
  {
    slug: "whole-home-renovations",
    title: "Whole-Home Renovations",
    summary:
      "Comprehensive structural reconfiguration, additions, and finish upgrades that reinvent how your home flows.",
  },
  {
    slug: "custom-home-building",
    title: "Custom Home Building",
    summary:
      "Full design-build services for ground-up luxury residences, lake retreats, and infill homes across Greater Houston.",
  },
  {
    slug: "outdoor-living",
    title: "Outdoor Living & Pools",
    summary:
      "Shade structures, outdoor kitchens, pools, spas, fireplaces, and landscape lighting engineered for Houston weather.",
  },
  {
    slug: "roofing-restoration",
    title: "Roofing & Insurance Restoration",
    summary:
      "Certified inspectors repair, replace, and restore roofing, siding, and exteriors with insurance-ready documentation.",
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-zinc-50">
      <main className="mx-auto max-w-5xl px-6 py-16 lg:px-8 lg:py-20">
        <header className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
            Services
          </p>
          <h1 className="text-4xl font-semibold text-zinc-900">
            Specialized remodeling, custom building, and restoration under one
            accountable team.
          </h1>
          <p className="text-lg text-zinc-600">
            Terracotta Construction delivers concierge-level design-build
            solutions tailored to Houston, Conroe, The Woodlands, Willis, and
            Sugar Land homes. Explore each service to learn more about scope,
            process, and deliverables.
          </p>
        </header>
        <section className="mt-10 grid gap-8 md:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.slug}
              className="rounded-3xl border border-zinc-100 bg-white p-8 shadow-sm shadow-zinc-200/50"
            >
              <h2 className="text-2xl font-semibold text-zinc-900">
                {service.title}
              </h2>
              <p className="mt-3 text-base text-zinc-600">{service.summary}</p>
              <Link
                href={`/services/${service.slug}`}
                className="mt-6 inline-flex items-center text-sm font-semibold text-amber-700 underline decoration-2 underline-offset-4 hover:text-amber-900"
              >
                View service details
              </Link>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
