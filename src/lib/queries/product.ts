import { createClient } from "@/lib/supabase/server";
import type { CatalogProduct } from "@/lib/catalog/catalog-filters";

export type ProductReview = { id: string; rating: number; title: string | null; comment: string; customer_name: string; created_at: string };
export type ProductDetail = CatalogProduct & { category_id: string; description: string | null; product_images: { image_url: string; alt_text: string | null; sort_order: number; is_primary: boolean }[]; reviews: ProductReview[] };

const productSelect = "id,category_id,sku,name,slug,short_description,description,price,sale_price,size_label,width_mm,height_mm,thickness_mm,colour,finish,material,applications,rooms,slip_rating,water_absorption,stock_status,is_featured,is_new,created_at,category:categories(name,slug),product_images(image_url,alt_text,sort_order,is_primary)";

export async function getProductDetail(categorySlug: string, productSlug: string): Promise<ProductDetail | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("products").select(productSelect).eq("slug", productSlug).eq("is_active", true).maybeSingle();
    if (error || !data) return null;
    const category = Array.isArray(data.category) ? data.category[0] ?? null : data.category;
    if (category?.slug !== categorySlug) return null;
    const { data: reviews } = await supabase.from("reviews").select("id,rating,title,comment,customer_name,created_at").eq("product_id", data.id).eq("is_approved", true).order("created_at", { ascending: false });
    return { ...data, category, product_images: (data.product_images ?? []).sort((left, right) => Number(right.is_primary) - Number(left.is_primary) || left.sort_order - right.sort_order), reviews: reviews ?? [] } as ProductDetail;
  } catch {
    return null;
  }
}

export async function getRelatedProducts(product: ProductDetail): Promise<CatalogProduct[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("products").select("id,sku,name,slug,short_description,price,sale_price,size_label,width_mm,height_mm,thickness_mm,colour,finish,material,applications,rooms,slip_rating,water_absorption,stock_status,is_featured,is_new,created_at,category:categories(name,slug),product_images(image_url,alt_text,is_primary)").eq("is_active", true).eq("category_id", product.category_id).neq("id", product.id).limit(4);
    if (error) return [];
    return (data ?? []).map((item) => ({ ...item, category: Array.isArray(item.category) ? item.category[0] ?? null : item.category, product_images: (item.product_images ?? []).filter((image) => image.is_primary).map(({ image_url, alt_text }) => ({ image_url, alt_text })) })) as CatalogProduct[];
  } catch {
    return [];
  }
}
