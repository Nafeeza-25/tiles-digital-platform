import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbJsonLd } from "@/lib/seo/structured-data";

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  const jsonLdData = buildBreadcrumbJsonLd(
    items.map((item) => ({ name: item.label, item: item.href }))
  );

  return (
    <>
      <JsonLd data={jsonLdData} />
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted">
        <ol className="flex flex-wrap gap-2">
          {items.map((item, i) => (
            <li key={item.label} className="flex gap-2">
              {i > 0 && <span aria-hidden>/</span>}
              {item.href ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span aria-current="page">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
