"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { X } from "lucide-react";
import { useCompare } from "@/components/compare/useCompare";

function compareHref(products: string[]) { return `/compare?${products.map((product) => `product=${encodeURIComponent(product)}`).join("&")}`; }

export function CompareTray() {
  const { clear, message, products } = useCompare();
  const pathname = usePathname();
  const router = useRouter();
  if (!products.length) return null;
  const reset = () => { clear(); if (pathname === "/compare") router.replace("/compare"); };
  return <aside aria-label="Tile comparison tray" className="fixed bottom-4 left-1/2 z-40 w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 border border-border bg-surface p-4 shadow-lg"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="font-semibold">Compare Tiles · {products.length} of 3 selected</p><p className="max-w-md truncate text-sm text-muted">{products.join(" · ")}</p><p className="text-sm text-muted">Select {Math.max(0, 2 - products.length)} more tile{products.length === 1 ? "" : "s"} to compare.</p></div><div className="flex flex-wrap items-center gap-2">{products.length >= 2 ? <Link href={compareHref(products)} className="inline-flex min-h-11 items-center bg-primary px-4 text-sm font-semibold text-primary-foreground">Compare tiles</Link> : <span aria-disabled="true" className="inline-flex min-h-11 items-center border px-4 text-sm text-muted">Compare 2 tiles to begin</span>}<button type="button" onClick={reset} className="inline-flex min-h-11 items-center gap-1 px-2 text-sm font-semibold"><X size={16} aria-hidden />Clear</button></div></div>{message ? <p role="status" className="mt-3 text-sm text-primary">{message}</p> : null}</aside>;
}
