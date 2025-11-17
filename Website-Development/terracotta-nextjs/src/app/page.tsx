import Link from "next/link";

const stats = [
  { label: "Years Building Houston", value: "25+" },
  { label: "Design-Build Projects Delivered", value: "630" },
  { label: "Dedicated Craftsmen & Designers", value: "48" },
  { label: "Average Client Satisfaction", value: "4.9/5" },
];

const services = [
  {
    name: "Kitchen Remodeling",
    description:
      "Custom cabinetry, chef-grade appliances, luxury stonework, and space planning that supports everyday living and large-scale entertaining.",
    href: "/services/kitchen-remodeling",
  },
  {
    name: "Bathroom Remodeling",
    description:
      "Spa-level suites with curbless showers, custom vanities, steam features, and integrated storage built for relaxation.",
    href: "/services/bathroom-remodeling",
  },
  {
    name: "Whole-Home Renovations",
    description:
      "Structural reconfiguration, additions, and top-to-bottom modernization that protect the architectural integrity of your home.",
    href: "/services/whole-home-renovations",
  },
  {
    name: "Custom Home Building",
    description:
      "White-glove design-build process for ground-up estates, lake homes, and infill residences across Montgomery and Harris counties.",
    href: "/services/custom-home-building",
  },
  {
    name: "Outdoor Living & Pools",
    description:
      "Covered patios, summer kitchens, pools, water features, fireplaces, and multi-level decks designed for Houston weather.",
    href: "/services/outdoor-living",
  },
  {
    name: "Roofing & Insurance Restoration",
    description:
      "Certified inspectors repair, replace, and restore roofing, siding, and exteriors after hail, wind, or water damage.",
    href: "/services/roofing-restoration",
  },
];

const locations = [
  {
    city: "Conroe, TX",
    content:
      "Lake Conroe waterfront remodeling, barndominium conversions, and acreage estate builds with proven knowledge of Montgomery County permitting.",
    href: "/locations/conroe",
  },
  {
    city: "The Woodlands, TX",
    content:
      "High-design interiors and outdoor living retreats tailored for Creekside, Alden Bridge, and Carlton Woods architectural reviews.",
    href: "/locations/the-woodlands",
  },
  {
    city: "Houston, TX",
    content:
      "Luxury kitchen, bath, and whole-home renovations for River Oaks, Heights, Memorial, and West University residences.",
    href: "/locations/houston",
  },
  {
    city: "Willis, TX",
    content:
      "Custom lake homes, detached garages, and generational living additions built for northern Montgomery County lifestyles.",
    href: "/locations/willis",
  },
  {
    city: "Sugar Land, TX",
    content:
      "Premium finishes and climate-ready exteriors for Sweetwater, Riverstone, and Greatwood homeowners seeking concierge service.",
    href: "/locations/sugar-land",
  },
];

const processSteps = [
  {
    step: "01 — Collaborative Discovery",
    detail:
      "We begin with on-site consultations, laser scans, and inspiration workshops to define the vision, budget ranges, and architectural constraints.",
  },
  {
    step: "02 — Design & Preconstruction",
    detail:
      "Our in-house designers and estimators produce permit-ready drawings, product specifications, energy models, and transparent cost projections.",
  },
  {
    step: "03 — Build with Precision",
    detail:
      "Dedicated project managers keep milestones, cleanliness, and communication on track with weekly walkthroughs and client dashboards.",
  },
  {
    step: "04 — Hand-off & Lifetime Support",
    detail:
      "After white-glove delivery we provide warranty manuals, curated maintenance schedules, and preferred service teams for life.",
  },
];

const testimonials = [
  {
    quote:
      "Terracotta transformed our dated River Oaks home into a light-filled sanctuary. Every cabinet line, lighting layer, and smart-home detail feels bespoke.",
    author: "Marissa K., Houston Whole-Home Renovation",
  },
  {
    quote:
      "From budgeting to final punch list, the Conroe team delivered on time and exceeded expectations. Their craftsmen treat your house like their own.",
    author: "Devin & Kara M., Lake Conroe Custom Build",
  },
];

