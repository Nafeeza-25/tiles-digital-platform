"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";

export function DesktopNavigation() {
  const path = usePathname();
  const tiles = path === "/tiles" || path.startsWith("/tiles/") || path === "/recommendations";
  return <nav aria-label="Primary navigation" className="desktop-navigation">
    {site.primaryNavigation.map(item => item.label === "Tiles"
      ? <details key={item.href} className="relative"><summary className={`nav-link cursor-pointer list-none ${tiles ? "is-active" : ""}`}>Tiles</summary><div className="nav-dropdown">
        <Link href="/tiles">View All Tiles</Link>
        {site.categories.map(category => <Link href={category.href} key={category.href}>{category.label}</Link>)}
        <Link href={site.recommendations.href}>Room Recommendations</Link><Link href="/compare">Compare Tiles</Link>
      </div></details>
      : <Link className={`nav-link ${path === item.href ? "is-active" : ""}`} aria-current={path === item.href ? "page" : undefined} href={item.href} key={item.href}>{item.label}</Link>)}
  </nav>;
}
