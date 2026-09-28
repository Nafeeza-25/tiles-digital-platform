import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

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

export async function createClient() {
  const cookieStore = await cookies();
  const { anonKey, url } = getSupabaseCredentials();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, options, value }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Server Components cannot set cookies. Add a proxy when auth is introduced.
        }
      },
    },
  });
}
