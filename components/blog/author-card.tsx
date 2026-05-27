import Link from "next/link";
import { MediaFrame } from "@/components/media-frame";
import {
  authorImageUrl,
  type AuthorCard as AuthorCardType,
} from "@/sanity/lib/blog";

type AuthorCardProps = {
  author: (AuthorCardType & {
    bio: string | null;
    credentials: string[] | null;
  }) | null;
  /** Visual variant. `inline` is the slim version next to the post title;
   *  `card` is the full block at the article footer. */
  variant: "inline" | "card";
};

export function AuthorCard({ author, variant }: AuthorCardProps) {
  if (!author) return null;
  const portrait = authorImageUrl(author.photo);

  if (variant === "inline") {
    return (
      <Link
        href={`/author/${author.slug}`}
        className="inline-flex items-center gap-2.5 group"
      >
        {portrait ? (
          <span className="relative size-9 rounded-full overflow-hidden bg-bg-2 border border-line-2 shrink-0">
            <MediaFrame
              src={portrait}
              alt={author.photo?.alt || author.name}
              className="absolute inset-0"
              sizes="36px"
              watermark={false}
            />
          </span>
        ) : null}
        <span className="text-[11.5px] leading-tight">
          <span className="block font-medium text-ink group-hover:text-gold-dk transition-colors">
            {author.name}
          </span>
          {author.role ? (
            <span className="block text-[10px] tracking-[0.18em] text-muted uppercase">
              {author.role}
            </span>
          ) : null}
        </span>
      </Link>
    );
  }

  return (
    <aside
      aria-label={`About ${author.name}`}
      className="mt-14 bg-bg-3 p-6 lg:p-8 flex flex-col sm:flex-row gap-5 sm:gap-7"
    >
      {portrait ? (
        <Link
          href={`/author/${author.slug}`}
          className="relative size-20 sm:size-24 rounded-full overflow-hidden bg-bg-2 border border-line-2 shrink-0"
        >
          <MediaFrame
            src={portrait}
            alt={author.photo?.alt || author.name}
            className="absolute inset-0"
            sizes="96px"
            watermark={false}
          />
        </Link>
      ) : null}

      <div className="flex-1 min-w-0">
        <p className="text-eyebrow text-muted">Written by</p>
        <Link
          href={`/author/${author.slug}`}
          className="mt-1 inline-block font-serif text-[1.45rem] tracking-[0.02em] text-ink hover:text-gold-dk transition-colors"
        >
          {author.name}
        </Link>
        {author.role ? (
          <div className="mt-0.5 text-[11px] tracking-[0.18em] font-medium uppercase text-muted">
            {author.role}
          </div>
        ) : null}
        {author.bio ? (
          <p className="mt-3 text-[14px] leading-[1.7] text-ink-2 max-w-[58ch]">
            {author.bio}
          </p>
        ) : null}
        {author.credentials?.length ? (
          <ul
            aria-label="Credentials"
            className="mt-4 flex flex-wrap gap-1.5"
          >
            {author.credentials.map((c) => (
              <li
                key={c}
                className="text-[10.5px] tracking-[0.16em] uppercase bg-bg border border-line-2 text-ink-2 px-2.5 py-1 rounded-sm"
              >
                {c}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </aside>
  );
}
