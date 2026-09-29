"use client";

import { Star } from "lucide-react";
import type { UseFormRegister } from "react-hook-form";
import type { ReviewFormValues } from "@/lib/reviews/review-schema";

export function ReviewRatingInput({ register, error }: { register: UseFormRegister<ReviewFormValues>; error?: string }) {
  return <fieldset className="grid gap-2" aria-describedby={error ? "review-rating-error" : undefined} aria-invalid={Boolean(error)}>
    <legend className="text-sm font-semibold">Rating <span aria-hidden="true">*</span></legend>
    <div className="flex flex-wrap gap-2">{[1, 2, 3, 4, 5].map((rating) => <label key={rating} className="cursor-pointer"><input type="radio" value={rating} {...register("rating")} className="sr-only peer" /><span className="flex min-h-11 min-w-11 items-center justify-center gap-1 border border-border px-2 text-sm peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary"><Star className="size-4" aria-hidden="true" /> {rating}<span className="sr-only"> star{rating === 1 ? "" : "s"}</span></span></label>)}</div>
    {error ? <p id="review-rating-error" className="text-sm font-normal text-primary" role="alert">{error}</p> : null}
  </fieldset>;
}
