"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { Container } from "@/components/ui/container";
import { DesktopNavigation } from "./DesktopNavigation";
import { MobileNavigation } from "./MobileNavigation";
import { useEffect, useState } from "react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const update = () => setScrolled(window.scrollY > 12); update(); window.addEventListener("scroll", update, { passive: true }); return () => window.removeEventListener("scroll", update); }, []);
  return <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
    <Container className="relative flex min-h-[78px] items-center justify-between gap-4">
      <Link href="/" aria-label="Timeless Tiles home" className="flex shrink-0 items-center gap-3">
        <Image src="/images/brand/timeless-tiles-mark.svg" alt="" width={44} height={44} unoptimized className="brand-mark size-9 sm:size-11" />
        <span><span className="block text-base font-bold uppercase tracking-[.12em] sm:text-xl">Timeless Tiles</span><span className="mt-1 block text-[8px] uppercase tracking-[.3em] text-white/80">Beautiful spaces</span></span>
      </Link>
      <DesktopNavigation />
      <div className="hidden items-center gap-4 xl:flex">
        <Link href="/tiles#catalogue-search" aria-label="Search tiles" className="flex size-11 items-center justify-center rounded-full border border-white/50"><Search size={19} aria-hidden /></Link>
        <Link href="/contact?intent=quote" className="action-primary whitespace-nowrap uppercase">Get a Quote <ArrowRight size={17} aria-hidden /></Link>
      </div>
      <MobileNavigation />
    </Container>
  </header>;
}
