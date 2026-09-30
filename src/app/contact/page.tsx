import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { StoreCard } from "@/components/stores/StoreCard";
import { getActiveStores } from "@/lib/queries/stores";
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
  const [product, whatsAppNumber, stores] = await Promise.all([getActiveEnquiryProduct(parseProductSlug(params.product)), getDemoWhatsAppNumber(), getActiveStores()]);
  const title = enquiryTitle(intent, product);
  const store = stores.find(item => item.slug === "timeless-tiles-central") ?? stores[0];
  return <><PageHero eyebrow={intent === "quote" ? "Quote enquiry" : intent === "product" ? "Product enquiry" : "Contact us"} title={title} description={enquiryDescription(intent, product)} image="/images/editorial/contact-showroom.webp" alt="Illustrative showroom and tile consultation setting" />
    <section className="site-container pb-16 pt-6"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: intent === "quote" ? "Get a Quote" : "Contact" }]} />
      <div className="mt-7 grid items-start gap-7 lg:grid-cols-[1.3fr_1fr]">
        <section><h2 className="text-3xl">Send us an Enquiry</h2><p className="mt-3 text-sm leading-6 text-muted">Use the form for a fictional academic-demo enquiry. This form does not promise a real sales response.</p><EnquiryContext product={product} /><WhatsAppEnquiryLink number={whatsAppNumber} intent={intent} product={product} /><EnquiryForm intent={intent} product={product} /></section>
        <aside><h2 className="mb-4 text-2xl">Demo Store Contact</h2>{store ? <StoreCard store={store} /> : <p className="text-muted">Demo contact details are not currently available.</p>}<p className="mt-4 text-xs leading-5 text-muted">The showroom imagery is illustrative. Contact and location details come from the existing fictional demo-store records.</p><Link href="/stores" className="mt-5 inline-flex min-h-11 items-center font-semibold text-primary">View All Demo Stores</Link></aside>
      </div>
    </section></>;
}
