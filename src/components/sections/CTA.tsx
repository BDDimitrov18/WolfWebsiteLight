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
import { CompassMark, ContourLines } from "@/components/motifs/GeodesyMotifs";

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
    <Section id="contact" hud={t("cta.eyebrow")} className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(160deg, var(--color-ink-800), var(--color-ink-950))",
        }}
      />
      <div
        ref={contourRef}
        aria-hidden
        className="pointer-events-none absolute -bottom-1/3 left-1/2 -z-10 h-[120%] w-[120%] -translate-x-1/2"
      >
        <ContourLines className="h-full w-full text-ink-500 opacity-40" />
      </div>

      <Container>
        <div
          className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border px-7 py-14 text-center sm:px-14"
          style={{
            borderColor: "color-mix(in srgb, var(--color-ember-400) 30%, transparent)",
            background: "color-mix(in srgb, var(--color-ink-900) 70%, transparent)",
            backdropFilter: "blur(6px)",
            boxShadow: "var(--shadow-frame)",
          }}
        >
          <CompassMark
            animated
            className="mx-auto mb-6 h-14 w-14 text-paper-100"
          />
          <Reveal>
            <p className="eyebrow mb-4">{t("cta.eyebrow")}</p>
            <h2
              className="mx-auto max-w-2xl text-balance font-display"
              style={{ fontSize: "var(--fs-h2)", color: "var(--color-paper-50)" }}
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
              className="w-full flex-1 rounded-md border bg-ink-950/60 px-4 py-3 text-sm text-paper-50 placeholder:text-ink-400 focus:border-ember-400"
              style={{ borderColor: "color-mix(in srgb, var(--color-paper-100) 16%, transparent)" }}
            />
            <Magnetic>
              <button type="submit" className="btn btn-primary w-full">
                {sent ? "✓" : t("cta.send")}
              </button>
            </Magnetic>
          </form>

          {/* Direct line — this audience calls before it fills in forms. */}
          <p className="mt-7 text-sm text-ink-300">
            {t("cta.talk")}{" "}
            <a
              href={CONTACT.phoneHref}
              className="font-mono text-paper-50 underline-offset-4 transition-colors hover:text-ember-400 hover:underline"
            >
              {CONTACT.phoneDisplay}
            </a>
            <span className="mx-2 text-ink-500">·</span>
            <a
              href={`mailto:${CONTACT.email}`}
              className="font-mono text-paper-50 underline-offset-4 transition-colors hover:text-ember-400 hover:underline"
            >
              {CONTACT.email}
            </a>
          </p>

          <div className="mt-5 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-6">
            <Link
              href="/docs"
              className="text-sm text-ink-300 underline-offset-4 transition-colors hover:text-paper-50 hover:underline"
            >
              {t("cta.secondary")}
            </Link>
            <Link
              href="/privacy"
              className="font-mono text-xs text-ink-500 underline-offset-4 transition-colors hover:text-paper-50 hover:underline"
            >
              {t("cta.privacy")}
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
