# Vercel Production Deployment Checklist

Step 26 production deployment and live verification are complete for the academic demonstration site. See [Deployment Report](DEPLOYMENT_REPORT.md).

## Project settings

- GitHub repository: `Nafeeza-25/tiles-digital-platform`
- Production branch: `main`
- Production URL: <https://tiles-digital-platform.vercel.app>
- Framework preset: Next.js
- Install command: `npm install` (the repository has `package-lock.json` and no alternative package-manager lockfile)
- Build command: `npm run build`
- Output directory: use the Next.js default; do not override without a specific need
- Runtime: use a Node.js version supported by the installed Next.js version; Next.js 16 requires Node.js 20.9 or newer. This repository does not pin a `packageManager` or `engines` field.

## Environment variables

The production environment uses these variables in Vercel:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

`NEXT_PUBLIC_SITE_URL` is set to the production origin above. Vercel system variables `VERCEL_PROJECT_PRODUCTION_URL` and `VERCEL_URL` provide framework URL fallback support. Values are intentionally omitted here. See [Environment Configuration](ENVIRONMENT_CONFIGURATION.md).

## Before and after deployment

- [x] Confirm `main` contains the reviewed release commit.
- [x] Verify `.env.local` is ignored and absent from GitHub.
- [x] Configure only the public Supabase URL and publishable key; no `service_role`, database password, or private key is used by the application.
- [x] Set `NEXT_PUBLIC_SITE_URL` to the production URL.
- [x] Confirm Vercel build uses `npm install` and `npm run build`.
- [x] Review the successful Vercel production deployment.
- [x] Check public routes, catalogue, categories, product, compare, recommendations, contact form rendering, stores, guides, sitemap, robots, and Open Graph image. Forms were not submitted.
- [x] Confirm production canonical and Open Graph URLs use the production origin.
- [x] Run read-only Supabase/RLS verification, including public catalogue/store/review reads and blocked enquiry reads; no records were written.
- [x] Confirm the project has no authentication or auth redirect settings to change.
- [x] Review the required response security headers.
- [x] Complete representative responsive and basic accessibility checks on production.

## Deployment security

- Never upload or commit `.env.local`.
- Store environment values only in Vercel project settings.
- Use the Supabase publishable key with existing RLS policies.
- Never add a Supabase `service_role` key or database password to Vercel application variables.
- Verify the GitHub repository contains no credentials before import and after any configuration change.
- Reconfirm RLS protections before and after deployment; do not weaken policies to make a page work.

Live analytics, published social content, and paid advertising remain outside this deployment checklist and are incomplete.
