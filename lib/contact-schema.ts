import { z } from "zod";
import { INTERESTS } from "@/lib/content";

export const ContactSchema = z.object({
  name: z.string().trim().min(2, "Please share your full name").max(80, "Too long"),
  email: z.email("Enter a valid email"),
  // Phone is required so Amisha can reach back via WhatsApp / call without
  // a round-trip on email — most enquiries here are time-sensitive.
  phone: z
    .string()
    .trim()
    .min(7, "Please share a phone number we can reach you on")
    .max(20, "Too long"),
  interest: z.enum(INTERESTS, { error: "Pick one option" }),
  message: z.string().trim().min(10, "Tell us a little more (at least 10 characters)").max(2000, "Too long"),
  // Honeypot: real users won't fill this.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof ContactSchema>;

export type ContactResult =
  | { ok: true }
  | { ok: false; error: string };
