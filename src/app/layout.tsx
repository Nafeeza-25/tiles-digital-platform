import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Timeless Tiles",
  description: "Explore floor, wall, bathroom, kitchen and outdoor tile collections from Timeless Tiles.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col"><a href="#main-content" className="sr-only focus:not-sr-only">Skip to content</a><Header /><main id="main-content" className="flex-1">{children}</main><Footer /></body>
    </html>
  );
}
