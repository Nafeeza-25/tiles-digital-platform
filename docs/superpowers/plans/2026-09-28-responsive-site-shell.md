# Responsive Site Shell Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build an accessible, responsive Timeless Tiles global shell and honest route foundations.

**Architecture:** Centralize navigation in `src/data/site.ts`; use server components for structure and a focused client component for mobile-menu state. Reusable placeholder content and breadcrumbs keep route foundations consistent, while a navigation-excluded visual-check route renders local assets.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS, lucide-react.

**Spec:** `docs/superpowers/specs/2026-09-28-responsive-site-shell-design.md`

## Global Constraints

- Preserve all approved URLs, labels, semantics, keyboard requirements, and no-feature-expansion boundaries.
- Use original local assets and no remote fonts, secrets, invented contact details, or external menu libraries.
- Keep placeholders honest; do not mark future modules complete.

## Review Focus

- Keyboard users can open, navigate, and leave both menu variants.
- Active states group all `/tiles` descendants under Tiles.
- The shell avoids overflow at 320px through 1440px.
- Every visible navigation target resolves to a route.
- Visual check remains unlinked from customer navigation.

### Task 1: Shared shell primitives and configuration

**Files:** Create `src/data/site.ts`, `src/components/layout/{Header,DesktopNavigation,MobileNavigation,Footer,Breadcrumbs}.tsx`; modify `src/app/layout.tsx`.

- [ ] Write a failing configuration/layout contract test.
- [ ] Implement typed site data, semantic header/footer/breadcrumbs, route-aware desktop dropdown, client mobile menu, skip link, and metadata.
- [ ] Run the contract test, lint, and build.

### Task 2: Route foundations and visual check

**Files:** Create homepage shell, all approved route pages, shared placeholder helper if warranted, and `src/app/dev/visual-check/page.tsx`.

- [ ] Write failing route-presence/asset-reference test.
- [ ] Implement lightweight metadata-bearing placeholders and navigation-excluded visual grid.
- [ ] Run route test, lint, and build.

### Task 3: Documentation and validation

**Files:** Modify `docs/DEVELOPMENT_PLAN.md`, `docs/PROJECT_SCOPE.md`, `README.md`.

- [ ] Document only the completed global-shell foundations.
- [ ] Run database checks, lint, build, browser responsive checks, diff/status, then commit and push.
