"use server";

import { ContactSchema, type ContactResult } from "@/lib/contact-schema";

/**
 * Server Action for the contact form.
 *
 * Posts a JSON payload to a Google Apps Script Web App (deployed by Amisha),
 * which appends the row to a Google Sheet and emails her + auto-replies the
 * submitter. The Apps Script verifies the shared secret before doing anything,
 * so the Web App URL is safe to call from the server even though it's a
 * `Anyone access` deployment.
 *
 * Required env vars (set in Vercel → Project → Settings → Environment Variables):
 *   - CONTACT_WEBHOOK_URL    — the Apps Script `.../exec` URL
 *   - CONTACT_WEBHOOK_SECRET — same string set as SHARED_SECRET in the script
 *
 * If either env var is missing we log + return a friendly error rather than
 * silently swallowing the submission.
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

  const url = process.env.CONTACT_WEBHOOK_URL;
  const secret = process.env.CONTACT_WEBHOOK_SECRET;

  if (!url || !secret) {
    console.error(
      "[contact:webhook] Missing CONTACT_WEBHOOK_URL or CONTACT_WEBHOOK_SECRET env var; submission could not be forwarded.",
      { name: parsed.data.name, email: parsed.data.email }
    );
    return {
      ok: false,
      error: "We can't accept submissions right now. Please email us directly.",
    };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      // application/json works — Apps Script reads it via e.postData.contents.
      // We don't go form-encoded so we don't hit Google's "preflight" path.
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret,
        name: parsed.data.name,
        // Email + phone + message are individually optional now (at least
        // one of email/phone is enforced by the schema). Normalise undefined
        // to "" so downstream sheet/email rendering stays predictable.
        email: parsed.data.email || "",
        phone: parsed.data.phone || "",
        interest: parsed.data.interest,
        message: parsed.data.message || "",
        // Honeypot passthrough — the Apps Script also short-circuits on this
        // so we have two layers of bot defence.
        website: parsed.data.website || "",
      }),
      // Apps Script redirects /exec → /usercontent... → /exec. Default fetch
      // follows redirects so the JSON body lands. No special config needed.
    });

    if (!res.ok) {
      console.error("[contact:webhook] Non-2xx from Apps Script", res.status);
      return {
        ok: false,
        error: "Something went wrong on our end. Please email us directly.",
      };
    }

    // Apps Script always returns JSON we shape ourselves. Don't trust other
    // fields — just check `ok`.
    const body = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (!body?.ok) {
      console.error("[contact:webhook] Apps Script returned error", body);
      return {
        ok: false,
        error: "Something went wrong on our end. Please email us directly.",
      };
    }

    return { ok: true };
  } catch (err) {
    console.error("[contact:webhook] Network error", err);
    return {
      ok: false,
      error: "Couldn't reach our servers. Please try again or email us directly.",
    };
  }
}
