import { PageHero } from "@/components/ui/PageHero";
import type { Metadata } from "next";
import { createOpenGraphMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CompareResults } from "@/components/compare/CompareResults";
import { getCompareProducts, normalizeCompareSlugs } from "@/lib/queries/compare";

export const metadata: Metadata = {
  title: "Compare Tiles",
  description: "Compare Timeless Tiles demo products side by side by price, size, finish, material, application and other catalogue specifications.",
  openGraph: createOpenGraphMetadata("/compare", "Compare Tiles", "Compare Timeless Tiles demo products side by side by price, size, finish, material, application and other catalogue specifications."),
  alternates: { canonical: "/compare" },
};

export default async function ComparePage({ searchParams }: { searchParams: Promise<{ product?: string | string[] }> }) {
  const params = await searchParams;
  const slugs = normalizeCompareSlugs(params.product);
  const products = await getCompareProducts(slugs);
  return <><PageHero eyebrow="Consider the details" title="Compare" accent="Tiles" description="Review the details that matter most before choosing a surface for your project." image="/images/editorial/about-material-detail.webp" alt="Illustrative close-up of tile surfaces for comparison" /><section className="site-container pb-16 pt-6"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Compare Tiles" }]} /><CompareResults products={products} /></section></>;
}
