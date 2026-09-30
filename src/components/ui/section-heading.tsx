import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
export function SectionHeading({ eyebrow, children, className, ...props }: HTMLAttributes<HTMLDivElement> & { eyebrow?: string; children: ReactNode }) { return <div className={cn("max-w-2xl space-y-3", className)} {...props}>{eyebrow && <p className="text-xs font-semibold uppercase tracking-[.2em] text-primary">{eyebrow}</p>}<h2 className="text-3xl leading-tight text-foreground sm:text-4xl">{children}</h2></div>; }
