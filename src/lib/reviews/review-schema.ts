import { z } from "zod";

const optionalTitle = z.string().trim().max(120, "Title must be 120 characters or fewer.").optional().or(z.literal(""));

export const reviewSchema = z.object({
  customer_name: z.string().trim().min(2, "Enter your name.").max(80, "Name must be 80 characters or fewer."),
  rating: z.coerce.number().int("Choose a whole-star rating.").min(1, "Choose a rating from 1 to 5.").max(5, "Choose a rating from 1 to 5."),
  title: optionalTitle,
  comment: z.string().trim().min(10, "Review comments must be at least 10 characters.").max(1000, "Review comments must be 1000 characters or fewer."),
});

export type ReviewFormValues = z.input<typeof reviewSchema>;
export type ValidReviewValues = z.output<typeof reviewSchema>;
