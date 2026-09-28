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

The initial migration is deployed to the linked Supabase project, which is the project database schema. TypeScript database types are generated from the deployed schema and used by the Supabase client helpers. The database contains schema only; database seed data and dashboard content remain later tasks. Deployed migrations are immutable, so future schema changes require new timestamped migration files. See [Database schema](DATABASE_SCHEMA.md) for the full design.

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
