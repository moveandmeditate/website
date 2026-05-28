import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

/**
 * Server-side read client. Pulls from Sanity's edge-cached CDN — fast,
 * cheap, ideal for the published-content case that drives 99% of page
 * renders.
 *
 * Authenticated with a read (Viewer) token: this module is imported ONLY
 * by server data-layer files (blog/events/site-data), never a client
 * component, so the token never reaches the browser bundle. The token is
 * required because some published docs (e.g. the author profile) are not
 * served to anonymous requests on this dataset; an authenticated read is
 * the reliable path and also avoids public rate limits. `useCdn: true`
 * with a token uses the authenticated CDN, so we keep CDN speed.
 *
 * `perspective: "published"` still hides drafts even with the token.
 */
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token: process.env.SANITY_API_READ_TOKEN,
  // Use stega so visual-editing overlays work later without re-wiring.
  // Disabled until we actually enable preview mode.
  stega: false,
  perspective: "published",
});
