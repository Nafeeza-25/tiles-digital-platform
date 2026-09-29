# Tile Comparison Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let visitors select up to three tiles and compare authoritative public catalogue data through a shareable URL.

**Architecture:** A client provider persists only validated product slugs in local storage and powers controls and the fixed tray. The `/compare` server page normalizes repeated query parameters and fetches canonical active records from Supabase in the requested order; client controls then keep the URL and persisted selection aligned.

**Tech Stack:** Next.js App Router, TypeScript, React, Supabase SSR, Tailwind CSS, lucide-react.

**Spec:** User-approved Tile Comparison brief in this conversation.

## Global Constraints

- Do not create migrations, tables, authentication, recommendations, or enquiry forms.
- Store only stable product slugs under `timeless-tiles-compare`; limit selection to three.
- Use repeated `product` query parameters, tolerate malformed input, and fetch active public data server-side.
- Keep comparison actions semantic and accessible; never put credentials in client code.

## Review Focus

- Duplicate, blank, unknown, and over-limit URL slugs must neither throw nor fetch invalid product columns.
- A single selected tile must retain a useful disabled comparison state rather than a dead link.
- Local storage must be guarded for server rendering and malformed stored JSON.
- Removal and clear actions must update both persisted state and compare URL.
- Missing product values must render as a neutral em dash, not an error or invented value.

### Task 1: Comparison data boundary

**Files:** Create `src/lib/queries/compare.ts`, `src/lib/catalog/product-labels.ts`; modify product detail to use shared labels.

- [ ] Normalize up to three unique non-empty slug strings and query active products with category and primary local image data.
- [ ] Preserve requested order and expose shared labels for applications, rooms, and stock states.
- [ ] Verify malformed and duplicate inputs are safe through the comparison check script.

### Task 2: Persisted selection controls

**Files:** Create `src/components/compare/*`; modify root layout and product cards/detail actions.

- [ ] Add a client provider/hook guarded around local storage, with add/remove/clear and max-selection feedback.
- [ ] Add semantic compare toggles, a responsive fixed tray, and provider wrapping without turning the root layout into a client component.
- [ ] Place toggles on catalogue/category cards and product details; add a restrained footer comparison entry.

### Task 3: Shareable comparison route

**Files:** Create `src/app/compare/page.tsx` and comparison result/action components.

- [ ] Read `searchParams` asynchronously in the server page and fetch canonical requested products.
- [ ] Render empty, one-product, and multi-product states with images, prices, specifications, stock, and detail links.
- [ ] Synchronize valid URL selections to client state and keep removal/clear URLs canonical.

### Task 4: Verification and documentation

**Files:** Create `scripts/check-comparison.mjs`; modify `package.json`, `README.md`, `docs/DEVELOPMENT_PLAN.md`, `docs/PROJECT_SCOPE.md`.

- [ ] Check public data, URL normalization assumptions, and image URL safety with `npm run compare:check`.
- [ ] Document comparison as implemented without marking recommendations or forms complete.
- [ ] Run project validation, inspect browser flows and target widths, commit `feat: add tile comparison`, and push `origin/main`.
