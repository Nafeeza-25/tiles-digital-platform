import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Timeless Tiles | Digital Tiles Demo Platform",
  description: "Learn about the fictional Timeless Tiles academic project and its digital catalogue, comparison, recommendation and enquiry experience.",
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
  return (
    <section className="site-container py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />

      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[.14em] text-primary">Academic Demonstration Platform</p>
        <h1 className="mt-2 text-4xl sm:text-5xl">About Timeless Tiles</h1>
        <p className="mt-4 text-lg leading-8 text-muted">
          Timeless Tiles is an academic demonstration platform built for a Digital Transformation &amp; Marketing Strategy project. It showcases how a traditional tile manufacturing and retail business can transition into a modern, customer-centric digital experience.
        </p>
      </div>

      {/* Why the platform exists */}
      <section className="mt-12 border-t pt-10" aria-labelledby="why-exists-heading">
        <h2 id="why-exists-heading" className="text-2xl font-semibold">The Digital Opportunity</h2>
        <div className="mt-4 max-w-3xl space-y-4 text-muted leading-7">
          <p>
            Tile purchasing traditionally relies on physical showroom visits, printed catalogues, and fragmented product specification sheets. For homeowners and industry professionals alike, comparing finishes, sizes, and suitability across multiple spaces can be difficult without clear digital tools.
          </p>
          <p>
            The Timeless Tiles digital platform demonstrates a streamlined digital solution—bringing catalogue discovery, detailed technical specifications, interactive comparison, and lead-generation tools into a responsive digital experience.
          </p>
        </div>
      </section>

      {/* Implemented Capabilities */}
      <section className="mt-12 border-t pt-10" aria-labelledby="capabilities-heading">
        <h2 id="capabilities-heading" className="text-2xl font-semibold">Implemented Platform Features</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="border bg-surface p-5">
            <h3 className="text-lg font-semibold">Digital Catalogue</h3>
            <p className="mt-2 text-sm text-muted">40 active products with high-resolution local SVGs, multi-value filters, and search.</p>
          </div>
          <div className="border bg-surface p-5">
            <h3 className="text-lg font-semibold">Tile Comparison</h3>
            <p className="mt-2 text-sm text-muted">Accessible three-product comparison tool with shareable URL state.</p>
          </div>
          <div className="border bg-surface p-5">
            <h3 className="text-lg font-semibold">Room Recommendations</h3>
            <p className="mt-2 text-sm text-muted">Rule-based discovery matching products to seven distinct home and commercial spaces.</p>
          </div>
          <div className="border bg-surface p-5">
            <h3 className="text-lg font-semibold">Lead Generation</h3>
            <p className="mt-2 text-sm text-muted">Structured contact, quote, product enquiry, and WhatsApp entry points.</p>
          </div>
          <div className="border bg-surface p-5">
            <h3 className="text-lg font-semibold">Customer Reviews</h3>
            <p className="mt-2 text-sm text-muted">Moderated product review submission system backed by public read policies.</p>
          </div>
          <div className="border bg-surface p-5">
            <h3 className="text-lg font-semibold">Store Finder</h3>
            <p className="mt-2 text-sm text-muted">Location search and factual contact/directions links for active demo stores.</p>
          </div>
        </div>
      </section>

      {/* Target Audiences */}
      <section className="mt-12 border-t pt-10" aria-labelledby="audiences-heading">
        <h2 id="audiences-heading" className="text-2xl font-semibold">Who We Serve</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {AUDIENCES.map((item) => (
            <div key={item.title} className="border bg-surface p-5">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Customer Journey */}
      <section className="mt-12 border-t pt-10" aria-labelledby="journey-heading">
        <h2 id="journey-heading" className="text-2xl font-semibold">The Customer Journey</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {JOURNEY_STEPS.map((step) => (
            <div key={step.step} className="border bg-surface p-5">
              <span className="text-sm font-semibold text-primary">{step.step}</span>
              <h3 className="mt-1 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Academic Disclosure */}
      <aside className="mt-12 border-l-4 border-primary bg-surface-muted p-6">
        <h2 className="text-xl font-semibold">Academic Demonstration Notice</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Timeless Tiles is a fictional brand created exclusively for academic research, digital transformation modeling, and project evaluation. All products, store locations, pricing figures, and customer reviews are demonstration records. No commercial transactions are processed through this site.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Button href="/tiles">Explore Catalogue</Button>
          <Button href="/contact" variant="outline">Contact Demonstration Team</Button>
        </div>
      </aside>
    </section>
  );
}
