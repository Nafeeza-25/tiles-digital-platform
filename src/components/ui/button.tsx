import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
type V = "primary" | "secondary" | "outline" | "ghost";
type S = "sm" | "md" | "lg";
type P = { children: ReactNode; className?: string; variant?: V; size?: S };
type B = P & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };
type A = P & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
const variants: Record<V, string> = {
  primary: "bg-accent text-accent-foreground hover:bg-[#C7953D] hover:text-accent-foreground",
  secondary: "bg-secondary text-secondary-foreground hover:bg-[#E1D5C3]",
  outline: "border border-border bg-transparent text-foreground hover:bg-surface-muted",
  ghost: "bg-transparent text-foreground hover:bg-surface-muted",
};
const sizes: Record<S, string> = { sm: "min-h-11 px-4 text-sm", md: "min-h-12 px-5 text-sm", lg: "min-h-13 px-7 text-base" };
export function Button({ children, className, variant = "primary", size = "md", href, ...props }: B | A) {
  const classes = cn("inline-flex items-center justify-center gap-2 rounded-sm font-bold transition-colors disabled:pointer-events-none disabled:opacity-50", variants[variant], sizes[size], className);
  return href ? <a className={classes} href={href} {...props as AnchorHTMLAttributes<HTMLAnchorElement>}>{children}</a> : <button className={classes} type="button" {...props as ButtonHTMLAttributes<HTMLButtonElement>}>{children}</button>;
}
