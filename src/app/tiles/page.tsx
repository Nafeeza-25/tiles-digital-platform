import { PageHero } from "@/components/ui/PageHero";
import { CategoryNavigation } from "@/components/catalog/CategoryNavigation";
import type { Metadata } from "next";
import { createOpenGraphMetadata } from "@/lib/seo/metadata";
import { CatalogueExperience } from "@/components/catalog/CatalogueExperience";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import type { SearchParams } from "@/lib/catalog/catalog-filters";
import { getCatalogueProducts } from "@/lib/queries/catalog";

export const metadata: Metadata = {
  title: "Tile Catalogue",
  description: "Browse floor, wall, bathroom, kitchen and outdoor tiles and filter the Timeless Tiles demo catalogue by size, colour, finish, material, price and application.",
  openGraph: createOpenGraphMetadata("/tiles", "Tile Catalogue", "Browse floor, wall, bathroom, kitchen and outdoor tiles and filter the Timeless Tiles demo catalogue by size, colour, finish, material, price and application."),
  alternates: { canonical: "/tiles" },
};

export default async function TilesPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const [params, products] = await Promise.all([searchParams, getCatalogueProducts()]);
  return <><PageHero compact eyebrow="Explore the catalogue" title="Our Tile" accent="Collections" description="Browse the Timeless Tiles demo catalogue and narrow designs by size, colour, finish, material, price, and application." image="/images/editorial/collections-hero.webp" alt="Architectural living space with polished tile floors" />
    <section className="site-container pb-16 pt-6"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tiles" }]} /><CategoryNavigation selected="all" /><CatalogueExperience products={products} params={params} /></section></>;
}
