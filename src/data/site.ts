export const tileCategories = [
  { slug: "floor-tiles", label: "Floor Tiles", href: "/tiles/floor-tiles", image: "/images/categories/floor-tiles.svg", description: "Durable-looking surfaces for living spaces, bedrooms, commercial interiors, and everyday floors." },
  { slug: "wall-tiles", label: "Wall Tiles", href: "/tiles/wall-tiles", image: "/images/categories/wall-tiles.svg", description: "Decorative and practical wall finishes for considered interior spaces." },
  { slug: "bathroom-tiles", label: "Bathroom Tiles", href: "/tiles/bathroom-tiles", image: "/images/categories/bathroom-tiles.svg", description: "Tile options for wet-area surfaces, grip, maintenance, and calm finishes." },
  { slug: "kitchen-tiles", label: "Kitchen Tiles", href: "/tiles/kitchen-tiles", image: "/images/categories/kitchen-tiles.svg", description: "Easy-to-explore backsplash and surface options for kitchens and utility spaces." },
  { slug: "outdoor-tiles", label: "Outdoor Tiles", href: "/tiles/outdoor-tiles", image: "/images/categories/outdoor-tiles.svg", description: "Textured and durable-looking tile options for balconies, patios, and exterior spaces." },
] as const;

export type TileCategory = (typeof tileCategories)[number];
export type TileCategorySlug = TileCategory["slug"];

export const site = {
  brand: "Timeless Tiles",
  description: "Explore floor, wall, bathroom, kitchen and outdoor tile collections from Timeless Tiles.",
  primaryNavigation: [
    { label: "Home", href: "/" },
    { label: "Tiles", href: "/tiles" },
    { label: "Collections", href: "/collections" },
    { label: "Offers", href: "/offers" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  categories: tileCategories,
  recommendations: { label: "Room Recommendations", href: "/recommendations" },
  quote: { label: "Get a Quote", href: "/contact?intent=quote" },
} as const;
