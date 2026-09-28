# Tiles Digital Platform

An academic and practical project exploring the digital transformation and marketing strategy for a tiles company.

## Tech stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- ESLint
- Supabase (planned backend and database)
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
- Tile comparison
- Room-wise recommendations
- Get a Quote
- WhatsApp enquiry
- Customer reviews
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

The initial schema and fictional Timeless Tiles demo catalogue are deployed to the linked Supabase project. The database includes 5 categories, 40 products, 3 demo stores, and moderated demo reviews. Product image assets have not been added, and the website catalogue UI is not implemented yet. TypeScript database types in `src/types/database.types.ts` are generated from the deployed schema.

Deployed migration files are immutable. Make future schema changes through new timestamped files in `supabase/migrations/`, never by editing an already deployed migration.

Run the read-only public database access check with `npm run db:check`. It confirms public catalogue reads and verifies that enquiries are not publicly readable.

Run `npm run db:check-catalogue` to verify the deployed demo catalogue counts, public review moderation, filter-data diversity, and enquiry read protection. See [Catalogue dataset](docs/CATALOG_DATASET.md) for the fictional content and demo pricing convention.
# Timeless Tiles Digital Platform

## Visual foundation

The project now includes a reusable local design system, Timeless Tiles brand SVG assets, five category visuals, a hero composition, and 40 original deterministic local demo product renders. Each active product has one deployed primary `product_images` record pointing to its local SVG. Homepage, catalogue UI, product details, search, filters, comparison, and room recommendations are planned and not implemented yet.

