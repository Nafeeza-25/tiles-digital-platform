import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { roomImages } from "@/lib/visuals/assets";
import type { Metadata } from "next";
import { createOpenGraphMetadata } from "@/lib/seo/metadata";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CompareToggle } from "@/components/compare/CompareToggle";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductReviews } from "@/components/products/ProductReviews";
import { getTileCategory } from "@/lib/catalog/category-catalogue";
import { effectivePrice } from "@/lib/catalog/catalog-filters";
import { applicationLabels, labelProductValues, roomLabels, stockStatusLabels } from "@/lib/catalog/product-labels";
import { getProductDetail, getRelatedProducts } from "@/lib/queries/product";
import { formatPrice } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ categorySlug: string; productSlug: string }> }): Promise<Metadata> {
  const { categorySlug, productSlug } = await params;
  const product = await getProductDetail(categorySlug, productSlug);
  if (!product) return {};
  const title = `${product.name} ${product.category?.name.replace("Tiles", "Tile") ?? "Tile"}`;
  const description = product.short_description ?? product.description ?? `Explore ${product.name} from Timeless Tiles.`;
  return {
    title,
    description,
    openGraph: createOpenGraphMetadata(`/tiles/${categorySlug}/${productSlug}`, title, description),
    alternates: { canonical: `/tiles/${categorySlug}/${productSlug}` },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ categorySlug: string; productSlug: string }> }) {
  const { categorySlug, productSlug } = await params;
  if (!getTileCategory(categorySlug)) notFound();
  const product = await getProductDetail(categorySlug, productSlug);
  if (!product || !product.category) notFound();
  const category = product.category;
  const related = await getRelatedProducts(product);
  const currentPrice = effectivePrice(product);
  const sale = product.sale_price !== null && product.sale_price > 0 && currentPrice < product.price;
  const discount = sale ? Math.round(((product.price - currentPrice) / product.price) * 100) : 0;
  const quoteHref = `/contact?${new URLSearchParams({ intent: "quote", product: product.slug })}`;
  const contactHref = `/contact?${new URLSearchParams({ intent: "product", product: product.slug })}`;
  const specifications = [["SKU", product.sku], ["Size", product.size_label], ["Width", product.width_mm ? `${product.width_mm} mm` : null], ["Height", product.height_mm ? `${product.height_mm} mm` : null], ["Thickness", product.thickness_mm ? `${product.thickness_mm} mm` : null], ["Colour", product.colour], ["Finish", product.finish], ["Material", product.material], ["Slip Rating", product.slip_rating], ["Water Absorption", product.water_absorption], ["Stock Status", stockStatusLabels[product.stock_status] ?? product.stock_status]] as const;
  const inspirationRooms = product.rooms.filter(room => roomImages[room]).slice(0, 4);
  return <section className="site-container py-7 sm:py-9">
    <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tiles", href: "/tiles" }, { label: category.name, href: `/tiles/${category.slug}` }, { label: product.name }]} />
    <div className="product-layout mt-6">
      <ProductGallery images={product.product_images} name={product.name} slug={product.slug} />
      <div className="space-y-5">
        <p className="text-xs font-semibold uppercase tracking-[.18em] text-primary">{category.name}</p>
        <h1 className="text-4xl leading-tight lg:text-[2.7rem]">{product.name}</h1>
        <p className="leading-7 text-muted">{product.short_description}</p>
        <div className="border-y py-5"><p className="mb-2 text-xs text-muted">Demo catalogue price per sq.m.</p><p className="text-[1.8rem] font-bold tracking-tight text-primary">{formatPrice(currentPrice)}</p>{sale ? <p className="mt-2 flex flex-wrap gap-3 text-sm"><span className="text-muted line-through">{formatPrice(product.price)}</span><span className="font-semibold text-primary">{discount}% demo offer</span></p> : null}</div>
        <div className="flex flex-wrap gap-2"><span className="product-chip">{product.size_label}</span><span className="product-chip">{product.finish}</span><span className="product-chip">{product.material}</span>{product.is_featured ? <span className="product-chip">Featured</span> : null}{product.is_new ? <span className="product-chip">New</span> : null}</div>
        <div className="flex flex-wrap gap-3"><Button href={quoteHref}>Get a Quote <ArrowRight size={16} aria-hidden /></Button><Button href={contactHref} variant="outline">Ask About This Tile</Button><CompareToggle slug={product.slug} name={product.name} /></div>
        <section className="pt-2"><h2 className="text-base">Applications</h2><p className="mt-2 text-sm leading-6 text-muted">{labelProductValues(product.applications, applicationLabels).join(" · ")}</p></section>
        <section><h2 className="text-base">Suitable Spaces</h2><p className="mt-2 text-sm leading-6 text-muted">{labelProductValues(product.rooms, roomLabels).join(" · ")}</p></section>
      </div>
      <section className="product-specifications" aria-labelledby="product-specifications"><h2 id="product-specifications" className="text-xl">Specifications</h2><dl className="mt-4">{specifications.filter(([, value]) => value).map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></section>
    </div>
    <section className="mt-12 max-w-3xl"><h2 className="text-2xl">About this tile</h2><p className="mt-4 leading-7 text-muted">{product.description ?? product.short_description}</p></section>
    {inspirationRooms.length ? <section className="mt-12 border-t pt-10"><h2 className="text-3xl">Room Inspiration</h2><p className="mt-3 text-sm text-muted">Illustrative settings for the catalogue&apos;s suitable-space tags.</p><div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">{inspirationRooms.map(room => <Link key={room} href={`/recommendations?room=${room}`} className="group"><div className="relative aspect-[4/3] overflow-hidden rounded-sm"><Image src={roomImages[room]} alt={`Illustrative ${roomLabels[room]?.toLowerCase() ?? room} tile setting`} fill sizes="(max-width: 1023px) 44vw, 25vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" /></div><p className="mt-3 text-sm font-semibold">{roomLabels[room]}</p></Link>)}</div></section> : null}
    {related.length ? <section className="mt-12 border-t pt-10"><h2 className="text-3xl">Related Products</h2><p className="mt-3 text-sm text-muted">More from this collection.</p><div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{related.map(item => <ProductCard key={item.id} product={item} href={`/tiles/${category.slug}/${item.slug}`} />)}</div></section> : null}
    <section className="mt-14 border-t pt-10"><ProductReviews reviews={product.reviews} product={{ id: product.id, name: product.name, slug: product.slug }} /></section>
  </section>;
}
