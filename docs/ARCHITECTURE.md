# Planned Production Architecture

## Frontend

- Next.js App Router
- TypeScript
- Tailwind CSS
- React components
- Responsive UI

## Backend and data

- Supabase
- PostgreSQL database
- Supabase client and server helpers

### Decided local schema

The local migration defines `categories`, `products`, `product_images`, `reviews`, `stores`, and `enquiries` in the `public` schema. Products belong to categories; images and reviews belong to products; enquiries can optionally reference a product; stores are independent.

The migration enables RLS on every table. The public application can read active catalogue data, approved reviews, and active stores; it can submit only unapproved reviews and new enquiries through explicitly limited insert grants. Enquiries are not publicly readable.

The schema migration is prepared locally but has not been applied to Supabase. Exact database deployment, seed data, and dashboard configuration remain later tasks. See [Database schema](DATABASE_SCHEMA.md) for the full design.

## Deployment

- GitHub for version control
- Vercel for deployment

## Core data entities

- `categories`
- `products`
- `product_images`
- `reviews`
- `stores`
- `enquiries`

## Intended request flow

Visitor → Next.js website → catalogue/search/filter/recommendation UI → Supabase data → product details → enquiry / WhatsApp / quote conversion

This is a planned architecture. No application APIs beyond the existing Supabase client/server helpers have been created yet.
