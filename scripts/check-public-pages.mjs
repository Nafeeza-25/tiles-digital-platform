import { readFile } from "node:fs/promises";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
if (!url || !key) throw new Error("Supabase public environment variables are required.");

const client = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });

// 1. Verify catalogue count
const select = "id,sku,name,slug,short_description,price,sale_price,size_label,colour,finish,material,applications,rooms,is_featured,is_new,is_active,category:categories(name,slug),product_images(image_url,alt_text,is_primary)";
const { data: rawProducts, error } = await client.from("products").select(select).eq("is_active", true);

if (error) throw new Error(`Failed to fetch active products: ${error.message}`);
if (rawProducts.length !== 40) throw new Error(`Expected 40 active products, found ${rawProducts.length}.`);

const products = rawProducts.map((p) => ({
  ...p,
  category: Array.isArray(p.category) ? p.category[0] ?? null : p.category,
  product_images: (p.product_images ?? []).filter((img) => img.is_primary),
}));

// Verify every product has valid category, detail route data, primary image
for (const p of products) {
  if (!p.category || !p.category.slug) throw new Error(`Product ${p.slug} missing valid category.`);
  if (!p.product_images || p.product_images.length === 0) throw new Error(`Product ${p.slug} missing primary image.`);
}

// 2. Editorial collections test
const featured = products.filter((p) => Boolean(p.is_featured));
const newArrivals = products.filter((p) => Boolean(p.is_new));
const saleSelection = products.filter((p) => p.sale_price !== null && p.sale_price > 0 && p.sale_price < p.price);
const outdoor = products.filter((p) => p.rooms.includes("outdoor") || p.applications.includes("outdoor"));
const wetArea = products.filter((p) => p.applications.includes("wet_area"));

if (featured.length === 0) throw new Error("Featured collection has 0 products.");
if (newArrivals.length === 0) throw new Error("New Arrivals collection has 0 products.");
if (saleSelection.length === 0) throw new Error("Sale selection collection has 0 products.");
if (outdoor.length === 0) throw new Error("Outdoor collection has 0 products.");
if (wetArea.length === 0) throw new Error("Wet area collection has 0 products.");

// Verify offer discount mathematics on sale products
for (const p of saleSelection) {
  const savings = p.price - p.sale_price;
  if (savings <= 0) throw new Error(`Invalid savings for product ${p.slug}.`);
  const percent = Math.round((savings / p.price) * 100);
  if (percent <= 0 || percent >= 100) throw new Error(`Invalid discount percentage (${percent}%) for product ${p.slug}.`);
}

// Verify no hardcoded product IDs in collections module code
const collectionsCode = await readFile("src/lib/collections/collections.ts", "utf8");
if (/id:\s*"[a-f0-9-]{36}"/i.test(collectionsCode)) throw new Error("Hardcoded UUIDs detected in collections module.");

// Verify public security policies remain intact
const { error: enquiriesError } = await client.from("enquiries").select("id").limit(1);
if (!enquiriesError) throw new Error("SECURITY FAILURE - enquiries are publicly readable.");

const { data: pendingReviews, error: pendingError } = await client.from("reviews").select("id").eq("is_approved", false).limit(1);
if (pendingError || pendingReviews.length) throw new Error("SECURITY FAILURE - pending reviews are publicly readable.");

console.log("Public pages verification passed: 40 active products, editorial collections, valid offer discount math, no hardcoded product IDs, and security policies intact.");
