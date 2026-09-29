import type { Metadata } from "next";
import { createOpenGraphMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { EnquiryContext } from "@/components/forms/EnquiryContext";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { WhatsAppEnquiryLink } from "@/components/forms/WhatsAppEnquiryLink";
import { enquiryDescription, enquiryTitle, parseEnquiryIntent, parseProductSlug } from "@/lib/enquiries/enquiry-utils";
import { getActiveEnquiryProduct, getDemoWhatsAppNumber } from "@/lib/queries/enquiries";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Send a fictional academic-demo contact, quote, or product enquiry to Timeless Tiles.",
  openGraph: createOpenGraphMetadata("/contact", "Contact Us", "Send a fictional academic-demo contact, quote, or product enquiry to Timeless Tiles."),
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ intent?: string | string[]; product?: string | string[] }> }) {
  const params = await searchParams;
  const intent = parseEnquiryIntent(params.intent);
  const [product, whatsAppNumber] = await Promise.all([getActiveEnquiryProduct(parseProductSlug(params.product)), getDemoWhatsAppNumber()]);
  return <section className="site-container py-10"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: intent === "quote" ? "Get a Quote" : "Contact" }]} /><div className="max-w-3xl"><h1 className="text-4xl">{enquiryTitle(intent, product)}</h1><p className="mt-3 text-lg text-muted">{enquiryDescription(intent, product)} This form does not promise a real sales response.</p><EnquiryContext product={product} /><WhatsAppEnquiryLink number={whatsAppNumber} intent={intent} product={product} /><EnquiryForm intent={intent} product={product} /></div></section>;
}
