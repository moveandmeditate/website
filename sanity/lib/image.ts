import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { dataset, projectId } from "@/sanity/env";

const builder = createImageUrlBuilder({ projectId, dataset });

/**
 * Build a CDN URL for a Sanity image reference. Returns the builder so
 * callers can chain `.width(800).height(600).fit('crop').auto('format')`
 * etc. Always pass through `auto('format')` so modern browsers get
 * WebP/AVIF for free.
 */
export function urlForImage(source: SanityImageSource) {
  return builder.image(source).auto("format").fit("max");
}
