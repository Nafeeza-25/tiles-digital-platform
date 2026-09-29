# Environment Configuration

The application reads three project-defined environment variables. `NEXT_PUBLIC_` means a value can be included in browser bundles; these values must never contain credentials that grant privileged database access. The application uses Supabase's publishable key with row-level security.

| Variable | Required locally? | Required in Vercel? | Classification | Purpose and safe example | If missing |
| --- | --- | --- | --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | For Supabase-backed functionality and checks | Yes, for catalogue, stores, forms, and database-backed routes | Public endpoint | Supabase project URL, for example `https://<project-ref>.supabase.co` | The Supabase client reports a clear missing-variable error. Data readers that catch configuration errors may show empty states; writes cannot work. |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | For Supabase-backed functionality and checks | Yes, paired with the project URL | Public publishable key | Use the project's publishable key, for example `sb_publishable_<placeholder>` | Supabase client creation fails with a missing-variable message. No service-role credential is used. |
| `NEXT_PUBLIC_SITE_URL` | No | Set after the Vercel production URL is known | Public canonical URL | For example `https://<known-production-host>`; do not use a guessed domain | URL generation falls back to `VERCEL_PROJECT_PRODUCTION_URL`, then `VERCEL_URL`, then `http://localhost:3000`. |

## Vercel-provided URL variables

The application may read `VERCEL_PROJECT_PRODUCTION_URL` and `VERCEL_URL` when Vercel supplies them. They are platform-provided hostnames, not project secrets configured in `.env.example`. The production URL takes precedence over the deployment-specific URL. Configure `NEXT_PUBLIC_SITE_URL` only once the canonical production hostname is confirmed.

## Local setup

Copy `.env.example` to `.env.local`, then fill only the two Supabase public values from the project's API settings. Leave `NEXT_PUBLIC_SITE_URL` blank until a real production URL exists. `.env.local` is ignored by Git and must not be committed.

Never add a database password, `service_role` key, Supabase secret key, personal access token, or private signing key to project environment files or browser code.
