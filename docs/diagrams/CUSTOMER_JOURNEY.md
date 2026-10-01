# Customer Journey Diagram

This document models the 4-stage customer journey (**Browse → Discover → Connect → Decide**) mapped to actual website features in the **Timeless Tiles Digital Platform**.

```mermaid
flowchart LR
    subgraph Stage1["1. BROWSE (Awareness)"]
        A1["Organic Search / Social Ad"] --> A2["Homepage Hero / Category Strip"]
        A2 --> A3["Collections & Editorial Guides"]
    end

    subgraph Stage2["2. DISCOVER (Exploration)"]
        A3 --> B1["Tile Catalogue (/tiles)"]
        B1 --> B2["Multi-Criteria Search & Filter"]
        B2 --> B3["Product Detail Page (/tiles/cat/product)"]
        B3 --> B4["Tile Comparison & Room Recommendations"]
    end

    subgraph Stage3["3. CONNECT (Engagement)"]
        B4 --> C1["Request a Quote Form"]
        B4 --> C2["Direct Product Enquiry"]
        B4 --> C3["WhatsApp Instant Enquiry"]
        B4 --> C4["Store Finder (/stores)"]
    end

    subgraph Stage4["4. DECIDE (Conversion)"]
        C1 --> D1["Sales Consultation Contact"]
        C2 --> D1
        C3 --> D1
        C4 --> D2["Showroom Visit & Physical Sample Inspection"]
        D1 --> D3["Final Order & Project Delivery"]
        D2 --> D3
    end

    Stage1 --> Stage2
    Stage2 --> Stage3
    Stage3 --> Stage4
```

## Customer Journey Mapping Summary

| Journey Stage | Objective | Primary Website Feature / Route | Outcome |
| --- | --- | --- | --- |
| **1. Browse** | Capture initial interest and communicate brand quality | Homepage (`/`), Category Strip, Editorial Collections (`/collections`), Tile Guides (`/guides`) | Visitor lands on relevant page and begins exploring |
| **2. Discover** | Help visitor find products matching technical & aesthetic needs | Catalogue (`/tiles`), Multi-Criteria Filters, Comparison (`/compare`), Room Recommendations (`/recommendations`) | Visitor evaluates 2–3 suitable tiles |
| **3. Connect** | Convert visitor interest into direct sales lead | Quote Form (`/contact?intent=quote`), Product Enquiry (`/contact?intent=product`), WhatsApp Link, Store Finder (`/stores`) | Qualified lead stored in database or store contact initiated |
| **4. Decide** | Facilitate physical sample inspection & project quote closing | Showroom consultation, sales followup, sample review | Customer places final order |
