# Data-Driven Homepage Design

## Intent

Build a premium, warm, spacious Timeless Tiles homepage that supports browse → discover → connect → decide, using deployed fictional catalogue data without implementing the catalogue, forms, authentication, or other later-phase functionality.

## Data Layer

`src/lib/queries/home.ts` will use the existing typed Supabase server client only. It exposes independent read-only functions for active featured products with category/primary-image data, actual sale products, and publicly approved reviews with related product names. Query failures resolve to safe empty section states and are never shown to visitors; no credential or database modification is performed.

## Components

`ProductCard` is reusable catalogue infrastructure, showing a local primary image, product context, specifications, and actual price/sale price. It temporarily links to its category route, not an unimplemented detail route. `src/components/home` contains focused server-friendly sections: hero, categories, featured products, offers, audiences, journey, reviews, brand story, and final CTA.

The page remains server-rendered except where existing shell interaction already requires client state. Local SVG assets use Next `Image`, including the development visual-check route to eliminate existing lint advisories.

## Content and Scope

The hero draws only the supported 40-product/5-collection context. Categories use local artwork and valid routes. Offers derive solely from `sale_price < price`; any percentage is accurately calculated. Reviews use approved database content only and visibly disclose their academic-demo context. Journey copy describes designed future capabilities without claiming unavailable features work now.

Homepage completion does not complete catalogue, category catalogue functionality, product details, search, filters, comparison, recommendations, quote/contact forms, WhatsApp, review submission, or store finder.

## Quality Requirements

The homepage has one h1, semantic sections/headings, useful alternative text, accessible ratings and sale labels, visible focus styles, responsive grids from 320px through desktop, no external images/fonts, no auto-motion, and no horizontal overflow. Required browser checks cover homepage assets, navigation, product visual differentiation, and primary routes.
