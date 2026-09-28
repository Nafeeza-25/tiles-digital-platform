import type { Metadata } from "next";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = { title: "Visual Check | Timeless Tiles", robots: { index: false, follow: false } };

const products = [
  ["Carrara White", "carrara-white"], ["Urban Concrete Grey", "urban-concrete-grey"], ["Oakwood Natural", "oakwood-natural"], ["Terrazzo Pearl", "terrazzo-pearl"],
  ["Aqua Mist Anti-Skid", "aqua-mist-anti-skid"], ["Metro White Gloss", "metro-white-gloss"], ["Sage Hex", "sage-hex"], ["Stonecrest Grey", "stonecrest-grey"],
] as const;
const categories = ["floor-tiles", "wall-tiles", "bathroom-tiles", "kitchen-tiles", "outdoor-tiles"] as const;

export default function VisualCheckPage() {
  return <Container className="py-10"><p className="text-sm font-semibold uppercase tracking-[.14em] text-primary">Development-only route</p><h1 className="mt-3 text-4xl">Local visual asset check</h1><p className="mt-3 text-muted">This route is intentionally excluded from customer navigation and uses no database data.</p><h2 className="mt-10 text-2xl">Product renders</h2><div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{products.map(([name, slug]) => <figure key={slug} className="border bg-surface p-3"><img src={`/images/products/${slug}.svg`} alt={`${name} tile demo render`} className="aspect-square w-full"/><figcaption className="mt-2 text-sm font-medium">{name}</figcaption></figure>)}</div><h2 className="mt-10 text-2xl">Category visuals</h2><div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{categories.map((slug) => <img key={slug} src={`/images/categories/${slug}.svg`} alt={`${slug.replace("-", " ")} category visual`} className="w-full border"/>)}</div><h2 className="mt-10 text-2xl">Brand and hero</h2><div className="mt-5 grid gap-5"><img src="/images/brand/timeless-tiles-mark.svg" alt="Timeless Tiles geometric mark" className="size-20"/><img src="/images/brand/timeless-tiles-wordmark.svg" alt="Timeless Tiles wordmark" className="h-12 w-56"/><img src="/images/banners/hero-tile-composition.svg" alt="Abstract Timeless Tiles architectural composition" className="w-full border"/></div></Container>;
}
