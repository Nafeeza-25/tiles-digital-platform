export const applicationLabels: Record<string, string> = {
  floor: "Floor",
  wall: "Wall",
  indoor: "Indoor",
  outdoor: "Outdoor",
  wet_area: "Wet Area",
};

export const roomLabels: Record<string, string> = {
  living_room: "Living Room",
  bedroom: "Bedroom",
  bathroom: "Bathroom",
  kitchen: "Kitchen",
  balcony: "Balcony",
  outdoor: "Outdoor",
  commercial: "Commercial",
};

export const stockStatusLabels: Record<string, string> = {
  in_stock: "In Stock",
  low_stock: "Low Stock",
  out_of_stock: "Out of Stock",
  made_to_order: "Made to Order",
};

export function labelProductValues(values: string[], labels: Record<string, string>) {
  return values.map((value) => labels[value] ?? value);
}
