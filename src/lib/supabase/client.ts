import { createBrowserClient } from "@supabase/ssr";

function getSupabaseCredentials() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Missing Supabase environment variables. Add them to .env.local before creating a Supabase client.",
    );
  }

  return { anonKey, url };
}

export function createClient() {
  const { anonKey, url } = getSupabaseCredentials();

  return createBrowserClient(url, anonKey);
}
