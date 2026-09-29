import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import manifest from "../../../../public/marketing/manifest.json";

export const metadata: Metadata = {
  title: "Marketing Asset Preview (Development Only)",
  robots: { index: false, follow: false },
};

const groups = [
  { title: "Instagram square", match: "Instagram square" },
  { title: "Stories, Reels, and Shorts covers", match: "Instagram Story / Reels / Shorts" },
  { title: "Facebook link graphics", match: "Facebook link graphic" },
  { title: "YouTube thumbnails", match: "YouTube thumbnail" },
  { title: "Integrated campaign banners", match: "Campaign banner" },
] as const;

export default function MarketingPreviewPage() {
  return (
    <Container className="py-8 sm:py-10">
      <p className="text-sm font-semibold uppercase tracking-[.14em] text-primary">
        Development-only route
      </p>
      <h1 className="mt-3 text-3xl sm:text-4xl">Marketing creative preview</h1>
      <p className="mt-3 max-w-3xl text-muted">
        Fictional academic-demo artwork for review only. These assets have not been published or used in live advertising.
      </p>

      {groups.map((group) => {
        const assets = manifest.assets.filter((asset) => asset.channel === group.match);
        return (
          <section key={group.match} className="mt-10 min-w-0" aria-labelledby={`group-${group.match}`}>
            <h2 id={`group-${group.match}`} className="text-2xl font-semibold">{group.title}</h2>
            <div className="mt-5 grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {assets.map((asset) => (
                <figure key={asset.file} className="min-w-0 overflow-hidden border bg-surface p-3">
                  <Image
                    src={"/marketing" + asset.file}
                    alt={asset.alt}
                    width={asset.width}
                    height={asset.height}
                    unoptimized
                    className="block h-auto w-full"
                  />
                  <figcaption className="mt-3 min-w-0 space-y-2 text-sm">
                    <p className="break-all font-semibold">{asset.file.split("/").at(-1)}</p>
                    <p className="text-muted">{asset.dimensions} · {asset.campaign}</p>
                    <p><span className="font-semibold">CTA:</span> {asset.cta}</p>
                    <p className="break-all"><span className="font-semibold">Destination:</span> {asset.route}</p>
                    <p className="text-muted"><span className="font-semibold">Alt:</span> {asset.alt}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        );
      })}
    </Container>
  );
}
