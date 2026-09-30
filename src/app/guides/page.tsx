import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { guideImages } from "@/lib/visuals/assets";
import type { Metadata } from "next";
import { createOpenGraphMetadata } from "@/lib/seo/metadata";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { site } from "@/data/site";
import { tileGuides } from "@/data/guides";

export const metadata: Metadata = {
  title: "Tile Guides",
  description: "Explore expert tile selection guides covering bathroom tiles, floor tile specifications, room suitabilities, nearby stores, and tile company evaluation.",
  openGraph: createOpenGraphMetadata("/guides", "Tile Guides", "Explore expert tile selection guides covering bathroom tiles, floor tile specifications, room suitabilities, nearby stores, and tile company evaluation."),
  alternates: { canonical: "/guides" },
};

export default function GuidesIndexPage() {
  return <><PageHero eyebrow="Learn before you choose" title="Tile" accent="Guides" description="Educational tile selection guides covering materials, finishes, room suitability, and buying considerations within the academic demonstration platform." image="/images/guides/rooms-guide.webp" alt="Illustrative architectural room with considered tile finishes" />
    <section className="site-container pb-16 pt-6"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tile Guides" }]} />
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{tileGuides.map((guide, index) => <article key={guide.slug} className="flex flex-col overflow-hidden rounded-sm border bg-surface shadow-[var(--shadow-subtle)]">
        <Link href={`/guides/${guide.slug}`} aria-label={`Read ${guide.title}`} className="relative block aspect-[16/10]"><Image src={guideImages[guide.slug]} alt="" fill loading={index < 3 ? "eager" : "lazy"} sizes="(max-width: 767px) 92vw, (max-width: 1023px) 45vw, 33vw" className="object-cover" /></Link>
        <div className="flex flex-1 flex-col p-6"><div className="flex flex-wrap justify-between gap-2 text-[10px] font-semibold uppercase tracking-wider text-primary"><span>{guide.topicLabel}</span><span className="font-normal lowercase text-muted">{guide.readingTime}</span></div><h2 className="mt-3 text-xl leading-snug"><Link href={`/guides/${guide.slug}`} className="hover:underline">{guide.title}</Link></h2><p className="mt-3 text-sm leading-6 text-muted">{guide.description}</p><Link href={`/guides/${guide.slug}`} className="mt-5 inline-flex min-h-11 items-center gap-2 border-t pt-4 text-sm font-semibold text-primary">Read Guide <ArrowRight size={16} aria-hidden /></Link></div>
      </article>)}</div>
      <aside className="mt-14 rounded-sm border-l-4 border-accent bg-surface-muted p-6"><h2 className="text-xl">About Timeless Tiles Guides</h2><p className="mt-3 max-w-3xl text-sm leading-6 text-muted">These guides provide transparent educational insights into tile specifications, surface finishes, and selection methodologies for academic demo evaluation.</p><div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold"><Link href="/tiles" className="inline-flex min-h-11 items-center text-primary hover:underline">Browse Tile Catalogue</Link><Link href={site.recommendations.href} className="inline-flex min-h-11 items-center text-primary hover:underline">Room Recommendations</Link></div></aside>
    </section></>;
}
