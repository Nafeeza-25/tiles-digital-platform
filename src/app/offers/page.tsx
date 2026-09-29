import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ProductCard } from "@/components/products/ProductCard";
import { getCatalogueProducts } from "@/lib/queries/catalog";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Tile Offers",
  description: "Browse Timeless Tiles demo catalogue products currently showing genuine reduced prices.",
  alternates: { canonical: "/offers" },
};

export default async function OffersPage() {
  const products = await getCatalogueProducts();
  const saleProducts = products.filter(
    (product) => product.sale_price !== null && product.sale_price > 0 && product.sale_price < product.price
  );

  return (
    <section className="site-container py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Offers" }]} />
      <div className="max-w-3xl">
        <h1 className="text-4xl">Tile Offers</h1>
        <p className="mt-3 text-lg text-muted">
          Browse active Timeless Tiles demo catalogue items currently showing reduced pricing.
        </p>
      </div>

      <aside className="mt-6 border-l-4 border-primary bg-surface-muted p-4 text-sm text-muted">
        <strong>Academic Demo Note:</strong> Offers reflect factual price reductions in the project database. No artificial countdown timers, fake stock urgency, or flash sale claims are used.
      </aside>

      <section className="mt-10" aria-labelledby="offers-heading">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 id="offers-heading" className="text-2xl font-semibold">
            {saleProducts.length === 1 ? "1 product on offer" : `${saleProducts.length} products on offer`}
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/tiles" className="inline-flex min-h-11 items-center border bg-surface px-4 text-sm font-semibold hover:bg-surface-muted">
              Browse All Tiles
            </Link>
            <Link href="/contact?intent=quote" className="inline-flex min-h-11 items-center bg-primary px-4 text-sm font-semibold text-primary-foreground">
              Get a Quote
            </Link>
          </div>
        </div>

        {saleProducts.length > 0 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {saleProducts.map((product) => {
              const savings = product.price - product.sale_price!;
              const percent = Math.round((savings / product.price) * 100);
              return (
                <div key={product.id} className="flex flex-col">
                  <ProductCard product={product} />
                  <div className="border-x border-b bg-surface-muted p-3 text-xs font-semibold text-muted">
                    Save {formatPrice(savings)} ({percent}% discount)
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mt-8 border bg-surface p-8 text-center">
            <h3 className="text-xl">No demo offers are currently available.</h3>
            <p className="mt-2 text-muted">Check back later or browse the full catalogue for standard tile pricing.</p>
            <Link href="/tiles" className="mt-6 inline-flex min-h-11 items-center bg-primary px-5 font-semibold text-primary-foreground">
              Browse Tile Catalogue
            </Link>
          </div>
        )}
      </section>
    </section>
  );
}
