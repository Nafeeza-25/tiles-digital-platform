import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";

const root = process.cwd();
const base = join(root, "public", "marketing");
const failures = [];
const check = (ok, message) => { if (!ok) failures.push(message); };
const groups = {
  instagram: [["01-bathroom-inspiration.svg",1080,1080],["02-floor-tile-guide.svg",1080,1080],["03-compare-tiles.svg",1080,1080],["04-room-recommendations.svg",1080,1080],["05-sale-selection.svg",1080,1080],["06-store-finder.svg",1080,1080]],
  stories: [["01-find-your-room-style.svg",1080,1920],["02-matte-vs-glossy.svg",1080,1920],["03-compare-before-you-choose.svg",1080,1920],["04-get-a-quote.svg",1080,1920]],
  facebook: [["01-tile-catalogue.svg",1200,630],["02-current-offers.svg",1200,630],["03-room-recommendations.svg",1200,630]],
  youtube: [["01-how-to-choose-bathroom-tiles.svg",1280,720],["02-floor-tile-guide.svg",1280,720],["03-how-tile-comparison-works.svg",1280,720],["04-room-recommendations.svg",1280,720]],
  banners: [["01-find-your-room-style.svg",1600,600],["02-compare-before-you-choose.svg",1600,600],["03-explore-enquire-decide.svg",1600,600]],
};
const expected = [];
const manifestPath = join(base, "manifest.json");
check(existsSync(manifestPath), "public/marketing/manifest.json exists");
if (!existsSync(manifestPath)) {
  console.error("FAIL " + failures.join("\nFAIL "));
  process.exit(1);
}
let manifest;
try { manifest = JSON.parse(readFileSync(manifestPath, "utf8")); }
catch (error) { console.error("FAIL manifest is valid JSON: " + error.message); process.exit(1); }

for (const [group, files] of Object.entries(groups)) {
  check(existsSync(join(base, group)), "public/marketing/" + group + " exists");
  for (const [filename, width, height] of files) {
    const file = "/" + group + "/" + filename;
    expected.push(file);
    const diskPath = join(base, group, filename);
    check(existsSync(diskPath), file + " exists");
    if (!existsSync(diskPath)) continue;
    const svg = readFileSync(diskPath, "utf8");
    check(/<svg\b[^>]*xmlns="http:\/\/www\.w3\.org\/2000\/svg"/i.test(svg), file + " has SVG root");
    const viewBox = svg.match(/\bviewBox="([^"]+)"/i)?.[1]?.trim().split(/[ ,]+/).map(Number);
    check(Boolean(viewBox && viewBox.length === 4 && viewBox[2] === width && viewBox[3] === height), file + " has " + width + "x" + height + " viewBox");
    check(!/<script\b/i.test(svg), file + " contains no script");
    check(!/<foreignObject\b/i.test(svg), file + " contains no foreignObject");
    check(!/<image\b[^>]*(?:href|xlink:href)="https?:\/\//i.test(svg), file + " has no external image reference");
    check(!/preserveAspectRatio="[^"]+"\s+url\(/.test(svg), file + " has valid SVG presentation attributes");
  }
}

const entries = manifest.assets;
check(Array.isArray(entries), "manifest includes assets array");
if (!Array.isArray(entries)) process.exit(1);
const byFile = new Map(entries.map((entry) => [entry.file, entry]));
const detailFields = ["channel","campaign","headline","cta","route","alt","intendedUse","productSources","factualData"];
for (const file of expected) {
  const entry = byFile.get(file);
  check(Boolean(entry), "manifest includes " + file);
  if (!entry) continue;
  for (const key of detailFields) check(typeof entry[key] === "string" && entry[key].trim(), file + " has " + key);
  check(Number.isInteger(entry.width) && Number.isInteger(entry.height), file + " has dimensions");
  check(entry.dimensions === entry.width + " × " + entry.height, file + " dimensions match manifest");
  check(typeof entry.alt === "string" && entry.alt.length <= 180, file + " has concise alt text");
}
for (const file of byFile.keys()) check(expected.includes(file), "manifest includes only expected assets: " + file);

