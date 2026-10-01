"use client";

import { useState } from "react";
import { hasIntentionalPriceBound } from "@/lib/catalog/catalog-filters";

export function CataloguePriceInputs({ minPrice, maxPrice }: { minPrice: number | null; maxPrice: number | null }) {
  const [minimum, setMinimum] = useState(minPrice === null ? "" : String(minPrice));
  const [maximum, setMaximum] = useState(maxPrice === null ? "" : String(maxPrice));

  return <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
    <label className="text-sm font-semibold">
      Minimum price
      <input type="number" name={hasIntentionalPriceBound(minimum) ? "minPrice" : undefined} min="0" inputMode="decimal" value={minimum} onChange={(event) => setMinimum(event.target.value)} className="field mt-1 w-full" />
    </label>
    <label className="text-sm font-semibold">
      Maximum price
      <input type="number" name={hasIntentionalPriceBound(maximum) ? "maxPrice" : undefined} min="0" inputMode="decimal" value={maximum} onChange={(event) => setMaximum(event.target.value)} className="field mt-1 w-full" />
    </label>
  </div>;
}
