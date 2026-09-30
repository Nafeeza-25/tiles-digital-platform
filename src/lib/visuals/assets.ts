// Presentation assets only. Product identity and specifications come from Supabase.
export const premiumProductSlugs = [
  "aqua-mist-anti-skid", "arctic-subway-white", "basalt-black", "blush-rose", "calacatta-gold", "canyon-brown", "carrara-splash", "carrara-white", "charcoal-flute", "cloud-white", "coastal-blue", "cream-zellige", "granite-charcoal", "graphite-grip", "ivory-travertine", "marble-vein-white", "metro-white-gloss", "midnight-blue", "nero-marquina", "nordic-beige", "oakwood-natural", "ocean-blue-ripple", "olive-kitkat", "pearl-mosaic", "pebble-taupe", "rustic-terracotta", "sage-gloss", "sage-hex", "sahara-beige", "sand-dune-beige", "sandstone-linear", "slate-graphite", "smoke-grey", "spa-stone-grey", "stonecrest-grey", "terracotta-brick", "terrazzo-pearl", "travertine-sand", "urban-concrete-grey", "wooddeck-walnut",
] as const;
const products = new Set<string>(premiumProductSlugs);
export function productVisual(slug: string, view: "texture" | "room" | "detail" = "texture", fallback?: string) {
  return products.has(slug) ? `/images/products/${slug}/${view}.webp` : fallback;
}

export const roomImages: Record<string, string> = {
  living_room: "/images/rooms/living-room.webp", bedroom: "/images/rooms/bedroom.webp", bathroom: "/images/rooms/bathroom.webp", kitchen: "/images/rooms/kitchen.webp", balcony: "/images/rooms/balcony.webp", outdoor: "/images/rooms/outdoor.webp", commercial: "/images/rooms/commercial.webp",
};
export const guideImages: Record<string, string> = {
  "how-to-choose-bathroom-tiles": "/images/guides/bathroom-guide.webp",
  "floor-tile-size-finish-material-guide": "/images/guides/floor-guide.webp",
  "how-to-choose-tiles-for-each-room": "/images/guides/rooms-guide.webp",
  "tiles-near-me-guide": "/images/guides/tiles-near-me.webp",
  "how-to-choose-a-tile-company": "/images/guides/choosing-tile-company.webp",
};
export const storeImages: Record<string, string> = {
  "timeless-tiles-central": "/images/stores/central-showroom.webp", "timeless-tiles-design-studio": "/images/stores/design-studio.webp", "timeless-tiles-trade-centre": "/images/stores/trade-centre.webp",
};
