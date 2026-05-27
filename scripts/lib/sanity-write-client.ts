/**
 * Sanity write client for seed scripts.
 *
 * Uses the standard `@sanity/client` (not next-sanity) because we run
 * outside the Next.js runtime. Reads project ID + dataset from the
 * same env vars as the rest of the app, plus `SANITY_API_WRITE_TOKEN`
 * which must be **Editor** scope (not Viewer — Viewer can't mutate).
 *
 * The token is short-lived by design: generate it in Sanity manage UI,
 * run the import, revoke it. Never commit it to source.
 */
import "dotenv/config";
import { createClient, type SanityClient } from "@sanity/client";

function required(name: string): string {
  const v = process.env[name];
  if (!v) {
    throw new Error(
      `[seed] Missing env var ${name}. Set it in .env.local and re-run.`
    );
  }
  return v;
}

export function getSanityWriteClient(): SanityClient {
  const token = required("SANITY_API_WRITE_TOKEN");
  return createClient({
    projectId: required("NEXT_PUBLIC_SANITY_PROJECT_ID"),
    dataset: required("NEXT_PUBLIC_SANITY_DATASET"),
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-12-01",
    token,
    // Use the live API for writes — CDN is read-only.
    useCdn: false,
  });
}
