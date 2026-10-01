# Entity-Relationship (ER) Diagram

This document models the database schema for the **Timeless Tiles Digital Platform** deployed on Supabase PostgreSQL.

```mermaid
erDiagram
    CATEGORIES ||--o{ PRODUCTS : "contains (category_id)"
    PRODUCTS ||--o{ PRODUCT_IMAGES : "has (product_id)"
    PRODUCTS ||--o{ REVIEWS : "receives (product_id)"
    PRODUCTS ||--o{ ENQUIRIES : "referenced_in (product_id)"

    CATEGORIES {
        uuid id PK
        string name
        string slug UK
        string description
        timestamp created_at
    }

    PRODUCTS {
        uuid id PK
        uuid category_id FK
        string name
        string slug UK
        string sku UK
        string short_description
        string full_description
        decimal price
        decimal sale_price
        string size_label
        string finish
        string material
        string color
        string[] suitable_rooms
        string[] suitable_applications
        boolean is_active
        boolean is_featured
        timestamp created_at
        timestamp updated_at
    }

    PRODUCT_IMAGES {
        uuid id PK
        uuid product_id FK
        string image_url
        string alt_text
        boolean is_primary
        int display_order
        timestamp created_at
    }

    REVIEWS {
        uuid id PK
        uuid product_id FK
        string reviewer_name
        int rating
        string review_title
        string comment
        boolean is_approved
        timestamp created_at
    }

    STORES {
        uuid id PK
        string name
        string slug UK
        string city
        string address
        string phone
        string email
        string whatsapp_number
        string opening_hours
        string google_maps_url
        boolean is_active
        timestamp created_at
    }

    ENQUIRIES {
        uuid id PK
        uuid product_id FK
        string enquiry_type
        string name
        string email
        string phone
        string message
        timestamp created_at
    }
```

## Schema Entities Summary

1. **CATEGORIES (5 records):** High-level tile classifications (`floor-tiles`, `wall-tiles`, `bathroom-tiles`, `kitchen-tiles`, `outdoor-tiles`).
2. **PRODUCTS (40 active records):** Physical tile specifications including pricing, sale pricing, dimensions, material, finish, colour, suitable rooms, and application suitabilities.
3. **PRODUCT_IMAGES (40 primary records):** Image metadata linking products to local WebP presentation paths and SVG fallbacks.
4. **REVIEWS (24 approved records + pending submissions):** Product ratings and comments; default `is_approved = false` for moderation via Supabase Dashboard.
5. **STORES (3 active records):** Factual demo showroom records (`timeless-tiles-central`, `timeless-tiles-design-studio`, `timeless-tiles-trade-centre`).
6. **ENQUIRIES:** Public INSERT-only lead capture records storing quote requests, product enquiries, and general contact messages.
