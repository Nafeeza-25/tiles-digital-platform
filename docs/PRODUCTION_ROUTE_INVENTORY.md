# Production Route Inventory

The public application uses the following stable route patterns. Product and guide detail routes are generated from the current demo catalogue and guide data.

## Stable public routes

| Route | Purpose |
| --- | --- |
| `/` | Home |
| `/tiles` | Tile catalogue |
| `/tiles/floor-tiles` | Floor category |
| `/tiles/wall-tiles` | Wall category |
| `/tiles/bathroom-tiles` | Bathroom category |
| `/tiles/kitchen-tiles` | Kitchen category |
| `/tiles/outdoor-tiles` | Outdoor category |
| `/tiles/[categorySlug]/[productSlug]` | Product details (40 active demo products) |
| `/compare` | Compare selected catalogue products |
| `/recommendations` | Room-based catalogue recommendations |
| `/collections` | Editorial catalogue collections |
| `/offers` | Current demo offers |
| `/about` | Project and platform information |
| `/contact` | Contact, product, and quote enquiries |
| `/stores` | Fictional demo Store Finder |
| `/guides` | Tile guide index |
| `/guides/how-to-choose-bathroom-tiles` | Bathroom tile guide |
| `/guides/floor-tile-size-finish-material-guide` | Floor tile guide |
| `/guides/how-to-choose-tiles-for-each-room` | Room selection guide |
| `/guides/tiles-near-me-guide` | Store evaluation guide |
| `/guides/how-to-choose-a-tile-company` | Tile supplier evaluation guide |
| `/sitemap.xml` | Search engine sitemap (59 entries; comparison is intentionally excluded) |
| `/robots.txt` | Search engine crawl rules |
| `/opengraph-image` | Generated default social sharing image |

The product route uses a category slug and product slug from active catalogue data; no product URL is hardcoded into a separate route file. Query parameters for search, filtering, comparison selection, or enquiry intent do not create separate stable routes.

## Development-only routes

| Route | Purpose | Indexing |
| --- | --- | --- |
| `/dev/visual-check` | Local inspection of owned brand, category, hero, and product art | `noindex`, `nofollow`; disallowed in `robots.txt`; excluded from sitemap |
| `/dev/marketing-preview` | Local review of the Step 24 creative pack | `noindex`, `nofollow`; disallowed in `robots.txt`; excluded from sitemap |

Development routes are not linked from public navigation and contain no credentials or private catalogue access.
