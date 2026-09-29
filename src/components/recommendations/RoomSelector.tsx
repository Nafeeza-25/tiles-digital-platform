import Link from "next/link";
import { Armchair, Bath, BedDouble, Building2, CookingPot, Trees } from "lucide-react";
import { roomLabels } from "@/lib/catalog/product-labels";
import { roomValues, type Room } from "@/lib/recommendations/room-recommendations";

const icons: Record<Room, typeof Armchair> = { living_room: Armchair, bedroom: BedDouble, bathroom: Bath, kitchen: CookingPot, balcony: Trees, outdoor: Trees, commercial: Building2 };
export function RoomSelector({ selected }: { selected: Room | null }) { return <nav aria-label="Choose a room" className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">{roomValues.map((room) => { const Icon = icons[room]; const active = selected === room; return <Link key={room} href={`/recommendations?room=${room}`} aria-current={active ? "page" : undefined} className={`flex min-h-28 flex-col items-center justify-center gap-3 border p-3 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${active ? "border-primary bg-primary text-primary-foreground" : "bg-surface hover:bg-surface-muted"}`}><Icon className="size-6" aria-hidden /><span>{roomLabels[room]}</span>{active ? <span className="text-xs">Selected</span> : null}</Link>; })}</nav>; }
