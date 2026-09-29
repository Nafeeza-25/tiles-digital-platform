import type { PublicEnquiryType } from "@/lib/enquiries/enquiry-schema";

export type EnquiryIntent = PublicEnquiryType;
export type ProductEnquiryContext = { id: string; name: string; slug: string };

function first(value: string | string[] | undefined) { return (Array.isArray(value) ? value[0] : value)?.trim() ?? ""; }

export function parseEnquiryIntent(value: string | string[] | undefined): EnquiryIntent {
  const intent = first(value);
  return intent === "quote" || intent === "product" ? intent : "contact";
}

export function parseProductSlug(value: string | string[] | undefined) {
  const slug = first(value).toLowerCase();
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ? slug : null;
}

export function enquiryTitle(intent: EnquiryIntent, product: ProductEnquiryContext | null) {
  if (intent === "product" && product) return `Enquire about ${product.name}`;
  if (intent === "quote") return "Get a Quote";
  return "Contact Timeless Tiles";
}

export function enquiryDescription(intent: EnquiryIntent, product: ProductEnquiryContext | null) {
  if (intent === "product" && product) return `Send a fictional academic-demo enquiry about ${product.name}.`;
  if (intent === "quote") return "Share your project details for a fictional academic-demo quote enquiry.";
  return "Send a fictional academic-demo enquiry about Timeless Tiles products or services.";
}

export function buildWhatsAppHref(number: string | null, intent: EnquiryIntent, product: ProductEnquiryContext | null) {
  const recipient = (number ?? "").replace(/\D/g, "");
  if (recipient.length < 7 || recipient.length > 15) return null;
  const topic = intent === "quote" ? "a quote" : intent === "product" ? "a product enquiry" : "an enquiry";
  const productText = product ? ` about ${product.name}` : "";
  return `https://wa.me/${recipient}?text=${encodeURIComponent(`Hello Timeless Tiles, I have ${topic}${productText}.`)}`;
}
