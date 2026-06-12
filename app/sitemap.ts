import type { MetadataRoute } from "next";
import { SITE } from "@/lib/content";
import { getAllAuthorSlugs, getAllBlogPosts } from "@/sanity/lib/blog";

type RouteEntry = {
  path: string;
  priority: number;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
};

const staticRoutes: RouteEntry[] = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/dance", priority: 0.9, changeFrequency: "monthly" },
  { path: "/yoga", priority: 0.9, changeFrequency: "monthly" },
  { path: "/weddings", priority: 0.8, changeFrequency: "monthly" },
  { path: "/corporate", priority: 0.8, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/careers", priority: 0.6, changeFrequency: "weekly" },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms-and-conditions", priority: 0.3, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [posts, authorSlugs] = await Promise.all([
    getAllBlogPosts(),
    getAllAuthorSlugs(),
  ]);

  const base = staticRoutes.map((r) => ({
    url: `${SITE.url}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const blogEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE.url}/blog/${p.slug}`,
    lastModified: new Date(p.updatedAt ?? p.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const authorEntries: MetadataRoute.Sitemap = authorSlugs.map((slug) => ({
    url: `${SITE.url}/author/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.4,
  }));

  return [...base, ...blogEntries, ...authorEntries];
}
