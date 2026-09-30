import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { site } from "@/data/site";

export function CategorySection() {
  return <section className="py-7 sm:py-8"><Container>
    <h2 className="sr-only">Explore tile categories</h2>
    <div className="grid gap-3 grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-5">{site.categories.map((category, index) => <Link href={category.href} key={category.href} className="group relative overflow-hidden rounded-sm bg-[#0C1720]">
      <div className="relative aspect-[1.8/1]"><Image src={category.image} alt={`Illustrative ${category.label.toLowerCase()} interior`} fill loading={index === 0 ? "eager" : "lazy"} sizes="(max-width: 479px) 92vw, (max-width: 1023px) 45vw, 20vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" /></div>
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-[#0C1720]/85 px-4 py-3 text-white"><h3 className="text-xs font-bold uppercase tracking-wide">{category.label}</h3><ArrowRight size={17} aria-hidden /></div>
    </Link>)}</div>
  </Container></section>;
}
