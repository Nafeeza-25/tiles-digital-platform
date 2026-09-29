import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

export const DEFAULT_BASE_URL = "https://tiles-digital-platform.vercel.app";
const expectedCategorySlugs = ["floor-tiles", "wall-tiles", "bathroom-tiles", "kitchen-tiles", "outdoor-tiles"];
const expectedGuideSlugs = [
  "how-to-choose-bathroom-tiles",
  "floor-tile-size-finish-material-guide",
  "how-to-choose-tiles-for-each-room",
  "tiles-near-me-guide",
  "how-to-choose-a-tile-company",
];
const expectedHeaders = {
  "x-content-type-options": "nosniff",
  "referrer-policy": "strict-origin-when-cross-origin",
  "permissions-policy": "camera=(), microphone=(), geolocation=()",
  "x-frame-options": "SAMEORIGIN",
};
const privateMarkers = [
  /service_role/i,
  /SUPABASE_(?:SECRET|SERVICE|ADMIN)/i,
  /\bDATABASE_URL\b/i,
  /-----BEGIN (?:RSA )?PRIVATE KEY-----/i,
  /\b(?:github_pat_|ghp_)[a-z0-9_]{20,}/i,
  /\bsb_secret_[a-z0-9_-]{8,}/i,
  /\bVERCEL_TOKEN\b/i,
  /postgres(?:ql)?:\/\//i,
];

export function normalizeBaseUrl(value) {
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error("Deployment URL must be a valid HTTP(S) origin.");
  }
  if (!(["http:", "https:"].includes(url.protocol)) || url.username || url.password || url.search || url.hash || (url.pathname !== "/" && url.pathname !== "")) {
    throw new Error("Deployment URL must be a credential-free HTTP(S) origin without a path, query, or fragment.");
  }
  return new URL(url.origin);
}

export function readMetaContent(html, property) {
  const escaped = property.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const tag = html.match(new RegExp(`<meta\\b(?=[^>]*(?:property|name)=["']${escaped}["'])[^>]*>`, "i"))?.[0];
  if (!tag) return null;
  return tag.match(/\bcontent=["']([^"']*)["']/i)?.[1] ?? null;
}

export function readCanonicalHref(html) {
  const tag = html.match(/<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/i)?.[0];
  return tag?.match(/\bhref=["']([^"']*)["']/i)?.[1] ?? null;
}

export function inspectSitemap(xml, expectedOrigin) {
  const urls = [...xml.matchAll(/<loc>\s*([\s\S]*?)\s*<\/loc>/gi)].map((match) => match[1].replaceAll("&amp;", "&").trim());
  const paths = [];
  const errors = [];
  for (const value of urls) {
    try {
      const url = new URL(value);
      paths.push(url.pathname);
      if (url.origin !== expectedOrigin) errors.push("sitemap includes a URL outside the production origin");
      if (url.search || url.hash) errors.push("sitemap includes a query or fragment URL");
      if (url.pathname === "/dev" || url.pathname.startsWith("/dev/")) errors.push("sitemap includes a development route");
    } catch {
      errors.push("sitemap includes an invalid URL");
    }
  }

  if (urls.length !== 59) errors.push(`sitemap URL count is ${urls.length}; expected 59`);
  const required = ["/", "/tiles", "/collections", "/offers", "/about", "/recommendations", "/contact", "/stores", "/guides"];
  required.push(...expectedCategorySlugs.map((slug) => `/tiles/${slug}`));
  required.push(...expectedGuideSlugs.map((slug) => `/guides/${slug}`));
  for (const path of required) if (!paths.includes(path)) errors.push(`sitemap is missing ${path}`);
  const productPaths = paths.filter((path) => /^\/tiles\/[a-z0-9-]+\/[a-z0-9-]+$/.test(path));
  if (productPaths.length !== 40) errors.push(`sitemap has ${productPaths.length} product routes; expected 40`);
  return { urls, paths, productPaths, errors };
}

export function containsPrivateMarker(content) {
  return privateMarkers.some((marker) => marker.test(content));
}

