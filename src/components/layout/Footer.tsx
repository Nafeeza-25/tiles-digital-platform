import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { site } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t bg-surface-muted py-12">
      <Container className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <section>
          <Image src="/images/brand/timeless-tiles-wordmark.svg" alt="Timeless Tiles" width={176} height={32} unoptimized className="h-8 w-44" />
          <p className="mt-3 text-sm text-muted">A thoughtful academic demonstration of a contemporary tile brand.</p>
        </section>
        <section>
          <h2>Explore</h2>
          {site.primaryNavigation.slice(0, 4).map((item) => <Link className="mt-2 block text-sm" href={item.href} key={item.href}>{item.label}</Link>)}
        </section>
        <section>
          <h2>Tile Categories</h2>
          {site.categories.map((item) => <Link className="mt-2 block text-sm" href={item.href} key={item.href}>{item.label}</Link>)}
        </section>
        <section>
          <h2>Company</h2>
          {site.primaryNavigation.slice(-2).map((item) => <Link className="mt-2 block text-sm" href={item.href} key={item.href}>{item.label}</Link>)}
        </section>
      </Container>
      <Container className="mt-10 text-sm text-muted">Timeless Tiles is a fictional academic demonstration brand. © {year} Timeless Tiles.</Container>
    </footer>
  );
}
