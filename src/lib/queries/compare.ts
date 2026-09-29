import type { CatalogProduct } from "@/lib/catalog/catalog-filters";
import { createClient } from "@/lib/supabase/server";

const compareSelect = "id,sku,name,slug,short_description,price,sale_price,size_label,width_mm,height_mm,thickness_mm,colour,finish,material,applications,rooms,slip_rating,water_absorption,stock_status,is_featured,is_new,created_at,category:categories(name,slug),product_images(image_url,alt_text,is_primary)";

export function normalizeCompareSlugs(value: string | string[] | undefined) {
  const inputs = Array.isArray(value) ? value : value ? [value] : [];
  return Array.from(new Set(inputs.map((slug) => slug.trim()).filter(Boolean))).slice(0, 3);
}

export async function getCompareProducts(slugs: string[]): Promise<CatalogProduct[]> {
  const validSlugs = normalizeCompareSlugs(slugs);
  if (!validSlugs.length) return [];

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("products").select(compareSelect).eq("is_active", true).in("slug", validSlugs);
    if (error) return [];

    const products = (data ?? []).map((product) => ({
      ...product,
      category: Array.isArray(product.category) ? product.category[0] ?? null : product.category,
      product_images: (product.product_images ?? []).filter((image) => image.is_primary).map(({ image_url, alt_text }) => ({ image_url, alt_text })),
    })) as CatalogProduct[];
    const bySlug = new Map(products.map((product) => [product.slug, product]));
    return validSlugs.flatMap((slug) => bySlug.get(slug) ?? []);
  } catch {
    return [];
  }
}
