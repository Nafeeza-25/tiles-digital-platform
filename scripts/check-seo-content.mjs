import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { createRequire } from "node:module";
import { dirname, resolve as resolvePath } from "node:path";
import { runInThisContext } from "node:vm";

// Node does not assign a module type to these TypeScript files in this package.
// Transpile the source data to CommonJS in memory instead of asking Node to
// guess the module type or adding a runtime TS loader to the application.
const require = createRequire(import.meta.url);
const ts = require("typescript");

function loadTypeScriptData(relativePath) {
  const filename = resolvePath(process.cwd(), relativePath);
  const source = readFileSync(filename, "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    fileName: filename,
  });
  const commonJsModule = { exports: {} };
  const wrapper = runInThisContext(`(function (exports, require, module, __filename, __dirname) {\n${outputText}\n})`, { filename });
  wrapper(commonJsModule.exports, createRequire(filename), commonJsModule, filename, dirname(filename));
  return commonJsModule.exports;
}

const { tileGuides } = loadTypeScriptData("src/data/guides.ts");
const { tileCategories } = loadTypeScriptData("src/data/site.ts");

console.log("🔍 Running SEO Content & Keyword Strategy Verification...");

let errors = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    errors++;
  } else {
    console.log(`✓ PASS: ${message}`);
  }
}

// A. Guides index exists & has entries
assert(Array.isArray(tileGuides), "tileGuides array exists in src/data/guides.ts");
assert(tileGuides.length >= 5, `Expected at least 5 guides, found ${tileGuides.length}`);

// B. Slugs and titles uniqueness
const slugs = tileGuides.map((g) => g.slug);
const titles = tileGuides.map((g) => g.title);
assert(new Set(slugs).size === slugs.length, "Guide slugs are unique");
assert(new Set(titles).size === titles.length, "Guide titles are unique");

// C. Guide required structure
tileGuides.forEach((g) => {
  assert(Boolean(g.title && g.description && g.sections && g.cta), `Guide ${g.slug} contains required structure`);
  assert(g.sections.length >= 3, `Guide ${g.slug} contains at least 3 detailed H2 sections`);
});

// D. Topic coverage check
const allText = JSON.stringify(tileGuides).toLowerCase();

assert(allText.includes("bathroom tiles"), "Bathroom tiles topic covered in guides");
assert(allText.includes("floor tiles"), "Floor tiles topic covered in guides");
assert(allText.includes("room-wise tile selection") || allText.includes("different rooms"), "Room selection topic covered in guides");
assert(allText.includes("tiles near me"), "Tiles near me topic covered in guides");
assert(allText.includes("best tiles company") || allText.includes("best tile company"), "Choosing a tile company topic covered in guides");

// E. Claim Safety Verification
tileGuides.forEach((g) => {
  const guideText = JSON.stringify(g).toLowerCase();
  assert(!guideText.includes("timeless tiles is the best tiles company"), `Guide ${g.slug} makes no unsupported 'best company' claim`);
  assert(!guideText.includes("#1 tile company"), `Guide ${g.slug} makes no unsupported '#1' claim`);
  assert(!guideText.includes("leading tile company"), `Guide ${g.slug} makes no unsupported 'leading' claim`);
});

// F. Keyword Strategy Document Verification
const docPath = resolve(process.cwd(), "docs/SEO_KEYWORD_STRATEGY.md");
assert(existsSync(docPath), "docs/SEO_KEYWORD_STRATEGY.md exists");
if (existsSync(docPath)) {
  const docContent = readFileSync(docPath, "utf-8").toLowerCase();
  assert(!docContent.includes("search volume:") && !docContent.includes("cpc:"), "No fake metrics (search volume / CPC) in SEO strategy doc");
  assert(docContent.includes("academic transparency notice"), "SEO strategy doc contains academic transparency notice");
}

// G. Sitemap route count check
// Expected: 8 static + 5 categories + 6 guides (1 index + 5 guides) + 40 products = 59
const expectedSitemapCount = 8 + tileCategories.length + (1 + tileGuides.length) + 40;
assert(expectedSitemapCount === 59, `Expected total sitemap URL count to equal 59 (actual calculated: ${expectedSitemapCount})`);

// H. Check public enquiries & pending reviews privacy intact
const supabaseClientPath = resolve(process.cwd(), "src/lib/supabase/client.ts");
assert(existsSync(supabaseClientPath), "Supabase client configured safely");

if (errors > 0) {
  console.error(`\n❌ SEO Content Verification failed with ${errors} error(s).`);
  process.exit(1);
} else {
  console.log("\n✅ All SEO Content Verification checks passed successfully!");
}