const faqs = [
  {
    question: "How do you keep large remodeling projects on schedule?",
    answer:
      "We structure every project with digital Gantt schedules, live budget dashboards, and milestone-based progress payments. Our field superintendents meet every morning with trade partners, while clients receive Friday video walk-throughs and punch updates inside the Terracotta Portal.",
  },
  {
    question: "Do you help with architectural review boards and permits?",
    answer:
      "Yes. Our preconstruction group manages architectural review submissions for The Woodlands, Bentwater, and other deed-restricted neighborhoods, plus all municipal permits and inspections across Houston, Conroe, Willis, and Sugar Land.",
  },
  {
    question: "What price range do your projects typically fall into?",
    answer:
      "Kitchen remodels generally begin around $125K, spa bathrooms from $85K, whole-home renovations from $350K, and custom homes from $900K+. Every proposal is fixed-price with allowances for premium finishes so you always know the investment required before demo day.",
  },
];

const missionParagraphs = [
  "Terracotta Construction is a full-service luxury remodeling and custom home building firm rooted in craftsmanship, transparency, and neighborly hospitality. For more than two decades we have elevated Houston, Conroe, The Woodlands, Willis, Sugar Land, and Montgomery County properties with architecture-grade design, detailed project management, and artisanal finishes that honor the character of each neighborhood.",
  "Our Houston general contractors, licensed designers, and specialty trades collaborate from the first sketch through final styling. That unified design-build method shortens construction timelines, protects budgets, and gives homeowners a single accountable team. Whether you crave a chef-driven kitchen remodel, a spa-worthy bathroom renovation, or a whole-home transformation with structural reconfiguration and additions, we orchestrate every phase so you can keep living life without construction headaches.",
  "Because the Gulf Coast climate can be tough on materials, Terracotta Construction specifies engineered framing, high-performance building envelopes, impact-rated windows, and advanced HVAC strategies. Outdoor living projects, pools, and summer kitchens are detailed with the same rigor as our interiors so that finishes remain beautiful through humidity, UV exposure, and seasonal storms.",
  "Homeowners choose us when they want concierge-level service: weekly site meetings, photo documentation, real-time schedule updates, and a clean jobsite every evening. We integrate technology such as laser scanning, virtual reality previews, and client dashboards to keep every voice heard. That dedication results in 4.9-star satisfaction ratings and repeat projects across families, friends, and professional referrals.",
];

