export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    const url = process.env.NEXT_PUBLIC_SITE_URL.trim();
    if (url) return url.replace(/\/+$/, "");
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    const url = process.env.VERCEL_PROJECT_PRODUCTION_URL.trim();
    if (url) return `https://${url.replace(/^https?:\/\//, "").replace(/\/+$/, "")}`;
  }

  if (process.env.VERCEL_URL) {
    const url = process.env.VERCEL_URL.trim();
    if (url) return `https://${url.replace(/^https?:\/\//, "").replace(/\/+$/, "")}`;
  }

  return "http://localhost:3000";
}

export function getSiteUrl(pathname = ""): string {
  const base = getBaseUrl();
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${base}${path === "/" ? "" : path}`;
}
