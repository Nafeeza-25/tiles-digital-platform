import { tileCategories, type TileCategory } from "@/data/site";
import type { CatalogProduct } from "@/lib/catalog/catalog-filters";

export function getTileCategory(slug: string): TileCategory | undefined {
  return tileCategories.find((category) => category.slug === slug);
}

export function getCategoryProducts(products: CatalogProduct[], categorySlug: string) {
  return products.filter((product) => product.category?.slug === categorySlug);
}
