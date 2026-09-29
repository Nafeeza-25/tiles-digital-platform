import type { SearchParams } from "@/lib/catalog/catalog-filters";

export function CatalogueQueryInputs({ params, omit = [] }: { params: SearchParams; omit?: string[] }) {
  return (
    <>
      {Object.entries(params).flatMap(([key, value]) => {
        if (omit.includes(key) || value === undefined) return [];
        return (Array.isArray(value) ? value : [value]).map((item, index) => <input key={`${key}-${item}-${index}`} type="hidden" name={key} value={item} />);
      })}
    </>
  );
}
