import { existsSync, readFileSync } from "node:fs";
import { execFileSync, spawnSync } from "node:child_process";
import { resolve } from "node:path";

const root = process.cwd();
let failures = 0;

function check(condition, message) {
  if (condition) console.log(`PASS ${message}`);
  else {
    console.error(`FAIL ${message}`);
    failures++;
  }
}

function read(path) {
  const absolute = resolve(root, path);
  return existsSync(absolute) ? readFileSync(absolute, "utf8") : null;
}

const requiredDocs = [
  "docs/ENVIRONMENT_CONFIGURATION.md",
  "docs/PRODUCTION_ROUTE_INVENTORY.md",
  "docs/ANALYTICS_EVENT_PLAN.md",
  "docs/VERCEL_DEPLOYMENT_CHECKLIST.md",
  "docs/PRODUCTION_READINESS.md",
];
for (const path of requiredDocs) check(Boolean(read(path)), `${path} exists`);

const envExample = read(".env.example") ?? "";
for (const name of ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY", "NEXT_PUBLIC_SITE_URL"]) {
  check(new RegExp(`^${name}=`, "m").test(envExample), `.env.example declares ${name}`);
}
const envAssignments = [...envExample.matchAll(/^(?!\s*#)([A-Z][A-Z0-9_]*)=(.*)$/gm)];
check(envAssignments.every(([, , value]) => value.trim() === ""), ".env.example contains no populated credential or deployment values");

const ignored = spawnSync("git", ["check-ignore", "-q", ".env.local"], { cwd: root });
check(ignored.status === 0, ".env.local is ignored");
const trackedEnv = execFileSync("git", ["ls-files", ".env.local"], { cwd: root, encoding: "utf8" }).trim();
check(!trackedEnv, ".env.local is not tracked");

const appFiles = execFileSync("git", ["ls-files", "--cached", "--others", "--exclude-standard", "-z", "--", "src"], { cwd: root, encoding: "utf8" })
  .split("\0").filter(Boolean);
const appText = appFiles.map((path) => read(path) ?? "").join("\n");
check(!/SUPABASE_(?:SERVICE|SECRET|ADMIN)|service_role/i.test(appText), "application source has no service-role or private Supabase key reference");
check(!/\bdebugger\s*;?/i.test(appText), "application source has no debugger statement");

const publicFiles = appFiles.filter((path) => path.startsWith("src/app/") && !path.startsWith("src/app/dev/"));
const placeholderPattern = /\b(?:coming soon|under construction|placeholder|lorem ipsum|TODO|FIXME)\b/i;
check(!publicFiles.some((path) => placeholderPattern.test((read(path) ?? "").replace(/\bplaceholder\s*=\s*["'][^"']*["']/gi, ""))), "production pages have no unfinished placeholder copy");

const sitemap = read("src/app/sitemap.ts") ?? "";
const robots = read("src/app/robots.ts") ?? "";
const preview = read("src/app/dev/marketing-preview/page.tsx") ?? "";
const visual = read("src/app/dev/visual-check/page.tsx") ?? "";
check(!sitemap.includes("/dev/"), "development routes are excluded from the sitemap source");
check([preview, visual].every((source) => /index:\s*false/.test(source) && /follow:\s*false/.test(source)), "development routes declare noindex and nofollow metadata");
check(/disallow:[\s\S]*?\/dev\//.test(robots), "robots rules disallow /dev/");

const routeInventory = read("docs/PRODUCTION_ROUTE_INVENTORY.md") ?? "";
const documentedRoutes = [...routeInventory.matchAll(/`([^`]+)`/g)].map((match) => match[1]);
for (const route of ["/", "/tiles", "/tiles/floor-tiles", "/tiles/wall-tiles", "/tiles/bathroom-tiles", "/tiles/kitchen-tiles", "/tiles/outdoor-tiles", "/tiles/[categorySlug]/[productSlug]", "/compare", "/recommendations", "/collections", "/offers", "/about", "/contact", "/stores", "/guides", "/sitemap.xml", "/robots.txt", "/dev/visual-check", "/dev/marketing-preview"]) {
  check(documentedRoutes.includes(route), `route inventory documents ${route}`);
}

const guideSlugs = ["how-to-choose-bathroom-tiles", "floor-tile-size-finish-material-guide", "how-to-choose-tiles-for-each-room", "tiles-near-me-guide", "how-to-choose-a-tile-company"];
for (const slug of guideSlugs) check(documentedRoutes.includes(`/guides/${slug}`), `route inventory documents /guides/${slug}`);

const stableSitemapRoutes = ["/tiles", "/collections", "/offers", "/about", "/recommendations", "/contact", "/stores", "/guides"];
check(stableSitemapRoutes.every((route) => sitemap.includes(`"${route}"`)), "sitemap source contains expected stable public paths");
check(/tileCategories\.map/.test(sitemap) && /getCatalogueProducts/.test(sitemap) && /tileGuides\.map/.test(sitemap), "sitemap source expands categories, active products, and guides");

const staticRoutes = new Set(["/", ...stableSitemapRoutes, "/compare", "/opengraph-image"]);
const categorySlugs = ["floor-tiles", "wall-tiles", "bathroom-tiles", "kitchen-tiles", "outdoor-tiles"];
const knownGuideSlugs = new Set(guideSlugs);
function knownRoute(path) {
  if (staticRoutes.has(path) || categorySlugs.some((slug) => path === `/tiles/${slug}`)) return true;
  if (/^\/tiles\/(?:floor-tiles|wall-tiles|bathroom-tiles|kitchen-tiles|outdoor-tiles)\/[a-z0-9-]+$/.test(path)) return true;
  if (path === "/guides" || (path.startsWith("/guides/") && knownGuideSlugs.has(path.slice("/guides/".length)))) return true;
  return false;
}
const internalLinks = [];
const hrefPattern = /(?:href\s*=\s*|href\s*:\s*)(?:\{\s*)?["'`]([^"'`]+)["'`]/g;
for (const sourcePath of appFiles) {
  const source = read(sourcePath) ?? "";
  for (const match of source.matchAll(hrefPattern)) {
    const href = match[1];
    if (!href.startsWith("/") || href.startsWith("//") || href.includes("${")) continue;
    const path = href.split(/[?#]/, 1)[0];
    internalLinks.push({ sourcePath, path });
  }
}
const brokenInternalLinks = internalLinks.filter(({ path }) => !knownRoute(path));
check(brokenInternalLinks.length === 0, `known internal link literals map to route patterns (${internalLinks.length} checked${brokenInternalLinks.length ? `; ${brokenInternalLinks.map(({ sourcePath, path }) => `${sourcePath}:${path}`).join(", ")}` : ""})`);

const analytics = read("docs/ANALYTICS_EVENT_PLAN.md") ?? "";
const events = ["catalogue_view", "catalogue_search", "catalogue_filter_apply", "product_view", "product_compare_add", "comparison_view", "recommendation_room_select", "recommendation_result_view", "quote_form_start", "quote_form_submit", "product_enquiry_submit", "contact_form_submit", "whatsapp_click", "review_submit", "store_finder_view", "store_phone_click", "store_whatsapp_click", "store_directions_click", "guide_view", "offer_view"];
for (const event of events) check(analytics.includes(event), `analytics plan defines ${event}`);
check(/name[\s\S]*phone[\s\S]*email[\s\S]*message contents/i.test(analytics) && /free-text review content/i.test(analytics) && /credentials/i.test(analytics), "analytics plan explicitly excludes PII and credentials");

check(Boolean(read("docs/VERCEL_DEPLOYMENT_CHECKLIST.md")), "Vercel deployment checklist exists");
const readiness = read("docs/PRODUCTION_READINESS.md") ?? "";
for (const limitation of ["fictional academic-demo", "no authentication", "no email delivery", "no real payment", "no live analytics"]) {
  check(readiness.toLowerCase().includes(limitation), `readiness document records ${limitation}`);
}
check(readiness.includes("https://tiles-digital-platform.vercel.app"), "readiness document records the verified production URL");

const nextConfig = read("next.config.ts") ?? "";
const globalStyles = read("src/app/globals.css") ?? "";
check(/@layer\s+base\s*\{[^}]*\ba\s*\{[^}]*color:\s*inherit/s.test(globalStyles), "anchor base color is in Tailwind's base layer so utility text colors can override it");
const expectedHeaders = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "X-Frame-Options": "SAMEORIGIN",
};
for (const [header, value] of Object.entries(expectedHeaders)) {
  check(nextConfig.includes(`key: "${header}"`) && nextConfig.includes(`value: "${value}"`), `Next.js config sets ${header} to its expected baseline value`);
}

const manifest = read("public/marketing/manifest.json");
let manifestValid = false;
try {
  const parsed = JSON.parse(manifest ?? "null");
  manifestValid = Array.isArray(parsed?.assets) && parsed.assets.length === 20;
} catch { /* reported below */ }
check(manifestValid, "marketing asset manifest contains the expected 20 records");

check(Boolean(read("src/data/guides.ts")), "guide content source exists");
const metadataRoutes = [
  "src/app/layout.tsx", "src/app/page.tsx", "src/app/tiles/page.tsx",
  "src/app/tiles/[categorySlug]/page.tsx", "src/app/tiles/[categorySlug]/[productSlug]/page.tsx",
  "src/app/compare/page.tsx", "src/app/recommendations/page.tsx", "src/app/collections/page.tsx",
  "src/app/offers/page.tsx", "src/app/about/page.tsx", "src/app/contact/page.tsx",
  "src/app/stores/page.tsx", "src/app/guides/page.tsx", "src/app/guides/[slug]/page.tsx",
];
for (const path of metadataRoutes) {
  check(/openGraph:\s*createOpenGraphMetadata\(/.test(read(path) ?? ""), `${path} declares a route-specific Open Graph URL`);
}
const packageJson = JSON.parse(read("package.json") ?? "{}");
check(packageJson.scripts?.["production:check"] === "node scripts/check-production-readiness.mjs", "production:check package script is registered");
check(packageJson.scripts?.["deployment:check"] === "node scripts/check-deployment.mjs", "deployment:check package script is registered");
check(Boolean(read("scripts/check-deployment.mjs")), "read-only deployment verification script exists");
const packageNames = Object.keys(packageJson.dependencies ?? {}).concat(Object.keys(packageJson.devDependencies ?? {}));
check(!packageNames.some((name) => /analytics|gtag|segment|posthog|mixpanel|pixel/i.test(name)), "no analytics provider package is installed");
check(!/gtag\(|googletagmanager|fbq\(|connect\.facebook\.net|posthog/i.test(appText), "no third-party tracking runtime is configured");

if (failures) {
  console.error(`Production readiness check failed: ${failures} issue(s).`);
  process.exit(1);
}
console.log("Production readiness check passed.");
