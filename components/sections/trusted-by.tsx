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
      <div className="container-page py-10 lg:py-14">
        <FadeUp>
          <h2
            id="trusted-heading"
            className="text-eyebrow text-muted text-center mb-8 lg:mb-10"
          >
            Trusted by
          </h2>

          {/*
            Two display modes:
            - Mobile: horizontal carousel — preserves the original scrollable
              feel and avoids forcing 15 logos into a stack.
            - lg+: wrapping grid where every cell is the same size, so the
              wordmarks line up regardless of how wide each one is. Six per
              row at 1280px+ means the 15 logos resolve to a clean 6/6/3.
          */}
          <ul
            aria-label="Brands we have worked with"
            className="flex items-center gap-10 sm:gap-12 overflow-x-auto lg:overflow-visible lg:grid lg:grid-cols-5 xl:grid-cols-6 lg:gap-y-10 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {brands.map((brand) => {
              const node = <BrandMark brand={brand} />;
              return (
                <li
                  key={brand.name}
                  className="shrink-0 lg:shrink min-w-[120px] flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
                >
                  {brand.websiteUrl ? (
                    <a
                      href={brand.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${brand.name} website`}
                      className="flex items-center justify-center"
                    >
                      {node}
                    </a>
                  ) : (
                    node
                  )}
                </li>
              );
            })}
          </ul>
        </FadeUp>
      </div>
    </section>
  );
}
