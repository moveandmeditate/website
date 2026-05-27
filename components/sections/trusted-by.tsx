import { BrandMark } from "@/components/brand-mark";
import { FadeUp } from "@/components/motion/fade-up";
import { getEffectiveBrands } from "@/sanity/lib/site-data";

export async function TrustedBy() {
  const brands = await getEffectiveBrands();
  if (brands.length === 0) return null;
  return (
    <section
      aria-labelledby="trusted-heading"
      className="bg-bg border-y border-line"
    >
      <div className="container-page py-8 lg:py-10">
        <FadeUp className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12">
          <h2
            id="trusted-heading"
            className="text-eyebrow text-muted shrink-0"
          >
            Trusted by
          </h2>

          <div className="flex-1 overflow-hidden">
            <ul
              aria-label="Brands we have worked with"
              className="flex items-center gap-8 sm:gap-12 lg:justify-between lg:gap-10 overflow-x-auto lg:overflow-visible scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {brands.map((brand) => {
                const node = (
                  <BrandMark brand={brand} />
                );
                return (
                  <li
                    key={brand.name}
                    className="opacity-80 hover:opacity-100 transition-opacity"
                  >
                    {brand.websiteUrl ? (
                      <a
                        href={brand.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${brand.name} website`}
                      >
                        {node}
                      </a>
                    ) : (
                      node
                    )}
                  </li>
                );
              })}
              <li className="text-[11px] tracking-[0.24em] text-muted font-medium shrink-0">
                &amp; MORE
              </li>
            </ul>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
