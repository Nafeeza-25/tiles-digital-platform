# Marketing Funnel Diagram

This document models the proposed 7-stage digital marketing funnel for the **Timeless Tiles Digital Platform**.

```mermaid
flowchart TD
    subgraph TopFunnel["1. AWARENESS & TRAFFIC GENERATION"]
        M1["Google Search Ads (Intent Keywords)"]
        M2["Instagram / Facebook Social Ads (Visual Renders)"]
        M3["YouTube Shorts & Long-Form Tile Guides"]
        M4["Organic Search (SEO Guides & Category Keywords)"]
    end

    subgraph MidFunnel["2. ENGAGEMENT & EVALUATION"]
        F1["Website Arrival (Homepage / Guide / Category Landing)"]
        F2["Product Exploration (Catalogue & Category Browsing)"]
        F3["Product Evaluation (Specs, Comparison, Room Selector)"]
    end

    subgraph LowFunnel["3. CONVERSION & LEAD CAPTURE"]
        C1["Quote Request Submission (/contact?intent=quote)"]
        C2["Direct Product Enquiry Submission (/contact?intent=product)"]
        C3["WhatsApp One-Click Direct Chat"]
        C4["Store Finder Direction Lookup (/stores)"]
    end

    subgraph BottomFunnel["4. SALES CLOSING & ADVOCACY"]
        S1["Sales Team Consultation & Sample Dispatch"]
        S2["Physical Showroom Visit & Final Order Closing"]
        S3["Post-Purchase Customer Review Submission"]
    end

    M1 --> F1
    M2 --> F1
    M3 --> F1
    M4 --> F1

    F1 --> F2
    F2 --> F3

    F3 --> C1
    F3 --> C2
    F3 --> C3
    F3 --> C4

    C1 --> S1
    C2 --> S1
    C3 --> S1
    C4 --> S2

    S1 --> S2
    S2 --> S3
```

## Marketing Funnel Mapping Summary

| Funnel Stage | Traffic Source / Channel | Destination Route | Key Conversion Action |
| --- | --- | --- | --- |
| **Awareness** | Google Ads, Instagram/Facebook Ads, YouTube Shorts, Organic SEO | Homepage (`/`), Guide (`/guides/how-to-choose-bathroom-tiles`), Category pages | Page view & click-through |
| **Exploration** | Internal Site Navigation | Catalogue (`/tiles`), Offers (`/offers`), Collections (`/collections`) | Multi-filter selection, product view |
| **Evaluation** | Dynamic Product Tools | Comparison (`/compare`), Recommendations (`/recommendations`), Product Details | Compare tray addition, room preference match |
| **Conversion** | Lead Capture Modules | Contact/Quote Form (`/contact`), WhatsApp link, Store Finder (`/stores`) | Form submission, WhatsApp click, store lookup |
| **Closing & Advocacy** | Offline / Showroom | Physical showroom visit, sales call | Purchase completion, review submission |
