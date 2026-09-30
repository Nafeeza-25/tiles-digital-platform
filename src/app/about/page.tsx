import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import type { Metadata } from "next";
import { createOpenGraphMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Timeless Tiles",
  description: "Learn about the fictional Timeless Tiles academic project and its digital catalogue, comparison, recommendation and enquiry experience.",
  openGraph: createOpenGraphMetadata("/about", "About Timeless Tiles", "Learn about the fictional Timeless Tiles academic project and its digital catalogue, comparison, recommendation and enquiry experience."),
  alternates: { canonical: "/about" },
};

const AUDIENCES = [
  {
    title: "Homeowners",
    description: "Exploring tiles for new home builds, kitchen updates, bathroom renovations, and outdoor living spaces.",
  },
  {
    title: "Architects & Interior Designers",
    description: "Evaluating material specifications, technical finish ratings, dimensions, and aesthetic suitability for client projects.",
  },
  {
    title: "Builders & Contractors",
    description: "Accessing technical specifications, volume planning details, and requesting formal quote estimates.",
  },
  {
    title: "Dealers & Showrooms",
    description: "Browsing catalogue offerings, verifying product specs, and initiating wholesale or distribution enquiries.",
  },
];

const JOURNEY_STEPS = [
  {
    step: "01",
    title: "Browse",
    description: "Explore the 40-product catalogue across floor, wall, bathroom, kitchen, and outdoor categories with multi-attribute filtering.",
  },
  {
    step: "02",
    title: "Discover",
    description: "Use room-wise recommendation rules and side-by-side tile comparison to evaluate suitable options.",
  },
  {
    step: "03",
    title: "Connect",
    description: "Submit product-aware enquiries, request quotes, or initiate direct WhatsApp conversations with demo store contacts.",
  },
  {
    step: "04",
    title: "Decide",
    description: "Review approved customer feedback and visit fictional showroom locations through factual contact and direction details.",
  },
];

export default function AboutPage() {
  const features = [
    ["Digital Catalogue", "40 active products with illustrative local imagery, multi-value filters, and search."],
    ["Tile Comparison", "Accessible three-product comparison with shareable URL state."],
    ["Room Recommendations", "Rule-based discovery matching products to seven home and commercial spaces."],
    ["Lead Generation", "Structured contact, quote, product enquiry, and WhatsApp entry points."],
    ["Customer Reviews", "Moderated product review submission with approved-only public display."],
    ["Store Finder", "Location search and factual contact/directions links for active demo stores."],
  ];
  return <><PageHero stackAccent eyebrow="About the platform" title="Timeless Tiles." accent="Beautiful Spaces." description="An academic demonstration of a clearer, more considered digital tile discovery experience." image="/images/editorial/about-interior.webp" alt="Illustrative premium showroom interior with architectural tile displays" />
    <section className="site-container pb-16 pt-6"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
      <section className="editorial-split mt-8" aria-labelledby="about-story"><Image src="/images/editorial/about-showroom.webp" loading="eager" alt="Illustrative showroom for the fictional Timeless Tiles project" width={1440} height={1080} sizes="(max-width: 767px) 92vw, 48vw" className="editorial-image aspect-[4/3]" /><div><p className="text-xs font-semibold uppercase tracking-[.2em] text-primary">Our project</p><h2 id="about-story" className="mt-3 text-3xl sm:text-4xl">A clearer way to discover beautiful spaces.</h2><p className="mt-5 leading-7 text-muted">Timeless Tiles is an academic demonstration platform built for a Digital Transformation &amp; Marketing Strategy project. It showcases how a traditional tile manufacturing and retail business can transition into a modern digital experience.</p><p className="mt-4 leading-7 text-muted">The platform brings catalogue discovery, detailed specifications, interactive comparison, and enquiry tools together. All brand, product, location, pricing, and review records are fictional demonstration content.</p><Button href="/collections" className="mt-6">Explore Our Collections</Button></div></section>
      <section aria-label="Factual platform metrics" className="my-12 grid grid-cols-2 gap-6 rounded-sm border-y bg-surface-muted py-8 text-center lg:grid-cols-4">{[["40", "Demo products"], ["5", "Tile categories"], ["7", "Room types"], ["3", "Demo stores"]].map(([count, label]) => <div key={label}><p className="text-4xl font-bold text-primary">{count}</p><p className="mt-2 text-sm text-muted">{label}</p></div>)}</section>
      <section aria-labelledby="why-exists-heading" className="editorial-split"><div><p className="text-xs font-semibold uppercase tracking-[.2em] text-primary">The digital opportunity</p><h2 id="why-exists-heading" className="mt-3 text-3xl">Consider the details. See the possibilities.</h2><p className="mt-5 leading-7 text-muted">Tile purchasing traditionally relies on physical showroom visits, printed catalogues, and fragmented specification sheets. Comparing finishes, sizes, and suitability across multiple spaces can be difficult without clear digital tools.</p><p className="mt-4 leading-7 text-muted">Timeless Tiles demonstrates a streamlined digital solution for exploring those choices with transparent product data.</p></div><Image src="/images/editorial/about-material-detail.webp" alt="Illustrative close-up of tile material and surface detail" width={1440} height={1080} sizes="(max-width: 767px) 92vw, 48vw" className="editorial-image aspect-[4/3]" /></section>
      <section className="mt-14 border-t pt-10" aria-labelledby="capabilities-heading"><h2 id="capabilities-heading" className="text-3xl">Implemented Platform Features</h2><div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{features.map(([title, text]) => <article key={title} className="rounded-sm border bg-surface p-6"><h3 className="text-lg">{title}</h3><p className="mt-3 text-sm leading-6 text-muted">{text}</p></article>)}</div></section>
      <section className="mt-14 border-t pt-10" aria-labelledby="audiences-heading"><h2 id="audiences-heading" className="text-3xl">Who We Serve</h2><div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{AUDIENCES.map(item => <article key={item.title} className="rounded-sm border bg-surface p-6"><h3 className="text-lg">{item.title}</h3><p className="mt-3 text-sm leading-6 text-muted">{item.description}</p></article>)}</div></section>
      <section className="mt-14 border-t pt-10" aria-labelledby="journey-heading"><h2 id="journey-heading" className="text-3xl">The Customer Journey</h2><div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{JOURNEY_STEPS.map(step => <article key={step.step}><p className="text-sm font-semibold text-primary">{step.step}</p><h3 className="mt-3 text-xl">{step.title}</h3><p className="mt-3 text-sm leading-6 text-muted">{step.description}</p></article>)}</div></section>
      <aside className="mt-14 rounded-sm border-l-4 border-accent bg-surface-muted p-6"><h2 className="text-xl">Academic Demonstration Notice</h2><p className="mt-3 text-sm leading-6 text-muted">Timeless Tiles is a fictional brand created exclusively for academic research, digital transformation modeling, and project evaluation. All products, store locations, pricing figures, and customer reviews are demonstration records. No commercial transactions are processed through this site.</p><div className="mt-6 flex flex-wrap gap-4"><Button href="/tiles">Explore Catalogue</Button><Button href="/contact" variant="outline">Contact Demonstration Team</Button></div></aside>
    </section></>;
}
