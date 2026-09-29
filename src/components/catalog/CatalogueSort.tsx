import { CatalogueQueryInputs } from "@/components/catalog/CatalogueQueryInputs";
import type { CatalogState, SearchParams } from "@/lib/catalog/catalog-filters";

export function CatalogueSort({ params, state }: { params: SearchParams; state: CatalogState }) {
  return (
    <form method="get">
      <CatalogueQueryInputs params={params} omit={["sort", "page"]} />
      <label className="text-sm font-semibold">
        Sort
        <select name="sort" defaultValue={state.sort} className="ml-2 border p-2">
          <option value="recommended">Recommended</option>
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A–Z</option>
        </select>
      </label>
      <button className="ml-2 text-sm text-primary">Apply</button>
    </form>
  );
}
