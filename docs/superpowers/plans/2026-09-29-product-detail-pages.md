# Product Detail Pages Implementation Plan

**Goal:** Build safe, data-driven product pages for every active Timeless Tiles product.

**Architecture:** A typed read-only product query resolves an active product only when its category matches the nested route. Reusable gallery and approved-review components render database content, while ProductCard receives canonical detail hrefs from catalogue and homepage consumers.

**Constraints:** Read-only Supabase public access; no schema/data/RLS changes; invalid category, product, mismatch, and inactive products 404; no comparison, recommendations, submissions, or forms.

### Tasks

- [ ] Add typed product query, gallery, reviews, stock/application/room display helpers, and product verification script.
- [ ] Add the validated nested dynamic route with metadata, pricing, specifications, CTAs, reviews, and same-category related products.
- [ ] Point all ProductCard uses at canonical product URLs; update documentation; browser-check, validate, commit, and push.
