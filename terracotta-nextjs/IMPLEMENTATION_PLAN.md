## Terracotta Construction – Next Steps Roadmap

### 1. Content & Information Architecture
- Finalize homepage copy approvals (current draft ~900 words) and identify photography/video assets for hero, services, and testimonials.
- Build supporting pages: `/projects`, `/about`, `/process`, `/financing`, `/contact`, and `/blog` with SEO-rich copy, CTAs, schema markup, and internal links.
- Expand service library with galleries, downloadable spec sheets, and lead magnets (e.g., luxury remodeling guide) to improve engagement and rank for mid/long-tail keywords.
- Publish detailed case studies highlighting before/after narratives, budgets, and craftsmanship details to reinforce E-E-A-T.

### 2. Technical SEO & Performance
- Add `next-sitemap` config plus `robots.txt`, `sitemap.xml`, and dynamic breadcrumbs; ensure new service/location routes are indexed.
- Implement JSON-LD variants per page type (Service, FAQ, Project, LocalBusiness, Review, Breadcrumb) and monitor via Search Console once deployed.
- Optimize media: compress hero imagery, adopt responsive `<Image>` components for galleries, and lazy load below-the-fold sections.
- Improve Core Web Vitals: prefetch city/service routes, self-host fonts (already using `next/font`), audit bundle size via `next build --analyze`, and fine-tune lighting/dynamic imports.
- Wire GA4 + Google Ads conversion tracking plus server-side events within API routes.

### 3. Back Office & Lead Management
- Stand up secure `/admin` area leveraging Firebase Auth + role-based access to manage services, locations, testimonials, FAQs, and project galleries.
- Implement Firestore (or preferred DB) collections for `leads`, `projects`, `testimonials`, `pages`, `settings`; connect via Next.js route handlers for CRUD.
- Integrate contact/estimate form with backend (validation, spam protection, transactional email notifications).
- Add dashboard widgets: lead pipeline, project status, marketing KPI snapshots, and content publishing workflow.
- Document all workflows/tests and set up CI (lint/test/build) plus Lighthouse CI for regression monitoring.
