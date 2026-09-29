# Vercel Deployment Preparation Checklist

**Preparation only:** do not import or deploy this project as part of Step 25. Step 26 requires a human to review the actual production URL and environment settings before deployment.

## Project settings

- GitHub repository: `Nafeeza-25/tiles-digital-platform`
- Production branch: `main`
- Framework preset: Next.js
- Install command: `npm install` (the repository has `package-lock.json` and no alternative package-manager lockfile)
- Build command: `npm run build`
- Output directory: use the Next.js default; do not override without a specific need
- Runtime: use a Node.js version supported by the installed Next.js version; Next.js 16 requires Node.js 20.9 or newer. This repository does not pin a `packageManager` or `engines` field.

## Environment variables

Configure the two Supabase public values in Vercel's environment settings for the intended environments:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

After Vercel gives the project a confirmed production hostname, set `NEXT_PUBLIC_SITE_URL` to that canonical `https://` origin and redeploy so canonical and Open Graph metadata use it. Do not invent a production hostname before Vercel assigns one. See [Environment Configuration](ENVIRONMENT_CONFIGURATION.md).

## Before and after deployment

- [ ] Confirm `main` contains the reviewed release commit.
- [ ] Verify `.env.local` is ignored and absent from GitHub.
- [ ] Enter only the public Supabase URL and publishable key in Vercel settings; never enter `service_role`, a database password, or a private key.
- [ ] Set `NEXT_PUBLIC_SITE_URL` only after the production URL is known.
- [ ] Confirm Vercel build uses `npm install` and `npm run build`.
- [ ] Review Vercel build output for route or runtime warnings.
- [ ] Check the homepage, catalogue, one category, one product, compare, recommendations, contact and enquiry flow, product review submission, stores, guide index and detail, sitemap, robots, and Open Graph image.
- [ ] Confirm production canonical and Open Graph URLs use the actual production origin.
- [ ] Run read-only Supabase browser/RLS verification, including public catalogue reads, active-store reads, blocked public enquiry SELECT, pending-review visibility, and insert-only review/enquiry boundaries.
- [ ] Confirm no auth redirect/site URL settings are changed: the project currently has no authentication.
- [ ] Review response security headers and browser console after deployment.

## Deployment security

- Never upload or commit `.env.local`.
- Store environment values only in Vercel project settings.
- Use the Supabase publishable key with existing RLS policies.
- Never add a Supabase `service_role` key or database password to Vercel application variables.
- Verify the GitHub repository contains no credentials before import and after any configuration change.
- Reconfirm RLS protections before and after deployment; do not weaken policies to make a page work.

No Vercel project, deployment, production URL, analytics integration, or real campaign is part of this checklist's completion.
