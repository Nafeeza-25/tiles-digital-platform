import Image from "next/image";
import Link from "next/link";
import { roomLabels } from "@/lib/catalog/product-labels";
import { roomValues, type Room } from "@/lib/recommendations/room-recommendations";
import { roomImages } from "@/lib/visuals/assets";

export function RoomSelector({ selected }: { selected: Room | null }) {
  return <nav aria-label="Choose a room" className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">{roomValues.map(room => <Link key={room} href={`/recommendations?room=${room}`} aria-current={selected === room ? "page" : undefined} className={`room-card overflow-hidden rounded-sm border text-center text-sm font-semibold ${selected === room ? "border-primary bg-accent text-accent-foreground" : "bg-surface hover:border-primary"}`}><div className="relative aspect-[4/3]"><Image src={roomImages[room]} alt="" fill loading="eager" sizes="(max-width: 639px) 45vw, (max-width: 1023px) 28vw, 15vw" className="object-cover" /></div><span className="block px-2 py-3">{roomLabels[room]}</span>{selected === room ? <span className="mb-3 block text-xs">Selected</span> : null}</Link>)}</nav>;
}
