import Link from "next/link";
import { catalogueHref, type QueryValue } from "@/lib/catalog/catalog-url";

export function CatalogPagination({ basePath = "/tiles", page, pages, params }: { basePath?: string; page: number; pages: number; params: Record<string, QueryValue> }) {
  if (pages <= 1) return null;

  return (
    <nav aria-label="Catalogue pagination" className="mt-8 flex flex-wrap gap-2">
      {page > 1 ? <Link className="border px-3 py-2" href={catalogueHref(basePath, params, { page: String(page - 1) })}>Previous</Link> : <span className="border px-3 py-2 text-muted">Previous</span>}
      {Array.from({ length: pages }, (_, index) => <Link aria-current={page === index + 1 ? "page" : undefined} className="border px-3 py-2" href={catalogueHref(basePath, params, { page: String(index + 1) })} key={index}>{index + 1}</Link>)}
      {page < pages ? <Link className="border px-3 py-2" href={catalogueHref(basePath, params, { page: String(page + 1) })}>Next</Link> : <span className="border px-3 py-2 text-muted">Next</span>}
    </nav>
  );
}
