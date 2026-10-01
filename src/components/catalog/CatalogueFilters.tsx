import Link from "next/link";
import { CatalogueFilterPanel } from "./CatalogueFilterPanel";
import { CataloguePriceInputs } from "./CataloguePriceInputs";
import { CatalogueQueryInputs } from "@/components/catalog/CatalogueQueryInputs";
import type { CatalogProduct, CatalogState, FilterKey, SearchParams } from "@/lib/catalog/catalog-filters";
import { getFilterOptions } from "@/lib/catalog/catalog-filters";

const labels: Record<FilterKey, string> = {
  size: "Size",
  colour: "Colour",
  finish: "Finish",
  material: "Material",
  application: "Application",
};

const applicationLabels: Record<string, string> = {
  floor: "Floor",
  wall: "Wall",
  indoor: "Indoor",
  outdoor: "Outdoor",
  wet_area: "Wet Area",
};

const filterKeys: FilterKey[] = ["size", "colour", "finish", "material", "application"];

export function CatalogueFilters({ basePath = "/tiles", products, params, state }: { basePath?: string; products: CatalogProduct[]; params: SearchParams; state: CatalogState }) {
  return (
    <CatalogueFilterPanel>
      <form method="get" className="mt-5 grid gap-6">
        <CatalogueQueryInputs params={params} omit={["size", "colour", "finish", "material", "application", "minPrice", "maxPrice", "page"]} />
        {filterKeys.map((key) => (
          <fieldset key={key} className="border-t pt-4">
            <legend className="font-semibold">{labels[key]}</legend>
            <div className="mt-2 grid gap-2">
              {getFilterOptions(products, key).map((value) => (
                <label key={value} className="flex min-h-8 cursor-pointer items-center gap-2 text-sm text-muted">
                  <input type="checkbox" name={key} value={value} defaultChecked={state[key].includes(value)} />
                  {key === "application" ? applicationLabels[value] ?? value : value}
                </label>
              ))}
            </div>
          </fieldset>
        ))}
        <CataloguePriceInputs minPrice={state.minPrice} maxPrice={state.maxPrice} />
        <button className="action-primary">Apply Filters</button>
        <Link href={basePath} className="text-center text-sm text-primary">Clear All</Link>
      </form>
    </CatalogueFilterPanel>
  );
}
