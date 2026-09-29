import { z } from "zod";

export const publicEnquiryTypes = ["contact", "quote", "product"] as const;
export const preferredContactMethods = ["phone", "whatsapp", "email"] as const;
export type PublicEnquiryType = (typeof publicEnquiryTypes)[number];

const optionalText = (max: number) => z.string().trim().max(max).optional().or(z.literal(""));

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(100, "Name must be 100 characters or fewer."),
  phone: z.string().trim().min(6, "Enter a valid phone number.").max(30, "Phone number is too long.").regex(/^[+()\-\s\d]+$/, "Enter a valid phone number."),
  email: z.string().trim().email("Enter a valid email address.").max(254).optional().or(z.literal("")),
  quantity: z.coerce.number().positive("Quantity must be greater than zero.").max(1000000).optional().or(z.literal("")),
  location: optionalText(160),
  message: optionalText(2000),
  preferred_contact: z.enum(preferredContactMethods),
  enquiry_type: z.enum(publicEnquiryTypes),
});

export type EnquiryFormValues = z.input<typeof enquirySchema>;
export type ValidEnquiryValues = z.output<typeof enquirySchema>;
