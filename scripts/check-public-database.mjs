import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!url || !publishableKey) {
  console.error("FAIL - Missing required Supabase environment variables.");
  process.exit(1);
}

const supabase = createClient(url, publishableKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const publicTables = [
  ["categories", "categories publicly readable"],
  ["products", "products publicly readable"],
  ["product_images", "product_images publicly readable"],
  ["reviews", "approved-reviews endpoint publicly readable"],
  ["stores", "active stores publicly readable"],
];

let hasFailure = false;

for (const [table, description] of publicTables) {
  const { error } = await supabase.from(table).select("*").limit(1);

  if (error) {
    console.error(`FAIL - ${description} (${error.code ?? "unknown error"})`);
    hasFailure = true;
  } else {
    console.log(`PASS - ${description}`);
  }
}

const { error: enquiriesError } = await supabase
  .from("enquiries")
  .select("*")
  .limit(1);

if (enquiriesError) {
  console.log("PASS - enquiries are NOT publicly readable");
} else {
  console.error("SECURITY FAILURE - enquiries are publicly readable");
  hasFailure = true;
}

if (hasFailure) {
  process.exit(1);
}
