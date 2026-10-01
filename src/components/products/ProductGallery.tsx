"use client";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { productVisual } from "@/lib/visuals/assets";

export function ProductGallery({ images, name, slug }: { images: { image_url: string; alt_text: string | null }[]; name: string; slug: string }) {
  const views = [
    { src: productVisual(slug, "room"), label: "Room setting" },
    { src: productVisual(slug, "texture"), label: "Tile surface" },
    { src: productVisual(slug, "detail"), label: "Material detail" },
  ].filter((view): view is { src: string; label: string } => Boolean(view.src));
  const gallery = views.length ? views : images.map(image => ({ src: image.image_url, label: image.alt_text ?? `${name} tile image` }));
  const [selected, setSelected] = useState(0);
  if (!gallery.length) return <p className="rounded border bg-surface-muted p-6 text-muted">No product image is available.</p>;
  const active = gallery[selected] ?? gallery[0];
  const move = (step: number) => setSelected(index => (index + step + gallery.length) % gallery.length);
  return <div>
    <div className="product-gallery">
      <div className="flex flex-col gap-2" aria-label="Product image thumbnails">{gallery.map((image, index) => <button key={image.src} type="button" aria-label={`Show ${image.label.toLowerCase()} for ${name}`} aria-pressed={selected === index} className="gallery-thumbnail" onClick={() => setSelected(index)}><Image src={image.src} alt="" fill sizes="64px" className="object-cover" /></button>)}</div>
      <div className="product-gallery-main">
        <Image key={active.src} src={active.src} alt={`${name}: illustrative ${active.label.toLowerCase()}`} fill preload={selected === 0} sizes="(max-width: 767px) 80vw, (max-width: 1279px) 40vw, 35vw" className="gallery-image object-cover" />
        {gallery.length > 1 ? <><button onClick={() => move(-1)} type="button" aria-label="Previous product image" className="absolute left-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-foreground shadow-sm"><ChevronLeft aria-hidden /></button><button onClick={() => move(1)} type="button" aria-label="Next product image" className="absolute right-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-foreground shadow-sm"><ChevronRight aria-hidden /></button></> : null}
      </div>
    </div>
    <p className="mt-3 text-xs leading-5 text-muted" aria-live="polite">{active.label}. Images are illustrative academic-demo visuals; refer to the catalogue specifications.</p>
  </div>;
}
