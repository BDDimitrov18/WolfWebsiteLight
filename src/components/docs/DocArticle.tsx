"use client";

import Link from "next/link";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { DOC_PAGES, getDocPage, type DocBlock, type DocPage } from "@/lib/docs/content";
import { Reveal } from "@/components/ui/Reveal";
import { ScreenshotFrame } from "@/components/ui/ScreenshotFrame";

export function DocArticle({ slug }: { slug: string }) {
  const { locale, t } = useLocale();
  const page = getDocPage(slug);

  if (!page) {
    return <p className="text-ink-300">Not found.</p>;
  }

  const blocks = page.blocks[locale];
  const toc = blocks.filter(
    (b): b is Extract<DocBlock, { type: "h2" }> => b.type === "h2",
  );

  return (
    <div className="grid gap-12 xl:grid-cols-[1fr_14rem]">
      <article className="min-w-0 max-w-2xl">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-ember-400">
            {page.title[locale]}
          </p>
          <h1
            className="mt-3 font-display text-balance"
            style={{ fontSize: "var(--fs-h2)", color: "var(--color-paper-50)" }}
          >
            {page.title[locale]}
          </h1>
          <p className="mt-4 text-pretty leading-relaxed text-ink-300">
            {page.intro[locale]}
          </p>
        </Reveal>

        <div className="mt-10 flex flex-col gap-6">
          {blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>

        {/* Prev / next station pager */}
        <Pager slug={slug} />

        <div className="mt-8 border-t border-ink-700 pt-6">
          <Link
            href="/"
            className="font-mono text-xs tracking-wide text-ink-400 transition-colors hover:text-paper-50"
          >
            ← {t("docs.backToSite")}
          </Link>
        </div>
      </article>

      {/* On this page */}
      {toc.length > 0 && (
        <aside className="hidden xl:block">
          <div className="sticky top-24">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-ink-400">
              {t("docs.onThisPage")}
            </p>
            <ul className="mt-3 space-y-2 border-l border-ink-700">
              {toc.map((h) => (
                <li key={h.id}>
                  <a
                    href={`#${h.id}`}
                    className="-ml-px block border-l-2 border-transparent pl-3 text-sm text-ink-300 transition-colors hover:border-ember-500 hover:text-paper-50"
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      )}
    </div>
  );
}

/**
 * Station-to-station navigation: the docs read like a survey traverse,
 * so the pager carries the same language — a numbered station, a
 * bearing arrow that slides on hover, an ember edge lighting up.
 */
function Pager({ slug }: { slug: string }) {
  const { locale, t } = useLocale();
  const idx = DOC_PAGES.findIndex((p) => p.slug === slug);
  if (idx === -1) return null;
  const prev = idx > 0 ? DOC_PAGES[idx - 1] : undefined;
  const next = idx < DOC_PAGES.length - 1 ? DOC_PAGES[idx + 1] : undefined;
  if (!prev && !next) return null;

  const href = (p: DocPage) => (p.slug ? `/docs/${p.slug}` : "/docs");
  const station = (p: DocPage) =>
    `${String(DOC_PAGES.indexOf(p) + 1).padStart(2, "0")} / ${String(DOC_PAGES.length).padStart(2, "0")}`;

  return (
    <nav
      aria-label={`${t("docs.prev")} / ${t("docs.next")}`}
      className="mt-14 grid gap-4 sm:grid-cols-2"
    >
      {prev ? (
        <Link
          href={href(prev)}
          rel="prev"
          className="group relative flex flex-col gap-2.5 overflow-hidden rounded-xl border p-5 transition-all duration-300 hover:-translate-y-0.5"
          style={{
            borderColor: "color-mix(in srgb, var(--color-paper-100) 10%, transparent)",
            background: "color-mix(in srgb, var(--color-ink-800) 55%, transparent)",
          }}
        >
          <span
            aria-hidden
            className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-ember-500 transition-transform duration-500 ease-out group-hover:scale-y-100"
          />
          <span className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400 transition-colors group-hover:text-ember-400">
            <PagerArrow dir="prev" />
            {t("docs.prev")}
            <span className="ml-auto text-ink-500">{station(prev)}</span>
          </span>
          <span className="font-display text-lg leading-snug text-paper-100/85 transition-colors group-hover:text-paper-50">
            {prev.title[locale]}
          </span>
        </Link>
      ) : (
        <span aria-hidden className="hidden sm:block" />
      )}

      {next && (
        <Link
          href={href(next)}
          rel="next"
          className="group relative flex flex-col gap-2.5 overflow-hidden rounded-xl border p-5 text-right transition-all duration-300 hover:-translate-y-0.5"
          style={{
            borderColor: "color-mix(in srgb, var(--color-ember-500) 32%, transparent)",
            background:
              "linear-gradient(135deg, color-mix(in srgb, var(--color-ember-600) 10%, transparent), color-mix(in srgb, var(--color-ink-800) 55%, transparent) 55%)",
          }}
        >
          <span
            aria-hidden
            className="absolute inset-y-0 right-0 w-0.5 origin-bottom scale-y-0 bg-ember-500 transition-transform duration-500 ease-out group-hover:scale-y-100"
          />
          <span className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ember-400/90">
            <span className="mr-auto text-ink-500">{station(next)}</span>
            {t("docs.next")}
            <PagerArrow dir="next" />
          </span>
          <span className="font-display text-lg leading-snug text-paper-50">
            {next.title[locale]}
          </span>
        </Link>
      )}
    </nav>
  );
}

function PagerArrow({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={`flex-none transition-transform duration-300 ${
        dir === "next"
          ? "group-hover:translate-x-1"
          : "rotate-180 group-hover:-translate-x-1"
      }`}
    >
      <path
        d="M2 8h11M9 3.5 13.5 8 9 12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Block({ block }: { block: DocBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2
          id={block.id}
          className="scroll-mt-24 font-display text-xl"
          style={{ color: "var(--color-paper-50)" }}
        >
          {block.text}
        </h2>
      );
    case "p":
      return <p className="leading-relaxed text-ink-300">{block.text}</p>;
    case "ul":
      return (
        <ul className="space-y-2.5">
          {block.items.map((it) => (
            <li key={it} className="flex items-start gap-3 text-ink-300">
              <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-ember-500" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      );
    case "steps":
      return (
        <ol className="space-y-3">
          {block.items.map((s, i) => (
            <li
              key={s.t}
              className="flex gap-4 rounded-xl border border-ink-700 bg-ink-800/50 px-4 py-3.5"
            >
              <span
                className="flex h-7 w-7 flex-none items-center justify-center rounded-full font-mono text-xs font-semibold"
                style={{ background: "var(--color-ember-500)", color: "var(--color-ink-950)" }}
              >
                {i + 1}
              </span>
              <span>
                <span className="block text-sm font-semibold text-paper-50">{s.t}</span>
                <span className="mt-0.5 block text-sm text-ink-300">{s.d}</span>
              </span>
            </li>
          ))}
        </ol>
      );
    case "callout":
      return (
        <div
          className="rounded-xl border-l-2 px-4 py-3 text-sm leading-relaxed"
          style={{
            borderColor: "var(--color-ember-500)",
            background: "color-mix(in srgb, var(--color-ember-500) 9%, transparent)",
            color: "color-mix(in srgb, var(--color-paper-100) 85%, transparent)",
          }}
        >
          {block.text}
        </div>
      );
    case "code":
      return (
        <pre className="overflow-x-auto rounded-xl border border-ink-700 bg-ink-950 p-4 font-mono text-sm leading-relaxed text-ember-200">
          {block.text}
        </pre>
      );
    case "img":
      return (
        <div className="my-2">
          <ScreenshotFrame
            slot={block.slot}
            alt={block.alt}
            title={block.title ?? block.alt}
          />
        </div>
      );
  }
}
