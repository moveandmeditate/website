/**
 * Sanity write client for seed scripts.
 *
 * USAGE
 *   1. Generate an Editor-scope token in Sanity manage UI:
 *      https://www.sanity.io/manage/project/sis92gxt/api/tokens
 *      → Add API token → Permissions: **Editor** → copy token
 *      (shown only once).
 *   2. Add to `.env.local` (gitignored, never committed):
 *        SANITY_API_WRITE_TOKEN=sk...your-token-here
 *   3. Run `pnpm seed:blog` (or `pnpm seed:blog 01` for a single file).
 *   4. Revoke the token at the same URL once the import is done —
 *      runtime reads never need write access.
 *
 * WHY THE EXPLICIT .env.local LOAD BELOW
 *   The Next.js runtime auto-loads `.env.local`, but standalone
 *   scripts (run via `tsx`, `node`, etc.) do NOT — they only see
 *   what's in `.env` unless we opt in. So we explicitly load
 *   `.env.local` first (highest precedence) and fall back to `.env`.
 *   Without these two lines, every env-var check below will fail
 *   even though the token is correctly placed in `.env.local`.
 *
 * SCOPES
 *   - Viewer token (current `SANITY_API_READ_TOKEN`)  → CAN'T mutate.
 *     The seed script needs Editor.
 *   - Editor token (`SANITY_API_WRITE_TOKEN`)         → can create + patch.
 *     This is the one the script needs.
 *   - Deploy Studio / Administrator scopes are stronger than needed
 *     and should NOT be used for seeding.
 *
 * Never commit `.env.local`. It's in `.gitignore`.
 */
import { config as loadEnv } from "dotenv";
loadEnv({ path: ".env.local" });
loadEnv(); // fallback to .env when a key isn't in .env.local

import { createClient, type SanityClient } from "@sanity/client";

function required(name: string): string {
  const v = process.env[name];
  if (!v || v.trim() === "") {
    throw new Error(
      [
        `[seed] Missing env var ${name}.`,
        ``,
        `Set it in .env.local at the repo root (NOT .env), then re-run.`,
        `Example:`,
        `  ${name}=sk...paste-token-here`,
        ``,
        `If the token IS in .env.local and you still see this error,`,
        `make sure you saved the file before re-running.`,
      ].join("\n")
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
