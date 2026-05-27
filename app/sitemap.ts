import type { MetadataRoute } from "next";
import { SITE } from "@/lib/content";

type RouteEntry = {
  path: string;
  priority: number;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
};

const routes: RouteEntry[] = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/dance", priority: 0.9, changeFrequency: "monthly" },
  { path: "/yoga", priority: 0.9, changeFrequency: "monthly" },
  { path: "/weddings", priority: 0.8, changeFrequency: "monthly" },
  { path: "/corporate", priority: 0.8, changeFrequency: "monthly" },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms-and-conditions", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((r) => ({
    url: `${SITE.url}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