function parseBaseUrlArgument(args) {
  let value = DEFAULT_BASE_URL;
  for (let index = 0; index < args.length; index++) {
    const arg = args[index];
    if (arg === "--base-url" && args[index + 1]) value = args[++index];
    else if (arg.startsWith("--base-url=")) value = arg.slice("--base-url=".length);
    else throw new Error("Supported option: --base-url <HTTP(S) origin>.");
  }
  return normalizeBaseUrl(value);
}

async function mapLimit(items, limit, callback) {
  const results = new Array(items.length);
  let next = 0;
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const index = next++;
      results[index] = await callback(items[index], index);
    }
  }));
  return results;
}

export async function checkDeployment(baseUrl = DEFAULT_BASE_URL, fetchImpl = fetch, log = console) {
  const base = normalizeBaseUrl(baseUrl instanceof URL ? baseUrl.href : baseUrl);
  let failures = 0;
  function check(condition, message) {
    if (condition) log.log(`PASS ${message}`);
    else {
      log.error(`FAIL ${message}`);
      failures++;
    }
  }

  async function request(path, expectedStatus = 200) {
    try {
      const url = new URL(path, base);
      const response = await fetchImpl(url, { method: "GET", redirect: "follow", signal: AbortSignal.timeout(15000) });
      check(response.status === expectedStatus, `GET ${path} returns HTTP ${expectedStatus}`);
      check(new URL(response.url).origin === base.origin, `GET ${path} remains on the configured production origin`);
      const body = path === "/opengraph-image" ? Buffer.from(await response.arrayBuffer()) : await response.text();
      return { response, body };
    } catch {
      check(false, `GET ${path} completes without a network or response error`);
      return null;
    }
  }

  const pagePaths = [
    "/", "/tiles",
    ...expectedCategorySlugs.map((slug) => `/tiles/${slug}`),
    "/tiles/floor-tiles/carrara-white",
    "/collections", "/offers", "/about", "/compare", "/recommendations", "/recommendations?room=bathroom",
    "/contact", "/contact?intent=quote", "/contact?intent=product&product=carrara-white",
    "/stores", "/stores?q=Central", "/guides", ...expectedGuideSlugs.map((slug) => `/guides/${slug}`),
    "/tiles?q=white",
  ];
  const pages = new Map();
  await mapLimit(pagePaths, 6, async (path) => {
    const result = await request(path);
    if (!result || typeof result.body !== "string") return;
    pages.set(path, result);
    check(/<main\b/i.test(result.body) && /<h1\b/i.test(result.body), `${path} renders its page content and heading`);
    check(!/Application error:|Internal Server Error|Unhandled Server Error|This page could not be rendered/i.test(result.body), `${path} has no visible server-error page`);
    check(!containsPrivateMarker(result.body), `${path} HTML has no obvious private-secret marker`);
  });

  const home = pages.get("/")?.body ?? "";
  check(/Timeless Tiles/i.test(home) && /<nav\b/i.test(home), "homepage contains Timeless Tiles branding and navigation");
  const catalogue = pages.get("/tiles")?.body ?? "";
  check(/40 matching tiles/i.test(catalogue) && /Search tiles/i.test(catalogue), "catalogue exposes the 40-product dataset and search interface");
  const search = pages.get("/tiles?q=white")?.body ?? "";
  check(/7 matching tiles/i.test(search) && /Carrara White|Arctic Subway White/i.test(search), "catalogue search query returns matching product results");
  const product = pages.get("/tiles/floor-tiles/carrara-white")?.body ?? "";
  for (const item of ["Carrara White", "Specifications", "Review", "Get a Quote"]) {
    check(product.includes(item), `product detail contains ${item}`);
  }
  const recommendation = pages.get("/recommendations?room=bathroom")?.body ?? "";
  check(/Bathroom[\s\S]{0,100}Recommendations/i.test(recommendation) && /Showing tiles tagged for/i.test(recommendation) && /\/tiles\/bathroom-tiles\//i.test(recommendation), "bathroom recommendations render room-specific results");
  const stores = pages.get("/stores")?.body ?? "";
  check(/3 stores/i.test(stores), "Store Finder renders the three active demo stores");
  const filteredStores = pages.get("/stores?q=Central")?.body ?? "";
  check(/1 store match/i.test(filteredStores) && /Central Showroom/i.test(filteredStores), "Store Finder search returns the Central demo store");
  const productEnquiry = pages.get("/contact?intent=product&product=carrara-white")?.body ?? "";
  check(/Enquire about Carrara White/i.test(productEnquiry) && /Product context/i.test(productEnquiry), "product enquiry route retains its selected product context");
  const productReview = /<form\b[\s\S]*?review-customer-name[\s\S]*?review-comment/i.test(product);
  check(productReview, "product detail renders the review form fields without submission");

  const canonicalRoutes = [
    ["/", "/"], ["/tiles", "/tiles"], ["/tiles/floor-tiles", "/tiles/floor-tiles"],
    ["/tiles/floor-tiles/carrara-white", "/tiles/floor-tiles/carrara-white"], ["/about", "/about"],
    ["/stores", "/stores"], ["/guides", "/guides"], ["/tiles?q=white", "/tiles"],
    ["/recommendations?room=bathroom", "/recommendations"], ["/stores?q=Central", "/stores"],
    ["/contact?intent=quote", "/contact"], ["/contact?intent=product&product=carrara-white", "/contact"],
  ];
  for (const [requestPath, expectedPath] of canonicalRoutes) {
    const html = pages.get(requestPath)?.body;
    if (!html) continue;
    const canonical = readCanonicalHref(html);
    const expected = new URL(expectedPath, base).href;
    let canonicalIsExpected = false;
    try { canonicalIsExpected = Boolean(canonical && new URL(canonical, base).href === expected); } catch { /* failed below */ }
    check(canonicalIsExpected, `${requestPath} canonical uses its clean production URL`);
    const ogUrl = readMetaContent(html, "og:url");
    let ogUrlIsExpected = false;
    try { ogUrlIsExpected = Boolean(ogUrl && new URL(ogUrl, base).href === expected); } catch { /* failed below */ }
    check(ogUrlIsExpected, `${requestPath} Open Graph URL uses its production canonical`);
    check(!/localhost|127\.0\.0\.1|vercel\.app/i.test(canonical ?? "") || new URL(canonical, base).origin === base.origin, `${requestPath} canonical has no local or preview host`);
    const ogImage = readMetaContent(html, "og:image");
    let validOgImage = false;
    try {
      const imageUrl = new URL(ogImage, base);
      validOgImage = imageUrl.origin === base.origin && imageUrl.pathname === "/opengraph-image";
    } catch { /* failed below */ }
    check(validOgImage, `${requestPath} Open Graph image uses the production origin`);
  }

  const sitemapResult = await request("/sitemap.xml");
  let sitemap = null;
  if (sitemapResult && typeof sitemapResult.body === "string") {
    check(/xml/i.test(sitemapResult.response.headers.get("content-type") ?? ""), "sitemap is served as XML");
    sitemap = inspectSitemap(sitemapResult.body, base.origin);
    check(sitemap.errors.length === 0, `sitemap has 59 production URLs, including five categories, five guides, and 40 products${sitemap.errors.length ? ` (${sitemap.errors.join("; ")})` : ""}`);
  }

  const robotsResult = await request("/robots.txt");
  if (robotsResult && typeof robotsResult.body === "string") {
    const robots = robotsResult.body.toLowerCase();
    const expectedSitemap = new URL("/sitemap.xml", base).href.toLowerCase();
    check(/allow:\s*\//.test(robots) && !/disallow:\s*\/$/m.test(robots), "robots allows public crawling without a global disallow");
    check(/disallow:\s*\/dev\//.test(robots), "robots disallows development routes");
    check(robots.includes(`sitemap: ${expectedSitemap}`), "robots sitemap directive uses the production sitemap URL");
  }

  const imageResult = await request("/opengraph-image");
  if (imageResult && Buffer.isBuffer(imageResult.body)) {
    const contentType = imageResult.response.headers.get("content-type") ?? "";
    const pngSize = imageResult.body.length >= 24 && imageResult.body.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
      ? { width: imageResult.body.readUInt32BE(16), height: imageResult.body.readUInt32BE(20) }
      : null;
    check(contentType.toLowerCase().startsWith("image/png") && pngSize?.width === 1200 && pngSize?.height === 630, "Open Graph image is a 1200x630 PNG");
  }

  const homeResponse = pages.get("/")?.response;
  for (const [header, value] of Object.entries(expectedHeaders)) {
    check(homeResponse?.headers.get(header) === value, `homepage response sets ${header}`);
  }

  const missing = await request("/this-page-does-not-exist", 404);
  if (missing && typeof missing.body === "string") {
    check(/Page Not Found/i.test(missing.body) && /Browse Tiles/i.test(missing.body) && /Go Home/i.test(missing.body), "404 renders branded recovery links");
    check(!/<(?:pre|code)[^>]*>[\s\S]*(?:Error:| at [\w.]+ \()/i.test(missing.body), "404 does not expose a stack trace");
  }

  for (const path of ["/dev/visual-check", "/dev/marketing-preview"]) {
    const result = await request(path);
    if (result && typeof result.body === "string") {
      const robotsMeta = readMetaContent(result.body, "robots")?.toLowerCase() ?? "";
      check(/noindex/.test(robotsMeta) && /nofollow/.test(robotsMeta), `${path} remains noindex and nofollow`);
      check(!/<nav\b[^>]*>[\s\S]*?href=["']\/dev\//i.test(home), `${path} is not linked from the public homepage navigation`);
    }
  }

  const manifestResult = await request("/marketing/manifest.json");
  if (manifestResult && typeof manifestResult.body === "string") {
    let assets = [];
    try { assets = JSON.parse(manifestResult.body)?.assets ?? []; } catch { /* reported below */ }
    check(Array.isArray(assets) && assets.length === 20, "marketing manifest contains 20 local assets");
    const assetResults = await mapLimit(assets, 6, async (asset) => {
      if (typeof asset?.file !== "string" || !asset.file.startsWith("/") || !asset.file.endsWith(".svg")) {
        check(false, "marketing asset manifest contains a local SVG path");
        return;
      }
      const path = `/marketing${asset.file}`;
      const result = await request(path);
      if (!result || !Buffer.isBuffer(result.body)) return;
      const svg = result.body.toString("utf8");
      check((result.response.headers.get("content-type") ?? "").toLowerCase().includes("image/svg+xml") && /<svg\b/i.test(svg), `${path} returns an SVG asset`);
      check(!/<image\b[^>]*(?:href|xlink:href)=["']https?:\/\//i.test(svg), `${path} has no external image dependency`);
    });
    void assetResults;
  }

  const sameOriginScripts = [...home.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi)]
    .map((match) => match[1])
    .map((src) => { try { return new URL(src, base); } catch { return null; } })
    .filter((url) => url?.origin === base.origin && /\.m?js(?:\?|$)/i.test(url.pathname))
    .slice(0, 40);
  const scriptResults = await mapLimit(sameOriginScripts, 6, async (url) => {
    const result = await request(url.pathname + url.search);
    if (result && typeof result.body === "string") check(!containsPrivateMarker(result.body), "client JavaScript has no obvious private-secret marker");
  });
  if (!sameOriginScripts.length) check(false, "homepage references first-party client JavaScript for leakage inspection");
  void scriptResults;

  if (failures) {
    log.error(`Deployment verification failed: ${failures} check(s).`);
    return 1;
  }
  log.log("Deployment verification passed.");
  return 0;
}

async function main() {
  try {
    const baseUrl = parseBaseUrlArgument(process.argv.slice(2));
    process.exitCode = await checkDeployment(baseUrl);
  } catch (error) {
    console.error(error instanceof Error ? error.message : "Deployment checker could not start.");
    process.exitCode = 1;
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();
