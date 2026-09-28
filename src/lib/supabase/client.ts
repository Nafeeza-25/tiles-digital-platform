import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseEnvironment } from "@/lib/env";

export function createClient() {
  const { publishableKey, url } = getSupabaseEnvironment();

  return createBrowserClient(url, publishableKey);
}
