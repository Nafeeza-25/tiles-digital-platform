import Image from "next/image";

export function ProductGallery({ images, name }: { images: { image_url: string; alt_text: string | null }[]; name: string }) {
  const primary = images[0];
  return <div className="border bg-surface-muted p-4"><div className="relative aspect-square overflow-hidden bg-surface">{primary ? <Image src={primary.image_url} alt={primary.alt_text ?? `${name} tile demo render`} fill unoptimized className="object-cover" /> : <p className="p-6 text-muted">No product image is available.</p>}</div></div>;
}
