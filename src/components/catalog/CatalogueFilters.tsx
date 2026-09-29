import Link from "next/link";
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
    <details open className="border bg-surface p-4">
      <summary className="cursor-pointer font-semibold">Filters</summary>
      <form method="get" className="mt-5 grid gap-6">
        <CatalogueQueryInputs params={params} omit={["size", "colour", "finish", "material", "application", "minPrice", "maxPrice", "page"]} />
        {filterKeys.map((key) => (
          <fieldset key={key}>
            <legend className="font-semibold">{labels[key]}</legend>
            <div className="mt-2 grid gap-2">
              {getFilterOptions(products, key).map((value) => (
                <label key={value} className="flex gap-2 text-sm">
                  <input type="checkbox" name={key} value={value} defaultChecked={state[key].includes(value)} />
                  {key === "application" ? applicationLabels[value] ?? value : value}
                </label>
              ))}
            </div>
          </fieldset>
        ))}
        <label className="text-sm font-semibold">
          Minimum price
          <input type="number" name="minPrice" min="0" defaultValue={state.minPrice ?? ""} className="mt-1 w-full border p-2" />
        </label>
        <label className="text-sm font-semibold">
          Maximum price
          <input type="number" name="maxPrice" min="0" defaultValue={state.maxPrice ?? ""} className="mt-1 w-full border p-2" />
        </label>
        <button className="bg-primary px-4 py-3 text-primary-foreground">Apply Filters</button>
        <Link href={basePath} className="text-center text-sm text-primary">Clear All</Link>
      </form>
    </details>
  );
}
