# Tiles Digital Platform

An academic and practical project exploring the digital transformation and marketing strategy for a tiles company.

## Tech stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- ESLint
- Supabase (public demo catalogue backend and database)
- Vercel (production deployment)

## Production

The academic demonstration is deployed at <https://tiles-digital-platform.vercel.app>. Vercel builds the `main` branch from GitHub using `npm install` and `npm run build`. Live verification is documented in [Deployment Report](docs/DEPLOYMENT_REPORT.md); rerun the read-only check with `npm run deployment:check`.

The production site uses Supabase public client configuration with row-level security. It contains fictional academic-demo content; it has no authentication, real payments, email delivery, or live analytics. Do not submit production forms during verification.

## Development setup

1. Install dependencies with `npm install`.
2. Create `.env.local` in the repository root:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=<project URL>
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<publishable key>
   ```

   Both values are available from your Supabase project's **Connect** or **API Keys** interface.
   Never commit `.env.local`. Never use a Supabase secret key or `service_role` key in browser code; the publishable key is the correct client-side project key.

3. Start the development server with `npm run dev`.
4. Visit `http://localhost:3000`.

## Implemented comparison

Tile Comparison is implemented for the fictional demo catalogue. Visitors can select up to three tiles, keep the selection locally in their browser, and share a `/compare?product=<slug>&product=<slug>` URL that resolves current public catalogue data.

Run `npm run compare:check` to verify that active products expose safe primary local image data for comparison.

## Implemented room recommendations

Room Recommendations use only the fictional catalogue's room-suitability tags and optional exact colour, finish, material, and maximum effective-price filters. The resulting `/recommendations` URLs are shareable. This is a transparent rule/tag-based system, not trained machine learning or AI.

## Implemented lead generation

`/contact` now supports contact, quote, and product-aware enquiry URLs. Forms are validated with Zod and react-hook-form, then use the existing Supabase public INSERT policy for fictional academic-demo enquiries. Public enquiry records remain unreadable. WhatsApp links use existing safe demo-store data when available; no real business contact details are invented.

## Implemented review submission

Every active product detail page includes a product-aware review form. It validates name, whole-star rating, optional title, and comment with Zod and react-hook-form, then submits only the public review fields through Supabase. Reviews are fictional academic-demo submissions, default to unapproved under the existing RLS policy, and never appear publicly until manually moderated in the Supabase dashboard. Public reads continue to return approved reviews only; no review moderation dashboard is implemented here. Run `npm run review:check` to verify the public safety boundary without creating a row.

## Implemented Store Finder

`/stores` reads the existing active fictional Timeless Tiles demo-store records through the Supabase public read policy. It has shareable `q` search and a city filter derived only from active records, plus factual phone, email, WhatsApp, opening-hours, and external directions links when the stored field supports them. It does not use geolocation tracking, an embedded map, or an external Maps API. Run `npm run store:check` for the read-only Store Finder and policy verification.

## Implemented public content pages

`/collections`, `/offers`, and `/about` are fully implemented with data-driven catalogue integration:
- `/collections`: Renders five transparent, attribute-based editorial groupings (Featured, New Arrivals, Sale Selection, Outdoor Living, Wet Area Selection) with live product preview cards and direct catalogue links.
- `/offers`: Displays genuine sale-priced items (`sale_price < price`) with calculated savings amounts, discount percentages, and clear academic-demo disclosures without artificial countdowns.
- `/about`: Presents the academic-demo project context, digital opportunity, implemented capabilities, four target audience overviews, and four-step customer journey.
Run `npm run public-pages:check` to verify data-driven collections, offer calculations, and security protections.

## Implemented Technical SEO foundation

