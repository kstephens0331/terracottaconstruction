import Link from "next/link";

const locations = [
  {
    slug: "conroe",
    title: "Conroe",
    summary:
      "Lakefront renovations, acreage estates, and barndominium conversions with Montgomery County expertise.",
  },
  {
    slug: "the-woodlands",
    title: "The Woodlands",
    summary:
      "Architectural review-ready designs for Carlton Woods, Creekside, Alden Bridge, and Grogan’s Mill residences.",
  },
  {
    slug: "houston",
    title: "Houston",
    summary:
      "River Oaks, Memorial, Heights, Tanglewood, and West U projects that honor each district’s architectural story.",
  },
  {
    slug: "willis",
    title: "Willis",
    summary:
      "Waterfront homes, detached garages, and multigenerational additions tailored to northern Montgomery County.",
  },
  {
    slug: "sugar-land",
    title: "Sugar Land",
    summary:
      "Sweetwater, Riverstone, and Greatwood remodels built to impress with climate-ready exteriors.",
  },
];

export default function LocationsPage() {
  return (
    <div className="bg-zinc-50">
      <main className="mx-auto max-w-5xl px-6 py-16 lg:px-8 lg:py-20">
        <header className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
            Locations
          </p>
          <h1 className="text-4xl font-semibold text-zinc-900">
            Local expertise for the communities we call home.
          </h1>
          <p className="text-lg text-zinc-600">
            Terracotta Construction understands the HOAs, architectural review
            boards, and municipal processes unique to each Greater Houston city.
            Choose your location below for detailed insights.
          </p>
        </header>
        <section className="mt-10 grid gap-8 md:grid-cols-2">
          {locations.map((location) => (
            <article
              key={location.slug}
              className="rounded-3xl border border-zinc-100 bg-white p-8 shadow-sm shadow-zinc-200"
            >
              <h2 className="text-2xl font-semibold text-zinc-900">
                {location.title}
              </h2>
              <p className="mt-3 text-base text-zinc-600">{location.summary}</p>
              <Link
                href={`/locations/${location.slug}`}
                className="mt-6 inline-flex items-center text-sm font-semibold text-amber-700 underline decoration-2 underline-offset-4 hover:text-amber-900"
              >
                View location page
              </Link>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
