import { PageHero } from "@/components/ui/PageHero";
import { CategoryNavigation } from "@/components/catalog/CategoryNavigation";
import type { Metadata } from "next";
import { createOpenGraphMetadata } from "@/lib/seo/metadata";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ProductCard } from "@/components/products/ProductCard";
import { getCatalogueProducts } from "@/lib/queries/catalog";
import { getEditorialCollections } from "@/lib/collections/collections";

export const metadata: Metadata = {
  title: "Tile Collections",
  description: "Explore curated groups from the Timeless Tiles demo catalogue, including featured, new, sale, outdoor and wet-area tile selections.",
  openGraph: createOpenGraphMetadata("/collections", "Tile Collections", "Explore curated groups from the Timeless Tiles demo catalogue, including featured, new, sale, outdoor and wet-area tile selections."),
  alternates: { canonical: "/collections" },
};

export default async function CollectionsPage() {
  const products = await getCatalogueProducts();
  const collections = getEditorialCollections(products);
  return <><PageHero compact eyebrow="A surface for every setting" title="Our" accent="Collections" description="Explore curated editorial groupings from the Timeless Tiles academic-demo catalogue, based on actual product attributes." image="/images/editorial/collections-hero.webp" alt="Illustrative modern living room with architectural tile surfaces" />
    <section className="site-container pb-16 pt-6"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Collections" }]} /><CategoryNavigation />
      <div className="mt-10 space-y-14">{collections.map(collection => <section key={collection.id} className="border-t pt-9" aria-labelledby={`collection-${collection.id}`}>
        <div className="flex flex-wrap items-end justify-between gap-5"><div><p className="mb-2 text-xs font-semibold uppercase tracking-[.18em] text-primary">Catalogue edit</p><h2 id={`collection-${collection.id}`} className="text-3xl">{collection.title}</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{collection.description}</p></div><div className="flex flex-wrap items-center gap-4"><span className="text-sm text-muted">{collection.totalCount} products</span><Link href={collection.href} className="action-primary">Explore Collection</Link></div></div>
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{collection.sampleProducts.map(product => <ProductCard key={product.id} product={product} />)}</div>
      </section>)}</div>
    </section></>;
}
