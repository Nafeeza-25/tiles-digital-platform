"use client";
import { Check, Scale } from "lucide-react";
import { useCompare } from "@/components/compare/useCompare";

export function CompareToggle({ slug, name, compact = false }: { slug: string; name: string; compact?: boolean }) {
  const { add, products, remove } = useCompare();
  const selected = products.includes(slug);
  return <button type="button" aria-pressed={selected} aria-label={`${selected ? "Remove" : "Add"} ${name} ${selected ? "from" : "to"} comparison`} onClick={() => selected ? remove(slug) : add(slug)} className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${compact ? "min-w-11 bg-white/95 px-2 shadow-sm" : "bg-surface px-3"} ${selected ? "border-primary text-primary" : "border-border text-foreground hover:bg-surface-muted"}`}>
    {selected ? <Check size={18} aria-hidden /> : <Scale size={18} aria-hidden />}
    <span className={compact ? "sr-only" : ""}>{selected ? "Remove from Compare" : "Add to Compare"}</span>
  </button>;
}
