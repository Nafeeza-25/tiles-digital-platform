import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) { return <span className={cn("inline-flex rounded-sm border border-border bg-surface-muted px-2.5 py-1 text-xs font-semibold tracking-wide text-secondary-foreground", className)} {...props} />; }
