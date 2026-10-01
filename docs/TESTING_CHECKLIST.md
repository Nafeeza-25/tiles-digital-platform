# Testing Checklist

This checklist separates locally verified behavior from deployment and user workflows that still need follow-up. Checkmarks record a completed local check; unchecked items remain unverified or are explicitly outside this step.

## Installation and build

- [x] Dependencies install successfully
- [x] `npm run lint` passes
- [x] `npm run build` passes

## Navigation and responsiveness

- [x] Navigation works across implemented pages
- [x] Representative pages render without horizontal overflow at mobile widths (320, 375 CSS px)
- [x] Representative pages render without horizontal overflow at tablet width (768 CSS px)
- [x] Representative pages render without horizontal overflow at desktop widths (1024, 1440 CSS px)
- [x] Mobile testing is completed on representative devices or emulators
- [x] Desktop testing is completed in supported browsers

## Product catalogue and details

- [x] Product catalogue renders expected products
- [x] Product search returns appropriate matches
- [x] Product details show images, specifications, pricing, and applications

## Advanced filters and discovery

- [x] Size filter works
- [x] Colour filter works
- [x] Finish filter works
- [x] Material filter works
- [x] Price filter works (blank inputs parse semantically; explicit 0 supported)
- [x] Application filter works
- [x] Comparison works
- [x] Room recommendations work


## Enquiries and conversion

- [x] Quote form works
- [x] Product enquiry form works
- [x] Contact form works
- [x] Required-field validation is clear and correct
- [x] Valid submissions show success feedback
- [x] Failed submissions show useful error feedback
- [x] Enquiries are stored in Supabase
- [x] WhatsApp links use only configured demo-store data and an encoded factual message

## Trust and local information

- [x] Approved reviews render correctly and review submission is moderated before public display
- [x] Store Finder returns active fictional demo locations with URL-driven search and city filtering
- [x] Store details use existing public Supabase fields only
- [x] Factual external directions links work without an embedded map or Maps API

## Public content pages

- [x] Collections page renders data-driven editorial groupings with actual catalogue product cards
- [x] Offers page displays database sale-priced products with accurate discount metrics
- [x] About page provides clear academic-demo disclosures, digital opportunity context, and customer journey presentation

## SEO, accessibility, and performance

- [x] SEO metadata, title template, and canonical URLs are present and accurate
- [x] Sitemap.xml (59 valid URLs) and robots.txt routes generate valid XML and crawl rules
- [x] BreadcrumbList JSON-LD structured data is present on applicable pages
- [x] Educational Tile Guides index (`/guides`) and 5 detail routes (`/guides/[slug]`) render clean responsive typography
- [x] Keyword strategy documented in `docs/SEO_KEYWORD_STRATEGY.md` with intent mapping
- [x] Contextual internal links connect guides with categories, recommendations, Store Finder, and quote form
- [x] Claim-safety rules enforced (no unsupported "best company" superiority claims or physical retail statements)
- [x] `npm run seo:check` and `npm run seo-content:check` verification scripts pass
- [x] Semantic landmarks and heading hierarchy are appropriate
- [x] Basic accessibility checks pass, including keyboard access, visible focus, and alternative text
- [x] Performance is checked (GPU-accelerated CSS transitions, `IntersectionObserver` reveals, LCP hero optimization)
- [x] No broken internal or external links remain


## Production deployment

- [x] Production environment variables are configured securely (names documented; values omitted)
- [x] Vercel production deployment succeeds
- [x] Production URL is tested after deployment: <https://tiles-digital-platform.vercel.app>
- [x] `npm run deployment:check` verifies public routes, SEO URLs, sitemap, robots, Open Graph image, response headers, public assets, dev indexing, and obvious client-secret markers (GET only)
- [x] Read-only live Supabase and RLS checks pass; no production records were written
- [x] Representative production responsive QA passes at 320, 375, 768, 1024, and 1440 CSS pixels
- [x] Basic production accessibility QA passes for heading hierarchy, labels, keyboard access, and visible focus; not a formal WCAG audit
- [x] Live canonical and Open Graph URLs use the production origin

## Digital marketing documentation

- [x] Strategy, channel concepts, four-week planned calendar, social copy, Google Ads proposal, campaign mapping, and measurement plan documented
- [x] `npm run marketing:check` validates required files, calendar count, claim/data safeguards, and campaign destination routes
- [x] 20 local SVG creative assets and their channel dimensions are recorded in the asset manifest
- [x] `npm run marketing-assets:check` validates the asset set, source data, metadata, local routes, and preview indexing safeguards
- [x] `/dev/marketing-preview` visually checked at mobile widths without horizontal overflow; preview is excluded from indexing and sitemap
- [ ] Social accounts or content publication (outside this step)
- [ ] Live advertising or performance measurement (outside this step)
- [ ] Analytics, pixels, conversion scripts, or tracking consent infrastructure (outside this step)

## Production readiness — Step 25

- [x] `npm run production:check` validates environment placeholders, ignored secrets, route inventory, dev-route indexing, internal route literals, analytics privacy plan, assets, and configured headers
- [x] `npm run seo-content:check` passes without a Node module-type warning
- [x] Environment and Vercel deployment preparation are documented without a guessed production URL
- [x] Credential audit confirms `.env.local` is ignored and untracked; no application service-role key reference was found
- [x] Root error boundary and branded 404 are present without exposing error details
- [x] Baseline response headers verified on the local production server
- [x] Representative public routes, responsive widths, keyboard focus, and form labels checked
- [x] Vercel deployment and production-domain verification (Step 26)
- [ ] Live analytics or conversion data
- [ ] Formal accessibility certification
