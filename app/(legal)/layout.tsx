import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getEffectiveContact } from "@/sanity/lib/site-data";

export default async function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const contact = await getEffectiveContact();
  return (
    <>
      <SiteHeader contact={contact} />
      <main id="main" className="pt-28 lg:pt-32">
        <article className="container-page max-w-3xl py-10 lg:py-16">
          {children}
        </article>
      </main>
      <SiteFooter contact={contact} />
    </>
  );
}
