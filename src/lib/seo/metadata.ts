import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/seo/site-url";

const siteTitle = "Timeless Tiles | Digital Tiles Demo Platform";
const siteDescription = "Explore floor, wall, bathroom, kitchen and outdoor tile collections from Timeless Tiles.";
const socialImageAlt = "Timeless Tiles - Digital Tiles Demo Platform";

export function createOpenGraphMetadata(
  pathname: string,
  title: string = siteTitle,
  description: string = siteDescription,
): NonNullable<Metadata["openGraph"]> {
  return {
    type: "website",
    locale: "en_US",
    siteName: "Timeless Tiles",
    title,
    description,
    url: getSiteUrl(pathname),
    images: [{
      url: getSiteUrl("/opengraph-image"),
      width: 1200,
      height: 630,
      alt: socialImageAlt,
    }],
  };
}
