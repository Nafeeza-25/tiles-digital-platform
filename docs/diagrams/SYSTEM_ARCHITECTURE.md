# System Architecture Diagram

This document presents the technical system architecture for the **Timeless Tiles Digital Platform**, a web application built using Next.js 16 (App Router), TypeScript, Tailwind CSS, Supabase PostgreSQL, and Vercel.

```mermaid
flowchart TD
    subgraph Client["Client Tier (User Browser)"]
        Browser["User Web Browser"]
        PWA["Responsive UI (Desktop / Mobile)"]
        Browser --> PWA
    end

    subgraph Hosting["Hosting & Edge Delivery (Vercel)"]
        Edge["Vercel Edge Network / CDN"]
        NextServer["Next.js Server (App Router)"]
        StaticAssets["Static WebP/SVG Assets (public/)"]
        SEOEngine["Dynamic Sitemap & Robots Generator"]
        Edge --> NextServer
        Edge --> StaticAssets
        NextServer --> SEOEngine
    end

    subgraph AppLogic["Application Logic Tier"]
        CatalogEngine["Catalogue & Filtering Engine"]
        CompareEngine["Tile Comparison Engine"]
        RecEngine["Room Recommendation Engine"]
        FormHandler["Zod & React Hook Form Handler"]
        ReviewHandler["Review Moderation Handler"]
        StoreEngine["Store Finder & City Filter Engine"]

        NextServer --> CatalogEngine
        NextServer --> CompareEngine
        NextServer --> RecEngine
        NextServer --> FormHandler
        NextServer --> ReviewHandler
        NextServer --> StoreEngine
    end

    subgraph DatabaseTier["Backend & Data Tier (Supabase)"]
        SupaClient["@supabase/ssr Public Client"]
        RLS["Row Level Security (RLS) Policies"]
        Postgres[(PostgreSQL Database)]

        AppLogic --> SupaClient
        SupaClient --> RLS
        RLS --> Postgres
    end

    subgraph CI_CD["DevOps & Deployment Pipeline"]
        GitRepo["GitHub Repository (main branch)"]
        VercelBuild["Vercel Automated Build System"]
        GitRepo -->|git push trigger| VercelBuild
        VercelBuild --> Edge
    end

    Client -->|HTTPS Requests| Edge
```

## Architecture Summary

1. **Client Tier:** Browsers interact with responsive Next.js pages rendered dynamically or statically.
2. **Hosting Tier:** Deployed on Vercel with automatic edge caching for static assets, WebP imagery, and dynamic Open Graph image generation.
3. **Application Tier:** Server and client components handle catalogue browsing, multi-criteria filtering, tile comparison persistence, deterministic room recommendations, form validation via Zod, and Store Finder queries.
4. **Database Tier:** Managed Supabase PostgreSQL backend using client-side `@supabase/ssr` with Row Level Security (RLS) ensuring strict public read access for active catalogue items/approved reviews, and INSERT-only permissions for lead enquiries and user reviews.
