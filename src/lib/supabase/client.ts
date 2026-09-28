import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseEnvironment } from "@/lib/env";
import type { Database } from "@/types/database.types";

export function createClient() {
  const { publishableKey, url } = getSupabaseEnvironment();

  return createBrowserClient<Database>(url, publishableKey);
}
