import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";

const root = process.cwd();
const requiredDocs = [
  "docs/DIGITAL_MARKETING_STRATEGY.md",
  "docs/GOOGLE_ADS_PLAN.md",
  "docs/CONTENT_CALENDAR.md",
  "docs/SOCIAL_CONTENT_LIBRARY.md",
  "docs/MARKETING_MEASUREMENT_PLAN.md",
];
const failures = [];
const check = (condition, message) => {
  if (!condition) failures.push(message);
};
const read = (path) => readFileSync(join(root, path), "utf8");

for (const path of requiredDocs) check(existsSync(join(root, path)), `${path} exists`);
if (failures.length) {
  console.error(failures.map((failure) => `FAIL ${failure}`).join("\n"));
  process.exit(1);
}

const strategy = read(requiredDocs[0]);
const ads = read(requiredDocs[1]);
const calendar = read(requiredDocs[2]);
const social = read(requiredDocs[3]);
const measurement = read(requiredDocs[4]);
const allDocs = [strategy, ads, calendar, social, measurement].join("\n");

for (const audience of ["Homeowner", "Interior Design Professional", "Project Contractor", "Tile Dealer"])
  check(allDocs.includes(audience), `represents audience: ${audience}`);
for (const section of ["Instagram strategy", "Facebook strategy", "YouTube strategy", "Google Ads search strategy"])
  check(strategy.toLowerCase().includes(section.toLowerCase()), `includes ${section}`);
check((calendar.match(/\| Planned \|/g) ?? []).length >= 20, "at least 20 planned calendar entries");
for (const concept of ["Find Your Room Style", "Compare Before You Choose", "Explore, Enquire, Decide"])
  check(strategy.includes(concept), `includes integrated campaign: ${concept}`);
for (const keyword of ["bathroom tiles", "floor tiles", "wall tiles", "kitchen tiles", "outdoor tiles", "tiles near me", "tile showroom", "tile store", "tile quote", "tile price", "best tiles company"])
  check(ads.toLowerCase().includes(keyword), `includes keyword concept: ${keyword}`);
check(ads.includes("No live Google Ads Keyword Planner dataset was used."), "states no live Keyword Planner dataset was used");
check(/\[bathroom tiles\]/.test(ads) && /"bathroom tiles"/.test(ads) && /\[tile quote\]/.test(ads) && /"tiles near me"/.test(ads), "includes exact and phrase match examples");
for (const match of ads.matchAll(/### (Bathroom Tiles|Tile Catalogue|Request a Quote)([\s\S]*?)(?=\n### |\n## |$)/g)) {
  const block = match[2];
  check(/Headline examples:/.test(block) && /Description examples:/.test(block) && /Landing page:/.test(block), `ad set has headlines, descriptions, landing page: ${match[1]}`);
}
check((ads.match(/### (Bathroom Tiles|Tile Catalogue|Request a Quote)/g) ?? []).length >= 3, "includes at least three sample ad-copy sets");
check(/fictional demo locations/i.test(ads) && /verified business locations/i.test(ads) && /geographic targeting/i.test(ads), "documents local ad limitations");
check(/academic (?:proposal|demo)|proposed/i.test(allDocs), "identifies deliverables as proposals/examples");
check(/impressions/.test(measurement) && /reach/.test(measurement) && /video views/.test(measurement), "defines awareness metrics");
for (const formula of ["CTR", "Conversion rate", "CPC", "Cost per lead", "Engagement rate", "ROI concept"])
  check(measurement.includes(formula), `includes KPI formula: ${formula}`);
check(/actual performance cannot be calculated/i.test(measurement), "states actual performance is not calculable yet");
check(/no analytics/i.test(measurement) && /no tracking is implemented/i.test(measurement), "states no tracking is implemented");

// Build route patterns from real Next page files; dynamic segments match one path segment.
const appRoot = join(root, "src", "app");
const pageFiles = [];
function collectPages(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) collectPages(path);
    else if (/^page\.(tsx|ts|jsx|js)$/.test(entry.name)) pageFiles.push(path);
  }
}
collectPages(appRoot);
const routePatterns = pageFiles.map((file) => {
  const route = relative(appRoot, file).split(sep).slice(0, -1).join("/");
  const normalized = route ? `/${route}` : "/";
  return new RegExp(`^${normalized.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\\\[(?:\.\.\.)?[^/]+\\\]/g, "[^/]+")}/?$`);
});
const requiredRoutes = [
  "/", "/tiles", "/tiles/floor-tiles", "/tiles/wall-tiles", "/tiles/bathroom-tiles",
  "/tiles/kitchen-tiles", "/tiles/outdoor-tiles", "/collections", "/offers", "/recommendations",
  "/compare", "/guides", "/stores", "/contact", "/contact?intent=quote",
  "/guides/how-to-choose-bathroom-tiles", "/guides/floor-tile-size-finish-material-guide",
  "/guides/how-to-choose-tiles-for-each-room", "/guides/tiles-near-me-guide",
  "/guides/how-to-choose-a-tile-company",
];
const knownRoutes = new Set(requiredRoutes.map((route) => route.split("?")[0]));
for (const route of requiredRoutes) {
  const pathname = route.split("?")[0];
  check(knownRoutes.has(pathname) && routePatterns.some((pattern) => pattern.test(pathname)), `valid implemented route: ${route}`);
}
const referencedRoutes = new Set(
  [...allDocs.matchAll(/`(\/(?:tiles|guides|recommendations|compare|offers|collections|stores|contact|about)(?:\/[a-z0-9-]+)*(?:\?[^`]+)?)`/gi)]
    .map(([, route]) => route.replace(/[.,;:]+$/, "")),
);
for (const route of referencedRoutes) {
  const pathname = route.split("?")[0];
  check(routePatterns.some((pattern) => pattern.test(pathname)), `valid referenced destination: ${route}`);
}

const claimPatterns = [
  /Timeless Tiles\s+is\s+(?:the\s+)?best\s+tile\s+company/i,
  /#1\s+tile\s+company/i,
  /leading\s+tile\s+manufacturer/i,
];
for (const pattern of claimPatterns) check(!pattern.test(allDocs), `does not contain unsupported superiority claim ${pattern}`);
const metricPatterns = [
  /\b\d+(?:\.\d+)?\s*%\s*(?:conversion|CTR|engagement|reach)/i,
  /\b\d+(?:\.\d+)?\s*(?:USD|INR|\$|₹)\s*(?:CPC|per\s+click)/i,
  /\b(?:monthly\s+)?search\s+volume\s*[:=]\s*\d/i,
  /\bquality\s+score\s*[:=]\s*\d/i,
];
for (const pattern of metricPatterns) check(!pattern.test(allDocs), `does not invent campaign metric ${pattern}`);
check(/fictional/i.test(strategy) && /fictional/i.test(ads) && /fictional/i.test(social), "clearly identifies fictional demo context");

if (failures.length) {
  console.error(failures.map((failure) => `FAIL ${failure}`).join("\n"));
  process.exit(1);
}
console.log(`Marketing deliverables check passed: ${requiredDocs.length} documents, ${(calendar.match(/\| Planned \|/g) ?? []).length} planned calendar entries, ${requiredRoutes.length} route examples.`);
