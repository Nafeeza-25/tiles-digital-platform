import { readFile } from "node:fs/promises";
import ts from "typescript";

const source = await readFile(new URL("../src/lib/catalog/catalog-filters.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }).outputText;
const { hasIntentionalPriceBound, parseCatalogState } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);
const check = (condition, label) => { if (!condition) throw new Error(`FAIL - ${label}`); console.log(`PASS - ${label}`); };

const bounds = (params) => { const state = parseCatalogState(params); return [state.minPrice, state.maxPrice]; };
check(JSON.stringify(bounds({ minPrice: "", maxPrice: "" })) === JSON.stringify([null, null]), "blank bounds apply no price constraint");
check(JSON.stringify(bounds({ minPrice: "1000", maxPrice: "" })) === JSON.stringify([1000, null]), "minimum-only bound parses correctly");
check(JSON.stringify(bounds({ minPrice: "", maxPrice: "2000" })) === JSON.stringify([null, 2000]), "maximum-only bound parses correctly");
check(JSON.stringify(bounds({ minPrice: "1000", maxPrice: "2000" })) === JSON.stringify([1000, 2000]), "two explicit bounds parse correctly");
check(JSON.stringify(bounds({ minPrice: "0", maxPrice: "" })) === JSON.stringify([0, null]), "explicit zero remains an intentional lower bound");
check(JSON.stringify(bounds({ minPrice: "invalid", maxPrice: "-1" })) === JSON.stringify([null, null]), "invalid and negative bounds are ignored safely");
check(!hasIntentionalPriceBound("") && !hasIntentionalPriceBound("   ") && hasIntentionalPriceBound("0") && hasIntentionalPriceBound("2000"), "only intentional valid bounds are included in a GET query");
