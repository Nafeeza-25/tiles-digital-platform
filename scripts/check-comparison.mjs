import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
if (!url || !key) throw new Error("Supabase public environment variables are required for comparison verification.");

const supabase = createClient(url, key);
const { data, error } = await supabase.from("products").select("slug,name,price,sale_price,applications,rooms,category:categories(name,slug),product_images(image_url,alt_text,is_primary)").eq("is_active", true).limit(40);
if (error) throw error;
if (!data?.length) throw new Error("No active products are available for comparison.");
for (const product of data) {
  if (!product.slug?.trim()) throw new Error("An active product has no stable comparison slug.");
  const primary = (product.product_images ?? []).filter((image) => image.is_primary);
  if (primary.length !== 1 || !primary[0].image_url.startsWith("/images/products/") || !primary[0].image_url.endsWith(".svg") || !primary[0].alt_text?.trim()) throw new Error(`Comparison image data is invalid for ${product.slug}.`);
}
const samples = ["carrara-white", "urban-concrete-grey", "oakwood-natural"].map((slug) => data.find((product) => product.slug === slug)).filter(Boolean);
if (samples.length !== 3) throw new Error("Required comparison sample slugs did not resolve.");
const requested = ["carrara-white", "carrara-white", "urban-concrete-grey", "oakwood-natural", "not-real"];
const normalized = [...new Set(requested.filter(Boolean))].slice(0, 3);
const resolved = normalized.flatMap((slug) => data.find((product) => product.slug === slug) ?? []);
if (normalized.length !== 3 || resolved.map((product) => product.slug).join(",") !== "carrara-white,urban-concrete-grey,oakwood-natural") throw new Error("Comparison URL normalization or requested order is unsafe.");
for (const product of samples) {
  if (!product.category || Array.isArray(product.category) || !product.category.slug || !product.category.name) throw new Error(`Comparison category data is invalid for ${product.slug}.`);
  if (!Array.isArray(product.applications) || !Array.isArray(product.rooms)) throw new Error(`Comparison arrays are invalid for ${product.slug}.`);
  const effectivePrice = product.sale_price !== null && product.sale_price < product.price ? product.sale_price : product.price;
  if (!Number.isFinite(effectivePrice) || effectivePrice <= 0) throw new Error(`Comparison price is invalid for ${product.slug}.`);
}
console.log(`Comparison verification passed for ${data.length} active products, sample slugs, URL normalization, ordering, images, categories, prices, and array fields.`);
