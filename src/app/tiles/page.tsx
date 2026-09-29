import type { Metadata } from "next";
import { CatalogueExperience } from "@/components/catalog/CatalogueExperience";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import type { SearchParams } from "@/lib/catalog/catalog-filters";
import { getCatalogueProducts } from "@/lib/queries/catalog";

export const metadata: Metadata = {
  title: "Tile Catalogue | Timeless Tiles",
  description: "Browse floor, wall, bathroom, kitchen and outdoor tiles and filter the Timeless Tiles demo catalogue by size, colour, finish, material, price and application.",
};

export default async function TilesPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const [params, products] = await Promise.all([searchParams, getCatalogueProducts()]);

  return (
    <section className="site-container py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tiles" }]} />
      <h1 className="text-4xl">Tile Catalogue</h1>
      <p className="mt-3 max-w-2xl text-muted">Browse the Timeless Tiles demo catalogue and narrow designs by size, colour, finish, material, price, and application.</p>
      <CatalogueExperience products={products} params={params} />
    </section>
  );
}
