import Link from "next/link";
import { ActiveFilters } from "@/components/catalog/ActiveFilters";
import { CatalogueFilters } from "@/components/catalog/CatalogueFilters";
import { CatalogPagination } from "@/components/catalog/CatalogPagination";
import { CatalogueQueryInputs } from "@/components/catalog/CatalogueQueryInputs";
import { CatalogueSort } from "@/components/catalog/CatalogueSort";
import { ProductCard } from "@/components/products/ProductCard";
import { filterProducts, paginate, parseCatalogState, sortProducts, type CatalogProduct, type SearchParams } from "@/lib/catalog/catalog-filters";

export function CatalogueExperience({ basePath = "/tiles", categoryLabel, products, params }: { basePath?: string; categoryLabel?: string; products: CatalogProduct[]; params: SearchParams }) {
  const state = parseCatalogState(params);
  const matchingProducts = sortProducts(filterProducts(products, state), state.sort);
  const pagination = paginate(matchingProducts, state.page);
  const resultText = categoryLabel ? (matchingProducts.length === products.length ? `${products.length} ${categoryLabel}` : `${matchingProducts.length} of ${products.length} ${categoryLabel} matching these filters`) : `${matchingProducts.length} matching tiles · Page ${pagination.page} of ${pagination.pages}`;

  return (
    <>
      <div className="mt-5 grid gap-7 lg:grid-cols-[14rem_minmax(0,1fr)]">
        <aside><CatalogueFilters basePath={basePath} products={products} params={params} state={state} /></aside>
        <div className="min-w-0">
          <form id="catalogue-search" method="get" className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
            <CatalogueQueryInputs params={params} omit={["q", "page"]} />
            <div>
              <label htmlFor="q" className="text-sm font-semibold">Search tiles</label>
              <input id="q" name="q" defaultValue={state.q} placeholder="Search tiles, colours, materials..." className="field mt-2 w-full" />
            </div>
            <button className="action-primary self-end">Search</button>
          </form>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
            <p className="text-sm text-muted">{resultText}</p>
            <CatalogueSort params={params} state={state} />
          </div>
          <ActiveFilters basePath={basePath} params={params} />
          {pagination.items.length ? (
            <div className="catalogue-result-grid mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {pagination.items.map((product) => <ProductCard key={product.id} product={product} href={product.category ? `/tiles/${product.category.slug}/${product.slug}` : null} ctaLabel="View Tile" />)}
            </div>
          ) : (
            <div className="mt-6 border p-8">
              <h2 className="text-2xl">No {categoryLabel ?? "tiles"} match these filters.</h2>
              <p className="mt-2 text-muted">Try removing a filter or broadening your search.</p>
              <Link href={basePath} className="mt-4 inline-block text-primary">Clear Filters</Link>
            </div>
          )}
          <CatalogPagination basePath={basePath} page={pagination.page} pages={pagination.pages} params={params} />
        </div>
      </div>
    </>
  );
}
