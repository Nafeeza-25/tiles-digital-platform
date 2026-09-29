"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@/lib/supabase/client";
import { reviewSchema, type ReviewFormValues } from "@/lib/reviews/review-schema";
import { createPublicReviewInsert, type ReviewProductContext } from "@/lib/reviews/review-utils";
import { ReviewRatingInput } from "@/components/reviews/ReviewRatingInput";
import { ReviewSubmissionSuccess } from "@/components/reviews/ReviewSubmissionSuccess";

export function ReviewForm({ product }: { product: ReviewProductContext }) {
  const [submitted, setSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ReviewFormValues>({ resolver: zodResolver(reviewSchema), defaultValues: { customer_name: "", title: "", comment: "" } });
  const submit = async (values: ReviewFormValues) => {
    setSubmissionError(null);
    const parsed = reviewSchema.safeParse(values);
    if (!parsed.success) return;
    const { error } = await createClient().from("reviews").insert(createPublicReviewInsert(product, parsed.data));
    if (error) { setSubmissionError("Your review could not be submitted right now. Please try again later."); return; }
    setSubmitted(true);
  };
  if (submitted) return <ReviewSubmissionSuccess />;
  return <section aria-labelledby="review-form-heading" className="border bg-surface p-6"><h3 id="review-form-heading" className="text-2xl">Review {product.name}</h3><p className="mt-2 text-muted">This fictional academic-demo review is submitted for moderation and is not public unless approved.</p><form noValidate onSubmit={handleSubmit(submit)} className="mt-6 grid gap-5 sm:grid-cols-2"><FormField label="Name" error={errors.customer_name?.message} required><input id="review-customer-name" autoComplete="name" {...register("customer_name")} className="field" aria-invalid={Boolean(errors.customer_name)} aria-describedby={errors.customer_name ? "review-customer-name-error" : undefined} /></FormField><ReviewRatingInput register={register} error={errors.rating?.message} /><FormField label="Title" error={errors.title?.message}><input id="review-title" {...register("title")} className="field" aria-invalid={Boolean(errors.title)} aria-describedby={errors.title ? "review-title-error" : undefined} /></FormField><FormField label="Review" error={errors.comment?.message} required className="sm:col-span-2"><textarea id="review-comment" rows={5} {...register("comment")} className="field" aria-invalid={Boolean(errors.comment)} aria-describedby={errors.comment ? "review-comment-error" : undefined} /></FormField>{submissionError ? <p className="sm:col-span-2 text-sm text-primary" role="alert">{submissionError}</p> : null}<div className="sm:col-span-2"><button type="submit" disabled={isSubmitting} className="min-h-11 bg-primary px-5 font-semibold text-primary-foreground disabled:opacity-60" aria-busy={isSubmitting}>{isSubmitting ? "Submitting review…" : "Submit for moderation"}</button></div></form></section>;
}

function FormField({ label, error, required = false, children, className = "" }: { label: string; error?: string; required?: boolean; children: React.ReactNode; className?: string }) {
  const fieldId = `review-${label.toLowerCase().replace(/[^a-z]+/g, "-")}`;
  return <div className={`grid gap-1 text-sm font-semibold ${className}`}><label htmlFor={fieldId}>{label}{required ? <span aria-hidden="true"> *</span> : null}</label>{children}{error ? <p id={`${fieldId}-error`} className="text-sm font-normal text-primary" role="alert">{error}</p> : null}</div>;
}
