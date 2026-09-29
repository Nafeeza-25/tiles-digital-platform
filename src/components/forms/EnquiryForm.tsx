"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@/lib/supabase/client";
import { enquirySchema, type EnquiryFormValues } from "@/lib/enquiries/enquiry-schema";
import type { EnquiryIntent, ProductEnquiryContext } from "@/lib/enquiries/enquiry-utils";

export function EnquiryForm({ intent, product }: { intent: EnquiryIntent; product: ProductEnquiryContext | null }) {
  const [submitted, setSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<EnquiryFormValues>({ resolver: zodResolver(enquirySchema), defaultValues: { enquiry_type: intent, preferred_contact: "phone", email: "", quantity: "", location: "", message: "" } });
  const submit = async (values: EnquiryFormValues) => {
    setSubmissionError(null);
    const parsed = enquirySchema.safeParse(values);
    if (!parsed.success) return;
    const quantity = parsed.data.quantity === "" || parsed.data.quantity === undefined ? null : parsed.data.quantity;
    const { error } = await createClient().from("enquiries").insert({ product_id: product?.id ?? null, enquiry_type: intent, name: parsed.data.name, phone: parsed.data.phone, email: parsed.data.email || null, quantity, location: parsed.data.location || null, message: parsed.data.message || null, preferred_contact: parsed.data.preferred_contact });
    if (error) { setSubmissionError("Your enquiry could not be sent right now. Please try again later."); return; }
    setSubmitted(true);
  };
  if (submitted) return <section className="mt-8 border bg-surface p-6" role="status" aria-live="polite"><h2 className="text-2xl">Enquiry received</h2><p className="mt-2 text-muted">Your fictional academic-demo enquiry was saved successfully.</p></section>;
  return <form noValidate onSubmit={handleSubmit(submit)} className="mt-8 grid gap-5 border bg-surface p-6 sm:grid-cols-2"><input type="hidden" {...register("enquiry_type")} /><Field label="Name" error={errors.name?.message}><input autoComplete="name" {...register("name")} className="field" /></Field><Field label="Phone" error={errors.phone?.message}><input inputMode="tel" autoComplete="tel" {...register("phone")} className="field" /></Field><Field label="Email" error={errors.email?.message}><input type="email" autoComplete="email" {...register("email")} className="field" /></Field><Field label="Preferred contact method" error={errors.preferred_contact?.message}><select {...register("preferred_contact")} className="field"><option value="phone">Phone</option><option value="whatsapp">WhatsApp</option><option value="email">Email</option></select></Field><Field label="Location" error={errors.location?.message}><input autoComplete="address-level2" {...register("location")} className="field" /></Field><Field label="Quantity (optional)" error={errors.quantity?.message}><input type="number" min="0.01" step="0.01" {...register("quantity")} className="field" /></Field><Field label="Message" error={errors.message?.message} className="sm:col-span-2"><textarea rows={5} {...register("message")} className="field" /></Field>{submissionError ? <p className="sm:col-span-2 text-sm text-primary" role="alert">{submissionError}</p> : null}<div className="sm:col-span-2"><button type="submit" disabled={isSubmitting} className="min-h-11 bg-primary px-5 font-semibold text-primary-foreground disabled:opacity-60" aria-busy={isSubmitting}>{isSubmitting ? "Sending enquiry…" : intent === "quote" ? "Request Quote" : intent === "product" ? "Send Product Enquiry" : "Send Enquiry"}</button></div></form>;
}

function Field({ label, error, children, className = "" }: { label: string; error?: string; children: React.ReactNode; className?: string }) { const id = label.toLowerCase().replace(/[^a-z]+/g, "-"); return <label className={`grid gap-1 text-sm font-semibold ${className}`}>{label}{children}{error ? <span id={`${id}-error`} className="text-sm font-normal text-primary">{error}</span> : null}</label>; }
