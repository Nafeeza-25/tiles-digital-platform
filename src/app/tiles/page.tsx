import type { Metadata } from "next";
import Link from "next/link";
import { ActiveFilters } from "@/components/catalog/ActiveFilters";
import { CatalogueFilters } from "@/components/catalog/CatalogueFilters";
import { CatalogPagination } from "@/components/catalog/CatalogPagination";
import { CatalogueQueryInputs } from "@/components/catalog/CatalogueQueryInputs";
import { CatalogueSort } from "@/components/catalog/CatalogueSort";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ProductCard } from "@/components/products/ProductCard";
import { filterProducts, paginate, parseCatalogState, sortProducts, type SearchParams } from "@/lib/catalog/catalog-filters";
import { getCatalogueProducts } from "@/lib/queries/catalog";

export const metadata: Metadata = {
  title: "Tile Catalogue | Timeless Tiles",
  description: "Browse floor, wall, bathroom, kitchen and outdoor tiles and filter the Timeless Tiles demo catalogue by size, colour, finish, material, price and application.",
};

export default async function TilesPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const products = await getCatalogueProducts();
  const state = parseCatalogState(params);
  const matchingProducts = sortProducts(filterProducts(products, state), state.sort);
  const pagination = paginate(matchingProducts, state.page);

  return (
    <section className="site-container py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tiles" }]} />
      <h1 className="text-4xl">Tile Catalogue</h1>
      <p className="mt-3 max-w-2xl text-muted">Browse the Timeless Tiles demo catalogue and narrow designs by size, colour, finish, material, price, and application.</p>

      <form method="get" className="mt-8 grid gap-4 border bg-surface p-4 md:grid-cols-[1fr_auto]">
        <CatalogueQueryInputs params={params} omit={["q", "page"]} />
        <div>
          <label htmlFor="q" className="text-sm font-semibold">Search tiles</label>
          <input id="q" name="q" defaultValue={state.q} placeholder="Search tiles, colours, materials..." className="mt-2 w-full border bg-background p-3" />
        </div>
        <button className="self-end bg-primary px-5 py-3 text-primary-foreground">Search</button>
      </form>

      <div className="mt-8 grid gap-8 lg:grid-cols-[17rem_1fr]">
        <aside><CatalogueFilters products={products} params={params} state={state} /></aside>
        <div>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <p className="text-sm text-muted">{matchingProducts.length} matching tiles · Page {pagination.page} of {pagination.pages}</p>
            <CatalogueSort params={params} state={state} />
          </div>
          <ActiveFilters params={params} />
          {pagination.items.length ? (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {pagination.items.map((product) => <ProductCard key={product.id} product={product} href={`/tiles/${product.slug}`} ctaLabel="Explore Collection" />)}
            </div>
          ) : (
            <div className="mt-6 border p-8">
              <h2 className="text-2xl">No tiles match these filters.</h2>
              <p className="mt-2 text-muted">Try removing a filter or broadening your search.</p>
              <Link href="/tiles" className="mt-4 inline-block text-primary">Clear Filters</Link>
            </div>
          )}
          <CatalogPagination page={pagination.page} pages={pagination.pages} params={params} />
        </div>
      </div>
    </section>
  );
}
