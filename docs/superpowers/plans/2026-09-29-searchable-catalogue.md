# Searchable Catalogue Implementation Plan

**Goal:** Build an accessible, URL-driven `/tiles` catalogue for deployed demo products.

**Architecture:** A typed read-only query boundary retrieves active product records; pure domain utilities parse URL state, derive options, filter, sort, and paginate. Server-rendered GET forms compose the responsive catalogue while preserving shareable URLs.

**Spec:** `docs/superpowers/specs/2026-09-29-searchable-catalogue-design.md`

### Task 1: Catalogue data and domain

- [ ] Add active catalogue query and typed product shape.
- [ ] Add pure URL parsing, search/filter/sort/pagination and option derivation.
- [ ] Add public-data verification script and package command.

### Task 2: Catalogue presentation

- [ ] Refine shared ProductCard with configurable collection CTA.
- [ ] Build search, responsive filters, toolbar, active filters, grid, empty state, and pagination.
- [ ] Replace `/tiles` placeholder with metadata-bearing server page.

### Task 3: Finish

- [ ] Clean local SVG image warnings with explicit Next Image usage.
- [ ] Browser-check URL states, document scope, run all validation, commit, and push.
