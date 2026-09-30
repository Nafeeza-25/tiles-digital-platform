# Premium visual redesign QA

## Scope and source of truth

The visual source of truth is the eight supplied customer-facing reference screenshots: Home, Collections, Product detail, Quote, About, Offers, Contact and Catalogue. The supplied dashboard screenshot is excluded from this public frontend redesign.

Reference images are stored outside the repository in `C:/Users/Nafeeza/Downloads/ChatGPT Image Sep 29, 2026, 11_09_05 PM.png` through `C:/Users/Nafeeza/Downloads/ChatGPT Image Sep 29, 2026, 11_25_10 PM.png`. The implementation preserves live catalogue and demo data, so mock claims and dollar prices from the visual references were deliberately not copied.

## Comparative evidence

Desktop evidence uses a 1440 x 960 CSS-pixel viewport at DPR 1. Reference images were proportionally normalized from 1536 x 1024 to that viewport before side-by-side review.

| Surface | Comparison evidence |
| --- | --- |
| Home | `C:/Users/Nafeeza/.codex/visualizations/2026/09/29/01a0ed8a-c55f-76d1-a002-ce434fd1860a/home-comparison-final.png` |
| Catalogue | `C:/Users/Nafeeza/.codex/visualizations/2026/09/29/01a0ed8a-c55f-76d1-a002-ce434fd1860a/catalogue-comparison-final.png` |
| Collections | `C:/Users/Nafeeza/.codex/visualizations/2026/09/29/01a0ed8a-c55f-76d1-a002-ce434fd1860a/collections-comparison-final.png` |
| Product detail | `C:/Users/Nafeeza/.codex/visualizations/2026/09/29/01a0ed8a-c55f-76d1-a002-ce434fd1860a/product-comparison-final.png` |
| About | `C:/Users/Nafeeza/.codex/visualizations/2026/09/29/01a0ed8a-c55f-76d1-a002-ce434fd1860a/about-comparison-final.png` |
| Offers | `C:/Users/Nafeeza/.codex/visualizations/2026/09/29/01a0ed8a-c55f-76d1-a002-ce434fd1860a/offers-comparison-final.png` |
| Contact | `C:/Users/Nafeeza/.codex/visualizations/2026/09/29/01a0ed8a-c55f-76d1-a002-ce434fd1860a/contact-comparison-final.png` |

Focused checks: `home-typography-comparison.png` and `catalogue-cards-comparison.png` in the same evidence directory.

## Design review

- Typography: oversized editorial H1s, compact uppercase eyebrow text and high-contrast product names were checked against the reference hierarchy.
- Spacing and color: the shared navy header/footer, warm gold accent, cream content background, restrained borders and shadows were inspected across all public routes.
- Imagery: all rendered presentation images resolve from the supplied local WebP dataset; database image URLs remain intact as fallbacks.
- Copy: pricing, sale reductions, product specifications, store records and academic-demo disclosures come from existing project data. No mock claims, customer counts, delivery assertions or expiry language were added.

## Responsive and accessibility checks

All public routes were rendered at 320, 375, 768, 1024 and 1440 pixels. Each check recorded one H1, no horizontal page overflow and no failed presentation images. Evidence: `responsive-results-final.json`, `desktop-final-results.json` and `filter-layout-results.json` in the evidence directory.

Keyboard checks covered the skip link, mobile navigation, catalogue filter disclosure and product-gallery thumbnail controls. The focused control had a visible 2.4 px outline. Native labels, semantic section headings and descriptive image alternative text were reviewed. Token contrast checks passed: primary text on cream 16.57:1, muted text on cream 5.38:1, primary color on cream 5.20:1, and gold/navy 9.67:1.

## Findings resolved

| Priority | Finding | Resolution and evidence |
| --- | --- | --- |
| P1 | The first home hero was too tall, pushing the category section below the intended first viewport. | Reduced the shared hero height and padding; reviewed in `home-desktop-final.png`. |
| P1 | Store imagery was not mapped to the project’s actual three store slugs. | Mapped `timeless-tiles-central`, `timeless-tiles-design-studio` and `timeless-tiles-trade-centre`; reviewed in `contact-desktop-final.png` and store route checks. |
| P1 | A server-rendered open catalogue filter could make mobile users scroll through the full filter before products. | The native disclosure is closed in initial markup and opens automatically from 1024px; confirmed in `filter-layout-results.json`. |
| P1 | Product cards forced to wrapper height overlaid savings and recommendation-reason rows. | Removed the global `height: 100%` from `.product-card`; DOM checks confirm every savings/reason row begins below its card. |

## Result

**passed** — no P0, P1 or P2 issues remain after the final correction and route review.
