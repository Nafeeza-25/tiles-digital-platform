import type { MetadataRoute } from "next";
import { tileCategories } from "@/data/site";
import { tileGuides } from "@/data/guides";
import { getCatalogueProducts } from "@/lib/queries/catalog";
import { getSiteUrl } from "@/lib/seo/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/tiles",
    "/collections",
    "/offers",
    "/about",
    "/recommendations",
    "/contact",
    "/stores",
  ].map((route) => ({
    url: getSiteUrl(route),
  }));

  const categoryRoutes: MetadataRoute.Sitemap = tileCategories.map((category) => ({
    url: getSiteUrl(`/tiles/${category.slug}`),
  }));

  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const products = await getCatalogueProducts();
    productRoutes = products
      .filter((product) => product.category && product.category.slug && product.slug)
      .map((product) => ({
        url: getSiteUrl(`/tiles/${product.category!.slug}/${product.slug}`),
      }));
  } catch {
    productRoutes = [];
  }

  const guideRoutes: MetadataRoute.Sitemap = [
    "/guides",
    ...tileGuides.map((guide) => `/guides/${guide.slug}`),
  ].map((route) => ({
    url: getSiteUrl(route),
  }));

  return [...staticRoutes, ...categoryRoutes, ...guideRoutes, ...productRoutes];
}
