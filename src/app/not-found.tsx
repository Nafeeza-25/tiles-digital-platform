import Link from "next/link";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="py-16 sm:py-24">
      <section className="max-w-2xl border bg-surface p-7 sm:p-10" aria-labelledby="not-found-title">
        <p className="text-sm font-semibold uppercase tracking-[.14em] text-primary">Timeless Tiles</p>
        <h1 id="not-found-title" className="mt-3 text-4xl sm:text-5xl">Page Not Found</h1>
        <p className="mt-4 text-lg leading-7 text-muted">The requested Timeless Tiles demo page could not be found.</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/tiles" className="inline-flex min-h-11 items-center bg-primary px-5 font-semibold text-primary-foreground">Browse Tiles</Link>
          <Link href="/" className="inline-flex min-h-11 items-center border px-5 font-semibold">Go Home</Link>
        </div>
      </section>
    </Container>
  );
}
