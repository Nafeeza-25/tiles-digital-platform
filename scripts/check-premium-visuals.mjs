import { readdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";

const root = resolve("public/images");
async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory() ? files(resolve(directory, entry.name)) : resolve(directory, entry.name)))).flat();
}
const paths = await files(root);
const assets = paths.filter(path => path.endsWith(".webp"));
const slugs = (await readdir(resolve(root, "products"))).filter(name => name.endsWith(".svg")).map(name => name.slice(0, -4));
const mapping = await readFile("src/lib/visuals/assets.ts", "utf8");
const globalStyles = await readFile("src/app/globals.css", "utf8");
const homepageSections = await Promise.all([
  "src/components/home/BrandCtaSections.tsx",
  "src/components/home/AudienceJourneySections.tsx",
  "src/components/home/CategorySection.tsx",
  "src/components/home/ProductSections.tsx",
].map(path => readFile(path, "utf8")));
let failures = 0;
const check = (ok, message) => { console[ok ? "log" : "error"](`${ok ? "PASS" : "FAIL"} ${message}`); if (!ok) failures++; };
check(!/\.section-(continuation|fade-dark)\b/.test(globalStyles), "global styles contain no section-continuation fade utilities");
check(!/\.page-hero::after\b/.test(globalStyles), "page heroes have no bottom continuation overlay");
check(!/\.site-footer::before\b/.test(globalStyles), "site footer has no top continuation overlay");
check(homepageSections.every(source => !/section-(continuation|fade-dark)\b/.test(source)), "homepage sections use solid surfaces rather than continuation classes");
check(assets.length === 150, "150 supplied premium WebP assets exist");
check(slugs.length === 40, "all 40 existing product SVG fallbacks remain");
for (const slug of slugs) {
  check(mapping.includes(`"${slug}"`), `${slug} has a presentation mapping`);
  for (const view of ["texture", "room", "detail"]) check(paths.includes(resolve(root, "products", slug, `${view}.webp`)), `${slug}/${view} asset exists`);
}
for (const [directory, count] of [["home", 3], ["categories", 5], ["rooms", 7], ["editorial", 6], ["stores", 3], ["guides", 5], ["brand", 1]]) {
  check(assets.filter(path => path.startsWith(resolve(root, directory) + "/") || path.startsWith(resolve(root, directory) + "\\")).length === count, `${directory} has ${count} supplied WebP assets`);
}
const storeSeed = await readFile("supabase/migrations/20260928231512_seed_catalogue.sql", "utf8");
for (const slug of ["timeless-tiles-central", "timeless-tiles-design-studio", "timeless-tiles-trade-centre"]) {
  check(storeSeed.includes(`'${slug}'`) && mapping.includes(`"${slug}":`), `${slug} uses its actual database slug for store imagery`);
}
for (const path of assets) {
  try {
    const decoded = await sharp(path).metadata();
    if (decoded.format !== "webp" || !decoded.width || !decoded.height || decoded.width < 800 || decoded.height < 450) check(false, "premium asset has an invalid format or insufficient dimensions");
  } catch { check(false, "premium image decodes successfully"); }
}
check(!failures, "all supplied assets decode and meet minimum resolution");
if (failures) { console.error(`Premium visual verification failed: ${failures} issue(s).`); process.exitCode = 1; }
else console.log("Premium visual verification passed: 150 assets, 40 product mappings and fallbacks.");
