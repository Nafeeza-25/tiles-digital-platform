import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("provides the agreed visual foundation files and safe local SVG assets", () => {
  const paths = [
    "src/components/ui/button.tsx",
    "src/components/ui/container.tsx",
    "src/components/ui/section-heading.tsx",
    "src/components/ui/badge.tsx",
    "public/images/brand/timeless-tiles-mark.svg",
    "public/images/brand/timeless-tiles-wordmark.svg",
    "public/images/banners/hero-tile-composition.svg",
    ...["floor-tiles", "wall-tiles", "bathroom-tiles", "kitchen-tiles", "outdoor-tiles"].map(
      (slug) => `public/images/categories/${slug}.svg`,
    ),
  ];

  for (const path of paths) {
    const url = new URL(path, root);
    assert.equal(existsSync(url), true, `missing ${path}`);

    if (path.endsWith(".svg")) {
      const svg = readFileSync(url, "utf8").toLowerCase();
      assert.equal(svg.includes("<script"), false, `${path} contains script`);
      assert.equal(svg.includes("foreignobject"), false, `${path} contains foreignObject`);
      assert.equal(/(?:href|src)=["'][^"']*https?:/i.test(svg), false, `${path} contains external URL`);
    }
  }
});
