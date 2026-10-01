"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, Armchair, Grid2X2, Scale } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const slides = [
  { image: "/images/home/hero-living-room.webp", eyebrow: "Premium tiles for modern spaces", title: "Timeless Tiles.", accent: "Beautiful Spaces.", description: "Explore floor, wall, bathroom, kitchen, and outdoor tile collections for considered modern spaces.", href: "/tiles", cta: "Explore Tiles" },
  { image: "/images/home/hero-bathroom.webp", eyebrow: "Designed around your space", title: "Find Tiles", accent: "for Every Room.", description: "Use clear room-suitability tags and factual product details to explore the demo catalogue with confidence.", href: "/recommendations", cta: "Room Recommendations" },
  { image: "/images/home/hero-kitchen.webp", eyebrow: "Compare before you decide", title: "Explore. Compare.", accent: "Enquire.", description: "Bring tile specifications, prices, comparisons, and product-aware enquiries into one considered experience.", href: "/collections", cta: "Browse Collections" },
];

export function HeroSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = slides[active];
  const select = (index: number) => { setPaused(true); setActive((index + slides.length) % slides.length); };
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (paused || reducedMotion.matches || document.visibilityState !== "visible") return;
    const interval = window.setInterval(() => setActive((index) => (index + 1) % slides.length), 7000);
    const handleVisibility = () => { if (document.visibilityState !== "visible") window.clearInterval(interval); };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => { window.clearInterval(interval); document.removeEventListener("visibilitychange", handleVisibility); };
  }, [paused]);
  return <section className="home-hero home-hero-slider" aria-roledescription="carousel" aria-label="Featured Timeless Tiles directions" onMouseEnter={() => setPaused(true)} onFocusCapture={() => setPaused(true)}>
    {slides.map((slide, index) => <Image key={slide.image} src={slide.image} alt="" aria-hidden fill preload={index === 0} loading={index === 0 ? undefined : "lazy"} sizes="100vw" className={`hero-image object-cover ${index === active ? "is-active" : ""}`} />)}
    <div className="hero-shade" />
    <Container className="relative z-1"><div key={current.image} className="hero-copy"><p className="hero-eyebrow">{current.eyebrow}</p><h1>{current.title}<span>{current.accent}</span></h1><p className="hero-description max-w-xl">{current.description}</p><div className="mt-6 flex flex-wrap gap-3"><Button href={current.href} size="lg">{current.cta} <ArrowRight size={19} aria-hidden /></Button><Button href="/contact?intent=quote" variant="outline" size="lg" className="border-white/60 text-white hover:bg-white/10 hover:text-white">Get a Quote</Button></div></div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-5"><div className="flex flex-wrap gap-x-7 gap-y-4 text-xs text-white/90"><span className="flex items-center gap-2"><Grid2X2 size={22} className="text-[#E5B663]" aria-hidden />5 tile categories</span><span className="flex items-center gap-2"><Scale size={22} className="text-[#E5B663]" aria-hidden />Compare specifications</span><span className="flex items-center gap-2"><Armchair size={22} className="text-[#E5B663]" aria-hidden />7 room types</span></div><div className="hero-controls flex items-center gap-2"><button type="button" aria-label="Previous hero slide" onClick={() => select(active - 1)}><ArrowLeft size={18} aria-hidden /></button>{slides.map((slide, index) => <button type="button" key={slide.image} aria-label={`Show slide ${index + 1}: ${slide.cta}`} aria-current={index === active ? "true" : undefined} className={index === active ? "is-active" : ""} onClick={() => select(index)}><span className="sr-only">Slide {index + 1}</span></button>)}<button type="button" aria-label="Next hero slide" onClick={() => select(active + 1)}><ArrowRight size={18} aria-hidden /></button></div></div><p className="mt-3 text-xs text-white/80">40 curated demo products across 5 tile collections</p>
    </Container>
  </section>;
}