Technical SEO infrastructure is implemented across all public routes:
- **Title template & metadata:** Root layout defines `%s | Timeless Tiles` template, default fallback title, metadataBase, Open Graph, and Twitter card defaults.
- **Site URL abstraction:** Resolves production domain safely via `NEXT_PUBLIC_SITE_URL`, `VERCEL_PROJECT_PRODUCTION_URL`, `VERCEL_URL`, or `http://localhost:3000` fallback (`src/lib/seo/site-url.ts`).
- **Canonical URL strategy:** Every page exports explicit canonical metadata. Filter/search/pagination variants canonicalize to stable base routes (`/tiles`, `/tiles/[categorySlug]`, `/recommendations`, `/stores`, `/contact`, `/compare`).
- **Dynamic XML Sitemap:** `/sitemap.xml` generates stable URLs covering the homepage, catalogue, 5 category pages, 40 active products, collections, offers, about, recommendations, contact, and stores while excluding query parameters, inactive products, and `/dev/visual-check`.
- **Robots.txt:** `/robots.txt` points to `/sitemap.xml`, permits search engine crawling of public pages, and disallows `/dev/`.
- **Open Graph Image:** `/opengraph-image` generates branded social card previews dynamically via Next.js `ImageResponse`.
- **Breadcrumb JSON-LD:** Structured `BreadcrumbList` schema rendered via `<JsonLd>` helper. Commercial schemas (LocalBusiness, AggregateRating, Product offer schema) are intentionally omitted for academic demo compliance.
Run `npm run seo:check` to verify canonical URLs, site URL abstraction, sitemap datasets, and structured data safety.

## Implemented SEO Content & Keyword Strategy

Educational long-form tile guide system and keyword mapping are implemented:
- **Guide architecture & route:** `/guides` and 5 detailed guide routes (`/guides/[slug]`) covering bathroom tiles, floor tile specifications, room suitabilities, nearby store criteria, and tile company evaluation.
- **Keyword mapping & strategy:** Documented in [`docs/SEO_KEYWORD_STRATEGY.md`](docs/SEO_KEYWORD_STRATEGY.md) without fabricated keyword metrics.
- **Internal linking network:** Contextual cross-links connect guides, catalogue categories, recommendations, Store Finder, and quote enquiries.
- **Claim safety compliance:** Addressed phrases like "best tiles company" and "tiles near me" strictly informationally without making unsupported superiority or physical retail claims.
Run `npm run seo-content:check` to verify guide structure, slug uniqueness, claim-safety, and sitemap URL expansion (59 URLs).

## Digital marketing deliverables

Step 23 documentation is complete as a proposed academic campaign plan. It includes channel strategies for Instagram, Facebook, and YouTube; short-form concepts; a proposed Google Ads structure and sample copy; a four-week calendar; social copy; integrated campaigns; funnel and destination mapping; and a KPI framework. All campaigns remain fictional examples: no accounts, ads, analytics, or tracking have been created, and no results are claimed.

- [Digital marketing strategy](docs/DIGITAL_MARKETING_STRATEGY.md)
- [Google Ads proposal](docs/GOOGLE_ADS_PLAN.md)
- [Four-week content calendar](docs/CONTENT_CALENDAR.md)
- [Social content library](docs/SOCIAL_CONTENT_LIBRARY.md)
- [Marketing measurement plan](docs/MARKETING_MEASUREMENT_PLAN.md)

Run `npm run marketing:check` to check required deliverables, planned calendar coverage, claim/data safeguards, and implemented destination routes. This is a documentation check; it does not launch campaigns or add tracking.

### Marketing creative asset pack — Step 24

The local asset pack contains 20 original, brand-aligned SVG creatives: six Instagram squares, four Stories/Reels/Shorts, three Facebook link graphics, four YouTube thumbnails, and three campaign banners. The manifest records each asset's dimensions, intended channel, message, CTA, destination, accessibility text, and source data. Review the responsive, noindex preview at `/dev/marketing-preview` while the local app is running.

- [Asset manifest](public/marketing/manifest.json)
- [Manifest documentation](docs/MARKETING_ASSET_MANIFEST.md)
- [Creative guidelines](docs/MARKETING_CREATIVE_GUIDELINES.md)

