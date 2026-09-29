# Searchable Catalogue Design

## Intent

Build the production-quality `/tiles` catalogue for the 40-product demo dataset, providing URL-persisted search, filters, sorting, pagination, empty states, and accessible responsive browsing. This excludes category-specific catalogue pages, product details, comparison, recommendations, forms, authentication, and database changes.

## Data and Domain Architecture

`src/lib/queries/catalog.ts` retrieves active products with category and primary-image information using the typed Supabase server client only. `src/lib/catalog/catalog-filters.ts` separates query-param parsing, normalized search, filter application, effective-price calculations, sorting, option derivation, and pagination from rendering. It accepts repeated/missing/invalid URL values safely.

Each filter family applies OR semantics; search and different families combine with AND. Price uses valid sale price when present. Results are sorted deterministically and paginated at 12 items. Database-side filtering can replace the query boundary later without changing the page’s presentation contract.

## UI Architecture

The server-rendered catalogue page uses accessible GET forms and shared components for search, filters, toolbar, active summary, product grid, empty state, and pagination. Desktop presents a sidebar; narrow layouts expose native disclosure filters. All state remains represented in URLs and pagination preserves it.

`ProductCard` remains shared and accepts catalogue-specific CTA/href presentation while keeping current category-route behavior until actual product detail pages exist.

## Quality and Verification

Option lists derive from catalogue data in deterministic human-friendly order. Forms use labels/fieldsets/legends; pagination identifies the current page; sale/status information is textual as well as visual. The public-data validation script tests search, filters, AND/OR behavior, effective price, sorting, pagination, and zero results without database writes. Existing local SVG raw-image warnings are replaced with explicit Next Image use.

## Constraints

- Read-only Supabase use only: no migration, RLS, seed, or service-role change.
- No search services, sliders, heavy test frameworks, or new external dependencies.
- Do not claim unbuilt product details, category pages, comparison, recommendations, quote/contact forms, reviews submission, or store finder are complete.
