import { PageHero } from "@/components/ui/PageHero";
import { CategoryNavigation } from "@/components/catalog/CategoryNavigation";
import type { Metadata } from "next";
import { createOpenGraphMetadata } from "@/lib/seo/metadata";

import Link from "next/link";
import { notFound } from "next/navigation";
import { CatalogueExperience } from "@/components/catalog/CatalogueExperience";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { tileCategories } from "@/data/site";
import type { SearchParams } from "@/lib/catalog/catalog-filters";
import { getCategoryProducts, getTileCategory } from "@/lib/catalog/category-catalogue";
import { getCatalogueProducts } from "@/lib/queries/catalog";

export const dynamicParams = false;

export function generateStaticParams() {
  return tileCategories.map(({ slug }) => ({ categorySlug: slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ categorySlug: string }> }): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = getTileCategory(categorySlug);

  if (!category) return {};

  const description = `${category.description} Explore the Timeless Tiles academic demonstration catalogue.`;
  return {
    title: category.label,
    description,
    openGraph: createOpenGraphMetadata(`/tiles/${categorySlug}`, category.label, description),
    alternates: { canonical: `/tiles/${categorySlug}` },
  };
}

export default async function CategoryCataloguePage({ params, searchParams }: { params: Promise<{ categorySlug: string }>; searchParams: Promise<SearchParams> }) {
  const [{ categorySlug }, query] = await Promise.all([params, searchParams]);
  const category = getTileCategory(categorySlug);
  if (!category) notFound();
  const products = getCategoryProducts(await getCatalogueProducts(), category.slug);
  return <><PageHero compact eyebrow="Find your surface" title={category.label.replace(" Tiles", "")} accent="Tiles" description={category.description} image={category.image} alt={`Illustrative ${category.label.toLowerCase()} architectural setting`} />
    <section className="site-container pb-16 pt-6">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tiles", href: "/tiles" }, { label: category.label }]} />
      <CategoryNavigation selected={category.slug} />
      <div className="flex flex-wrap gap-4 text-sm font-semibold"><Link href="/tiles" className="text-primary hover:underline">View All Tiles</Link>{category.slug === "bathroom-tiles" ? <Link href="/guides/how-to-choose-bathroom-tiles" className="text-primary hover:underline">Bathroom Tile Guide</Link> : null}{category.slug === "floor-tiles" ? <Link href="/guides/floor-tile-size-finish-material-guide" className="text-primary hover:underline">Floor Tile Guide</Link> : null}</div>
      <CatalogueExperience basePath={category.href} categoryLabel={category.label} products={products} params={query} />
    </section></>;
}
