import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { site } from "@/data/site";

export function Footer() {
  return <footer className="site-footer mt-auto border-t py-14">
    <Container className="grid gap-9 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
      <section><div className="flex items-center gap-3"><Image src="/images/brand/timeless-tiles-mark.svg" alt="" width={38} height={38} className="brand-mark" unoptimized /><p className="text-lg font-bold uppercase tracking-[.1em]">Timeless Tiles</p></div><p className="mt-5 max-w-xs text-sm leading-7 text-muted">A thoughtful academic demonstration of a contemporary tile brand. Beautiful spaces begin with considered choices.</p></section>
      <section><h2>Explore</h2>{[["Home", "/"], ["Tile Catalogue", "/tiles"], ["Collections", "/collections"], ["Offers", "/offers"], ["Compare Tiles", "/compare"], ["Room Recommendations", "/recommendations"]].map(([label, href]) => <Link key={href} href={href} className="mt-2 block py-1 text-sm text-white/80">{label}</Link>)}</section>
      <section><h2>Tile Categories</h2>{site.categories.map(item => <Link key={item.href} href={item.href} className="mt-2 block py-1 text-sm text-white/80">{item.label}</Link>)}</section>
      <section><h2>Discover</h2>{[["About Us", "/about"], ["Tile Guides", "/guides"], ["Store Finder", "/stores"], ["Contact", "/contact"], ["Get a Quote", "/contact?intent=quote"]].map(([label, href]) => <Link key={href} href={href} className="mt-2 block py-1 text-sm text-white/80">{label}</Link>)}</section>
    </Container>
    <Container className="mt-10 flex flex-wrap justify-between gap-4 border-t border-white/15 pt-6 text-xs leading-6 text-muted"><p>Timeless Tiles is a fictional academic demonstration brand.</p><p>© {new Date().getFullYear()} Timeless Tiles.</p></Container>
  </footer>;
}
