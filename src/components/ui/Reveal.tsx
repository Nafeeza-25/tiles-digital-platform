"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/** Reveals a logical content group after it enters the viewport; without JavaScript it stays visible. */
export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches || !ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      setReady(true);
      if (entry.isIntersecting) {
        setRevealed(true);
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={`motion-reveal ${className}`} data-motion-ready={ready || undefined} data-revealed={revealed || undefined} style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}>{children}</div>;
}
