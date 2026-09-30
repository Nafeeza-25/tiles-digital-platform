import Image from "next/image";
import Link from "next/link";
import { Grid2X2 } from "lucide-react";
import { tileCategories } from "@/data/site";

export function CategoryNavigation({ selected }: { selected?: string }) {
  return <nav aria-label="Tile categories" className="category-navigation">
    <Link href="/tiles" className={`category-navigation-all ${selected === "all" ? "is-active" : ""}`} aria-current={selected === "all" ? "page" : undefined}><Grid2X2 size={26} aria-hidden /><span>All Tiles</span></Link>
    {tileCategories.map(category => <Link key={category.slug} href={category.href} className={selected === category.slug ? "is-active" : ""} aria-current={selected === category.slug ? "page" : undefined}>
      <div className="relative"><Image src={category.image} alt="" fill sizes="(max-width: 767px) 45vw, 16vw" className="object-cover" /></div><span>{category.label}</span>
    </Link>)}
  </nav>;
}
