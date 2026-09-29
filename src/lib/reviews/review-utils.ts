import type { TablesInsert } from "@/types/database.types";
import type { ValidReviewValues } from "@/lib/reviews/review-schema";

export type ReviewProductContext = { id: string; name: string; slug: string };
export type PublicReviewInsert = Pick<TablesInsert<"reviews">, "product_id" | "customer_name" | "rating" | "title" | "comment">;

export const publicReviewInsertColumns = ["product_id", "customer_name", "rating", "title", "comment"] as const;

export function createPublicReviewInsert(product: ReviewProductContext, values: ValidReviewValues): PublicReviewInsert {
  return { product_id: product.id, customer_name: values.customer_name, rating: values.rating, title: values.title || null, comment: values.comment };
}
