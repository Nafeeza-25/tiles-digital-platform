import { readFile } from "node:fs/promises";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
if (!url || !key) throw new Error("Supabase public environment variables are required.");
const client = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
const { error: selectError } = await client.from("enquiries").select("id").limit(1);
if (!selectError) throw new Error("SECURITY FAILURE - enquiries are publicly readable.");

const product = await client.from("products").select("id,name,slug").eq("is_active", true).limit(1).maybeSingle();
if (product.error || !product.data?.id) throw new Error("A public active product is required for product context.");

const [schema, form, utils] = await Promise.all([
  readFile("src/lib/enquiries/enquiry-schema.ts", "utf8"),
  readFile("src/components/forms/EnquiryForm.tsx", "utf8"),
  readFile("src/lib/enquiries/enquiry-utils.ts", "utf8"),
]);
for (const keyName of ["product_id", "enquiry_type", "name", "phone", "email", "quantity", "location", "message", "preferred_contact"]) if (!form.includes(`${keyName}:`)) throw new Error(`Missing approved insert key: ${keyName}`);
if (form.includes("status:")) throw new Error("Client insert must not set enquiry status.");
if (!schema.includes("z.enum(publicEnquiryTypes)") || !schema.includes("z.enum(preferredContactMethods)")) throw new Error("Enquiry schema does not restrict type/contact values.");
if (!utils.includes('intent === "quote"') || !utils.includes('intent === "product"') || !utils.includes("https://wa.me/")) throw new Error("Intent or WhatsApp utility checks are incomplete.");
for (const forbidden of ["service_role", "SUPABASE_SECRET", "SUPABASE_SERVICE_ROLE"]) if (`${schema}\n${form}\n${utils}`.includes(forbidden)) throw new Error(`Forbidden credential reference: ${forbidden}`);
console.log("Enquiry flow verification passed: public reads blocked, approved payload shape, schema restrictions, product context, and WhatsApp utility checks verified.");
