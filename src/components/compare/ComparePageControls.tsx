"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { useCompare } from "@/components/compare/useCompare";

function hrefFor(products: string[]) { return products.length ? `/compare?${products.map((product) => `product=${encodeURIComponent(product)}`).join("&")}` : "/compare"; }

export function CompareUrlSync({ products }: { products: string[] }) {
  const { replace } = useCompare();
  const joined = products.join("|");
  useEffect(() => { replace(products); }, [joined, products, replace]);
  return null;
}

export function ComparePageControls({ slug, name }: { slug: string; name: string }) {
  const { products, remove } = useCompare();
  const router = useRouter();
  const onRemove = () => { const next = products.filter((product) => product !== slug); remove(slug); router.replace(hrefFor(next)); };
  return <button type="button" onClick={onRemove} aria-label={`Remove ${name} from comparison`} className="mt-3 inline-flex min-h-9 items-center gap-1 text-sm font-semibold text-primary"><X size={15} aria-hidden />Remove</button>;
}

export function CompareClearButton() {
  const { clear } = useCompare();
  const router = useRouter();
  return <button type="button" onClick={() => { clear(); router.replace("/compare"); }} className="min-h-11 border px-4 text-sm font-semibold">Clear comparison</button>;
}
