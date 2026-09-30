# Premium Visual Redesign Implementation Plan

**Goal:** Apply the supplied premium navy, gold, cream, and architectural imagery direction to the existing Timeless Tiles frontend.

**Architecture:** Reuse the Next.js routes, Supabase queries, forms, URL state, SEO metadata, and existing components. Add local presentation-only asset mappings and shared hero/category components. Product data stays authoritative in Supabase.

**Tech stack:** Next.js 16.3.6, React, TypeScript, Tailwind 4, existing Lucide icons, supplied WebP assets.

**Spec:** The user's visual redesign brief and nine supplied screenshots in this chat. The dashboard reference is excluded by the explicit scope.

## Constraints and review focus

- Preserve all 40 product slugs, INR/sq.m pricing, actual positive sale-price reductions, RLS, queries, filtering/URL state, comparison, recommendations, forms, WhatsApp, approved reviews, stores, guides, and deployment/SEO behavior.
- Preserve the fictional academic-demo disclosure. Use only factual platform metrics: 40 products, 5 categories, 7 room types, 3 stores.
- Import supplied assets without modifying existing database image records. Keep existing SVG fallbacks.
- Avoid invented statistics, specifications, contact details, urgency, discounts, or testimonials. No admin dashboard.
- Check all requested widths: 320, 375, 768, 1024, 1440. One H1, labelled controls, visible keyboard focus, alternative text and usable contrast.
- Review focus: long names in compact cards; mobile header/menu and filter widths; gallery keyboard selection and image aspect ratios; form labels/payload preservation; stable canonical/query state after navigation.

## Tasks

- [x] Import and verify all 150 supplied WebP assets and 40 slug mappings; create read-only `visual:check`.
- [x] Apply global tokens, accessible buttons, dark header/footer, photographic hero and category navigation.
- [x] Redesign home, catalogue, categories, collections and genuine offers using existing data.
- [x] Add interactive product gallery, specification panel and room inspiration; use premium images in comparison/recommendations.
- [x] Redesign About, contact, store and guide presentations while retaining their data and content.
- [x] Inspect rendered pages against the references and requested viewports; record `design-qa.md` and resolve substantive findings.
- [x] Run the complete existing validation suite, checker tests, visual check, lint/build and diff review. Commit once with the exact requested message, push `origin/main`, and verify production.

The user explicitly requested implementation, validation, the exact commit, and push in this turn; execution is inline in the existing clean checkout. No intermediate implementation commits will be made.

## Completion decisions

- The supplied photos are presentation-only imagery. Existing database image rows and their SVG fallbacks remain authoritative for product identity.
- The existing blank price-bound parser treats blank values as zero. It was intentionally preserved because altering that established filtering behavior would exceed the visual-only scope; the cost is that a blank submitted bound can constrain a catalogue query.
