# Tile Category Catalogues Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the five tile-category placeholders with one reusable, category-constrained catalogue route.

**Architecture:** The shared site category configuration validates route slugs and supplies category presentation data. A reusable server-rendered catalogue experience receives either all active products or a category subset, preserving the existing pure filter domain and URL mechanics while supplying pathname-aware links. The dynamic App Router segment uses `notFound()` for unsupported slugs and statically generates only the five known paths.

**Tech Stack:** Next.js 16 App Router, TypeScript, Tailwind CSS, Supabase public reads, ESLint.

**Spec:** User-approved Step 13 category-catalogue brief (2026-09-29).

## Global Constraints

- Reuse the existing catalogue query, filter domain, and catalogue components; do not create a second filter engine.
- Read deployed Supabase data only; no migrations, content/RLS changes, service keys, or writes.
- Preserve all category URLs, query keys, effective-sale-price behavior, OR-within/AND-across filter behavior, and 12-item pagination.
- Invalid category slugs must call `notFound()`; product details, comparison, recommendations, forms, and other future features remain out of scope.
- Use local category SVGs with Next Image; do not add external assets or dependencies.
- Keep category Clear Filters and active-filter removal on the active category pathname.
- Finish with zero lint errors/warnings, all requested validations, documentation, commit `feat: build tile category catalogues`, and push to `origin/main`.

## Review Focus

- An invalid route such as `/tiles/not-a-real-category` returns a real 404 rather than an empty category page.
- A filter or search that matches another collection never appears in the fixed category subset.
- Repeated multi-value query parameters survive sort, pagination, and individual filter removal without changing pathname.
- A category with eight results omits inert pagination controls while retaining shared pagination support for future larger collections.
- The category artwork, heading, breadcrumb, and Clear Filters link remain understandable and usable at narrow widths.

---

### Task 1: Shared category configuration and catalogue composition

**Files:**
- Modify: `src/data/site.ts`
- Create: `src/lib/catalog/category-catalogue.ts`
- Create: `src/components/catalog/CatalogueExperience.tsx`
- Modify: `src/components/catalog/ActiveFilters.tsx`
- Modify: `src/components/catalog/CatalogPagination.tsx`
- Modify: `src/components/catalog/CatalogueFilters.tsx`

**Interfaces:**
- Consumes: `site.categories`, `CatalogProduct`, `CatalogState`, `SearchParams`, and the existing pure filter functions.
- Produces: `getTileCategory(slug)`, `getCategoryProducts(products, slug)`, and a pathname-aware `CatalogueExperience` reusable by all-catalogue and category pages.

- [ ] Add strongly typed category presentation data (slug, label, description, local artwork) beside the existing shared navigation configuration.
- [ ] Add pure category validation/subset helpers and exercise known/unknown category and isolation behavior through the public-data verification script.
- [ ] Move search, filters, result summary, active state, grid, empty state, and conditional pagination into `CatalogueExperience` with `basePath`, heading, and category context props.
- [ ] Make active filters, Clear Filters, and pagination accept `basePath`, retaining repeated params and resetting stale `page` values.
- [ ] Verify `/tiles` remains behaviorally unchanged with `npm run lint`.

### Task 2: Dynamic category route

**Files:**
- Create: `src/app/tiles/[categorySlug]/page.tsx`
- Delete: `src/app/tiles/floor-tiles/page.tsx`
- Delete: `src/app/tiles/wall-tiles/page.tsx`
- Delete: `src/app/tiles/bathroom-tiles/page.tsx`
- Delete: `src/app/tiles/kitchen-tiles/page.tsx`
- Delete: `src/app/tiles/outdoor-tiles/page.tsx`
- Modify: `src/app/tiles/page.tsx`

**Interfaces:**
- Consumes: centralized category data and `CatalogueExperience` from Task 1.
- Produces: one dynamic category page with static known params, category metadata, real 404 behavior, and category-specific catalogue data.

- [ ] Render the category intro using the local category SVG, a single h1, concise demo-safe description, breadcrumb, and View All Tiles link.
- [ ] Parse awaited route/search params, validate the slug with `notFound()`, subset active products by category, and render the shared experience under `/tiles/[categorySlug]`.
- [ ] Generate the five known path params from central config and generate metadata without query-value stuffing.
- [ ] Remove static placeholder pages only after the dynamic route covers their unchanged URLs.
- [ ] Verify direct category URLs and the invalid slug path in development and `npm run build`.

### Task 3: Public verification, documentation, and finish

**Files:**
- Create: `scripts/check-category-pages.mjs`
- Modify: `package.json`
- Modify: `README.md`
- Modify: `docs/DEVELOPMENT_PLAN.md`
- Modify: `docs/PROJECT_SCOPE.md`

**Interfaces:**
- Consumes: public Supabase reads and centralized expected category slugs.
- Produces: `npm run category:check` covering expected categories, eight-product isolation, search/filter behavior, option subsets, one-page pagination, effective sale pricing, and invalid slug recognition.

- [ ] Add the read-only category verification script and package command; run it against the deployed public data.
- [ ] Update scope documents to mark only the five category pages and category-specific catalogue browsing complete.
- [ ] Browser-check all category routes, representative query states, empty and invalid states, navigation, accessibility, and the five specified responsive widths.
- [ ] Run `npm run db:check`, `npm run db:check-catalogue`, `npm run catalog:check`, `npm run category:check`, `npm run lint`, and `npm run build`.
- [ ] Commit and push the completed work.
