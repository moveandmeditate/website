import { SiteFooter, type FooterContact } from "@/components/site-footer";
import { getFooterPosts } from "@/sanity/lib/blog";

/**
 * Server wrapper that feeds the latest blog posts into the (client) footer's
 * "Writing" column. Use this in page/layout compositions instead of
 * `<SiteFooter>` directly so every page gets the dynamic posts.
 */
export async function SiteFooterServer({
  contact,
}: {
  contact?: FooterContact;
}) {
  const journal = await getFooterPosts(4);
  return <SiteFooter contact={contact} journal={journal} />;
}
