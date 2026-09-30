import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductCard } from "@/components/products/ProductCard";
import type { HomeProduct } from "@/lib/queries/home";

export function ProductSections({ featured, offers }: { featured: HomeProduct[]; offers: HomeProduct[] }) {
  const actualOffers = offers.filter(product => product.sale_price !== null && product.sale_price > 0 && product.sale_price < product.price);
  return <>
    <section className="pb-16 pt-5 sm:pb-20"><Container className="grid gap-8 xl:grid-cols-[.75fr_2.4fr]">
      <div><SectionHeading eyebrow="Featured collection">Surfaces worth a closer look.</SectionHeading><p className="mt-4 max-w-xl leading-7 text-muted">Explore featured floor, wall, bathroom, kitchen and outdoor tiles from the current demo catalogue.</p><Button href="/collections" className="mt-6">View All Collections <ArrowRight size={16} aria-hidden /></Button></div>
      {featured.length ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{featured.map(product => <ProductCard key={product.id} product={product} />)}</div> : <p className="text-muted">Featured tile selections will appear here when available.</p>}
    </Container></section>
    {actualOffers.length ? <section className="border-y bg-surface-muted py-14 sm:py-20"><Container>
      <div className="flex flex-wrap items-end justify-between gap-5"><div><SectionHeading eyebrow="Current offers">Selected surfaces. Considered prices.</SectionHeading><p className="mt-3 max-w-2xl text-sm leading-6 text-muted">Prices shown are project/demo catalogue prices per square metre, based on the current collection data.</p></div><Button href="/offers" variant="outline">View Offers <ArrowRight size={16} aria-hidden /></Button></div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{actualOffers.map(product => <ProductCard key={product.id} product={product} />)}</div>
    </Container></section> : null}
  </>;
}
