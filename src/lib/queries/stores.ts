import { createClient } from "@/lib/supabase/server";
import type { Json } from "@/types/database.types";

export type PublicStore = {
  name: string;
  slug: string;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: string;
  postal_code: string | null;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  google_maps_url: string | null;
  latitude: number | null;
  longitude: number | null;
  opening_hours: Json;
};

const storeSelect = "name,slug,address_line1,address_line2,city,state,postal_code,phone,whatsapp,email,google_maps_url,latitude,longitude,opening_hours";

export async function getActiveStores(): Promise<PublicStore[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("stores").select(storeSelect).eq("is_active", true).order("city").order("name");
    return error ? [] : (data ?? []) as PublicStore[];
  } catch {
    return [];
  }
}
