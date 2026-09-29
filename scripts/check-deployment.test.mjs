import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { once } from "node:events";
import { test } from "node:test";

const categories = ["floor-tiles", "wall-tiles", "bathroom-tiles", "kitchen-tiles", "outdoor-tiles"];
const guides = ["how-to-choose-bathroom-tiles", "floor-tile-size-finish-material-guide", "how-to-choose-tiles-for-each-room", "tiles-near-me-guide", "how-to-choose-a-tile-company"];
const sitemapPaths = ["/", "/tiles", "/collections", "/offers", "/about", "/recommendations", "/contact", "/stores", ...categories.map((slug) => `/tiles/${slug}`), "/guides", ...guides.map((slug) => `/guides/${slug}`)];
for (const category of categories) for (let i = 1; i <= 8; i++) sitemapPaths.push(`/tiles/${category}/sample-${i}`);

function runChecker(baseUrl) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ["scripts/check-deployment.mjs", "--base-url", baseUrl], { stdio: ["ignore", "pipe", "pipe"] });
    let stdout = "";
    let stderr = "";
    child.stdout.setEncoding("utf8").on("data", (chunk) => { stdout += chunk; });
    child.stderr.setEncoding("utf8").on("data", (chunk) => { stderr += chunk; });
    child.once("error", reject);
    child.once("close", (code) => resolve({ code, stdout, stderr }));
  });
}

async function withFixture(callback) {
  const state = { badSitemap: false, methods: [] };
  const server = createServer((request, response) => {
    state.methods.push(request.method);
    const url = new URL(request.url, "http://fixture.invalid");
    response.setHeader("X-Content-Type-Options", "nosniff");
    response.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    response.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
    response.setHeader("X-Frame-Options", "SAMEORIGIN");

    if (url.pathname === "/sitemap.xml") {
      const paths = state.badSitemap ? sitemapPaths.slice(0, -1) : sitemapPaths;
      response.setHeader("Content-Type", "application/xml");
      response.end(`<urlset>${paths.map((path) => `<url><loc>http://127.0.0.1:${server.address().port}${path}</loc></url>`).join("")}</urlset>`);
      return;
    }
    if (url.pathname === "/robots.txt") {
      response.setHeader("Content-Type", "text/plain");
      response.end(`User-agent: *\nAllow: /\nDisallow: /dev/\nSitemap: http://127.0.0.1:${server.address().port}/sitemap.xml`);
      return;
    }
    if (url.pathname === "/opengraph-image") {
      const image = Buffer.alloc(24);
      Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]).copy(image);
      image.writeUInt32BE(1200, 16);
      image.writeUInt32BE(630, 20);
      response.setHeader("Content-Type", "image/png");
      response.end(image);
      return;
    }
    if (url.pathname === "/marketing/manifest.json") {
      response.setHeader("Content-Type", "application/json");
      response.end(JSON.stringify({ assets: Array.from({ length: 20 }, (_, index) => ({ file: `/instagram/sample-${index}.svg` })) }));
      return;
    }
    if (url.pathname.startsWith("/marketing/") && url.pathname.endsWith(".svg")) {
      response.setHeader("Content-Type", "image/svg+xml");
      response.end("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 10 10\"><rect width=\"10\" height=\"10\"/></svg>");
      return;
    }
    if (url.pathname === "/_next/static/app.js") {
      response.setHeader("Content-Type", "text/javascript");
      response.end("window.fixtureReady = true;");
      return;
    }
    if (url.pathname === "/this-page-does-not-exist") {
      response.statusCode = 404;
      response.setHeader("Content-Type", "text/html");
      response.end("<main><h1>Page Not Found</h1><a href=\"/tiles\">Browse Tiles</a><a href=\"/\">Go Home</a></main>");
      return;
    }

    const canonicalPath = url.pathname;
    const robots = url.pathname.startsWith("/dev/") ? "<meta name=\"robots\" content=\"noindex,nofollow\">" : "";
    const content = url.pathname === "/"
      ? "<nav>Timeless Tiles</nav>"
      : url.pathname === "/tiles" && url.searchParams.has("q")
        ? "7 matching tiles Carrara White"
        : url.pathname === "/tiles"
          ? "40 matching tiles Search tiles"
          : url.pathname === "/tiles/floor-tiles/carrara-white"
            ? "Carrara White Specifications Review Get a Quote <form><input id=\"review-customer-name\"><textarea id=\"review-comment\"></textarea></form>"
            : url.pathname === "/recommendations"
              ? "Bathroom Tile Recommendations Showing tiles tagged for bathroom <a href=\"/tiles/bathroom-tiles/sample-1\">Bath tile</a>"
              : url.pathname === "/stores" && url.searchParams.has("q")
                ? "1 store match Central Showroom"
                : url.pathname === "/stores"
                  ? "3 stores"
                  : url.pathname === "/contact" && url.searchParams.get("intent") === "product"
                    ? "Enquire about Carrara White Product context"
                    : "Fixture page";
    response.setHeader("Content-Type", "text/html");
    response.end(`<!doctype html><html><head>${robots}<title>Fixture</title><link rel="canonical" href="http://127.0.0.1:${server.address().port}${canonicalPath}"><meta property="og:url" content="http://127.0.0.1:${server.address().port}${canonicalPath}"><meta property="og:image" content="http://127.0.0.1:${server.address().port}/opengraph-image"></head><body><script src="/_next/static/app.js"></script><main><h1>Fixture Page</h1>${content}</main></body></html>`);
  });

  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  try {
    await callback(`http://127.0.0.1:${server.address().port}`, state);
  } finally {
    server.close();
    await once(server, "close");
  }
}

test("deployment checker passes the read-only healthy-site fixture", async () => {
  await withFixture(async (baseUrl, state) => {
    const result = await runChecker(baseUrl);
    assert.equal(result.code, 0, `checker should pass healthy fixture\n${result.stderr}\n${result.stdout}`);
    assert.match(result.stdout, /deployment verification passed/i);
    assert.ok(state.methods.length > 0);
    assert.ok(state.methods.every((method) => method === "GET"), "checker must issue GET requests only");
  });
});

test("deployment checker fails when the sitemap has the wrong URL count", async () => {
  await withFixture(async (baseUrl, state) => {
    state.badSitemap = true;
    const result = await runChecker(baseUrl);
    assert.notEqual(result.code, 0, "checker must reject an incomplete sitemap");
    assert.match(result.stdout + result.stderr, /sitemap.*59|59.*sitemap/i);
    assert.ok(state.methods.every((method) => method === "GET"), "checker must issue GET requests only");
  });
});
