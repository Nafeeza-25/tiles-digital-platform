import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { StoreCard } from "@/components/stores/StoreCard";
import { getActiveStores } from "@/lib/queries/stores";
import { filterStores, normalizeStoreSearch, parseStoreLocation, storeLocationOptions } from "@/lib/stores/store-utils";

export const metadata: Metadata = {
  title: "Store Finder",
  description: "Find fictional Timeless Tiles demo store locations and view available contact and directions information.",
  alternates: { canonical: "/stores" },
};

export default async function StoresPage({ searchParams }: { searchParams: Promise<{ q?: string | string[]; location?: string | string[] }> }) {
  const [params, stores] = await Promise.all([searchParams, getActiveStores()]);
  const q = normalizeStoreSearch(params.q);
  const location = parseStoreLocation(params.location, stores);
  const locations = storeLocationOptions(stores);
  const results = filterStores(stores, q, location);
  const hasFilters = Boolean(q || location);
  const summary = results.length === 1 ? "1 store" : `${results.length} stores`;
  return <section className="site-container py-10"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Store Finder" }]} /><div className="max-w-3xl"><h1 className="text-4xl">Store Finder</h1><p className="mt-3 text-lg text-muted">Discover Timeless Tiles fictional academic-demo locations and their available contact details.</p></div><form action="/stores" className="mt-8 grid gap-4 border bg-surface p-5 sm:grid-cols-[1fr_auto_auto]"><div className="grid gap-1"><label htmlFor="store-search" className="text-sm font-semibold">Search stores</label><input id="store-search" name="q" defaultValue={q} className="field" placeholder="Search by store, city, state, or address" /></div>{locations.length ? <div className="grid gap-1"><label htmlFor="store-location" className="text-sm font-semibold">Location</label><select id="store-location" name="location" defaultValue={location ?? ""} className="field"><option value="">All locations</option>{locations.map((option) => <option key={option} value={option}>{option}</option>)}</select></div> : null}<div className="flex items-end gap-3"><button type="submit" className="min-h-11 bg-primary px-5 font-semibold text-primary-foreground">Search</button>{hasFilters ? <Link href="/stores" className="inline-flex min-h-11 items-center border px-4 font-semibold">Clear Search</Link> : null}</div></form><section className="mt-10" aria-labelledby="store-results"><div className="flex flex-wrap items-baseline justify-between gap-3"><h2 id="store-results" className="text-2xl">{hasFilters ? `${summary} match your search` : summary}</h2><p className="text-sm text-muted">Locations are fictional academic-demo records.</p></div>{results.length ? <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{results.map((store) => <StoreCard key={store.slug} store={store} />)}</div> : <div className="mt-6 border bg-surface p-7"><h3 className="text-xl">No stores match this search.</h3><p className="mt-2 text-muted">Try a different store name, location, or address term.</p><Link href="/stores" className="mt-5 inline-flex min-h-11 items-center bg-primary px-4 font-semibold text-primary-foreground">Clear Search</Link></div>}</section><aside className="mt-12 border-l-4 border-accent bg-surface-muted p-5"><h2 className="text-xl">Need help choosing a tile?</h2><p className="mt-2 text-muted">Use the contact form for a fictional academic-demo product or quote enquiry.</p><div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold"><Link href="/contact" className="text-primary hover:underline">Contact Timeless Tiles →</Link><Link href="/guides/tiles-near-me-guide" className="text-primary hover:underline">What to look for when searching tiles near me →</Link></div></aside></section>;
}
