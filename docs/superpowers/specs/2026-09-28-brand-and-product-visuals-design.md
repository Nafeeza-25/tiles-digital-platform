# Timeless Tiles Brand and Product Visuals Design

## Intent

Create a calm, premium visual foundation for the Timeless Tiles academic project. The work serves homeowners, architects and interior designers, builders and contractors, and dealers. It prepares shared visual language and local imagery without building the homepage, catalogue, product details, search, filtering, comparison, or recommendations UI.

## Design System

`src/app/globals.css` will define a Tailwind-compatible token layer: the supplied warm neutral palette, a restrained green and red for state, container and page-padding values, 4–12px radii, modest shadows, focus rings, and transition timing. Display headings will use a system serif stack; body and interface copy will use a system sans-serif stack. No remote font or network font dependency will be used.

Global styles will provide accessible colour defaults, antialiasing, selection colours, heading rhythm, link/focus states, a reusable container utility, responsive spacing, and `prefers-reduced-motion` behavior.

Four reusable typed primitives will be added under `src/components/ui`: `Button`, `Container`, `SectionHeading`, and `Badge`. Button supports `primary`, `secondary`, `outline`, and `ghost` variants; `sm`, `md`, and `lg` sizes; semantic link-or-button use; keyboard focus; and disabled states. All primitives use `cn()` and no component library.

## Local Artwork

Two original SVG brand assets will use abstract geometric tile-grid and architectural forms, with a light-background wordmark. Five 1600×1000 category SVGs and an approximately 1800×1100 hero SVG will use the same quiet, architectural art direction. They contain no external assets, text in the hero, scripts, tracking, `foreignObject`, or remote resources.

## Deterministic Product Renderer

`scripts/generate-product-renders.mjs` reads active products through the public Supabase client using the existing URL and publishable-key environment variables. It selects product identity, colour, finish, material, category, and size details without printing credentials.

For each of the 40 active products, it emits exactly one local 1200×1200 SVG at `public/images/products/<slug>.svg`. A slug-seeded pseudo-random generator makes repeated runs byte-stable. The render combines a studio background, central sample slab, subdued shadow, colour palette mapping, and material/finish treatment. Marble uses irregular veins; concrete and stone use mineral texture; wood uses grain; terrazzo uses aggregate; ceramic/subway/zellige use edge and surface variation; mosaic/hex use modules; outdoor and anti-skid use rough texture; glossy/polished use controlled highlights; matte is low-reflection.

The generator also validates its output set: 40 unique active slugs, no missing render, and no unexpected product SVG. Assets are explicitly original demo artwork for an academic project, not photographs of manufactured products.

## Image Data

A new, timestamped Supabase migration will insert one `product_images` record for every active product, using stable slug lookup. Each row has a local `/images/products/<slug>.svg` URL, meaningful non-empty alt text, `sort_order` 0, and `is_primary` true. Existing deployed migrations remain untouched.

The existing public read policy supports the image records. The migration will be pushed only after reviewing that it is the sole pending migration, then synchronization will be confirmed.

## Verification and Documentation

`scripts/check-catalogue-data.mjs` will change from expecting zero images to enforcing 40 public images, one and only one primary image per active product, local SVG URL paths, and non-empty alt text. It will also check referenced files locally where practical.

Documentation will describe the completed visual assets and image data without claiming the future application UI is implemented. Validation includes asset generation, public database checks, catalogue checks, lint, production build, Supabase database lint, migration synchronization, and visual inspection of the specified material examples.

## Constraints

- Use only original local SVG imagery—no stock, external images, external hosting, or remote font dependencies.
- Do not add database tables, authentication, middleware, product UI, or fake features beyond the requested artwork/data.
- Do not expose credentials, commit `.env.local`, or use secret/service-role keys in browser code.
- Commit and push the completed verified work to `origin/main`.
