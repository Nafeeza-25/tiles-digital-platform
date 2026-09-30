import type { Metadata } from "next";
import Image from "next/image";
import { guideImages } from "@/lib/visuals/assets";
import { createOpenGraphMetadata } from "@/lib/seo/metadata";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { getTileGuide, tileGuides } from "@/data/guides";

export const dynamicParams = false;

export function generateStaticParams() {
  return tileGuides.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getTileGuide(slug);

  if (!guide) return {};

  const title = guide.title;
  const description = guide.description;
  return {
    title,
    description,
    openGraph: createOpenGraphMetadata(`/guides/${slug}`, title, description),
    alternates: { canonical: `/guides/${slug}` },
  };
}

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getTileGuide(slug);

  if (!guide) notFound();

  const relatedGuides = tileGuides.filter((g) => g.slug !== guide.slug).slice(0, 3);

  return (
    <article className="site-container py-10">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Tile Guides", href: "/guides" },
          { label: guide.title },
        ]}
      />

      <header className="mx-auto max-w-3xl border-b pb-8">
        <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-primary">
          <span>{guide.topicLabel}</span>
          <span aria-hidden>•</span>
          <span className="text-muted font-normal lowercase">{guide.readingTime}</span>
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          {guide.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">{guide.intro}</p>
      </header>

      <div className="relative mx-auto mt-8 aspect-[16/7] max-w-3xl overflow-hidden rounded-sm"><Image src={guideImages[guide.slug]} alt={`Illustrative architectural setting for ${guide.topicLabel.toLowerCase()}`} fill loading="eager" sizes="(max-width: 767px) 92vw, 768px" className="object-cover" /></div>

      <div className="mx-auto mt-8 max-w-3xl space-y-10 text-base leading-relaxed text-foreground">
        {guide.sections.map((section, idx) => (
          <section key={idx} className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              {section.h2}
            </h2>
            {section.paragraphs.map((p, pIdx) => (
              <p key={pIdx} className="text-muted">
                {p}
              </p>
            ))}
            {section.bullets && (
              <ul className="list-disc space-y-2 pl-6 text-muted">
                {section.bullets.map((b, bIdx) => (
                  <li key={bIdx}>{b}</li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {guide.selectionChecklist && (
          <section className="mt-10 rounded-lg border bg-surface p-6 sm:p-8">
            <h3 className="text-xl font-semibold text-foreground">
              {guide.selectionChecklist.title}
            </h3>
            <ul className="mt-4 space-y-3">
              {guide.selectionChecklist.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-10 border-t pt-8">
          <div className="rounded-lg bg-secondary p-6 text-secondary-foreground sm:p-8">
            <h3 className="text-2xl font-semibold">{guide.cta.headline}</h3>
            <p className="mt-2 text-sm text-secondary-foreground/80">{guide.cta.text}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={guide.cta.primaryHref}>{guide.cta.primaryLabel}</Button>
              {guide.cta.secondaryHref && (
                <Button href={guide.cta.secondaryHref} variant="outline">
                  {guide.cta.secondaryLabel}
                </Button>
              )}
            </div>
          </div>
        </section>

        {guide.academicDisclaimer && (
          <p className="mt-6 text-xs text-muted/80 italic border-l-2 border-accent pl-3">
            {guide.academicDisclaimer}
          </p>
        )}
      </div>

      <footer className="mx-auto mt-16 max-w-3xl border-t pt-10">
        <h2 className="text-2xl font-semibold tracking-tight">Related Guides</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {relatedGuides.map((rel) => (
            <Link
              key={rel.slug}
              href={`/guides/${rel.slug}`}
              className="group block rounded-lg border bg-surface p-4 transition-all hover:border-primary"
            >
              <div className="relative mb-3 aspect-[16/10] overflow-hidden rounded-sm"><Image src={guideImages[rel.slug]} alt="" fill sizes="(max-width: 639px) 90vw, 240px" className="object-cover" /></div>
              <span className="text-xs font-semibold text-primary">{rel.topicLabel}</span>
              <h3 className="mt-2 text-sm font-semibold line-clamp-2 group-hover:underline">
                {rel.title}
              </h3>
            </Link>
          ))}
        </div>
      </footer>
    </article>
  );
}
