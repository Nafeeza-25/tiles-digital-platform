import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductReviews } from "@/components/products/ProductReviews";
import { getTileCategory } from "@/lib/catalog/category-catalogue";
import { effectivePrice } from "@/lib/catalog/catalog-filters";
import { getProductDetail, getRelatedProducts } from "@/lib/queries/product";
import { formatPrice } from "@/lib/utils";

const applications: Record<string, string> = { floor: "Floor", wall: "Wall", indoor: "Indoor", outdoor: "Outdoor", wet_area: "Wet Area" };
const rooms: Record<string, string> = { living_room: "Living Room", bedroom: "Bedroom", bathroom: "Bathroom", kitchen: "Kitchen", balcony: "Balcony", outdoor: "Outdoor", commercial: "Commercial" };
const stockStatuses: Record<string, string> = { in_stock: "In Stock", low_stock: "Low Stock", out_of_stock: "Out of Stock", made_to_order: "Made to Order" };

export async function generateMetadata({ params }: { params: Promise<{ categorySlug: string; productSlug: string }> }): Promise<Metadata> {
  const { categorySlug, productSlug } = await params;
  const product = await getProductDetail(categorySlug, productSlug);
  if (!product) return {};
  return { title: `${product.name} ${product.category?.name.replace("Tiles", "Tile") ?? "Tile"} | Timeless Tiles`, description: product.short_description ?? product.description ?? `Explore ${product.name} from Timeless Tiles.` };
}

export default async function ProductPage({ params }: { params: Promise<{ categorySlug: string; productSlug: string }> }) {
  const { categorySlug, productSlug } = await params;
  if (!getTileCategory(categorySlug)) notFound();
  const product = await getProductDetail(categorySlug, productSlug);
  if (!product || !product.category) notFound();
  const category = product.category;
  const related = await getRelatedProducts(product);
  const currentPrice = effectivePrice(product);
  const sale = currentPrice !== product.price;
  const discount = sale ? Math.round(((product.price - currentPrice) / product.price) * 100) : 0;
  const quoteHref = `/contact?${new URLSearchParams({ intent: "quote", product: product.slug })}`;
  const contactHref = `/contact?${new URLSearchParams({ intent: "product", product: product.slug })}`;
  const specifications = [["SKU", product.sku], ["Size", product.size_label], ["Width", product.width_mm ? `${product.width_mm} mm` : null], ["Height", product.height_mm ? `${product.height_mm} mm` : null], ["Thickness", product.thickness_mm ? `${product.thickness_mm} mm` : null], ["Colour", product.colour], ["Finish", product.finish], ["Material", product.material], ["Slip Rating", product.slip_rating], ["Water Absorption", product.water_absorption], ["Stock Status", stockStatuses[product.stock_status] ?? product.stock_status]] as const;

  return <section className="site-container py-10"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tiles", href: "/tiles" }, { label: category.name, href: `/tiles/${category.slug}` }, { label: product.name }]} /><div className="grid gap-8 lg:grid-cols-2"><ProductGallery images={product.product_images} name={product.name} /><div className="space-y-5"><p className="text-sm font-semibold uppercase tracking-[.14em] text-primary">{category.name}</p><div className="flex flex-wrap gap-2">{product.is_new ? <span className="border px-2 py-1 text-xs font-semibold">New</span> : null}{product.is_featured ? <span className="border px-2 py-1 text-xs font-semibold">Featured</span> : null}</div><h1 className="text-4xl">{product.name}</h1><p className="text-sm text-muted">SKU: {product.sku}</p><p className="text-lg text-muted">{product.short_description}</p><div><p className="text-sm text-muted">Demo price per sq.m.</p><div className="mt-1 flex flex-wrap items-baseline gap-3">{sale ? <span className="text-muted line-through">{formatPrice(product.price)}</span> : null}<span className="text-2xl font-semibold">{formatPrice(currentPrice)}</span>{sale ? <span className="text-sm font-semibold text-primary">{discount}% demo offer</span> : null}</div></div><p className="font-semibold">{stockStatuses[product.stock_status] ?? product.stock_status}</p><div className="flex flex-wrap gap-3"><Link href={quoteHref} className="bg-primary px-5 py-3 font-semibold text-primary-foreground">Get a Quote</Link><Link href={contactHref} className="border px-5 py-3 font-semibold">Ask About This Tile</Link></div></div></div><div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_.8fr]"><div className="space-y-10"><section><h2 className="text-2xl">About this tile</h2><p className="mt-4 leading-7 text-muted">{product.description ?? product.short_description}</p></section><section><h2 className="text-2xl">Applications</h2><div className="mt-4 flex flex-wrap gap-2">{product.applications.map((application) => <span key={application} className="border px-3 py-2 text-sm">{applications[application] ?? application}</span>)}</div></section><section><h2 className="text-2xl">Suitable Spaces</h2><div className="mt-4 flex flex-wrap gap-2">{product.rooms.map((room) => <span key={room} className="border px-3 py-2 text-sm">{rooms[room] ?? room}</span>)}</div></section><ProductReviews reviews={product.reviews} /></div><section className="border bg-surface p-6"><h2 className="text-2xl">Specifications</h2><dl className="mt-5 divide-y">{specifications.filter(([, value]) => value).map(([label, value]) => <div key={label} className="grid gap-1 py-3 sm:grid-cols-2"><dt className="font-semibold">{label}</dt><dd className="text-muted">{value}</dd></div>)}</dl></section></div>{related.length ? <section className="mt-14"><h2 className="text-2xl">More from this collection</h2><div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{related.map((item) => <ProductCard key={item.id} product={item} href={`/tiles/${category.slug}/${item.slug}`} ctaLabel="View Tile" />)}</div></section> : null}</section>;
}