const seed = readFileSync(join(root, "supabase", "migrations", "20260928231512_seed_catalogue.sql"), "utf8");
for (const entry of entries) for (const product of entry.productData ?? []) {
  check(product.salePrice > 0 && product.salePrice < product.price, entry.file + " has valid sale for " + product.slug);
  const line = seed.split(/\r?\n/).find((row) => row.includes("'" + product.slug + "'"));
  const pattern = "\\('" + product.categorySlug + "',\\s*'[^']+',\\s*'" + product.name + "',\\s*'" + product.slug + "',\\s*'[^']*',\\s*'[^']*',\\s*([0-9.]+),\\s*([0-9.]+)";
  const facts = line && new RegExp(pattern).exec(line);
  check(Boolean(facts && Number(facts[1]) === product.price && Number(facts[2]) === product.salePrice), entry.file + " sale matches seeded catalogue for " + product.slug);
  check(existsSync(join(root, "public", "images", "products", product.slug + ".svg")), entry.file + " has local product art");
}

const appRoot = join(root, "src", "app");
const pageFiles = [];
function collectPages(directory) {
  for (const item of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, item.name);
    if (item.isDirectory()) collectPages(path);
    else if (/^page\.(tsx|ts|jsx|js)$/.test(item.name)) pageFiles.push(path);
  }
}
collectPages(appRoot);
const routePatterns = pageFiles.map((page) => {
  const segment = relative(appRoot, page).split(sep).slice(0, -1).join("/");
  const route = segment ? "/" + segment : "/";
  const pattern = route.split("/").map((part) => part.startsWith("[") ? "[^/]+" : part).join("/");
  return new RegExp("^" + pattern + "/?$");
});
for (const entry of entries) check(routePatterns.some((pattern) => pattern.test(entry.route?.split("?")[0] ?? "")), entry.file + " points to a real application route");

for (const entry of entries) {
  const diskPath = join(base, entry.file);
  if (!existsSync(diskPath)) continue;
  const svg = readFileSync(diskPath, "utf8");
  const textContent = svg.replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&");
  if (/recommendation/i.test(entry.campaign)) check(!/\bAI[- ]?(?:powered|recommendations?)|machine learning/i.test(textContent), entry.file + " makes no AI claim");
  if (entry.route === "/stores") check(!/nearest|near you/i.test(textContent), entry.file + " makes no proximity claim");
  check(!/\b\d[\d,.]*\s*(?:followers|likes|views|reviews)\b/i.test(textContent), entry.file + " has no fake counts");
  check(!/countdown|today only|limited time|while stocks last|expires?\s*[:\-]/i.test(textContent), entry.file + " has no urgency or expiry claim");
  for (const match of svg.matchAll(/(?:href|xlink:href)="([^"]+)"/gi)) {
    const url = match[1];
    if (url.startsWith("/")) check(existsSync(join(root, "public", url.slice(1))), entry.file + " local asset exists: " + url);
    else check(url.startsWith("#") || url.startsWith("data:"), entry.file + " uses no external URL: " + url);
  }
}

const previewPath = join(appRoot, "dev", "marketing-preview", "page.tsx");
check(existsSync(previewPath), "development preview route exists");
if (existsSync(previewPath)) {
  const preview = readFileSync(previewPath, "utf8");
  check(/index:\s*false/.test(preview), "preview is noindex");
  check(/follow:\s*false/.test(preview), "preview is nofollow");
  check(/src=\{\s*["']\/marketing["']\s*\+\s*asset\.file\s*\}/.test(preview), "preview maps manifest filenames to public marketing URLs");
}
const robots = readFileSync(join(appRoot, "robots.ts"), "utf8");
check(/disallow:\s*\[\s*["']\/dev\//.test(robots), "robots disallows dev routes");
const sitemap = readFileSync(join(appRoot, "sitemap.ts"), "utf8");
check(!/marketing-preview|dev\//.test(sitemap), "preview is excluded from sitemap");

if (failures.length) {
  console.error(failures.map((message) => "FAIL " + message).join("\n"));
  process.exit(1);
}
console.log("Marketing assets check passed: " + expected.length + " SVGs, manifest metadata, sale data, routes, and preview indexing safeguards.");
