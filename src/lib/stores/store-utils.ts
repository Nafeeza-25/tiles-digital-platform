import { normalizeWhatsAppNumber } from "@/lib/enquiries/enquiry-utils";
import type { PublicStore } from "@/lib/queries/stores";

function first(value: string | string[] | undefined) { return (Array.isArray(value) ? value[0] : value)?.trim() ?? ""; }

export function normalizeStoreSearch(value: string | string[] | undefined) { return first(value).replace(/\s+/g, " ").toLowerCase().slice(0, 120); }

export function parseStoreLocation(value: string | string[] | undefined, stores: PublicStore[]) {
  const location = first(value).replace(/\s+/g, " ");
  return storeLocationOptions(stores).find((option) => option.toLowerCase() === location.toLowerCase()) ?? null;
}

export function storeLocationOptions(stores: PublicStore[]) { return [...new Set(stores.map((store) => store.city).filter(Boolean))].sort((left, right) => left.localeCompare(right)); }

export function filterStores(stores: PublicStore[], q: string, location: string | null) {
  return stores.filter((store) => {
    const searchable = [store.name, store.address_line1, store.address_line2, store.city, store.state, store.postal_code].filter(Boolean).join(" ").toLowerCase();
    return (!q || searchable.includes(q)) && (!location || store.city === location);
  });
}

export function storeAddress(store: PublicStore) { return [store.address_line1, store.address_line2, store.city, store.state, store.postal_code].filter(Boolean).join(", "); }

export function buildStoreWhatsAppHref(number: string | null) {
  const recipient = normalizeWhatsAppNumber(number);
  return recipient ? `https://wa.me/${recipient}?text=${encodeURIComponent("Hello, I’m viewing the Timeless Tiles academic demo and would like to ask about this store.")}` : null;
}

export function buildDirectionsHref(store: PublicStore) {
  if (store.google_maps_url?.startsWith("https://")) return store.google_maps_url;
  if (store.latitude !== null && store.longitude !== null) return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${store.latitude},${store.longitude}`)}`;
  const address = storeAddress(store);
  return address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}` : null;
}

export function openingHoursEntries(hours: PublicStore["opening_hours"]) {
  if (!hours || Array.isArray(hours) || typeof hours !== "object") return [];
  const dayOrder = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  return dayOrder.flatMap((day) => typeof hours[day] === "string" ? [[day[0].toUpperCase() + day.slice(1), hours[day]] as const] : []);
}
