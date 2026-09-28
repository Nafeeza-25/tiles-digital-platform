# Brand and Product Visuals Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the Timeless Tiles design foundation, original deterministic local artwork, and one deployed primary image record for each seeded product.

**Architecture:** CSS custom properties establish a Tailwind-compatible visual language, while small typed React primitives consume those tokens. A standalone Node generator reads the public catalogue and deterministically writes safe SVG product renders. A new immutable migration maps every active product to its local primary render.

**Tech Stack:** Next.js 16 App Router, TypeScript, Tailwind CSS 4, Node.js ESM, Supabase JS/CLI, PostgreSQL migrations.

**Spec:** `docs/superpowers/specs/2026-09-28-brand-and-product-visuals-design.md`

## Global Constraints

- Use the exact agreed core palette, permitting only justified accessibility adjustments.
- Preserve the specified `public/images/brand`, `categories`, `banners`, and product asset paths.
- Keep all generated SVGs local, original, deterministic, script-free, URL-free, tracking-free, and `foreignObject`-free.
- Use `assets:generate` exactly as `node --env-file=.env.local scripts/generate-product-renders.mjs`.
- Support White, Ivory, Beige, Grey, Charcoal, Black, Brown, Blue, Green, Terracotta, and Rose product colours.
- Do not implement homepage, catalogue, product details, search, filters, comparison, or recommendations UI.
- Do not modify deployed migrations; add a timestamped migration for image rows only.

## Review Focus

- Missing environment variables: generator must fail safely without leaking values.
- Duplicate or incomplete database rows: validation must reject non-one-to-one primary images.
- Repeated runs: deterministic generator must produce the same asset content and exact product asset set.
- Unsafe SVG data: generated output must contain no executable or remote-resource constructs.
- Asset/data mismatch: every local primary image path must point to an existing product SVG.

---

### Task 1: Token layer, primitives, and static brand artwork

**Files:**
- Modify: `src/app/globals.css`, `package.json`
- Create: `src/components/ui/button.tsx`, `container.tsx`, `section-heading.tsx`, `badge.tsx`
- Create: `public/images/brand/timeless-tiles-mark.svg`, `timeless-tiles-wordmark.svg`
- Create: `public/images/categories/{floor-tiles,wall-tiles,bathroom-tiles,kitchen-tiles,outdoor-tiles}.svg`
- Create: `public/images/banners/hero-tile-composition.svg`

**Interfaces:** Produces token classes and typed UI component exports for future pages; produces static local SVG asset paths for future image use.

- [ ] Add a temporary token/primitives typecheck fixture and run it to observe missing component imports.
- [ ] Implement the agreed tokens, accessible global behavior, typed primitives, package asset script, and safe original static SVG artwork.
- [ ] Run `npm run lint` and `npm run build`; inspect SVG markup for prohibited constructs.
- [ ] Commit the completed task.

### Task 2: Deterministic product render generator

**Files:**
- Create: `scripts/generate-product-renders.mjs`
- Create: `public/images/products/<40 active slugs>.svg` via generator

**Interfaces:** Consumes public Supabase product/category data and environment variables; produces one deterministic safe 1200×1200 SVG per active product.

- [ ] Add a generator verification mode/fixture that fails before implementation for missing/duplicate slugs, unsafe SVG markup, and unsupported output count.
- [ ] Implement slug-seeded PRNG, catalogue colour palette mapping, material/finish render strategies, SVG escaping, and exact set validation.
- [ ] Run `npm run assets:generate` twice and compare output hashes; check exactly 40 product SVGs and manually inspect the requested eight visual families.
- [ ] Commit the completed task.

### Task 3: Deploy product-image data and strengthen verification

**Files:**
- Create: `supabase/migrations/<timestamp>_seed_product_images.sql`
- Modify: `scripts/check-catalogue-data.mjs`

**Interfaces:** Consumes the active product slug list and emitted local SVG paths; produces 40 public `product_images` records with one primary image per active product.

- [ ] Create the migration with the Supabase CLI, then write a validation check that fails against the current zero-image state.
- [ ] Implement slug-based image inserts and expanded public/image-file assertions.
- [ ] Confirm the migration is the sole pending migration, deploy it, and run synchronized migration list, `npm run db:check`, `npm run db:check-catalogue`, and database lint.
- [ ] Commit the completed task.

### Task 4: Document completed foundations and final verification

**Files:**
- Create: `docs/DESIGN_SYSTEM.md`
- Modify: `docs/CATALOG_DATASET.md`, `docs/DEVELOPMENT_PLAN.md`, `docs/PROJECT_SCOPE.md`, `README.md`

**Interfaces:** Documents the completed local asset/data foundation while preserving the not-yet-implemented application UI scope.

- [ ] Write documentation assertions/review checklist for required asset/data statements and prohibited future-UI completion claims.
- [ ] Document brand system, original demo artwork provenance, local assets, deployed rows, and remaining UI work.
- [ ] Run all required asset/database/application verification commands, review `git diff`, and check `.env.local` remains untracked.
- [ ] Commit and push the final verified work to `origin/main`.
