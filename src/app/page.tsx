import Link from "next/link";
export default function Home() {
  return (
    <section className="site-container py-20"><p className="text-sm uppercase tracking-widest text-primary">Timeless Tiles</p><h1 className="mt-3 text-5xl">Timeless Tiles</h1><p className="mt-4 max-w-xl text-muted">A considered starting point for exploring beautifully composed tile collections.</p><div className="mt-7 flex gap-4"><Link href="/tiles">Explore Tiles</Link><Link href="/contact">Contact us</Link></div></section>
  );
}
