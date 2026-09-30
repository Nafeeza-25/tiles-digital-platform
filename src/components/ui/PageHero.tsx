import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "./container";

export function PageHero({ eyebrow, title, accent, description, image, alt, children, compact = false, stackAccent = false }: { eyebrow?: string; title: string; accent?: string; description: string; image: string; alt: string; children?: ReactNode; compact?: boolean; stackAccent?: boolean }) {
  return <section className={`page-hero${compact ? " page-hero-compact" : ""}`}>
    <Image src={image} alt={alt} fill preload sizes="100vw" className="hero-image object-cover" />
    <div className="hero-shade" />
    <Container className="relative z-1">
      {eyebrow ? <p className="hero-eyebrow">{eyebrow}</p> : null}
      <h1 className={stackAccent ? "hero-heading-stack" : undefined}>{title}{accent ? <> <span>{accent}</span></> : null}</h1>
      <p className="hero-description">{description}</p>
      {children}
    </Container>
  </section>;
}
