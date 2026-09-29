"use client";

import { createContext, useCallback, useEffect, useMemo, useState } from "react";

const storageKey = "timeless-tiles-compare";
const maxProducts = 3;

type CompareContextValue = {
  products: string[];
  message: string | null;
  add: (slug: string) => void;
  remove: (slug: string) => void;
  clear: () => void;
  replace: (slugs: string[]) => void;
};

export const CompareContext = createContext<CompareContextValue | null>(null);

function validSlugs(value: unknown) {
  if (!Array.isArray(value)) return [];
  return Array.from(new Set(value.filter((slug): slug is string => typeof slug === "string" && slug.trim().length > 0).map((slug) => slug.trim()))).slice(0, maxProducts);
}

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try { setProducts(validSlugs(JSON.parse(window.localStorage.getItem(storageKey) ?? "[]"))); } catch { setProducts([]); }
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(storageKey, JSON.stringify(products));
  }, [hydrated, products]);

  const add = useCallback((slug: string) => {
    const normalized = slug.trim();
    if (!normalized) return;
    setProducts((current) => {
      if (current.includes(normalized)) return current;
      if (current.length >= maxProducts) { setMessage("You can compare up to 3 tiles. Remove one to add another."); return current; }
      setMessage(null);
      return [...current, normalized];
    });
  }, []);
  const remove = useCallback((slug: string) => { setMessage(null); setProducts((current) => current.filter((item) => item !== slug)); }, []);
  const clear = useCallback(() => { setMessage(null); setProducts([]); }, []);
  const replace = useCallback((slugs: string[]) => { setMessage(null); setProducts(validSlugs(slugs)); }, []);
  const value = useMemo(() => ({ products, message, add, remove, clear, replace }), [products, message, add, remove, clear, replace]);
  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}
