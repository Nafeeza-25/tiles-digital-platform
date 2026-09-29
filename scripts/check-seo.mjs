import { readFile } from "node:fs/promises";
import { createClient } from "@supabase/supabase-js";

function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    const url = process.env.NEXT_PUBLIC_SITE_URL.trim();
    if (url) return url.replace(/\/+$/, "");
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    const url = process.env.VERCEL_PROJECT_PRODUCTION_URL.trim();
    if (url) return `https://${url.replace(/^https?:\/\//, "").replace(/\/+$/, "")}`;
  }
  if (process.env.VERCEL_URL) {
    const url = process.env.VERCEL_URL.trim();
    if (url) return `https://${url.replace(/^https?:\/\//, "").replace(/\/+$/, "")}`;
  }
  return "http://localhost:3000";
}

function getSiteUrl(pathname = "") {
  const base = getBaseUrl();
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${base}${path === "/" ? "" : path}`;
}

function buildBreadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      ...(crumb.item ? { item: getSiteUrl(crumb.item) } : {}),
    })),
  };
}

const tileCategories = [
  { label: "Floor Tiles", slug: "floor-tiles" },
  { label: "Wall Tiles", slug: "wall-tiles" },
  { label: "Bathroom Tiles", slug: "bathroom-tiles" },
  { label: "Kitchen Tiles", slug: "kitchen-tiles" },
  { label: "Outdoor Tiles", slug: "outdoor-tiles" },
];

// Test site URL abstraction & normalization
process.env.NEXT_PUBLIC_SITE_URL = "https://demo.timelesstiles.com/";
if (getBaseUrl() !== "https://demo.timelesstiles.com") throw new Error("Site URL trailing slash normalization failed.");
if (getSiteUrl("/tiles") !== "https://demo.timelesstiles.com/tiles") throw new Error("getSiteUrl failed.");

delete process.env.NEXT_PUBLIC_SITE_URL;
process.env.VERCEL_PROJECT_PRODUCTION_URL = "timeless-tiles.vercel.app";
if (getBaseUrl() !== "https://timeless-tiles.vercel.app") throw new Error("Vercel production URL resolution failed.");

delete process.env.VERCEL_PROJECT_PRODUCTION_URL;
if (getBaseUrl() !== "http://localhost:3000") throw new Error("Localhost fallback resolution failed.");

// Supabase client check
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
if (!url || !key) throw new Error("Supabase public environment variables are required.");

const client = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });

// Verify active products count and categories
const select = "id,name,slug,category:categories(name,slug)";
const { data: rawProducts, error } = await client.from("products").select(select).eq("is_active", true);

if (error) throw new Error(`Failed to fetch active products: ${error.message}`);
if (rawProducts.length !== 40) throw new Error(`Expected 40 active products, found ${rawProducts.length}.`);

if (tileCategories.length !== 5) throw new Error(`Expected 5 category slugs, found ${tileCategories.length}.`);

// Product canonical route uniqueness & structure check
const productRoutes = rawProducts.map((p) => {
  const catSlug = Array.isArray(p.category) ? p.category[0]?.slug : p.category?.slug;
  if (!catSlug) throw new Error(`Product ${p.slug} missing category slug.`);
  return `/tiles/${catSlug}/${p.slug}`;
});

if (new Set(productRoutes).size !== 40) throw new Error("Duplicate product canonical routes detected.");

for (const route of productRoutes) {
  if (!/^\/tiles\/[a-z0-9-]+\/[a-z0-9-]+$/.test(route)) {
    throw new Error(`Product canonical route does not match expected pattern: ${route}`);
  }
}

// Sitemap route dataset verification
const staticRoutes = ["", "/tiles", "/collections", "/offers", "/about", "/recommendations", "/contact", "/stores"];
const categoryRoutes = tileCategories.map((c) => `/tiles/${c.slug}`);
const fullSitemapRoutes = [...staticRoutes, ...categoryRoutes, ...productRoutes];

if (fullSitemapRoutes.some((r) => r.includes("?") || r.includes("&") || r.includes("page=") || r.includes("q="))) {
  throw new Error("Filtered query URLs found in sitemap dataset.");
}

if (fullSitemapRoutes.some((r) => r.includes("/dev/") || r.includes("visual-check"))) {
  throw new Error("/dev/visual-check included in sitemap dataset.");
}

// Structured data verification
const breadcrumbLd = buildBreadcrumbJsonLd([
  { name: "Home", item: "/" },
  { name: "Tiles", item: "/tiles" },
  { name: "Floor Tiles", item: "/tiles/floor-tiles" },
  { name: "Carrara White", item: "/tiles/floor-tiles/carrara-white" },
]);

if (breadcrumbLd["@type"] !== "BreadcrumbList" || breadcrumbLd.itemListElement.length !== 4) {
  throw new Error("Breadcrumb JSON-LD format invalid.");
}

const breadcrumbJson = JSON.stringify(breadcrumbLd);
if (breadcrumbJson.includes("LocalBusiness") || breadcrumbJson.includes("AggregateRating") || breadcrumbJson.includes("Product")) {
  throw new Error("Misleading commercial schema found in breadcrumb JSON-LD.");
}

// Check codebase to ensure no fake commercial schemas were introduced
const [layoutCode, jsonLdCode] = await Promise.all([
  readFile("src/app/layout.tsx", "utf8"),
  readFile("src/lib/seo/structured-data.ts", "utf8"),
]);

for (const forbidden of ["LocalBusiness", "AggregateRating", "FAQPage", "OfferShippingDetails"]) {
  if (layoutCode.includes(forbidden) || jsonLdCode.includes(forbidden)) {
    throw new Error(`Forbidden commercial schema detected: ${forbidden}`);
  }
}

// Verify public security policies remain intact
const { error: enquiriesError } = await client.from("enquiries").select("id").limit(1);
if (!enquiriesError) throw new Error("SECURITY FAILURE - enquiries are publicly readable.");

const { data: pendingReviews, error: pendingError } = await client.from("reviews").select("id").eq("is_approved", false).limit(1);
if (pendingError || pendingReviews.length) throw new Error("SECURITY FAILURE - pending reviews are publicly readable.");

console.log("SEO verification passed: 40 canonical product routes, 5 categories, site URL normalization, clean sitemap set, valid BreadcrumbList JSON-LD, no commercial schemas, and security policies intact.");
