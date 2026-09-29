import { createClient } from "@/lib/supabase/server";
import type { ProductEnquiryContext } from "@/lib/enquiries/enquiry-utils";

export async function getActiveEnquiryProduct(slug: string | null): Promise<ProductEnquiryContext | null> {
  if (!slug) return null;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("products").select("id,name,slug").eq("slug", slug).eq("is_active", true).maybeSingle();
    return error || !data ? null : data;
  } catch { return null; }
}

export async function getDemoWhatsAppNumber() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("stores").select("whatsapp").eq("is_active", true).not("whatsapp", "is", null).order("sort_order").limit(1).maybeSingle();
    return error ? null : data?.whatsapp ?? null;
  } catch { return null; }
}
