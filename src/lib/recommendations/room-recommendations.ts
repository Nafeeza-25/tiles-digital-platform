import type { CatalogProduct, SearchParams } from "@/lib/catalog/catalog-filters";
import { effectivePrice } from "@/lib/catalog/catalog-filters";
import { roomLabels } from "@/lib/catalog/product-labels";

export const roomValues = ["living_room", "bedroom", "bathroom", "kitchen", "balcony", "outdoor", "commercial"] as const;
export type Room = (typeof roomValues)[number];
export type RecommendationState = { room: Room | null; colour: string | null; finish: string | null; material: string | null; maxPrice: number | null };

function first(value: string | string[] | undefined) { return (Array.isArray(value) ? value[0] : value)?.trim() || null; }
function positive(value: string | string[] | undefined) { const raw = first(value); if (raw === null) return null; const parsed = Number(raw); return Number.isFinite(parsed) && parsed >= 0 ? parsed : null; }

export function parseRecommendationState(params: SearchParams): RecommendationState {
  const room = first(params.room);
  return { room: roomValues.includes(room as Room) ? room as Room : null, colour: first(params.colour), finish: first(params.finish), material: first(params.material), maxPrice: positive(params.maxPrice) };
}

export function getRoomOptions(products: CatalogProduct[], room: Room) {
  const suitable = products.filter((product) => product.rooms.includes(room));
  return { colours: Array.from(new Set(suitable.map((product) => product.colour))).sort(), finishes: Array.from(new Set(suitable.map((product) => product.finish))).sort(), materials: Array.from(new Set(suitable.map((product) => product.material))).sort() };
}

export function getRecommendations(products: CatalogProduct[], state: RecommendationState) {
  if (!state.room) return [];
  return products.filter((product) => product.rooms.includes(state.room!) && (!state.colour || product.colour === state.colour) && (!state.finish || product.finish === state.finish) && (!state.material || product.material === state.material) && (state.maxPrice === null || effectivePrice(product) <= state.maxPrice)).sort((left, right) => Number(right.is_featured) - Number(left.is_featured) || Number(right.is_new) - Number(left.is_new) || left.name.localeCompare(right.name));
}

export function recommendationReasons(product: CatalogProduct, room: Room) {
  const reasons = [`Tagged for ${roomLabels[room]}`];
  if (product.applications.includes("wet_area")) reasons.push("Wet Area application");
  if (product.applications.includes("outdoor")) reasons.push("Outdoor application");
  if (product.finish.toLowerCase().includes("anti-skid")) reasons.push(`${product.finish} finish`);
  else if (product.finish.toLowerCase().includes("matte")) reasons.push("Matte finish");
  if (product.slip_rating) reasons.push(`${product.slip_rating} slip rating`);
  if (product.material) reasons.push(product.material);
  return reasons.slice(0, 4);
}
