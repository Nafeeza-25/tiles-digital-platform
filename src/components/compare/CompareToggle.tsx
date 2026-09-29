"use client";

import { Check, Scale } from "lucide-react";
import { useCompare } from "@/components/compare/useCompare";

export function CompareToggle({ slug, name }: { slug: string; name: string }) {
  const { add, products, remove } = useCompare();
  const selected = products.includes(slug);
  return <button type="button" aria-pressed={selected} aria-label={`${selected ? "Remove" : "Add"} ${name} ${selected ? "from" : "to"} comparison`} onClick={() => selected ? remove(slug) : add(slug)} className="inline-flex min-h-11 items-center gap-2 border border-border px-3 text-sm font-semibold hover:bg-surface-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">{selected ? <Check size={16} aria-hidden /> : <Scale size={16} aria-hidden />}{selected ? "Remove from Compare" : "Add to Compare"}</button>;
}
