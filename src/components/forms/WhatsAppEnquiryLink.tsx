import { MessageCircle } from "lucide-react";
import type { EnquiryIntent, ProductEnquiryContext } from "@/lib/enquiries/enquiry-utils";
import { buildWhatsAppHref } from "@/lib/enquiries/enquiry-utils";

export function WhatsAppEnquiryLink({ number, intent, product }: { number: string | null; intent: EnquiryIntent; product: ProductEnquiryContext | null }) {
  const href = buildWhatsAppHref(number, intent, product);
  if (!href) return <p className="mt-4 text-sm text-muted">WhatsApp enquiry is unavailable for this fictional demo location.</p>;
  return <a href={href} target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-2 border border-border px-4 text-sm font-semibold hover:bg-surface-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" aria-label="Open a prefilled Timeless Tiles WhatsApp enquiry in a new tab"><MessageCircle size={18} aria-hidden />Enquire via WhatsApp</a>;
}
