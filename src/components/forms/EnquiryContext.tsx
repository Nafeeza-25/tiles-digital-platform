import type { ProductEnquiryContext } from "@/lib/enquiries/enquiry-utils";

export function EnquiryContext({ product }: { product: ProductEnquiryContext | null }) {
  if (!product) return null;
  return <aside className="mt-6 border-l-4 border-accent bg-surface-muted p-4"><p className="text-sm font-semibold">Product context</p><p className="mt-1 text-muted">Your enquiry is about <span className="font-semibold text-foreground">{product.name}</span>.</p></aside>;
}
