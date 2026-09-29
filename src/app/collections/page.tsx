import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ProductCard } from "@/components/products/ProductCard";
import { getCatalogueProducts } from "@/lib/queries/catalog";
import { getEditorialCollections } from "@/lib/collections/collections";

export const metadata: Metadata = {
  title: "Tile Collections",
  description: "Explore curated groups from the Timeless Tiles demo catalogue, including featured, new, sale, outdoor and wet-area tile selections.",
  alternates: { canonical: "/collections" },
};

export default async function CollectionsPage() {
  const products = await getCatalogueProducts();
  const collections = getEditorialCollections(products);

  return (
    <section className="site-container py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Collections" }]} />
      <div className="max-w-3xl">
        <h1 className="text-4xl">Tile Collections</h1>
        <p className="mt-3 text-lg text-muted">
          Explore curated editorial groupings drawn from the Timeless Tiles academic-demo catalogue, categorized by application, suitabilities, and special catalogue highlights.
        </p>
      </div>

      <div className="mt-10 space-y-16">
        {collections.map((collection) => (
          <section key={collection.id} className="border-t pt-10" aria-labelledby={`collection-${collection.id}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <h2 id={`collection-${collection.id}`} className="text-2xl font-semibold">
                  {collection.title}
                </h2>
                <p className="mt-1 text-muted max-w-2xl">{collection.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-muted">{collection.totalCount} products</span>
                <Link
                  href={collection.href}
                  className="inline-flex min-h-11 items-center border bg-surface px-4 text-sm font-semibold hover:bg-surface-muted"
                >
                  Explore Collection →
                </Link>
              </div>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {collection.sampleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
