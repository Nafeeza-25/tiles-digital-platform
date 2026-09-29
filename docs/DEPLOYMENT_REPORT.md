# Step 26 — Production Deployment Report

- **Verification date:** 2026-09-29
- **Production URL:** <https://tiles-digital-platform.vercel.app>
- **Platform:** Vercel
- **Source repository:** <https://github.com/Nafeeza-25/tiles-digital-platform>
- **Production branch:** `main`
- **Deployed source commit before this report:** `750e5b2` — `fix: add route-specific Open Graph URLs`

## Application and services

- **Framework:** Next.js 16.3.6 App Router, TypeScript, Tailwind CSS; Node.js 20.9 or newer is required by the installed Next.js version.
- **Database/backend:** Supabase hosted Postgres, accessed by the application with the public publishable key and existing row-level security (RLS) policies.
- **Production environment variable names:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `NEXT_PUBLIC_SITE_URL`, `VERCEL_PROJECT_PRODUCTION_URL`, and `VERCEL_URL`. The last two are Vercel system URL variables. No values are included in this report.

## Deployment procedure

Vercel is connected to the GitHub repository and deploys the `main` production branch when commits are pushed. The configured install command is `npm install`, the build command is `npm run build`, and the default Next.js output is used. No Vercel CLI deployment was run. The production fix commit `750e5b2` was pushed before this documentation commit and verified on the live URL.

## Production verification

The read-only `npm run deployment:check` completed successfully against the production URL after commit `750e5b2` deployed. It checks representative public routes and query variants, page content and headings, production canonicals and route-specific Open Graph URLs, sitemap membership and count, robots rules, the Open Graph image, response headers, branded 404 behavior, development-route indexing, local marketing assets, and obvious private-secret markers in HTML and first-party client JavaScript. It uses GET requests only.

The sitemap is <https://tiles-digital-platform.vercel.app/sitemap.xml> and contains 59 URLs: 40 product routes, 5 category routes, 5 guide detail routes, and 9 other public routes. The robots file is <https://tiles-digital-platform.vercel.app/robots.txt>. The Open Graph image is <https://tiles-digital-platform.vercel.app/opengraph-image> and returns a 1200×630 PNG. Canonical and route-specific Open Graph URLs use the production origin, including for query variants.

The production response includes `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`, and `X-Frame-Options: SAMEORIGIN`. Public Supabase catalogue, product image, approved review, and active-store reads passed. Public enquiry reads are denied; unapproved reviews are not publicly visible. The checks performed no database writes.

Representative production responsive checks covered the homepage, catalogue, product detail, contact, stores, and guides at 320, 375, 768, 1024, and 1440 CSS pixels. Checked pages had one H1, no horizontal overflow, and no unlabeled visible form controls. Keyboard navigation reached the skip link and mobile navigation worked. This is basic accessibility QA, not a formal WCAG audit or exhaustive browser/device certification.

## Known limitations

This is a fictional academic demonstration. Product, store, review, offer, and brand content does not represent a verified business. There is no authentication/admin portal, real payment or checkout, email delivery, live analytics, real campaign, or campaign performance data. Forms were inspected but not submitted during production verification. Review moderation is manual in the Supabase Dashboard. The site has no formal accessibility certification.
