import { createClient } from "@/lib/supabase/server";
import type { CatalogProduct } from "@/lib/catalog/catalog-filters";

const select = "id,sku,name,slug,short_description,price,sale_price,size_label,width_mm,height_mm,thickness_mm,colour,finish,material,applications,rooms,slip_rating,water_absorption,stock_status,is_featured,is_new,created_at,category:categories(name,slug),product_images(image_url,alt_text,is_primary)";

export async function getCatalogueProducts(): Promise<CatalogProduct[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("products").select(select).eq("is_active", true);

    if (error) return [];

    return (data ?? []).map((product) => ({
      ...product,
      category: Array.isArray(product.category) ? product.category[0] ?? null : product.category,
      product_images: (product.product_images ?? [])
        .filter((image) => image.is_primary)
        .map(({ image_url, alt_text }) => ({ image_url, alt_text })),
    })) as CatalogProduct[];
  } catch {
    return [];
  }
}
