# Tiles Digital Platform

An academic and practical project exploring the digital transformation and marketing strategy for a tiles company.

## Tech stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- ESLint
- Supabase (public demo catalogue backend and database)
- Vercel (planned deployment platform)

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

Room Recommendations use only the fictional catalogue's room-suitability tags and optional exact colour, finish, material, and maximum effective-price filters. The resulting `/recommendations` URLs are shareable. This is a transparent rule/tag-based system, not trained machine learning or AI. Store finder remains planned.

## Implemented lead generation

`/contact` now supports contact, quote, and product-aware enquiry URLs. Forms are validated with Zod and react-hook-form, then use the existing Supabase public INSERT policy for fictional academic-demo enquiries. Public enquiry records remain unreadable. WhatsApp links use existing safe demo-store data when available; no real business contact details are invented.

## Implemented review submission

Every active product detail page includes a product-aware review form. It validates name, whole-star rating, optional title, and comment with Zod and react-hook-form, then submits only the public review fields through Supabase. Reviews are fictional academic-demo submissions, default to unapproved under the existing RLS policy, and never appear publicly until manually moderated in the Supabase dashboard. Public reads continue to return approved reviews only; no review moderation dashboard or store finder UI is implemented here. Run `npm run review:check` to verify the public safety boundary without creating a row.

## Planned modules

The following modules are planned and are **not all implemented yet**:

- Homepage
- Tile product catalogue
- Floor tiles
- Wall tiles
- Bathroom tiles
- Kitchen tiles
- Outdoor tiles
- Advanced product filters
- Product search
- Product details
- Room-wise recommendations
- Customer review submission and approved review display
- Store finder
- Contact/enquiry system
- SEO
- Digital marketing content

## Project documentation

The following documents define the planned work and testing scope. They are planning materials; they do not indicate that future modules are implemented.

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

The responsive global layout, desktop and mobile navigation, footer, breadcrumbs, and route foundations are implemented. Product details, Tile Comparison, Room Recommendations, lead-generation enquiry flows, and moderated review submission are implemented; store finder remains future work.

## Homepage

The homepage now uses read-only deployed demo data for featured products, actual demo offers, and approved reviews. It includes local visual assets, category links, audience and journey sections, and quote/catalogue CTAs. Product details and Tile Comparison are implemented; recommendations and forms are still planned.

## Catalogue

The `/tiles` catalogue, category pages, and product detail pages use deployed read-only catalogue data with URL-driven search, multi-value filters, effective-price filtering, specifications, approved demo reviews, related collection products, empty states, and a moderated public review-submission form. Tile Comparison, room recommendations, and lead-generation forms are implemented.

