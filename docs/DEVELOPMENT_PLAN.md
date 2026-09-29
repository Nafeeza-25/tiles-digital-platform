# Development Plan

All phases below are planned. Future phases are intentionally not marked complete.

## Phase 1 - Foundation

- **Purpose:** Establish the maintainable technical base.
- **Major tasks:** Configure Next.js, TypeScript, Tailwind CSS, ESLint, project structure, environment safety, and Supabase helpers.
- **Expected completion criteria:** A clean scaffold, documented scope, and a passing lint/build checkpoint.

## Phase 2 - Database & Seed Data

- **Purpose:** Model the product and lead-generation data.
- **Major tasks:** Design the schema, access policies, migrations, and representative product seed data.
- **Expected completion criteria:** Reviewed database schema with secure Supabase configuration and usable seed data. The initial schema and fictional 40-product demo dataset are deployed, but this phase is not marked complete because future validation and ongoing data maintenance remain.

## Phase 3 - Design System & Layout

- **Purpose:** Establish visual consistency and responsive foundations.
- **Major tasks:** Define UI primitives, typography, navigation, footer, layout patterns, and responsive rules.
- **Expected completion criteria:** Reusable design system and shared layout components work across target breakpoints.

## Phase 4 - Catalogue & Product Pages

- **Purpose:** Make tile collections and product information explorable.
- **Major tasks:** Build catalogue, category, product detail, image, specification, price, and application views.
- **Expected completion criteria:** Seeded products display correctly through catalogue and detail journeys.

## Phase 5 - Search, Filters & Comparison

- **Purpose:** Help visitors narrow and evaluate tile options.
- **Major tasks:** Add search, size, colour, finish, material, price, and application filters plus comparison.
- **Expected completion criteria:** Search, all filters, and comparison return clear, accurate product results. Search, filters, and Tile Comparison are implemented for the public demo catalogue; room-wise recommendations remain planned.

## Phase 6 - Room-wise Recommendations

- **Purpose:** Guide visitors toward suitable products by room or use case.
- **Major tasks:** Define recommendation rules and build the room-wise discovery interface.
- **Expected completion criteria:** Recommendations are understandable, relevant, and linked to products. Implemented as a transparent room-tag and catalogue-preference filter, not AI or machine learning.

## Phase 7 - Enquiries, Quotes & WhatsApp

- **Purpose:** Convert visitor interest into actionable sales leads.
- **Major tasks:** Build quote, product-enquiry, and contact forms; validate inputs; store enquiries; add WhatsApp links.
- **Expected completion criteria:** Valid leads reach Supabase and users receive clear success or error feedback. Contact, quote, product-aware enquiry, and WhatsApp entry flows are implemented as fictional academic-demo submissions through the existing public INSERT-only RLS policy.

## Phase 8 - Reviews & Store Finder

- **Purpose:** Build trust and connect online visitors to local showrooms.
- **Major tasks:** Add moderated review submission, store details, finder interactions, and maps/directions integration.
- **Expected completion criteria:** Product review submission is implemented as a public INSERT-only, default-unapproved academic-demo flow. Manual moderation remains in the Supabase dashboard. Store Finder is implemented with active public records, URL-driven search, derived city filtering, factual contact links, and external directions links; it has no embedded map, Maps API, or geolocation tracking.

## Phase 9 - SEO & Content

- **Purpose:** Improve organic discoverability and useful product education.
- **Major tasks:** Prepare keyword strategy document (`docs/SEO_KEYWORD_STRATEGY.md`), metadata, semantic structure, sitemap, robots rules, structured data, and long-form educational tile guides (`/guides` + 5 guide routes).
- **Expected completion criteria:** Core pages and guides meet technical SEO standards, sitemap expanded to 59 URLs, and claim-safety guidelines enforced for "best tiles company" and "tiles near me" keywords. Technical SEO foundation and SEO Content layer are fully implemented; social media and paid campaign deliverables remain planned.

## Phase 10 - Digital Marketing Deliverables

- **Purpose:** Turn the platform into a campaign-ready marketing asset.
- **Major tasks:** Create social strategies, content ideas, banners, content calendar, Google Ads proposal, keywords, ad copy, and landing-page strategy.
- **Expected completion criteria:** A coherent, channel-specific marketing deliverable set is available.

## Phase 11 - Testing & Optimization

- **Purpose:** Verify quality, usability, and performance before release.
- **Major tasks:** Execute functional, responsive, accessibility, link, and performance checks; fix findings.
- **Expected completion criteria:** Applicable items in the testing checklist are validated and critical issues are resolved.

## Phase 12 - Deployment

- **Purpose:** Make the platform safely available online.
- **Major tasks:** Configure GitHub, Supabase production settings, Vercel, environment variables, and production verification.
- **Expected completion criteria:** A deployed public URL works with the required production configuration.

## Phase 13 - Academic Documentation & Presentation

- **Purpose:** Package the work as a complete academic submission and demonstration.
- **Major tasks:** Prepare report sections, diagrams, screenshots, test documentation, presentation, demo script, and viva materials.
- **Expected completion criteria:** All required academic deliverables are complete and aligned with the implemented platform.
## Visual foundation

The reusable visual design system, 40 local product renders, category visuals, hero visual, and primary-image database records are complete. Homepage, catalogue UI, product details UI, search, filters, and Tile Comparison are implemented; recommendations remain planned.

## Responsive site shell

Completed: responsive global layout, desktop navigation, mobile navigation, footer, breadcrumbs, route foundations, Product Details, Tile Comparison, Room Recommendations, lead-generation enquiry flows, moderated review submission, and Store Finder.

## Homepage

Completed: the server-rendered, data-driven homepage with hero, category discovery, featured products, real demo offers, audiences, journey, approved demo reviews, brand story, and final CTAs. Product Details, Search refinement, Advanced Filters refinement, Tile Comparison, Room-wise Recommendations, lead-generation enquiry flows, moderated review submission, and Store Finder are implemented.

## Catalogue

Completed: Product Catalogue, Product Search, Size/Colour/Finish/Material/Price/Application filters, sorting, pagination, responsive catalogue browsing, category catalogue pages, Product Details, specifications, pricing, application and suitable-space display, approved demo-review display, moderated review submission, product-detail navigation, Tile Comparison, Room-wise Recommendations, lead-generation enquiry flows, and Store Finder.

## Public content pages

Completed: `/collections` with transparent attribute-driven editorial collections (Featured, New Arrivals, Sale Selection, Outdoor Living, Wet Area Selection); `/offers` with genuine database sale-priced items and discount metrics; `/about` with academic demonstration disclosures, digital opportunity context, implemented feature highlights, audience descriptions, and customer journey presentation.

## Technical SEO foundation

Completed: Route metadata title template `%s | Timeless Tiles`, canonical URLs for all routes and filter/query variations, dynamic `sitemap.xml` for 40 products, 5 categories, and static pages, `robots.txt` rule configuration, Open Graph image generator (`/opengraph-image`), site URL abstraction helper (`NEXT_PUBLIC_SITE_URL`), and BreadcrumbList JSON-LD structured data.
