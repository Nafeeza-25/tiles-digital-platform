"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Container className="py-16 sm:py-24">
      <section className="max-w-2xl border bg-surface p-7 sm:p-10" aria-labelledby="error-title">
        <p className="text-sm font-semibold uppercase tracking-[.14em] text-primary">Timeless Tiles</p>
        <h1 id="error-title" className="mt-3 text-4xl sm:text-5xl">We couldn’t load this page</h1>
        <p className="mt-4 text-lg leading-7 text-muted" role="alert">Something went wrong while displaying this page. Please try again, or continue browsing the demo catalogue.</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <button type="button" onClick={reset} className="inline-flex min-h-11 items-center bg-primary px-5 font-semibold text-primary-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Try again</button>
          <Link href="/tiles" className="inline-flex min-h-11 items-center border px-5 font-semibold">Browse Tiles</Link>
          <Link href="/" className="inline-flex min-h-11 items-center border px-5 font-semibold">Go Home</Link>
        </div>
      </section>
    </Container>
  );
}