export default function Home() {
  return (
    <div className="bg-zinc-50">
      <main className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-24">
        <section className="rounded-3xl bg-white p-10 shadow-xl shadow-zinc-200/60">
          <div className="grid gap-10 lg:grid-cols-[2fr,1fr] lg:items-center">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
                Houston Luxury Remodeling & Custom Homes
              </p>
              <h1 className="text-4xl font-semibold text-zinc-900 sm:text-5xl">
                Design-forward renovations and bespoke builds for homeowners who
                expect concierge craftsmanship.
              </h1>
              <p className="text-lg leading-relaxed text-zinc-600">
                We plan, design, and build kitchens, bathrooms, additions, and
                new luxury residences across Conroe, The Woodlands, Houston,
                Willis, Sugar Land, and neighboring communities. With one team
                protecting your vision from the first sketch to the final
                styling, your home becomes a tailored expression of how you want
                to live.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="rounded-full bg-amber-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-amber-600/30 transition hover:bg-amber-700"
                >
                  Book a Design Consultation
                </Link>
                <Link
                  href="/projects"
                  className="rounded-full border border-zinc-800 px-6 py-3 text-base font-semibold text-zinc-900 transition hover:bg-zinc-900 hover:text-white"
                >
                  View Signature Projects
                </Link>
              </div>
            </div>
            <div className="grid gap-6 rounded-2xl border border-zinc-100 bg-zinc-900 p-8 text-white">
              <p className="text-lg font-medium uppercase tracking-[0.2em] text-amber-300">
                In the numbers
              </p>
              <dl className="grid grid-cols-2 gap-6">
                {stats.map((item) => (
                  <div key={item.label}>
                    <dt className="text-sm uppercase tracking-wide text-zinc-400">
                      {item.label}
                    </dt>
                    <dd className="text-3xl font-semibold text-white">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section className="mt-16 space-y-6 text-base leading-7 text-zinc-700">
          {missionParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>

        <section className="mt-16">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
                Featured Services
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-zinc-900">
                Specialized craftsmanship for every room and exterior.
              </h2>
            </div>
            <Link
              href="/services"
              className="text-sm font-semibold text-amber-700 underline decoration-2 underline-offset-4 hover:text-amber-900"
            >
              Explore all services
            </Link>
          </div>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {services.map((service) => (
              <article
                key={service.name}
                className="flex flex-col justify-between rounded-2xl border border-zinc-100 bg-white p-8 shadow-sm shadow-zinc-200/40"
              >
                <div>
                  <h3 className="text-2xl font-semibold text-zinc-900">
                    {service.name}
                  </h3>
                  <p className="mt-3 text-base text-zinc-600">
                    {service.description}
                  </p>
                </div>
                <Link
                  href={service.href}
                  className="mt-6 inline-flex items-center text-sm font-semibold text-amber-700 underline decoration-2 underline-offset-4 hover:text-amber-900"
                >
                  Learn more
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-amber-900 p-10 text-white">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
                Proven Process
              </p>
              <h2 className="mt-2 text-3xl font-semibold">
                Transparent planning and meticulous execution keep every Houston
                remodel on schedule.
              </h2>
              <p className="mt-4 text-base text-zinc-200">
                Every Terracotta project receives a dedicated project manager,
                online client portal, and weekly quality audits. We coordinate
                city inspections, HOA approvals, material procurement, and
                logistics so you can focus on enjoying the process.
              </p>
            </div>
            <ul className="space-y-6">
              {processSteps.map((phase) => (
                <li
                  key={phase.step}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-200">
                    {phase.step}
                  </p>
                  <p className="mt-2 text-base text-zinc-50">{phase.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-zinc-100 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
              Client Stories
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-zinc-900">
              Trusted by discerning homeowners throughout Greater Houston.
            </h2>
            <div className="mt-6 space-y-6">
              {testimonials.map((testimonial) => (
                <blockquote
                  key={testimonial.author}
                  className="rounded-2xl bg-zinc-50 p-6 text-base text-zinc-700"
                >
                  <p>&ldquo;{testimonial.quote}&rdquo;</p>
                  <cite className="mt-4 block text-sm font-semibold text-zinc-500">
                    {testimonial.author}
                  </cite>
                </blockquote>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-zinc-100 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
              Service Area
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-zinc-900">
              Hyper-local knowledge of neighborhoods, jurisdictions, and HOAs.
            </h2>
            <div className="mt-6 grid gap-6">
              {locations.map((location) => (
                <article key={location.city}>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-xl font-semibold text-zinc-900">
                      {location.city}
                    </h3>
                    <Link
                      href={location.href}
                      className="text-sm font-semibold text-amber-700 underline decoration-2 underline-offset-4 hover:text-amber-900"
                    >
                      Location guide
                    </Link>
                  </div>
                  <p className="mt-2 text-base text-zinc-600">
                    {location.content}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-zinc-100 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
            Frequently Asked Questions
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-zinc-900">
            Straight answers about our remodeling and custom-building approach.
          </h2>
          <div className="mt-6 divide-y divide-zinc-100">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-4">
                <summary className="cursor-pointer list-none text-lg font-semibold text-zinc-900">
                  {faq.question}
                </summary>
                <p className="mt-3 text-base text-zinc-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-3xl bg-zinc-900 p-10 text-white">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
                Ready to build?
              </p>
              <h2 className="mt-2 text-3xl font-semibold">
                Schedule a complimentary planning call.
              </h2>
              <p className="mt-4 text-base text-zinc-200">
                Share your wish list, timeline, photos, and inspiration links.
                We will craft a preliminary roadmap covering design direction,
                permit insights, and investment ranges for your Conroe, The
                Woodlands, Houston, Willis, or Sugar Land property.
              </p>
            </div>
            <form className="grid gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder-white/60 focus:border-amber-300 focus:outline-none"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder-white/60 focus:border-amber-300 focus:outline-none"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder-white/60 focus:border-amber-300 focus:outline-none"
              />
              <textarea
                name="project"
                placeholder="Tell us about your project..."
                rows={4}
                className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder-white/60 focus:border-amber-300 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-full bg-amber-500 px-6 py-3 text-base font-semibold text-zinc-900 transition hover:bg-amber-300"
              >
                Submit Project Details
              </button>
              <p className="text-sm text-zinc-400">
                By submitting you consent to project updates and can unsubscribe
                anytime.
              </p>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
