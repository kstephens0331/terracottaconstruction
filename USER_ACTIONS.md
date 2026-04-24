# Setup Checklist (User Actions Required)

The portal build-up is code-complete. Before the new code works end-to-end in production, the following manual steps are required. Work top to bottom.

---

## 1. Resend (transactional email provider)

The customer-portal-server now sends every transactional email through Resend.

- [ ] Sign up at https://resend.com (free tier covers 3,000 emails/month).
- [ ] In the Resend dashboard, add `terracottaconstruction.com` as a sending domain.
- [ ] Resend will give you SPF + DKIM DNS records. Add them to the DNS provider for `terracottaconstruction.com` (the same place where the A record `216.150.1.1` is configured). Verification typically completes in 5-30 minutes.
- [ ] Once verified, generate an API key. Save it; you'll paste it in Step 2.
- [ ] (Optional but recommended) In Resend, set the From identity to `Terracotta Construction <quotes@terracottaconstruction.com>` so emails appear branded in inboxes.

---

## 1b. Google Gemini (Smart Estimate vision)

The Smart Estimate module uses Gemini 2.0 Flash to analyze photos.

- [ ] Sign in at https://aistudio.google.com/apikey with a Google account.
- [ ] Click "Create API key" -> select or create a Google Cloud project (free tier is plenty for this).
- [ ] Save the key. You'll paste it in the next step.
- [ ] (Optional) Set a budget alert in Google Cloud Console; expected spend is ~$0.01-0.03 per estimate.

---

## 2. `customer-portal-server/.env` (backend secrets)

Copy from the template and fill in real values. **Never commit this file** (already gitignored).

```bash
cd customer-portal-server
cp .env.example .env
```

Then edit `.env`:

| Variable | Value |
|---|---|
| `SUPABASE_URL` | `https://ueocfvwdmvqvnkrszpza.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | From Supabase dashboard -> Project Settings -> API -> `service_role` (secret). |
| `RESEND_API_KEY` | The key from Step 1. |
| `RESEND_FROM_EMAIL` | `Terracotta Construction <quotes@terracottaconstruction.com>` |
| `ADMIN_NOTIFICATION_EMAIL` | `terracottaconstruction@gmail.com` |
| `PUBLIC_SITE_URL` | `https://terracottaconstruction.com` |
| `CUSTOMER_PORTAL_URL` | `https://customer.terracottaconstruction.com` |
| `ADMIN_PORTAL_URL` | `https://admin.terracottaconstruction.com` |
| `PORT` | `5000` (local dev only — Vercel ignores this) |
| `NODE_ENV` | `production` for Vercel; `development` locally |
| `GEMINI_API_KEY` | The key from Step 1b. |
| `GEMINI_MODEL` | `gemini-2.0-flash` (default) |
| `MAX_PHOTOS` | `5` (default) |
| `MAX_PHOTO_SIZE_MB` | `5` (default) |
| `ESTIMATE_RATE_LIMIT_PER_HOUR` | `30` (per admin user) |

---

## 3. `Website-Development/customer.terracottaconstruction.com/.env` (frontend env)

Customer portal previously had Supabase keys hardcoded in source. They are now env vars.

```bash
cd Website-Development/customer.terracottaconstruction.com
cp .env.example .env
```

Then edit `.env`:

| Variable | Value |
|---|---|
| `REACT_APP_SUPABASE_URL` | `https://ueocfvwdmvqvnkrszpza.supabase.co` |
| `REACT_APP_SUPABASE_ANON_KEY` | The anon (public) key from Supabase dashboard -> API. (Same value that was previously hardcoded.) |
| `REACT_APP_BACKEND_URL` | `https://customer-server-tc.vercel.app` for production; `http://localhost:5000` for local dev |

---

## 4. Vercel environment variables (production)

For the deployed apps to read the same env vars, set them in each Vercel project dashboard.

### Backend project (`customer-server-tc`)
Add every variable from Step 2 (except `PORT`).

### Customer portal project (`customer-terracottaconstruction-com`)
Add the three `REACT_APP_*` variables from Step 3.

### Admin portal project (`admin.terracottaconstruction.com`)
- Existing: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` (already configured).
- **NEW for Smart Estimate**: `VITE_BACKEND_URL` = `https://customer-server-tc.vercel.app` (production) — the admin frontend now calls the backend for the Smart Estimate flow.

---

## 5. Supabase dashboard tasks

Login to https://supabase.com/dashboard/project/ueocfvwdmvqvnkrszpza.

### a. Enable leaked-password protection
Authentication -> Policies -> toggle on "Leaked password protection". Clears the last remaining security advisor.

### b. Add reset-password redirect URLs to the allow-list
Authentication -> URL Configuration -> Redirect URLs. Add:
- `https://customer.terracottaconstruction.com/reset-password`
- `https://admin.terracottaconstruction.com/admin-reset`
- `http://localhost:3000/reset-password` (for local dev)
- `http://localhost:5173/admin-reset` (for local dev)

### c. Override default Auth email templates with branded HTML
Authentication -> Email Templates. Four templates to override (Confirm signup, Magic link, Change email, Reset password). For each, paste branded HTML.

