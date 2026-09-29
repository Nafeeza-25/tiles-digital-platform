# Room Tile Recommendations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Provide transparent, URL-shareable tile discovery based strictly on real room-suitability tags and optional catalogue preferences.

**Architecture:** The server route obtains active products through the existing catalogue query. A pure domain module validates URL input, derives room-specific options, filters and deterministically orders products, and generates factual reasons; server-rendered UI components render room links, a compact GET form, and shared product cards.

**Tech Stack:** Next.js App Router, TypeScript, Supabase SSR public reads, Tailwind CSS, lucide-react.

**Spec:** User-approved Room-wise Tile Recommendation brief in this conversation.

## Global Constraints

- Recommendations are rule/tag-based catalogue filtering, never AI, ML, opaque scoring, personalization, or certification.
- A result must contain the exact selected `rooms[]` tag; optional preferences are hard filters.
- No local storage, migrations, database writes, credentials, forms, store finder, or review submission work.
- URLs support only the seven approved room values plus exact colour/finish/material and safe maximum effective price.

## Review Focus

- Invalid, repeated, and malformed query values fall back safely without widening a room match.
- Room-specific select options never expose values absent from that room's active products.
- An impossible combination renders an honest zero-result state without injecting unrelated products.
- Sale prices drive the maximum-price rule, while regular price remains available in shared card presentation.
- Factual reasons only appear when a source tag, finish, material, application, or slip value actually exists.

### Task 1: Pure recommendation domain

**Files:** Create `src/lib/recommendations/room-recommendations.ts`; use shared `roomLabels` and existing `CatalogProduct`.

- [ ] Parse valid room and optional preferences safely, derive room-specific values, filter hard matches, sort featured/new/name, and create supported factual reasons.
- [ ] Add check-script coverage for invalid rooms, exact room isolation, preferences, effective price, empty combinations, and reason sources.

### Task 2: Recommendation route and components

**Files:** Create `src/app/recommendations/page.tsx` and `src/components/recommendations/*`.

- [ ] Render all seven icon-labelled room links, an honest no-room state, compact GET preference form, transparent explanation, count/header, result/empty states, and shared `ProductCard` results.
- [ ] Preserve room while resetting preferences; room links intentionally omit old preferences.

### Task 3: Discoverability and documentation

**Files:** Modify `src/data/site.ts`, desktop/mobile navigation, footer, homepage journey area, README, scope and development documents; create checker and package script.

- [ ] Add centralized recommendation navigation in Tiles menus and footer plus a restrained homepage CTA.
- [ ] Document rule/tag matching and implemented preferences without marking forms or other deferred modules complete.

### Task 4: Validate and deliver

- [ ] Browser-check direct URLs, preference/reset/change-room behavior, comparison controls, responsive widths, and regression routes.
- [ ] Run all existing checks plus `recommendation:check`, lint, build, then commit `feat: add room tile recommendations` and push `origin/main`.
