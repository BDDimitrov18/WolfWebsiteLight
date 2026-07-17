"use client";

import { useRef, useState } from "react";
import { asset } from "@/lib/asset";
import { useT } from "@/lib/i18n/LocaleProvider";
import { Container, Section, SheetHeader } from "@/components/ui/Section";
import { CornerMarks } from "@/components/motifs/GeodesyMotifs";

/**
 * The launch film — one order (№ 2417) travelling through the whole
 * system. Self-hosted and strictly click-to-play: with preload="none"
 * and a poster, not a single video byte moves until the visitor asks
 * for it, and no third-party player gets to phone home.
 */
export function Film() {
  const t = useT();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  // play() must stay inside the click handler — it's the user gesture
  // that lets the film start with its sound design audible.
  const start = () => {
    const v = videoRef.current;
    if (!v) return;
    setPlaying(true);
    void v.play();
  };

  return (
    <Section id="film" hud={t("film.eyebrow")} className="relative">
      <Container>
        <SheetHeader label={t("film.eyebrow")} title={t("film.title")} />

        <figure
          className="relative mt-12 overflow-hidden rounded-xl border"
          style={{
            borderColor: "color-mix(in srgb, var(--color-paper-100) 12%, transparent)",
            background: "var(--color-ink-950)",
            boxShadow: "var(--shadow-frame)",
          }}
        >
          <CornerMarks className="text-ink-400" inset={-11} />
          <div className="relative aspect-video w-full">
            <video
              ref={videoRef}
              // v2: the 3:26 cut + the 1:06 orders-scene poster. Bump on
              // re-render — same filenames, browsers cache the old bytes.
              src={asset("/video/wolf-launch.mp4?v=2")}
              poster={asset("/video/wolf-launch-poster.jpg?v=2")}
              preload="none"
              playsInline
              controls={playing}
              onEnded={() => setPlaying(false)}
              className="absolute inset-0 h-full w-full"
              aria-label={t("film.title")}
            />

            {/* Click-to-play cover — gone once the film starts */}
            {!playing && (
              <button
                type="button"
                onClick={start}
                aria-label={t("film.play")}
                className="group absolute inset-0 flex cursor-pointer flex-col items-center justify-center"
              >
                {/* Dim wash so the affordance reads on the bright logo frame */}
                <span
                  aria-hidden
                  className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-60"
                  style={{
                    background:
                      "color-mix(in srgb, var(--color-ink-950) 34%, transparent)",
                  }}
                />
                <span
                  className="relative flex h-20 w-20 items-center justify-center rounded-full border transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: "var(--color-ember-600)",
                    borderColor:
                      "color-mix(in srgb, var(--color-paper-100) 25%, transparent)",
                  }}
                >
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="var(--color-paper-50)" />
                  </svg>
                </span>
                {/* Stacked lines so the label centers exactly on the
                    button's axis — a trailing duration in the same row
                    would push it sideways. Dark pill behind them: the
                    poster is a light app screen, bare text drowns on it. */}
                <span
                  className="relative mt-5 flex flex-col items-center gap-1 rounded-lg px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-paper-50"
                  style={{
                    background:
                      "color-mix(in srgb, var(--color-ink-950) 78%, transparent)",
                  }}
                >
                  {t("film.play")}
                  <span className="text-ink-300">3:26</span>
                </span>
              </button>
            )}
          </div>
        </figure>

        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-300">
          {t("film.caption")}
        </p>
      </Container>
    </Section>
  );
}
