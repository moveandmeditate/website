import { BrandMark } from "@/components/brand-mark";
import { FadeUp } from "@/components/motion/fade-up";
import { TRUSTED_BRANDS } from "@/lib/content";

export function TrustedBy() {
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

          <div
            className="flex-1 overflow-hidden"
            role="list"
            aria-label="Brands we have worked with"
          >
            <ul className="flex items-center gap-8 sm:gap-12 lg:justify-between lg:gap-10 overflow-x-auto lg:overflow-visible scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {TRUSTED_BRANDS.map((brand) => (
                <li key={brand.name} className="opacity-80 hover:opacity-100 transition-opacity">
                  <BrandMark brand={brand} />
                </li>
              ))}
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
