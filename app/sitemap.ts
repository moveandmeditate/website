import type { MetadataRoute } from "next";
import { SITE } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ["", "/privacy-policy", "/terms-and-conditions", "/refund-policy"];
  return routes.map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "yearly",
    priority: path === "" ? 1 : 0.4,
  }));
}
