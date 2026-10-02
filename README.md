# Timeless Tiles Digital Platform

> **Fictional Academic Demo Disclosure:**
> Timeless Tiles is a fictional academic demonstration platform created strictly for educational evaluation and project demonstration. All products, prices (expressed in INR ₹/sq.m.), customer reviews, showroom addresses, phone numbers, and marketing campaign proposals represent fictional academic-demo records. The platform does not represent a real commercial entity, does not process real payments, does not publish real digital ads, and does not conduct commercial transactions.

---

## Project Overview

An end-to-end digital transformation platform and multi-channel marketing strategy for a contemporary tiles company. The system provides a high-performance visual product catalogue, dynamic search and multi-criteria attribute filtering, interactive tile comparison, transparent room recommendations, multi-intent lead capture (Quote, Product Enquiry, WhatsApp), showroom store finder, technical SEO automation, educational guides, and a digital marketing strategy.

- **Production URL:** <https://tiles-digital-platform.vercel.app>
- **Repository:** GitHub — `Nafeeza-25/tiles-digital-platform` (`main` branch)
- **Status:** **COMPLETE & FROZEN** (Website Implementation & Academic Documentation Complete)

---

## Technology Stack

- **Framework:** Next.js 16 (App Router with Turbopack)
- **Language:** TypeScript 5 (Strict Mode)
- **Styling & Design System:** Tailwind CSS v4, Vanilla CSS Design Tokens (`#121B2B` Navy, `#C5A265` Gold, `#FAF7F1` Cream)
- **Database & Backend:** Supabase PostgreSQL with Row Level Security (RLS)
- **Form Handling & Validation:** React Hook Form, Zod Schema Validation
- **Deployment & Hosting:** Vercel Edge Network, GitHub `main` branch integration
- **Icons & Assets:** Lucide React, 150 local WebP presentation images, 20 SVG marketing assets, 40 product SVG fallbacks

---

## Major Implemented Features

1. **Photographic Hero & Visual Shell:** Responsive architectural visual system with a 3-slide hero crossfade slider, category strip visual overlap, and reduced-motion accessibility.
2. **Dynamic Catalogue & Search (`/tiles`):** Displays 40 active products across 5 categories with real-time keyword search, multi-value attribute filtering, semantic price bounds parsing (`minPrice`/`maxPrice`), sorting, and pagination.
3. **Product Detail Experience (`/tiles/[categorySlug]/[productSlug]`):** Gallery thumbnail switching (Texture, Room, Detail), specifications table, room suitability tags, and moderated user review submission.
4. **Tile Comparison (`/compare`):** Side-by-side spec matrix comparing up to 3 tiles with shareable URL state and `localStorage` persistence.
5. **Room Recommendations (`/recommendations`):** Deterministic tag-based recommendation matching tiles by room suitabilities (`living_room`, `bathroom`, `kitchen`, etc.).
6. **Multi-Intent Lead Generation (`/contact`):** Validated forms for Quote Requests, Product Enquiries, and General Contact inserting into Supabase via RLS.
7. **One-Click WhatsApp Chat:** Pre-filled WhatsApp direct link generator encoding product context and showroom numbers.
8. **Showroom Store Finder (`/stores`):** Search and city filtering for 3 active demo showrooms (`timeless-tiles-central`, `design-studio`, `trade-centre`).
9. **Technical SEO Automation:** Dynamic XML Sitemap (59 URLs), Open Graph card generator (`/opengraph-image`), robots.txt, canonical metadata, and Breadcrumb JSON-LD.
10. **Educational Tile Guides (`/guides`):** 5 long-form educational guides covering tile selection, bathroom design, floor specs, store evaluation, and company quality.

---

## Local Development Setup

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file in the project root and define the variable names listed below using your own project values.

   *Note: Never commit `.env.local`. Never use a Supabase secret key or `service_role` key in browser client code.*

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000` in your browser.

---

## Environment Variables

| Variable Name | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project REST API endpoint URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Yes | Supabase public client publishable key (RLS enforced) |
| `NEXT_PUBLIC_SITE_URL` | Optional | Canonical site origin; when omitted, the application uses `VERCEL_PROJECT_PRODUCTION_URL`, then `VERCEL_URL`, then its local fallback. |

---

## Core Academic Documentation Package

- **[Final Project Report](docs/FINAL_PROJECT_REPORT.md)** — Comprehensive 33-section academic submission report.
- **[Executive Project Summary](docs/PROJECT_SUMMARY.md)** — Concise 2-page project overview.
- **[System Architecture Diagram](docs/diagrams/SYSTEM_ARCHITECTURE.md)** — Mermaid diagram showing Client, Hosting, App Logic, and Database tiers.
- **[Database ER Diagram](docs/diagrams/ER_DIAGRAM.md)** — Mermaid diagram modeling relational schema and key constraints.
- **[Customer Journey Flowchart](docs/diagrams/CUSTOMER_JOURNEY.md)** — 4-stage journey mapped to web features.
- **[Marketing Funnel Flowchart](docs/diagrams/MARKETING_FUNNEL.md)** — 7-stage marketing conversion funnel.
- **[Project Feature Matrix](docs/FEATURE_MATRIX.md)** — Complete requirement-to-implementation mapping matrix.
- **[Test Summary Report](docs/TEST_SUMMARY.md)** — Verification results across all 21 automated regression check scripts.
- **[Screenshot Evidence Plan](docs/SCREENSHOT_EVIDENCE_PLAN.md)** — 21-item screenshot submission inventory.

## Marketing & Technical Documentation

- **[Database Schema Reference](docs/DATABASE_SCHEMA.md)** — Relational tables, fields, RLS policies, and migrations.
- **[Design System & Motion Guide](docs/DESIGN_SYSTEM.md)** — Palette tokens, typography, component motion, and accessibility rules.
- **[SEO Keyword Strategy](docs/SEO_KEYWORD_STRATEGY.md)** — Intent mapping, educational keyword strategy, and claim safety rules.
- **[Digital Marketing Strategy](docs/DIGITAL_MARKETING_STRATEGY.md)** — Multi-channel proposal (Instagram, Facebook, YouTube, Google Ads).
- **[Google Ads Campaign Proposal](docs/GOOGLE_ADS_PLAN.md)** — Search keyword structures, negative keywords, and responsive ad copy.
- **[Four-Week Content Calendar](docs/CONTENT_CALENDAR.md)** — 28 planned social calendar entries with destination mappings.
- **[Social Content Library](docs/SOCIAL_CONTENT_LIBRARY.md)** — Copy library and hashtag frameworks.
- **[Marketing Measurement Plan](docs/MARKETING_MEASUREMENT_PLAN.md)** — Event taxonomy, funnel definitions, and KPI frameworks.
- **[Marketing Asset Manifest](docs/MARKETING_ASSET_MANIFEST.md)** — Metadata for 20 original SVG graphics (`/dev/marketing-preview`).
- **[Production Readiness Record](docs/PRODUCTION_READINESS.md)** — Production audit, response headers, and security verification.
- **[Deployment Report](docs/DEPLOYMENT_REPORT.md)** — Vercel production deployment reference.
