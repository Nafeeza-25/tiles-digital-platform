import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tiles Digital Platform",
  description: "Digital transformation and marketing strategy for a tiles company.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
