import type { Metadata } from "next";
import { createOpenGraphMetadata } from "@/lib/seo/metadata";
import Image from "next/image";
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

  return (
    <section className="site-container py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tiles", href: "/tiles" }, { label: category.label }]} />
      <div className="mt-6 grid items-center gap-6 border bg-surface p-6 md:grid-cols-[1fr_minmax(14rem,22rem)]">
        <div>
          <h1 className="text-4xl">{category.label}</h1>
          <p className="mt-3 max-w-2xl text-muted">{category.description}</p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold">
            <Link href="/tiles" className="text-primary hover:underline">View All Tiles <span aria-hidden>→</span></Link>
            {category.slug === "bathroom-tiles" && (
              <Link href="/guides/how-to-choose-bathroom-tiles" className="text-primary hover:underline">
                Bathroom Tile Guide <span aria-hidden>→</span>
              </Link>
            )}
            {category.slug === "floor-tiles" && (
              <Link href="/guides/floor-tile-size-finish-material-guide" className="text-primary hover:underline">
                Floor Tile Guide <span aria-hidden>→</span>
              </Link>
            )}
          </div>
        </div>
        <Image src={category.image} alt={`${category.label} category visual`} width={1600} height={1000} unoptimized className="w-full border bg-surface-muted" />
      </div>
      <CatalogueExperience basePath={category.href} categoryLabel={category.label} products={products} params={query} />
    </section>
  );
}
