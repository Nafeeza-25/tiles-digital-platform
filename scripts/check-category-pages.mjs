import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const expectedCategories = new Map([
  ["floor-tiles", 8],
  ["wall-tiles", 8],
  ["bathroom-tiles", 8],
  ["kitchen-tiles", 8],
  ["outdoor-tiles", 8],
]);

if (!url || !key) throw new Error("Missing Supabase environment variables.");

const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
const { data: categories, error: categoryError } = await supabase.from("categories").select("slug,is_active").eq("is_active", true);
const { data: products, error: productError } = await supabase.from("products").select("name,colour,finish,material,price,sale_price,size_label,applications,category:categories(slug)").eq("is_active", true);

if (categoryError || productError) throw new Error(`Public catalogue read failed (${categoryError?.code ?? productError?.code ?? "unknown"})`);

const check = (condition, message) => {
  if (!condition) throw new Error(message);
  console.log(`PASS - ${message}`);
};
const categorySlug = (product) => Array.isArray(product.category) ? product.category[0]?.slug : product.category?.slug;
const inCategory = (slug) => products.filter((product) => categorySlug(product) === slug);
const effectivePrice = (product) => product.sale_price !== null && product.sale_price < product.price ? product.sale_price : product.price;
const optionValues = (items, key) => new Set(items.flatMap((product) => key === "application" ? product.applications : [product[key]]));

check(categories.length === 5 && categories.every((category) => expectedCategories.has(category.slug)), "exactly five expected active categories exist");

for (const [slug, count] of expectedCategories) {
  const items = inCategory(slug);
  check(items.length === count, `${slug} has ${count} active products`);
  check(items.every((product) => categorySlug(product) === slug), `${slug} product isolation`);
  for (const key of ["size_label", "colour", "finish", "material", "application"]) {
    const options = optionValues(items, key);
    check([...options].every((option) => optionValues(items, key).has(option)), `${slug} ${key} options derive from its products`);
  }
  check(Math.ceil(items.length / 12) === 1, `${slug} paginates to one page at 12 items`);
}

const floorSearch = inCategory("floor-tiles").filter((product) => product.name.toLowerCase().includes("carrara"));
const bathroomSearch = inCategory("bathroom-tiles").filter((product) => product.name.toLowerCase().includes("carrara"));
check(floorSearch.length > 0 && bathroomSearch.length === 0, "category search does not leak Carrara products into bathroom tiles");

const outdoorFiltered = inCategory("outdoor-tiles").filter((product) => product.applications.includes("outdoor") && product.finish === "Textured");
check(outdoorFiltered.length > 0 && outdoorFiltered.every((product) => categorySlug(product) === "outdoor-tiles" && product.applications.includes("outdoor") && product.finish === "Textured"), "category filter results preserve category and requested filters");

const saleProduct = inCategory("floor-tiles").find((product) => product.sale_price !== null && product.sale_price < product.price);
check(Boolean(saleProduct) && effectivePrice(saleProduct) === saleProduct.sale_price, "category effective pricing uses sale price when applicable");
check(!expectedCategories.has("not-a-real-category"), "unsupported category slug is invalid");
