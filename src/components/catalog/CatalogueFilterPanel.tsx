"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Keep the native disclosure compact on mobile without changing GET filter state. */
export function CatalogueFilterPanel({ children }: { children: ReactNode }) {
  const panel = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const syncLayout = () => {
      if (panel.current) panel.current.open = desktop.matches;
    };
    syncLayout();
    desktop.addEventListener("change", syncLayout);
    return () => desktop.removeEventListener("change", syncLayout);
  }, []);

  return (
    <details ref={panel} className="rounded-sm border bg-surface p-5 shadow-[var(--shadow-subtle)]">
      <summary className="min-h-11 cursor-pointer text-lg font-bold">Filter Products</summary>
      {children}
    </details>
  );
}
