"use server";

import { ContactSchema, type ContactResult } from "@/lib/contact-schema";

/**
 * Server Action for the contact form.
 *
 * STUB IMPLEMENTATION — validates input on the server and logs.
 * TODO: wire to a real handler before launch. Options:
 *   • Resend (transactional inbox: hello@moveandmeditate.in)
 *   • Formspree / Web3Forms (low-code)
 *   • Internal CRM via fetch to a webhook
 */
export async function submitContact(data: unknown): Promise<ContactResult> {
  const parsed = ContactSchema.safeParse(data);
  if (!parsed.success) {
    return { ok: false, error: "Please check the form fields and try again." };
  }
  // Honeypot tripped — pretend success so bots get no signal.
  if (parsed.data.website && parsed.data.website.length > 0) {
    return { ok: true };
  }

  // eslint-disable-next-line no-console -- intentional until real handler wired
  console.log("[contact:new]", {
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone || null,
    interest: parsed.data.interest,
    messageLength: parsed.data.message.length,
    ts: new Date().toISOString(),
  });

  return { ok: true };
}
