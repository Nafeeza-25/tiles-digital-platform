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

## Deployment

- GitHub for version control
- Vercel for deployment

## Planned core data entities

- `categories`
- `products`
- `product_images`
- `reviews`
- `stores`
- `enquiries`

The exact SQL schema, relationships, access rules, and seed data will be designed in a later step.

## Intended request flow

Visitor → Next.js website → catalogue/search/filter/recommendation UI → Supabase data → product details → enquiry / WhatsApp / quote conversion

This is a planned architecture. No application APIs beyond the existing Supabase client/server helpers have been created yet.
