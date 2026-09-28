import { Breadcrumbs } from "./Breadcrumbs";

export function PlaceholderPage({ title, description, crumbs }: { title: string; description: string; crumbs: { label: string; href?: string }[] }) {
  return <section className="site-container py-12 sm:py-16"><Breadcrumbs items={crumbs} /><p className="text-sm font-semibold uppercase tracking-[.14em] text-primary">Timeless Tiles</p><h1 className="mt-3 text-4xl sm:text-5xl">{title}</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{description}</p><p className="mt-8 border-l-4 border-accent bg-surface p-4 text-sm text-secondary-foreground">This is a lightweight route foundation. Its full customer-facing functionality will be built in a later phase.</p></section>;
}
