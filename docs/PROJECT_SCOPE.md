# Digital Transformation & Marketing Strategy for a Tiles Company

## Goal

Transform a traditional tiles business into a modern, customer-focused digital platform through website technology, lead generation, SEO, content, and digital marketing.

## Target audiences

- **Homeowners:** new builds and renovation projects.
- **Architects & Interior Designers:** premium designs and specifications.
- **Builders & Contractors:** bulk orders and pricing.
- **Dealers:** catalogue access and wholesale enquiries.

## Intended customer journey

Awareness → Website Visit → Explore → Compare → Request Quote → Sales Contact → Purchase

## Master project checklist

### Core website

- [ ] Responsive website
- [ ] Homepage
- [x] Collections
- [x] Floor Tiles
- [x] Wall Tiles
- [x] Bathroom Tiles
- [x] Kitchen Tiles
- [x] Outdoor Tiles
- [x] About Us
- [x] Offers
- [ ] Contact

### Catalogue

- [x] 30–50 tile products
- [x] Product catalogue
- [x] Product search
- [x] Product detail pages
- [x] High-quality product images
- [x] Specifications
- [x] Pricing
- [x] Application information

### Advanced filters

- [x] Size
- [x] Colour
- [x] Finish
- [x] Material
- [x] Price
- [x] Application

### Smart features

- [x] Tile comparison
- [x] Room-wise recommendations
- [ ] Browse / discover experience

### Lead generation

- [x] Get a Quote
- [x] Product enquiry
- [x] Contact form
- [x] WhatsApp enquiry
- [x] Enquiries stored in Supabase
- [x] Appropriate success/error validation

### Trust & local features

- [x] Customer review submission and approved review display
- [x] Store Finder and public active-store retrieval
- [x] Store search and city filtering
- [x] Factual store contact actions and external directions links

### SEO

- [ ] Keyword research
- [x] Page titles
- [x] Meta descriptions
- [x] Semantic page structure
- [x] SEO-friendly URLs
- [ ] Local SEO
- [x] sitemap.xml
- [x] robots.txt
- [x] Structured data where appropriate
- [x] Performance/basic technical SEO

### Digital marketing

- [ ] Instagram strategy
- [ ] Facebook strategy
- [ ] YouTube strategy
- [ ] Example social posts
- [ ] Example reels/content ideas
- [ ] Marketing banners
- [ ] Content calendar
- [ ] Blog/content strategy
- [ ] Google Ads campaign proposal
- [ ] Google Ads keywords
- [ ] Google Ads sample ad copy
- [ ] Landing-page strategy

### Content

- [ ] Website copy
- [ ] Product content
- [ ] Category content
- [ ] Helpful/blog content
- [ ] Marketing content

### Quality

- [ ] Mobile responsiveness
- [ ] Tablet responsiveness
- [ ] Desktop responsiveness
- [ ] Form validation
- [ ] Working navigation
- [ ] Working search
- [ ] Working filters
- [ ] Working comparison
- [ ] Working recommendations
- [x] Working WhatsApp links
- [ ] Basic accessibility
- [ ] No broken links
- [ ] Production build passes

### Deployment

- [ ] GitHub repository
- [ ] Supabase production configuration
- [ ] Vercel deployment
- [ ] Public working URL

### Academic deliverables

- [ ] Project report
- [ ] Problem statement
- [ ] Objectives
- [ ] Existing/proposed system
- [ ] Requirements
- [ ] Architecture diagram
- [ ] Database/ER diagram
- [ ] System workflow
- [ ] Module explanation
- [ ] Implementation screenshots
- [ ] Testing documentation
- [ ] Results/business impact
- [ ] Conclusion
- [ ] Future enhancements
- [ ] Presentation/PPT
- [ ] Demo script
- [ ] Viva questions and answers

## Project completion rule

**The project is not considered complete until all required checklist items have either been implemented or deliberately documented as a project deliverable.**
## Completed visual assets

Timeless Tiles has an original local brand system, five category SVGs, a hero SVG, and 40 local deterministic demo product SVGs linked through one deployed primary image row per active product. This does not represent implementation of Homepage, Catalogue UI, Product Details UI, Search, Filters, Comparison, or Room Recommendations.

## Implemented shell foundations

The global responsive layout, desktop/mobile navigation, footer, breadcrumbs, and route foundations are implemented. Placeholder routes are not completed Homepage, catalogue, product-detail, search, filter, comparison, recommendation, quote, or contact-form modules.

## Implemented homepage

The homepage is implemented with read-only deployed demo catalogue data: category discovery, featured tiles, accurate demo offers, approved demo reviews, audience, journey, brand story, and CTAs. The full Product Catalogue, Product Details, Search, Advanced Filters, Comparison, Room-wise Recommendations, Quote Form, Contact Form, WhatsApp Enquiry, moderated Review Submission, and Store Finder are now implemented. Store Finder uses factual existing active demo-store records; no geolocation tracking or Maps API is used.

## Implemented catalogue

The responsive Product Catalogue, product search, filters, category-specific browsing, Product Details, product specifications and pricing, application information, suitable-space tags, approved product-review display, product-detail navigation, moderated product-aware review submission, and Store Finder are implemented. Tile Comparison is implemented with an accessible three-product local selection, shareable URL, and server-side public catalogue verification. Store Finder is a read-only active-store list with shareable search/city state, factual contact actions, and external directions links where addresses exist. Submitted reviews are fictional academic-demo records and default to unapproved; manual approval remains a Supabase dashboard task.

## Implemented public content pages

`/collections` renders five transparent, data-driven editorial groupings (Featured, New Arrivals, Sale Selection, Outdoor Living, Wet Area Selection) derived directly from product attributes without hardcoded IDs. `/offers` presents actual sale-priced products (`sale_price < price`) with verified discount math and clear demo notices without artificial countdowns. `/about` presents the academic project context, why the platform exists, implemented feature overview, four target audiences, and the four-step customer journey.

## Implemented technical SEO foundation

Technical SEO infrastructure is complete: root layout metadata with `%s | Timeless Tiles` template, site URL abstraction supporting `NEXT_PUBLIC_SITE_URL`, Vercel production URLs, and localhost fallback, canonical URL metadata pointing search/filter variants to stable base routes, dynamically generated `sitemap.xml` covering 40 products, 5 categories, and static pages, `robots.txt` allowing public crawling and protecting `/dev/`, Open Graph image generator (`/opengraph-image`), and safe `BreadcrumbList` JSON-LD structured data. Commercial schemas (LocalBusiness, AggregateRating, Product offer schemas) are intentionally excluded to maintain academic demo integrity.
