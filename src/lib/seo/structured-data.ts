import { getSiteUrl } from "@/lib/seo/site-url";

export type BreadcrumbItem = {
  name: string;
  item?: string;
};

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      ...(crumb.item ? { item: getSiteUrl(crumb.item) } : {}),
    })),
  };
}
