import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CompareProvider } from "@/components/compare/CompareProvider";
import { CompareTray } from "@/components/compare/CompareTray";
import { getBaseUrl } from "@/lib/seo/site-url";
import { createOpenGraphMetadata } from "@/lib/seo/metadata";

const siteDescription = "Explore floor, wall, bathroom, kitchen and outdoor tile collections from Timeless Tiles.";

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: "Timeless Tiles | Digital Tiles Demo Platform",
    template: "%s | Timeless Tiles",
  },
  description: siteDescription,
  applicationName: "Timeless Tiles",
  openGraph: createOpenGraphMetadata("/", "Timeless Tiles | Digital Tiles Demo Platform", siteDescription),
  twitter: {
    card: "summary_large_image",
    title: "Timeless Tiles | Digital Tiles Demo Platform",
    description: "Explore floor, wall, bathroom, kitchen and outdoor tile collections from Timeless Tiles.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <a href="#main-content" className="sr-only focus:not-sr-only">Skip to content</a>
        <CompareProvider>
          <Header />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
          <CompareTray />
        </CompareProvider>
      </body>
    </html>
  );
}
