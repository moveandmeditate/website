/**
 * Centralised, type-safe access to the Sanity-related env vars.
 *
 * Both `projectId` and `dataset` are exposed to the browser via the
 * `NEXT_PUBLIC_` prefix — they're not secrets, they're identifiers that
 * appear in every Sanity API call (Studio + read client both need them).
 *
 * The read token is server-only and must never be referenced from a
 * Client Component or anywhere that ships in the browser bundle.
 */

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }
  return v;
}

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing env var: NEXT_PUBLIC_SANITY_PROJECT_ID"
);

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing env var: NEXT_PUBLIC_SANITY_DATASET"
);

// Pin the API version so schema/query shape stays stable as Sanity ships
// new platform features. Bump deliberately when adopting new GROQ syntax.
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-12-01";

// Token is optional at module-load (build can still happen without it —
// the public CDN serves published documents anonymously). Callers that
// need drafts/preview must check for presence and degrade gracefully.
export const readToken = process.env.SANITY_API_READ_TOKEN;

// Webhook secret to authenticate Sanity → /api/revalidate calls.
export const revalidateSecret = process.env.SANITY_REVALIDATE_SECRET;
