import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { productVisual } from "@/lib/visuals/assets";
import { CompareToggle } from "@/components/compare/CompareToggle";

type ProductCardProduct = {
  name: string; slug: string; price: number; sale_price: number | null; size_label: string; finish: string; material: string;
  is_new?: boolean; stock_status?: string; category: { name: string; slug: string } | null;
  product_images: { image_url: string; alt_text: string | null }[];
};
export function ProductCard({ product, href = product.category ? `/tiles/${product.category.slug}/${product.slug}` : "/tiles", ctaLabel = "View Details" }: { product: ProductCardProduct; href?: string | null; ctaLabel?: string | null }) {
  const image = productVisual(product.slug, "texture", product.product_images[0]?.image_url);
  const sale = product.sale_price !== null && product.sale_price > 0 && product.sale_price < product.price;
  const discount = sale ? Math.round(((product.price - product.sale_price!) / product.price) * 100) : 0;
  const picture = image ? <Image src={image} alt={`${product.name} illustrative tile surface`} fill sizes="(max-width: 639px) 92vw, (max-width: 1023px) 44vw, 25vw" className="object-cover" /> : null;
  return <article className="product-card flex flex-col">
    <div className="product-card-image relative">
      {href ? <Link href={href} className="absolute inset-0" aria-label={`View ${product.name}`}>{picture}</Link> : picture}
      {sale ? <span className="absolute left-2 top-2 rounded-sm bg-[#9B3B28] px-2 py-1 text-[10px] font-bold text-white">{discount}% demo offer</span> : null}
      <div className="absolute right-2 top-2"><CompareToggle slug={product.slug} name={product.name} compact /></div>
    </div>
    <div className="flex flex-1 flex-col gap-3 p-3 sm:p-4">
      <div><p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted">{product.category?.name ?? "Tile collection"}</p><h3>{href ? <Link href={href}>{product.name}</Link> : product.name}</h3></div>
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1"><span className="product-price">{formatPrice(sale ? product.sale_price! : product.price)}</span>{sale ? <span className="text-xs text-muted line-through">{formatPrice(product.price)}</span> : null}</div>
      <div className="flex flex-wrap gap-1"><span className="product-chip">{product.size_label}</span><span className="product-chip">{product.finish}</span><span className="product-chip">{product.material}</span>{product.is_new ? <span className="product-chip">New arrival</span> : null}</div>
      {href && ctaLabel ? <Link href={href} className="action-primary mt-auto w-full">{ctaLabel === "View Tile" ? "View Details" : ctaLabel}<ArrowRight size={16} aria-hidden /></Link> : null}
    </div>
  </article>;
}
