import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ProductCard } from "@/components/products/ProductCard";
import { RecommendationPreferences } from "@/components/recommendations/RecommendationPreferences";
import { RecommendationReasons } from "@/components/recommendations/RecommendationReasons";
import { RoomSelector } from "@/components/recommendations/RoomSelector";
import type { SearchParams } from "@/lib/catalog/catalog-filters";
import { roomLabels } from "@/lib/catalog/product-labels";
import { getCatalogueProducts } from "@/lib/queries/catalog";
import { getRecommendations, getRoomOptions, parseRecommendationState, recommendationReasons } from "@/lib/recommendations/room-recommendations";

export const metadata: Metadata = {
  title: "Room Recommendations",
  description: "Choose a room and explore Timeless Tiles demo products matched using room suitability, colour, finish, material and budget preferences.",
  alternates: { canonical: "/recommendations" },
};

export default async function RecommendationsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const [params, products] = await Promise.all([searchParams, getCatalogueProducts()]);
  const state = parseRecommendationState(params);
  const room = state.room;
  const results = getRecommendations(products, state);
  const activePreferences = [state.colour, state.finish, state.material, state.maxPrice !== null ? `up to ₹${state.maxPrice}` : null].filter(Boolean);
  return <section className="site-container py-10"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Room Recommendations" }]} /><h1 className="text-4xl">Find Tiles for Your Space</h1><p className="mt-3 max-w-2xl text-muted">Choose a room to see products tagged as suitable for that space in the Timeless Tiles demo catalogue.</p><RoomSelector selected={room} />{!room ? <section className="mt-10 border bg-surface p-7"><h2 className="text-2xl">Choose a room to begin</h2><p className="mt-3 text-muted">Recommendations use catalogue room-suitability tags and optional preferences. They are transparent rules, not AI or personalized tracking.</p></section> : <><section className="mt-10"><h2 className="text-3xl">{roomLabels[room]} Tile Recommendations</h2><p className="mt-2 text-muted">Showing tiles tagged for {roomLabels[room]} in the Timeless Tiles demo catalogue.</p><RecommendationPreferences room={room} state={state} options={getRoomOptions(products, room)} /></section><section className="mt-10"><div className="flex flex-wrap items-baseline justify-between gap-3"><h2 className="text-2xl">{results.length} tile{results.length === 1 ? "" : "s"} {activePreferences.length ? `match your ${roomLabels[room]} preferences` : `suitable for ${roomLabels[room]}`}</h2>{activePreferences.length ? <p className="text-sm text-muted">Filtered by {activePreferences.join(", ")}</p> : null}</div>{results.length ? <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{results.map((product) => <div key={product.id}><ProductCard product={product} href={product.category ? `/tiles/${product.category.slug}/${product.slug}` : "/tiles"} ctaLabel="View Tile" /><RecommendationReasons reasons={recommendationReasons(product, room)} /></div>)}</div> : <div className="mt-6 border bg-surface p-7"><h3 className="text-xl">No {roomLabels[room]} tiles match all of these preferences.</h3><p className="mt-2 text-muted">Try removing one or more preferences.</p><div className="mt-5 flex flex-wrap gap-3"><Link href={`/recommendations?room=${room}`} className="inline-flex min-h-11 items-center bg-primary px-4 font-semibold text-primary-foreground">Reset Preferences</Link><Link href="/tiles" className="inline-flex min-h-11 items-center border px-4 font-semibold">Browse All Tiles</Link></div></div>}</section><aside className="mt-12 border-l-4 border-accent bg-surface-muted p-5"><h2 className="text-xl">How recommendations work</h2><p className="mt-2 max-w-3xl text-muted">Products are matched using the room-suitability tags and catalogue specifications in this demo project. Optional preferences further narrow the results.</p><div className="mt-3"><Link href="/guides/how-to-choose-tiles-for-each-room" className="text-sm font-semibold text-primary hover:underline">Read our Room Selection Guide →</Link></div></aside></>}</section>;
}
