# Timeless Tiles Design System

Timeless Tiles uses a luxury architectural tile-showroom visual system tailored for homeowners, architects, interior designers, contractors, and dealers.

## Core Visual Palette

- **Primary Dark (Navy/Charcoal):** `#121B2B` / `#1A2332`
- **Accent (Warm Gold):** `#C5A265`
- **Primary Content Surfaces:** `#FFFFFF` (pure white) & `#FAF7F1` (warm cream)
- **Borders & Dividers:** `#E5E0D8` (subtle neutral tone)
- **Typography:** Playfair Display / Serif stack for luxury editorial headings; Inter / System Sans stack for UI labels, body, and navigation.

## Motion & Interaction Principles

### Core Rule: Animate Components, Not Section Backgrounds
Section separation relies on:
1. Generous vertical whitespace (`72–104px` desktop, `56–80px` tablet, `40–56px` mobile).
2. Clean, subtle background-tone changes (e.g. White `#FFFFFF` ↔ Warm Cream `#FAF7F1`).
3. Single deliberate visual overlap: Category image strip overlapping the homepage hero bottom by `24–32px`.
4. Strong dark/light transitions when content purpose changes (e.g. Content to Dark CTA band/Footer).

*No long gradients, blurred overlays, or scroll-driven background morphs are used between sections.*

### Recommended Timing & Easing
- **Micro-interactions (hover/focus):** 150–220ms (`cubic-bezier(0.16, 1, 0.3, 1)` or `ease-out`)
- **Standard Transitions (cards, tabs, buttons):** 220–350ms
- **Large Content / Image Transitions (gallery crossfade):** 400–700ms
- **Hero Slider:** 600–900ms crossfade transition; auto-advance interval 7.5 seconds (paused on hover, focus, or tab blur).

### Component-Level Motion Details
- **Hero Slider (`HeroSection.tsx`):** Crossfade + 1.5% scale zoom out, content fade + 16px translateY entrance. Full interactive controls (prev/next/indicators).
- **Scroll Reveal (`Reveal.tsx`):** Lightweight `IntersectionObserver`-based fade-up / fade-in with 16–24px offset. Groups animate logically rather than per-paragraph.
- **Product Cards (`ProductCard.tsx`):** Hover image scale (1.03), subtle shadow lift, gold accent reveal, and CTA arrow shift.
- **Product Gallery (`ProductGallery.tsx`):** Short image crossfade on thumbnail click/keyboard selection (`texture`, `room`, `detail`).
- **Compare Tray (`CompareTray.tsx`):** Smooth slide-in from bottom upon first item addition.
- **Category Cards (`CategorySection.tsx`):** Subtle zoom, gradient overlay enhancement, arrow translation.

## Global Reduced Motion Support

All motion respects `prefers-reduced-motion: reduce`:
- Auto-advance on hero slider is completely disabled.
- Scroll reveal transforms are removed; elements fade in immediately.
- Hover scales and translations are suppressed.
- Essential functionality remains 100% visible and accessible without delay.

