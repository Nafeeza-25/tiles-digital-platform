import Image from "next/image";
import { ArrowRight, Grid2X2, Scale, Armchair } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function HeroSection() {
  return <section className="home-hero">
    <Image src="/images/home/hero-living-room.webp" alt="Architectural living room with marble-look tile surfaces and warm natural light" fill preload sizes="100vw" className="hero-image object-cover" />
    <div className="hero-shade" />
    <Container className="relative z-1">
      <p className="hero-eyebrow">A considered surface for every space</p>
      <h1>Timeless Tiles.<span>Beautiful Spaces.</span></h1>
      <p className="hero-description max-w-xl">Explore floor, wall, bathroom, kitchen, and outdoor tile collections for considered modern spaces.</p>
      <div className="mt-6 flex flex-wrap gap-3"><Button href="/tiles" size="lg">Explore Tiles <ArrowRight size={19} aria-hidden /></Button><Button href="/contact?intent=quote" variant="outline" size="lg" className="border-white/60 text-white hover:bg-white/10 hover:text-white">Get a Quote</Button></div>
      <div className="mt-6 flex flex-wrap gap-x-7 gap-y-4 text-xs text-white/90"><span className="flex items-center gap-2"><Grid2X2 size={22} className="text-[#E5B663]" aria-hidden />5 tile categories</span><span className="flex items-center gap-2"><Scale size={22} className="text-[#E5B663]" aria-hidden />Compare specifications</span><span className="flex items-center gap-2"><Armchair size={22} className="text-[#E5B663]" aria-hidden />7 room types</span></div>
      <p className="mt-3 text-xs text-white/80">40 curated demo products across 5 tile collections</p>
    </Container>
  </section>;
}
