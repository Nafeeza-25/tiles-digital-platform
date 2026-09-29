import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { site } from "@/data/site";
import { tileGuides } from "@/data/guides";

export const metadata: Metadata = {
  title: "Tile Guides",
  description: "Explore expert tile selection guides covering bathroom tiles, floor tile specifications, room suitabilities, nearby stores, and tile company evaluation.",
  alternates: { canonical: "/guides" },
};

export default function GuidesIndexPage() {
  return (
    <section className="site-container py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tile Guides" }]} />
      <div className="max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Tile Guides</h1>
        <p className="mt-4 text-lg text-muted">
          Our educational guide collection helps you understand tile selection criteria, material specifications, room suitabilities, and buying considerations across residential and commercial projects within this academic demonstration platform.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tileGuides.map((guide) => (
          <article
            key={guide.slug}
            className="flex flex-col justify-between border bg-surface p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-primary">
                <span>{guide.topicLabel}</span>
                <span className="text-muted font-normal lowercase">{guide.readingTime}</span>
              </div>
              <h2 className="mt-3 text-xl font-semibold leading-snug">
                <Link href={`/guides/${guide.slug}`} className="hover:underline">
                  {guide.title}
                </Link>
              </h2>
              <p className="mt-3 text-sm text-muted line-clamp-3">{guide.description}</p>
            </div>
            <div className="mt-6 border-t pt-4">
              <Link
                href={`/guides/${guide.slug}`}
                className="inline-flex items-center text-sm font-semibold text-primary hover:underline"
              >
                Read Guide <span aria-hidden className="ml-1">→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>

      <aside className="mt-16 border-l-4 border-accent bg-surface-muted p-6">
        <h2 className="text-xl font-semibold">About Timeless Tiles Guides</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted">
          These guides provide transparent educational insights into tile specifications, surface finishes, and selection methodologies for academic demo evaluation.
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
          <Link href="/tiles" className="text-primary hover:underline">
            Browse Tile Catalogue →
          </Link>
          <Link href={site.recommendations.href} className="text-primary hover:underline">
            Room Recommendations →
          </Link>
        </div>
      </aside>
    </section>
  );
}
