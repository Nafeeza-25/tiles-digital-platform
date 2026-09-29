import { readFile } from "node:fs/promises";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
if (!url || !key) throw new Error("Supabase public environment variables are required.");
const client = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
const { data: publicReviews, error: publicReviewsError } = await client.from("reviews").select("id,is_approved").limit(100);
if (publicReviewsError) throw new Error("Approved public reviews should be readable.");
if (!publicReviews.every((review) => review.is_approved)) throw new Error("SECURITY FAILURE - an unapproved review is publicly readable.");
const { data: pendingReviews, error: pendingError } = await client.from("reviews").select("id").eq("is_approved", false).limit(1);
if (pendingError || pendingReviews.length) throw new Error("SECURITY FAILURE - pending reviews are publicly readable.");
const { error: enquiryReadError } = await client.from("enquiries").select("id").limit(1);
if (!enquiryReadError) throw new Error("SECURITY FAILURE - enquiries are publicly readable.");

const [schema, form, utils, detailPage] = await Promise.all([readFile("src/lib/reviews/review-schema.ts", "utf8"), readFile("src/components/reviews/ReviewForm.tsx", "utf8"), readFile("src/lib/reviews/review-utils.ts", "utf8"), readFile("src/app/tiles/[categorySlug]/[productSlug]/page.tsx", "utf8")]);
for (const token of ["customer_name", "rating", "title", "comment", ".int(", ".min(1", ".max(5", ".min(10", ".max(1000"]) if (!schema.includes(token)) throw new Error(`Review schema is missing ${token}.`);
for (const keyName of ["product_id", "customer_name", "rating", "title", "comment"]) if (!utils.includes(`\"${keyName}\"`)) throw new Error(`Missing permitted review insert key: ${keyName}`);
for (const forbidden of ["is_approved:", "created_at:", "service_role", "SUPABASE_SECRET", "SUPABASE_SERVICE_ROLE"]) if (`${schema}\n${form}\n${utils}`.includes(forbidden)) throw new Error(`Forbidden public review reference: ${forbidden}`);
if (!form.includes("createPublicReviewInsert(product, parsed.data)") || !detailPage.includes("product={{ id: product.id, name: product.name, slug: product.slug }}")) throw new Error("Review product context is not resolved by the active server product.");
console.log("Review flow verification passed: approved-only public reads, pending review concealment, enquiry read protection, restricted insert shape, validation, and server-resolved product context verified.");
