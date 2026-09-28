import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!url || !publishableKey) {
  console.error("FAIL - Missing required Supabase environment variables.");
  process.exit(1);
}

const supabase = createClient(url, publishableKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

let hasFailure = false;

function pass(message) {
  console.log(`PASS - ${message}`);
}

function fail(message) {
  console.error(`FAIL - ${message}`);
  hasFailure = true;
}

async function countRows(table, configure) {
  let query = supabase.from(table).select("*", { count: "exact", head: true });
  query = configure ? configure(query) : query;
  const { count, error } = await query;

  if (error) {
    fail(`${table} count check (${error.code ?? "unknown error"})`);
    return null;
  }

  return count ?? 0;
}

function expectEqual(label, actual, expected) {
  if (actual === expected) {
    pass(`${label} = ${expected}`);
  } else {
    fail(`${label} expected ${expected}, found ${actual}`);
  }
}

const categoriesResult = await supabase
  .from("categories")
  .select("id, slug")
  .order("sort_order");

if (categoriesResult.error) {
  fail(`categories lookup (${categoriesResult.error.code ?? "unknown error"})`);
} else {
  expectEqual("categories count", categoriesResult.data.length, 5);

  for (const category of categoriesResult.data) {
    const productCount = await countRows("products", (query) =>
      query.eq("category_id", category.id).eq("is_active", true),
    );

    if (productCount !== null) {
      expectEqual(`${category.slug} active products`, productCount, 8);
    }
  }
}

const productCount = await countRows("products");
if (productCount !== null) {
  expectEqual("products count", productCount, 40);
}

const storeCount = await countRows("stores");
if (storeCount !== null) {
  expectEqual("stores count", storeCount, 3);
}

const approvedReviewCount = await countRows("reviews");
if (approvedReviewCount !== null) {
  expectEqual("public approved reviews count", approvedReviewCount, 24);
  if (approvedReviewCount === 24) {
    pass("unapproved review is not publicly visible");
  }
}

const imageCount = await countRows("product_images");
if (imageCount === 0) {
  console.log("PENDING BY DESIGN - product_images count = 0");
} else if (imageCount !== null) {
  fail(`product_images expected 0, found ${imageCount}`);
}

const { error: enquiriesError } = await supabase
  .from("enquiries")
  .select("*")
  .limit(1);

if (enquiriesError) {
  pass("enquiries are NOT publicly readable");
} else {
  fail("SECURITY FAILURE - enquiries are publicly readable");
}

const { data: products, error: productsError } = await supabase
  .from("products")
  .select(
    "size_label, colour, finish, material, applications, rooms, price, sale_price, name, sku, slug",
  );

if (productsError) {
  fail(`product data-quality check (${productsError.code ?? "unknown error"})`);
} else {
  const sizes = new Set(products.map((product) => product.size_label));
  const colours = new Set(products.map((product) => product.colour));
  const finishes = new Set(products.map((product) => product.finish));
  const materials = new Set(products.map((product) => product.material));
  const applications = new Set(products.flatMap((product) => product.applications ?? []));
  const rooms = new Set(products.flatMap((product) => product.rooms ?? []));

  if (sizes.size >= 5) pass(`unique size labels = ${sizes.size}`);
  else fail(`at least 5 unique size labels required, found ${sizes.size}`);

  if (colours.size >= 8) pass(`unique colours = ${colours.size}`);
  else fail(`at least 8 unique colours required, found ${colours.size}`);

  if (finishes.size >= 5) pass(`unique finishes = ${finishes.size}`);
  else fail(`at least 5 unique finishes required, found ${finishes.size}`);

  if (materials.size >= 4) pass(`unique materials = ${materials.size}`);
  else fail(`at least 4 unique materials required, found ${materials.size}`);

  for (const application of ["floor", "wall", "indoor", "outdoor", "wet_area"]) {
    if (applications.has(application)) pass(`application present: ${application}`);
    else fail(`missing application: ${application}`);
  }

  for (const room of [
    "living_room",
    "bedroom",
    "bathroom",
    "kitchen",
    "balcony",
    "outdoor",
    "commercial",
  ]) {
    if (rooms.has(room)) pass(`room tag present: ${room}`);
    else fail(`missing room tag: ${room}`);
  }

  for (const product of products) {
    if (product.price <= 0) fail(`non-positive price found for ${product.sku}`);
    if (product.sale_price !== null && product.sale_price >= product.price) {
      fail(`invalid sale price found for ${product.sku}`);
    }
    if (!product.name.trim()) fail("blank product name found");
    if (!product.sku.trim()) fail("blank SKU found");
    if (!product.slug.trim()) fail("blank product slug found");
  }

  if (!hasFailure) {
    pass("product prices and required identifiers are valid");
  }
}

if (hasFailure) {
  process.exit(1);
}
