# Data-Driven Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the responsive, data-driven Timeless Tiles homepage using read-only deployed demo data.

**Architecture:** Typed server queries independently load featured products, offers, and approved reviews. Reusable server components compose the homepage, while a `ProductCard` and price formatter establish catalogue-ready presentation without creating catalogue routes.

**Tech Stack:** Next.js App Router, TypeScript, Supabase SSR, Tailwind CSS, lucide-react, Next Image.

**Spec:** `docs/superpowers/specs/2026-09-29-data-driven-homepage-design.md`

### Task 1: Data and shared presentation

- [ ] Implement typed, read-only independent homepage queries and `formatPrice`.
- [ ] Implement reusable `ProductCard` with actual category/image/price data and category-route links.
- [ ] Verify failure-safe query return values and local SVG support.

### Task 2: Homepage sections

- [ ] Implement focused Hero, Categories, Featured, Offers, Audience, Journey, Reviews, Brand Story, and Final CTA components.
- [ ] Compose them in a server-rendered homepage with accurate metadata and graceful empty states.
- [ ] Replace raw SVG `<img>` elements in the visual check with Next Image.

### Task 3: Quality, documentation, and delivery

- [ ] Browser-check the homepage and linked foundations across target responsive breakpoints.
- [ ] Document homepage completion without overclaiming later modules.
- [ ] Run database checks, lint, build, commit, and push.
