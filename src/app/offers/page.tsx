import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { productVisual } from "@/lib/visuals/assets";
import type { Metadata } from "next";
import { createOpenGraphMetadata } from "@/lib/seo/metadata";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ProductCard } from "@/components/products/ProductCard";
import { getCatalogueProducts } from "@/lib/queries/catalog";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Tile Offers",
  description: "Browse Timeless Tiles demo catalogue products currently showing genuine reduced prices.",
  openGraph: createOpenGraphMetadata("/offers", "Tile Offers", "Browse Timeless Tiles demo catalogue products currently showing genuine reduced prices."),
  alternates: { canonical: "/offers" },
};

export default async function OffersPage() {
  const products = await getCatalogueProducts();
  const saleProducts = products.filter(product => product.sale_price !== null && product.sale_price > 0 && product.sale_price < product.price);
  return <><PageHero eyebrow="Current catalogue offers" title="Selected Tiles." accent="Considered Prices." description="Browse active Timeless Tiles demo catalogue items currently showing genuine reduced pricing." image="/images/editorial/offers-hero.webp" alt="Illustrative architectural living room with warm tile finishes" />
    <section className="site-container pb-16 pt-6"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Offers" }]} />
      {saleProducts.length ? <div className="mt-6 grid gap-5 lg:grid-cols-3">{saleProducts.slice(0, 3).map(product => <Link key={product.id} href={`/tiles/${product.category?.slug}/${product.slug}`} className="group relative isolate overflow-hidden rounded-sm bg-[#0C1720] p-6 text-white">
        <Image src={productVisual(product.slug, "room")!} alt={`Illustrative ${product.name} room setting`} fill loading="eager" sizes="(max-width: 1023px) 92vw, 33vw" className="-z-2 object-cover" /><div className="absolute inset-0 -z-1 bg-[#0C1720]/60" />
        <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#E5B663]">{product.category?.name}</p><p className="mt-3 text-4xl font-bold">{Math.round(((product.price - product.sale_price!) / product.price) * 100)}% <span className="text-[#E5B663]">demo offer</span></p><h2 className="mt-3 text-xl">{product.name}</h2><p className="mt-2 text-sm">{formatPrice(product.sale_price!)}</p><span className="action-primary mt-6">Explore Offer</span>
      </Link>)}</div> : null}
      <aside className="mt-6 rounded-sm border-l-4 border-accent bg-surface-muted px-5 py-4 text-sm leading-6 text-muted"><strong>Academic Demo Note:</strong> Offers reflect current price reductions in the project catalogue. Prices are shown per square metre.</aside>
      <section className="mt-12" aria-labelledby="offers-heading"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="mb-2 text-xs font-semibold uppercase tracking-[.18em] text-primary">Current selection</p><h2 id="offers-heading" className="text-3xl">{saleProducts.length === 1 ? "1 product on offer" : `${saleProducts.length} products on offer`}</h2></div><div className="flex gap-3"><Link href="/tiles" className="inline-flex min-h-11 items-center rounded-sm border px-4 text-sm font-semibold">Browse All Tiles</Link><Link href="/contact?intent=quote" className="action-primary">Get a Quote</Link></div></div>
        {saleProducts.length ? <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{saleProducts.map(product => <div key={product.id}><ProductCard product={product} /><p className="mt-2 text-xs text-muted">Save {formatPrice(product.price - product.sale_price!)} ({Math.round(((product.price - product.sale_price!) / product.price) * 100)}% discount)</p></div>)}</div> : <div className="mt-8 rounded-sm border bg-surface p-8"><h3 className="text-xl">No demo offers are currently available.</h3><p className="mt-2 text-muted">Browse the full catalogue for standard tile pricing.</p><Link href="/tiles" className="action-primary mt-6">Browse Tile Catalogue</Link></div>}
      </section>
    </section></>;
}
