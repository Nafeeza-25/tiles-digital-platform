import type { CatalogProduct } from "@/lib/catalog/catalog-filters";

export type CollectionDefinition = {
  id: string;
  title: string;
  slug: string;
  description: string;
  href: string;
  match: (product: CatalogProduct) => boolean;
};

export const COLLECTIONS: CollectionDefinition[] = [
  {
    id: "featured",
    title: "Featured Tiles",
    slug: "featured",
    description: "Curated highlight tiles selected for key spaces across modern residential and commercial designs.",
    href: "/tiles?sort=recommended",
    match: (product) => Boolean(product.is_featured),
  },
  {
    id: "new-arrivals",
    title: "New Arrivals",
    slug: "new-arrivals",
    description: "The latest additions to the Timeless Tiles demo catalogue.",
    href: "/tiles?sort=newest",
    match: (product) => Boolean(product.is_new),
  },
  {
    id: "sale-selection",
    title: "Sale Selection",
    slug: "sale-selection",
    description: "Products currently showing valid reduced prices in the demo dataset.",
    href: "/offers",
    match: (product) => product.sale_price !== null && product.sale_price > 0 && product.sale_price < product.price,
  },
  {
    id: "outdoor-living",
    title: "Outdoor Living",
    slug: "outdoor-living",
    description: "Durable, outdoor-ready surfaces suited for patios, balconies, pathways, and exterior feature walls.",
    href: "/tiles?application=outdoor",
    match: (product) => product.rooms.includes("outdoor") || product.applications.includes("outdoor"),
  },
  {
    id: "wet-area",
    title: "Wet Area Selection",
    slug: "wet-area",
    description: "Water-resistant and anti-skid surfaces ideal for bathrooms, wet rooms, and kitchen splash zones.",
    href: "/tiles?application=wet_area",
    match: (product) => product.applications.includes("wet_area"),
  },
];

export type CollectionItem = CollectionDefinition & {
  totalCount: number;
  sampleProducts: CatalogProduct[];
};

export function getEditorialCollections(products: CatalogProduct[]): CollectionItem[] {
  return COLLECTIONS.map((def) => {
    const matching = products.filter(def.match);
    return {
      ...def,
      totalCount: matching.length,
      sampleProducts: matching.slice(0, 4),
    };
  }).filter((collection) => collection.totalCount > 0);
}