The branded shell + content lives in `customer-portal-server/lib/templates/password-reset.js` and `welcome.js`. Supabase uses Go template syntax: replace placeholders like `{{RESET_LINK}}` with `{{ .ConfirmationURL }}`. The simplest path:

1. Open `customer-portal-server/lib/templates/password-reset.js` and run the `build({ resetLink: '{{ .ConfirmationURL }}', customerName: '{{ .Email }}' })` function in a Node REPL to print the rendered HTML.
2. Copy the HTML output into Supabase's "Reset Password" template.
3. Repeat for `welcome.js` -> "Confirm signup" template.

Or open dev-mode preview URLs (after starting the server locally):
- `http://localhost:5000/debug/preview-email/password-reset`
- `http://localhost:5000/debug/preview-email/welcome`
- (and others; the route renders any of the 8 templates with sample data)

---

## 6. Logo asset upload

Branded emails reference `https://terracottaconstruction.com/logo-white.png`.

- [ ] Create a white-on-transparent PNG version of the Terracotta Construction logo (200x60ish, optimized).
- [ ] Save it as `terracotta-seo-website/public/logo-white.png` and commit + push (auto-deploys to public site).
- [ ] If you skip this, emails still work but the logo slot shows the alt text "Terracotta Construction" — functional but less polished.

---

## 7. Deploy

After Steps 1-6 are done:

```bash
# Public site (auto-deploys on git push to main)
git push origin main

# Admin portal (manual)
cd Website-Development/admin.terracottaconstruction.com
vercel deploy --prod

# Customer portal (manual)
cd ../customer.terracottaconstruction.com
vercel deploy --prod

# Backend (manual)
cd ../../customer-portal-server
vercel deploy --prod
```

---

## 8. Smoke test (after deploy)

Verify the full flow in production:

**Customer side**
- [ ] Register a new test account at `customer.terracottaconstruction.com/register`.
- [ ] Receive verification email (Supabase) — click link, account confirmed.
- [ ] Log in. See empty Quotes and Work Orders pages with friendly empty states.
- [ ] Click "Forgot password?" on login -> receive reset email -> click link -> set new password -> log back in.
- [ ] Update profile in Settings -> save -> see green success banner.

**Admin side**
- [ ] Log in to `admin.terracottaconstruction.com`.
- [ ] Customers -> create a test customer linked to your test account's email.
- [ ] Quotes -> + New Quote -> fill details + line items -> Save & Send.
- [ ] Verify customer receives branded "Your Quote from Terracotta Construction" email.
- [ ] Mark quote Approved -> Convert to Invoice -> verify invoice created.
- [ ] Send invoice -> customer receives branded "Invoice" email.
- [ ] Record a payment.
- [ ] Analytics page shows charts (revenue trend, work-order donut, top customers).

**Customer round-trip**
- [ ] Log back in as test customer -> see the quote -> click "Request Revision" -> enter message.
- [ ] Verify admin (`terracottaconstruction@gmail.com`) receives branded "Revision requested" email.
- [ ] Quote status updates to "Revision Requested" with the customer's message visible in admin Quote Detail.

**Smart Estimate (admin)**
- [ ] Admin portal -> Smart Estimate -> + New Smart Estimate.
- [ ] Drop in 1-3 photos of any project (e.g., a fence, a yard, a wall).
- [ ] Type a short description (e.g., "Replace 80ft of cedar privacy fence + two gates").
- [ ] Enter zip 77316 (Conroe corridor) -> verify zone preview shows "Conroe / Woodlands corridor (1.05x)".
- [ ] Optionally pick a customer.
- [ ] Click Generate Estimate. Within ~10s, line items + subtotal appear with the disclaimer banner.
- [ ] Click Edit & Save as Draft Quote -> pick customer if needed -> verify it lands you in /quotes/:id/edit with the items pre-populated.
- [ ] Open /smart-estimate -> verify the estimate shows in the list with status "Converted" and a link to the new quote.

---

## Known pre-existing issues (not from this build)

- **Vite/Node 22 build failure** in admin portal: `npm run build` errors on `tinyglobby/escapePath` import. This is a Vite + Node 22 incompatibility; resolve by either updating Vite or pinning Node 20 LTS for the build environment. (Vercel build environment specifies its own Node version; this only affects local builds.)
- **`Website-Development/admin.terracottaconstruction.com/server/.env`** has uncommitted secrets (Supabase service role key) sitting in the working tree from earlier work. Verify the file is gitignored and the secrets haven't been published. The `server/` directory itself was deleted in Phase 2 (admin frontend uses Supabase directly).

---

## What's intentionally deferred

- **Stripe / payment processing** — payments table has Stripe columns but no Stripe SDK integration yet.
- **Customer portal i18n** — `LanguageContext` toggles language state but has no translation map. A real i18n build (translation JSON files, `t()` function) is a separate effort.
- **Privacy Policy / Terms of Service pages** on the public site — Footer links to `/privacy-policy` and `/terms-of-service` but those routes don't exist.
- **Automated tests** — no test infrastructure in any sub-project.
- **Sentry / GA4** — no error monitoring or analytics.
- **Project gallery / testimonials** — content not yet provided.
