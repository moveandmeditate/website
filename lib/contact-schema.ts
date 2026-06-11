import { z } from "zod";
import { INTERESTS } from "@/lib/content";

// Email + phone are individually optional, but the form must include at
// least one — Amisha needs a way to reach back. The refine below enforces
// that "one-of" rule and attaches the error to the email field so the
// inline validation surfaces somewhere visible.
export const ContactSchema = z
  .object({
    name: z.string().trim().min(2, "Please share your full name").max(80, "Too long"),
    email: z
      .string()
      .trim()
      .optional()
      .or(z.literal(""))
      .refine((v) => !v || z.email().safeParse(v).success, "Enter a valid email"),
    phone: z
      .string()
      .trim()
      .optional()
      .or(z.literal(""))
      .refine(
        (v) => !v || (v.length >= 7 && v.length <= 20),
        "Enter a valid phone number"
      ),
    interest: z.enum(INTERESTS, { error: "Pick one option" }),
    message: z
      .string()
      .trim()
      .max(2000, "Too long")
      .optional()
      .or(z.literal("")),
    // Honeypot: real users won't fill this.
    website: z.string().max(0).optional().or(z.literal("")),
  })
  .refine((v) => Boolean(v.email?.trim()) || Boolean(v.phone?.trim()), {
    message: "Share an email or phone number so we can reply",
    path: ["email"],
  });

export type ContactInput = z.infer<typeof ContactSchema>;

export type ContactResult =
  | { ok: true }
  | { ok: false; error: string };
