# Production Readiness — Step 26

This document records production readiness for the fictional academic-demo platform. Deployment is verified at the URL below; the fictional brand, catalogue, locations, reviews, and enquiries do not represent a verified real business.

## Application completeness

The current application includes the public catalogue, five categories, product detail routes, search and filters, comparison, rule-based room recommendations, enquiry forms, moderated reviews, Store Finder, collections, offers, About, and educational guides. Project-owned development previews remain excluded from public navigation and search indexing.

## Database and RLS status

The application uses Supabase with the publishable key and public policies. Catalogue records and active stores are read through public access; public enquiry reads are blocked; reviews are publicly readable only after approval; review submission cannot self-approve. The application uses no service-role credential. Step 25 does not modify database data, policies, or migrations.

## Production deployment and environment configuration

The deployed production URL is <https://tiles-digital-platform.vercel.app> on Vercel, connected to GitHub repository `Nafeeza-25/tiles-digital-platform` and production branch `main`. The environment variable names are `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, and `NEXT_PUBLIC_SITE_URL`; Vercel system URL names used as fallbacks are `VERCEL_PROJECT_PRODUCTION_URL` and `VERCEL_URL`. Values are not recorded. `.env.local` is ignored and untracked. See [Environment Configuration](ENVIRONMENT_CONFIGURATION.md), [Vercel Deployment Checklist](VERCEL_DEPLOYMENT_CHECKLIST.md), and [Deployment Report](DEPLOYMENT_REPORT.md).

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

The production server returned the expected baseline headers on the home and unknown routes. The unknown route returned HTTP 404 and the branded not-found content. The home, catalogue, product, contact, store finder, and guide routes were checked at 320, 375, 768, 1024, and 1440 CSS pixels: one H1 per page, no horizontal overflow, and no unlabeled visible form controls. Keyboard Tab reached the visible skip link. Production live verification also checked route responses, metadata, sitemap, robots, Open Graph image, headers, dev-route indexing, first-party assets, and client bundles. Public Supabase/RLS reads passed. Forms were inspected but not submitted; no production records were written. These are representative smoke, responsive, and basic accessibility checks, not an exhaustive browser matrix or a formal WCAG audit. The read-only checks are repeatable with `npm run deployment:check`.

The public route smoke check also covered category, collections, offers, About, comparison, recommendations, contact, stores, guide details, sitemap, robots, and the 404 route. `npm run production:check` checks 72 literal internal links against known route patterns. This is a static route check, not an external-link checker.

## Known limitations

- The brand, product information, stores, reviews, and enquiries are fictional academic-demo content.
- There is no authentication or admin portal.
- Review moderation takes place in the Supabase Dashboard.
- There is no email delivery.
- There is no real payment or ecommerce checkout.
- There is no live analytics installed and no live conversion data.
- No real social or advertising campaign has launched.
- Accessibility verification is a representative manual check, not a formal WCAG certification.

## Deployment reference

The live deployment procedure and evidence are recorded in the completed [Vercel Deployment Checklist](VERCEL_DEPLOYMENT_CHECKLIST.md) and [Deployment Report](DEPLOYMENT_REPORT.md).

## Analytics status

Provider-neutral event planning, privacy limits, and future conversion definitions are in [Analytics Event Plan](ANALYTICS_EVENT_PLAN.md). No analytics package, pixel, event sender, consent banner, or provider configuration is installed.

## Remaining project work

Step 26 production deployment and verification are complete. Live analytics, real advertising/social campaigns, final report, diagrams package, PPT, and viva materials remain incomplete.
