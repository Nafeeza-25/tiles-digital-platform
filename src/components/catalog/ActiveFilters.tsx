import Link from "next/link";
import { catalogueHref, type QueryValue } from "@/lib/catalog/catalog-url";

const keys = ["q", "size", "colour", "finish", "material", "application", "minPrice", "maxPrice"] as const;

export function ActiveFilters({ basePath = "/tiles", params }: { basePath?: string; params: Record<string, QueryValue> }) {
  const entries = keys.flatMap((key) => {
    const value = params[key];
    return (Array.isArray(value) ? value : value ? [value] : []).map((item) => [key, item] as const);
  });

  if (!entries.length) return null;

  return (
    <div className="mt-4 flex flex-wrap gap-2 text-sm">
      {entries.map(([key, value]) => {
        const values = Array.isArray(params[key]) ? params[key] : [params[key] as string];
        const remaining = values.filter((item) => item !== value);
        return <Link key={`${key}-${value}`} className="border px-2 py-1" href={catalogueHref(basePath, params, { [key]: remaining, page: undefined })}>{key}: {value} ×</Link>;
      })}
      <Link href={basePath} className="px-2 py-1 text-primary">Clear All</Link>
    </div>
  );
}
