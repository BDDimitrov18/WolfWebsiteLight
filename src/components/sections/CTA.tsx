"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { sendGAEvent } from "@next/third-parties/google";
import { gsap } from "@/lib/gsap";
import { GA_ID } from "@/lib/analytics";
import { CONTACT } from "@/lib/contact";
import { useT } from "@/lib/i18n/LocaleProvider";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import {
  CompassMark,
  ContourLines,
  CornerMarks,
  SheetStamp,
} from "@/components/motifs/GeodesyMotifs";

/**
 * The request form. The demo ask, drafted as the official blank at the
 * bottom of the sheet: a corner-marked paper plate, an ink stamp over
 * its edge, contour lines drawn faintly into the paper behind it.
 */
export function CTA() {
  const t = useT();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const contourRef = useRef<HTMLDivElement>(null);

  // Contours drift upward slowly as the section scrolls through.
  useEffect(() => {
    const el = contourRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: 12 },
        {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // The one conversion that matters on this site.
    if (GA_ID) sendGAEvent("event", "demo_request", { location: "cta" });
    // No backend — hand off to the mail client so the demo CTA works.
    const subject = encodeURIComponent("Wolf — demo request");
    const body = encodeURIComponent(`Email: ${email}`);
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <Section id="contact" hud={t("cta.eyebrow")} className="register-paper relative overflow-hidden">
      <div
        ref={contourRef}
        aria-hidden
        className="pointer-events-none absolute -bottom-1/3 left-1/2 h-[120%] w-[120%] -translate-x-1/2"
      >
        <ContourLines className="h-full w-full text-ink-700 opacity-[0.14]" />
      </div>

      <Container className="relative">
        <div className="relative mx-auto max-w-4xl border bg-paper-50 px-7 py-14 text-center shadow-sheet sm:px-14">
          {/* top-right cross omitted — the stamp lands there */}
          <CornerMarks className="text-ember-700" corners={["tl", "bl", "br"]} />
          {/* The stamp: red ink, slightly off-square, over the plate's edge */}
          <SheetStamp
            ring={t("cta.stampRing")}
            center={t("cta.stampCenter")}
            className="absolute -right-3 -top-8 h-24 w-24 -rotate-12 text-ember-800/60 sm:-right-6 sm:h-28 sm:w-28"
          />
          <CompassMark
            animated
            className="mx-auto mb-6 h-14 w-14 text-ink-800"
          />
          <Reveal>
            <p className="eyebrow mb-4">{t("cta.eyebrow")}</p>
            <h2
              className="mx-auto max-w-2xl text-balance font-display"
              style={{ fontSize: "var(--fs-h2)" }}
            >
              {t("cta.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty lead">
              {t("cta.body")}
            </p>
          </Reveal>

          <form
            onSubmit={onSubmit}
            className="mx-auto mt-9 flex w-full max-w-md flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="cta-email" className="sr-only">
              {t("cta.emailLabel")}
            </label>
            <input
              id="cta-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("cta.emailPlaceholder")}
              className="w-full flex-1 border bg-white px-4 py-3 text-sm text-ink-900 transition-colors placeholder:text-ink-500 focus:border-ember-700"
              style={{
                borderColor:
                  "color-mix(in srgb, var(--color-ink-700) 55%, transparent)",
              }}
            />
            <Magnetic>
              <button type="submit" className="btn btn-primary w-full">
                {sent ? "✓" : t("cta.send")}
              </button>
            </Magnetic>
          </form>

          {/* Direct line — this audience calls before it fills in forms. */}
          <p
            className="mt-7 text-sm"
            style={{
              color: "color-mix(in srgb, var(--color-ink-800) 80%, transparent)",
            }}
          >
            {t("cta.talk")}{" "}
            <a
              href={CONTACT.phoneHref}
              className="font-mono text-ink-900 underline-offset-4 transition-colors hover:text-ember-700 hover:underline"
            >
              {CONTACT.phoneDisplay}
            </a>
            <span className="mx-2" aria-hidden>
              ·
            </span>
            <a
              href={`mailto:${CONTACT.email}`}
              className="font-mono text-ink-900 underline-offset-4 transition-colors hover:text-ember-700 hover:underline"
            >
              {CONTACT.email}
            </a>
          </p>

          <div className="mt-5 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-6">
            <Link
              href="/docs"
              className="text-sm underline-offset-4 transition-colors hover:text-ink-950 hover:underline"
              style={{
                color:
                  "color-mix(in srgb, var(--color-ink-800) 85%, transparent)",
              }}
            >
              {t("cta.secondary")}
            </Link>
            <Link
              href="/privacy"
              className="font-mono text-xs underline underline-offset-4 transition-colors hover:text-ink-950"
              style={{
                color:
                  "color-mix(in srgb, var(--color-ink-800) 75%, transparent)",
              }}
            >
              {t("cta.privacy")}
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
