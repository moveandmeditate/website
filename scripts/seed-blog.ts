/**
 * Blog seed entry point.
 *
 *   pnpm seed:blog            # seed every article in content/blog/
 *   pnpm seed:blog 01         # seed only the article whose filename starts with 01
 *
 * Requires `SANITY_API_WRITE_TOKEN` (Editor scope) in `.env.local`.
 * Generate at https://www.sanity.io/manage/project/sis92gxt/api/tokens
 * — create token, run script, revoke token.
 *
 * Per the AGENTS doc: every published change fires the Sanity webhook,
 * which hits /api/revalidate and busts the `blog` cache tag. Within
 * ~5 seconds of running this, the new post is live on the production
 * site.
 */
import { readdir } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join, resolve } from "node:path";

import { upsertDefaultAuthor } from "./lib/author";
import { getSanityWriteClient } from "./lib/sanity-write-client";
import { upsertBlogPost, type SeedBlogPost } from "./lib/blog-post";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = resolve(__dirname, "..", "content", "blog");

type PostModule = { post?: SeedBlogPost };

async function listArticleFiles(filter?: string): Promise<string[]> {
  const entries = await readdir(CONTENT_DIR);
  const ts = entries.filter((f) => f.endsWith(".ts")).sort();
  if (!filter) return ts;
  return ts.filter((f) => f.startsWith(filter));
}

async function main() {
  const [, , filter] = process.argv;
  const client = getSanityWriteClient();

  const authorId = await upsertDefaultAuthor(client);

  const files = await listArticleFiles(filter);
  if (files.length === 0) {
    console.warn(
      `[seed] no article files matched in ${CONTENT_DIR}${
        filter ? ` (filter: ${filter})` : ""
      }.`
    );
    process.exit(1);
  }

  console.log(
    `[seed] importing ${files.length} article${files.length === 1 ? "" : "s"}:`
  );

  for (const file of files) {
    const filePath = join(CONTENT_DIR, file);
    const moduleUrl = pathToFileURL(filePath).href;
    const mod = (await import(moduleUrl)) as PostModule;
    if (!mod.post) {
      console.warn(`[seed] ${file} — no \`post\` export, skipping.`);
      continue;
    }
    await upsertBlogPost(client, mod.post, authorId);
  }

  console.log("[seed] done.");
}

main().catch((err) => {
  console.error("[seed] failed:", err);
  process.exit(1);
});
