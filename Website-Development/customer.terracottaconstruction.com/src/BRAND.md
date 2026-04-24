# Customer Portal Brand Cheatsheet

Use the Tailwind classes below when restyling pages. All tokens are defined in `tailwind.config.js` and the base fonts are wired up in `src/index.css`. Do NOT introduce hex codes inline - use the tokens.

## Colors (Tailwind class | Hex)
- bg-terracotta / text-terracotta / border-terracotta   #924C2E   (primary CTAs, accents, active nav)
- bg-terracotta-dark / hover:bg-terracotta-dark          #7a3f28   (primary button hover)
- text-terracotta-light                                  #C1440E   (secondary accent, link hover on dark bg)
- text-charcoal / bg-charcoal                            #333333   (body text, dark sidebar)
- bg-cream                                               #FAF9F6   (soft page backgrounds, loading screens)

## Fonts
- font-heading                                           Inter     (h1-h6; applied globally via index.css)
- font-body                                              Roboto    (default body; applied globally via index.css)

## Buttons
- Primary CTA: `bg-terracotta text-white px-6 py-3 rounded-md font-semibold hover:bg-terracotta-dark transition`
- Secondary: `bg-white text-terracotta border-2 border-terracotta px-6 py-3 rounded-md font-semibold hover:bg-terracotta hover:text-white transition`
- Small primary: `bg-terracotta text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-terracotta-dark transition`

## Cards
- Standard: `bg-white rounded-lg shadow-md p-6`
- Hoverable: `bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition`

## Inputs
- `w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-terracotta`
- Label: `block text-sm font-medium text-charcoal mb-1`

## Section backgrounds
- Page root: `min-h-screen bg-cream` or `min-h-screen bg-white`
- Hero / page header: `bg-terracotta text-white py-12 px-4`
- Content container: `max-w-7xl mx-auto px-4 py-8`
- Narrow content (forms): `max-w-md mx-auto` or `max-w-2xl mx-auto`

## Headings
- Page title: `text-3xl md:text-4xl font-heading font-bold text-charcoal mb-6`
- Section heading: `text-2xl font-heading font-semibold text-charcoal mb-4`
- Card heading: `text-xl font-heading font-semibold mb-2`

## Body text
- Default: `text-charcoal` (inherited from body)
- Muted: `text-gray-600`
- Small: `text-sm text-gray-600`

## Status pills (example)
- Pending: `bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium`
- Approved / Active: `bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium`
- Rejected / Cancelled: `bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium`

## Links
- Inline link: `text-terracotta hover:text-terracotta-dark font-medium underline`
- Nav link (on dark bg): `text-gray-200 hover:text-white`
- Nav link (on light bg): `text-charcoal hover:text-terracotta`
