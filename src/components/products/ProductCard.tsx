import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

type ProductCardProduct = {
  name: string;
  price: number;
  sale_price: number | null;
  size_label: string;
  finish: string;
  material: string;
  category: { name: string; slug: string } | null;
  product_images: { image_url: string; alt_text: string | null }[];
};

export function ProductCard({
  product,
  href = product.category ? `/tiles/${product.category.slug}` : "/tiles",
  ctaLabel = "View Tile",
}: {
  product: ProductCardProduct;
  href?: string;
  ctaLabel?: string;
}) {
  const image = product.product_images[0];
  const sale = product.sale_price !== null && product.sale_price < product.price;
  const discount = sale ? Math.round(((product.price - product.sale_price!) / product.price) * 100) : 0;

  return (
    <article className="overflow-hidden border bg-surface shadow-[var(--shadow-subtle)]">
      <Link href={href} className="block">
        <div className="relative aspect-square bg-surface-muted">
          {image ? <Image src={image.image_url} alt={image.alt_text ?? `${product.name} tile demo render`} fill unoptimized className="object-cover" /> : null}
          {sale ? <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground">{discount}% demo offer</Badge> : null}
        </div>
      </Link>
      <div className="space-y-3 p-5">
        <p className="text-xs font-semibold uppercase tracking-[.14em] text-muted">{product.category?.name ?? "Tile collection"}</p>
        <h3 className="text-xl"><Link href={href}>{product.name}</Link></h3>
        <p className="text-sm text-muted">{product.size_label} · {product.finish} · {product.material}</p>
        <div className="flex flex-wrap items-baseline gap-2">
          <span className={sale ? "text-sm text-muted line-through" : "font-semibold"}>{formatPrice(product.price)}</span>
          {sale ? <span className="font-semibold text-primary">{formatPrice(product.sale_price!)}</span> : null}
        </div>
        <Link href={href} className="inline-flex text-sm font-semibold text-primary">{ctaLabel} <span aria-hidden>→</span></Link>
      </div>
    </article>
  );
}
