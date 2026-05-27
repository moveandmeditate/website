import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

/**
 * Public read-only client. Pulls from Sanity's edge-cached CDN — fast,
 * cheap, ideal for the published-content case that drives 99% of page
 * renders. Drafts are NOT visible through this client; use the draft
 * client (below) gated behind preview mode for that.
 */
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  // Use stega so visual-editing overlays work later without re-wiring.
  // Disabled until we actually enable preview mode.
  stega: false,
  perspective: "published",
});
