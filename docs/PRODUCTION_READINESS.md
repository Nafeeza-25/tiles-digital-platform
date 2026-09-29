# Production Readiness — Step 25

This document records preparation status for the fictional academic-demo platform. It does not claim that the platform has been deployed or that the fictional brand, catalogue, locations, reviews, or enquiries represent a real business.

## Application completeness

The current application includes the public catalogue, five categories, product detail routes, search and filters, comparison, rule-based room recommendations, enquiry forms, moderated reviews, Store Finder, collections, offers, About, and educational guides. Project-owned development previews remain excluded from public navigation and search indexing.

## Database and RLS status

The application uses Supabase with the publishable key and public policies. Catalogue records and active stores are read through public access; public enquiry reads are blocked; reviews are publicly readable only after approval; review submission cannot self-approve. The application uses no service-role credential. Step 25 does not modify database data, policies, or migrations.

## Environment configuration

The project variables and Vercel guidance are documented in [Environment Configuration](ENVIRONMENT_CONFIGURATION.md) and [Vercel Deployment Checklist](VERCEL_DEPLOYMENT_CHECKLIST.md). `.env.local` is ignored and must remain untracked. There is no verified production domain yet.

## Error handling and not-found UX

The root route error boundary gives generic user-safe copy, retry, catalogue, and home actions; it does not render error details. The branded not-found view links to the catalogue and home. No global error page is added because a specific root-layout recovery gap has not been demonstrated; the root route error boundary covers page-segment failures.

## SEO and routes

The public route inventory is documented in [Production Route Inventory](PRODUCTION_ROUTE_INVENTORY.md). The sitemap currently describes 59 public entries and excludes comparison state and `/dev/` routes. `robots.txt` disallows `/dev/`; both development pages declare `noindex` and `nofollow`.

## Marketing assets

The 20 local SVG creatives, manifest, and creative guidelines are documented and checked by `npm run marketing-assets:check`. Assets are academic-demo artwork and have not been published or used for real advertising.

## Security posture

Baseline response headers include `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, and `X-Frame-Options`. No CSP or HSTS is configured. The code uses the public Supabase publishable key with RLS; no privileged key is required in the application. The secret audit checks tracked source patterns and ignores `.env.local` contents.

## Accessibility and responsive status

The app has semantic route headings, labelled forms, keyboard focus styling, image alternatives, and responsive layouts. Representative viewport and keyboard checks are recorded in the Step 25 verification; this is not a formal WCAG certification.

## Verification record

Verified locally against the optimized production build on 2026-09-29. `npm run lint`, `npm run build`, and `npm run production:check` passed. The database-backed read-only checks passed for `db:check`, catalogue, category, product, compare, recommendation, enquiry, review, store, public pages, SEO, SEO content, marketing, and marketing assets. The SEO content check completed without the earlier Node module-type warning. No database writes were performed.

The production server returned the expected baseline headers on the home and unknown routes. The unknown route returned HTTP 404 and the branded not-found content. The root, catalogue, one product detail, contact, store finder, and guide index were checked at 320, 375, 768, 1024, and 1440 CSS pixels: one H1 per page, no horizontal overflow, and no unlabeled visible form controls. Keyboard Tab reached the visible skip link. A browser contrast check caught and fixed a Tailwind cascade issue: the anchor base color now sits in the base layer, allowing white utility text to render on primary buttons. These checks are representative smoke and responsive checks, not an exhaustive device/browser matrix or a formal WCAG audit.

The public route smoke check also covered category, collections, offers, About, comparison, recommendations, contact, stores, guide details, sitemap, robots, and the 404 route. `npm run production:check` checks 72 literal internal links against known route patterns. This is a static route check, not an external-link checker.

## Known limitations

- The brand, product information, stores, reviews, and enquiries are fictional academic-demo content.
- There is no authentication or admin portal.
- Review moderation takes place in the Supabase Dashboard.
- There is no email delivery.
- There is no real payment or ecommerce checkout.
- There is no live analytics installed and no live conversion data.
- No real social or advertising campaign has launched.
- There is no verified production domain yet.
- Deployment to Vercel remains future work.

## Deployment prerequisites

Complete the human-reviewed [Vercel Deployment Checklist](VERCEL_DEPLOYMENT_CHECKLIST.md), configure only public Supabase values, set the canonical site URL after it is known, verify the deployed routes and headers, and recheck RLS. Do not deploy as part of Step 25.

## Analytics status

Provider-neutral event planning, privacy limits, and future conversion definitions are in [Analytics Event Plan](ANALYTICS_EVENT_PLAN.md). No analytics package, pixel, event sender, consent banner, or provider configuration is installed.

## Remaining project work

Step 25 is complete locally and is prepared for the approved commit and push. The Vercel deployment and real-domain checks remain human follow-up work; Step 26 has not started.
