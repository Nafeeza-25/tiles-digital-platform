"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "@/data/site";

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  useEffect(() => { const close = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); }; addEventListener("keydown", close); return () => removeEventListener("keydown", close); }, []);
  const close = () => setOpen(false);
  return <div className="xl:hidden">
    <button aria-label="Toggle navigation menu" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)} className="flex min-h-11 min-w-11 items-center justify-center">{open ? <X aria-hidden /> : <Menu aria-hidden />}</button>
    {open ? <div id="mobile-navigation" className="absolute inset-x-0 top-full z-50 max-h-[calc(100dvh-78px)] overflow-y-auto border border-white/20 bg-[#0C1720] p-5 shadow-xl">
      <nav aria-label="Mobile navigation" className="grid grid-cols-2 gap-x-5 gap-y-1">
        {site.primaryNavigation.map(item => <Link className="flex min-h-11 items-center border-b border-white/10 text-sm" onClick={close} href={item.href} key={item.href}>{item.label}</Link>)}
        <div className="col-span-2 mt-4 grid grid-cols-2 gap-1">{site.categories.map(category => <Link className="flex min-h-11 items-center text-sm text-white/80" onClick={close} href={category.href} key={category.href}>{category.label}</Link>)}<Link className="flex min-h-11 items-center text-sm text-white/80" onClick={close} href={site.recommendations.href}>Room Recommendations</Link><Link className="flex min-h-11 items-center text-sm text-white/80" onClick={close} href="/compare">Compare Tiles</Link></div>
        <Link onClick={close} href={site.quote.href} className="action-primary col-span-2 mt-4">{site.quote.label}</Link>
      </nav>
    </div> : null}
  </div>;
}
