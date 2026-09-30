import Image from "next/image";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { PublicStore } from "@/lib/queries/stores";
import { buildDirectionsHref, buildStoreWhatsAppHref, openingHoursEntries, storeAddress } from "@/lib/stores/store-utils";
import { storeImages } from "@/lib/visuals/assets";

export function StoreCard({ store }: { store: PublicStore }) {
  const directionsHref = buildDirectionsHref(store);
  const whatsAppHref = buildStoreWhatsAppHref(store.whatsapp);
  const hours = openingHoursEntries(store.opening_hours);
  const image = storeImages[store.slug];
  return <article className="flex h-full flex-col overflow-hidden rounded-sm border bg-surface shadow-[var(--shadow-subtle)]">
    {image ? <div className="relative aspect-[16/9]"><Image src={image} alt={`Illustrative showroom image for the fictional ${store.name}`} fill loading="eager" sizes="(max-width: 767px) 92vw, (max-width: 1279px) 45vw, 33vw" className="object-cover" /></div> : null}
    <div className="flex flex-1 flex-col p-5 sm:p-6"><p className="text-[10px] font-semibold uppercase tracking-[.18em] text-primary">Fictional demo location</p><h3 className="mt-2 text-2xl">{store.name}</h3><address className="mt-4 text-sm not-italic leading-7 text-muted">{storeAddress(store)}</address>
      {hours.length ? <section className="mt-5"><h4 className="text-xs font-semibold uppercase tracking-[.12em]">Opening hours</h4><dl className="mt-3 grid gap-2 text-xs">{hours.map(([day, time]) => <div key={day} className="flex justify-between gap-3"><dt>{day}</dt><dd className="text-right text-muted">{time}</dd></div>)}</dl></section> : null}
      <div className="mt-6 flex flex-wrap gap-2 border-t pt-5">{store.phone ? <a href={`tel:${store.phone.replace(/\s+/g, "")}`} className="inline-flex min-h-11 items-center gap-2 rounded-sm border px-3 text-xs font-semibold hover:bg-surface-muted" aria-label={`Call ${store.name}`}><Phone size={16} aria-hidden />Call</a> : null}{store.email ? <a href={`mailto:${store.email}`} className="inline-flex min-h-11 items-center gap-2 rounded-sm border px-3 text-xs font-semibold hover:bg-surface-muted" aria-label={`Email ${store.name}`}><Mail size={16} aria-hidden />Email</a> : null}{whatsAppHref ? <a href={whatsAppHref} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-sm border px-3 text-xs font-semibold hover:bg-surface-muted" aria-label={`Open a WhatsApp enquiry for ${store.name} in a new tab`}><MessageCircle size={16} aria-hidden />WhatsApp</a> : null}{directionsHref ? <a href={directionsHref} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-sm border px-3 text-xs font-semibold hover:bg-surface-muted" aria-label={`Get directions to ${store.name} in a new tab`}><MapPin size={16} aria-hidden />Get Directions</a> : null}</div>
    </div>
  </article>;
}