Run `npm run marketing-assets:check` to validate files, metadata, verified demo sale data, routes, and preview indexing safeguards. The assets are fictional academic-demo creatives; social publication, paid campaign launch, analytics/tracking, and campaign results remain planned.

## Production preparation — Step 25

Production-readiness preparation is documented without deploying the app or installing analytics. It includes public environment-variable setup, a route inventory, baseline response headers, branded error and not-found states, credential and public-route audits, provider-neutral analytics planning, and a Vercel deployment checklist.

- [Environment configuration](docs/ENVIRONMENT_CONFIGURATION.md)
- [Production route inventory](docs/PRODUCTION_ROUTE_INVENTORY.md)
- [Analytics event plan](docs/ANALYTICS_EVENT_PLAN.md)
- [Vercel deployment checklist](docs/VERCEL_DEPLOYMENT_CHECKLIST.md)
- [Production readiness record](docs/PRODUCTION_READINESS.md)

Run `npm run production:check` for read-only production preparation checks. Vercel deployment, a verified production URL, and live analytics remain future work.

## Remaining project work

The core demo platform, its local creative assets, and production-readiness preparation are implemented. These items remain future work:

- Actual social account creation and publication
- Live paid advertising or campaign measurement
- Tracking integration or live analytics
- Vercel deployment and production-domain verification
- Final project report, diagrams package, presentation, and viva materials

## Project documentation

The following documents define project scope and testing. Marketing strategy files are academic proposals and do not indicate live campaigns or measured outcomes.

- [Project scope](docs/PROJECT_SCOPE.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Development plan](docs/DEVELOPMENT_PLAN.md)
- [Testing checklist](docs/TESTING_CHECKLIST.md)

## Environment variables

Private environment files are ignored by Git. Keep real credentials only in `.env.local`; `.env.example` contains safe placeholders for the expected variables. Supabase validation runs only when a Supabase client is created, so the homepage can run before `.env.local` is populated.

## Supabase schema

The initial schema and fictional Timeless Tiles demo catalogue are deployed to the linked Supabase project. The database includes 5 categories, 40 products, 3 demo stores, moderated demo reviews, and one local SVG product image per active product. TypeScript database types in `src/types/database.types.ts` are generated from the deployed schema.

Deployed migration files are immutable. Make future schema changes through new timestamped files in `supabase/migrations/`, never by editing an already deployed migration.

Run the read-only public database access check with `npm run db:check`. It confirms public catalogue reads and verifies that enquiries are not publicly readable.

Run `npm run db:check-catalogue` to verify the deployed demo catalogue counts, public review moderation, filter-data diversity, and enquiry read protection. See [Catalogue dataset](docs/CATALOG_DATASET.md) for the fictional content and demo pricing convention.
# Timeless Tiles Digital Platform

## Visual foundation

The project now includes a reusable local design system, Timeless Tiles brand SVG assets, five category visuals, a hero composition, and 40 original deterministic local demo product renders. Each active product has one deployed primary `product_images` record pointing to its local SVG. Product details and Tile Comparison are implemented; room-wise recommendations remain planned.

## Responsive shell

The responsive global layout, desktop and mobile navigation, footer, breadcrumbs, and route foundations are implemented. Product details, Tile Comparison, Room Recommendations, lead-generation enquiry flows, moderated review submission, and Store Finder are implemented.

## Homepage

The homepage now uses read-only deployed demo data for featured products, actual demo offers, and approved reviews. It includes local visual assets, category links, audience and journey sections, and quote/catalogue CTAs. Product details, Tile Comparison, Room Recommendations, lead-generation enquiry flows, moderated review submission, and Store Finder are implemented.

## Catalogue

The `/tiles` catalogue, category pages, and product detail pages use deployed read-only catalogue data with URL-driven search, multi-value filters, effective-price filtering, specifications, approved demo reviews, related collection products, empty states, and a moderated public review-submission form. Tile Comparison, room recommendations, lead-generation forms, and Store Finder are implemented.

