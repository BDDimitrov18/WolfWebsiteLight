"use client";

import { useEffect, useState } from "react";
import { useT } from "@/lib/i18n/LocaleProvider";
import { CONTACT } from "@/lib/contact";
import { CALENDAR_URL } from "@/lib/booking";
import { Container, Section } from "@/components/ui/Section";

/**
 * The demo-meeting request page: reassuring "no obligation" pitch +
 * the booking action. When CALENDAR_URL is configured, the primary
 * action is a Google Calendar appointment embed — loaded ONLY after
 * an explicit click (it sets Google cookies; the privacy policy
 * documents this), with the email form as the fallback below. Until
 * then, the form is the primary action.
 */
export function DemoRequest() {
  const t = useT();
  const [calOpen, setCalOpen] = useState(false);

  // A visitor who already chose to load the calendar once shouldn't
  // have to re-consent on every visit.
  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot post-mount storage read, intentional
      if (localStorage.getItem("wolf.calendar-ok") === "1") setCalOpen(true);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const loadCalendar = () => {
    try {
      localStorage.setItem("wolf.calendar-ok", "1");
    } catch {
      /* best effort */
    }
    setCalOpen(true);
  };
  const muted = "color-mix(in srgb, var(--color-paper-100) 84%, transparent)";
  const inputCls =
    "w-full rounded-md border bg-ink-950 px-3 py-2.5 text-sm text-paper-50 placeholder:text-ink-400";

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const val = (k: string) => String(fd.get(k) ?? "").trim();
    const lines = [
      `${t("demoPage.fName")}: ${val("name")}`,
      `${t("demoPage.fPractice")}: ${val("practice") || "—"}`,
      `${t("demoPage.fEmail")}: ${val("email")}`,
      `${t("demoPage.fPhone")}: ${val("phone") || "—"}`,
      `${t("demoPage.fTeam")}: ${val("team") || "—"}`,
      `${t("demoPage.fWhen")}: ${val("when") || "—"}`,
      "",
      val("message"),
    ];
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      t("demoPage.subject"),
    )}&body=${encodeURIComponent(lines.join("\n"))}`;
  };

  return (
    <Section hud={t("demoPage.eyebrow")}>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          {/* ---- The pitch ---- */}
          <div>
            <p className="eyebrow mb-4">{t("demoPage.eyebrow")}</p>
            <h1
              className="text-balance uppercase"
              style={{
                fontSize: "var(--fs-h2)",
                letterSpacing: "0.04em",
                color: "var(--color-paper-50)",
              }}
            >
              {t("demoPage.title")}
            </h1>
            <p className="mt-5 text-pretty lead" style={{ color: muted }}>
              {t("demoPage.lead")}
            </p>

            <ul className="mt-8 space-y-4">
              {t<string[]>("demoPage.points").map((p, i) => (
                <li key={p} className="flex items-baseline gap-4">
                  <span className="flex-none font-mono text-xs text-ember-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="leading-relaxed" style={{ color: muted }}>
                    {p}
                  </p>
                </li>
              ))}
            </ul>

            {/* Direct alternative — some people just want to call. */}
            <div className="mt-10 border-t pt-6">
              <p className="text-sm" style={{ color: muted }}>
                {t("demoPage.talk")}
              </p>
              <p className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-1 font-mono text-sm">
                <a href={CONTACT.phoneHref} className="text-paper-50 underline-offset-4 hover:underline">
                  {CONTACT.phoneDisplay}
                </a>
                <a href={`mailto:${CONTACT.email}`} className="text-paper-50 underline-offset-4 hover:underline">
                  {CONTACT.email}
                </a>
              </p>
            </div>
          </div>

          {/* ---- Booking: calendar when configured, else the form ---- */}
          {CALENDAR_URL ? (
            <div className="h-fit overflow-hidden rounded-xl border bg-ink-900 shadow-ambient">
              {calOpen ? (
                <iframe
                  src={CALENDAR_URL}
                  title={t("demoPage.calTitle")}
                  className="h-[680px] w-full border-0 bg-white"
                />
              ) : (
                <div className="flex min-h-[420px] flex-col items-center justify-center gap-5 p-8 text-center">
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-ember-400">
                    {t("demoPage.calTitle")}
                  </p>
                  <p
                    className="max-w-sm text-sm leading-relaxed"
                    style={{
                      color: "color-mix(in srgb, var(--color-paper-100) 82%, transparent)",
                    }}
                  >
                    {t("demoPage.calNote")}
                  </p>
                  <button type="button" onClick={loadCalendar} className="btn btn-primary">
                    {t("demoPage.calLoad")}
                  </button>
                  <a
                    href={CALENDAR_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-ink-300 underline underline-offset-4 transition-colors hover:text-paper-50"
                  >
                    {t("demoPage.calOpenTab")} ↗
                  </a>
                </div>
              )}
            </div>
          ) : (
            <DemoForm t={t} inputCls={inputCls} onSubmit={onSubmit} />
          )}
        </div>

        {/* With the calendar as primary, the form stays available as
            the email fallback. */}
        {CALENDAR_URL ? (
          <details className="mt-12">
            <summary className="cursor-pointer font-mono text-sm uppercase tracking-[0.14em] text-ink-300 transition-colors hover:text-paper-50">
              {t("demoPage.altForm")}
            </summary>
            <div className="mt-6 max-w-2xl">
              <DemoForm t={t} inputCls={inputCls} onSubmit={onSubmit} />
            </div>
          </details>
        ) : null}
      </Container>
    </Section>
  );
}

function DemoForm({
  t,
  inputCls,
  onSubmit,
}: {
  t: ReturnType<typeof useT>;
  inputCls: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
          <form
            onSubmit={onSubmit}
            className="h-fit rounded-xl border bg-ink-900 p-6 shadow-ambient sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={t("demoPage.fName")} required>
                <input name="name" required autoComplete="name" className={inputCls} />
              </Field>
              <Field label={t("demoPage.fPractice")}>
                <input name="practice" autoComplete="organization" className={inputCls} />
              </Field>
              <Field label={t("demoPage.fEmail")} required>
                <input name="email" type="email" required autoComplete="email" className={inputCls} />
              </Field>
              <Field label={t("demoPage.fPhone")}>
                <input name="phone" type="tel" autoComplete="tel" className={inputCls} />
              </Field>
              <Field label={t("demoPage.fTeam")}>
                <select name="team" defaultValue="" className={inputCls}>
                  <option value="">{t("demoPage.select")}</option>
                  {t<string[]>("demoPage.teamOptions").map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label={t("demoPage.fWhen")}>
                <select name="when" defaultValue="" className={inputCls}>
                  <option value="">{t("demoPage.select")}</option>
                  {t<string[]>("demoPage.whenOptions").map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="mt-4">
              <Field label={t("demoPage.fMessage")}>
                <textarea name="message" rows={4} className={`${inputCls} resize-y`} />
              </Field>
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button type="submit" className="btn btn-primary">
                {t("demoPage.submit")}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <p className="max-w-xs text-xs leading-relaxed text-ink-300">
                {t("demoPage.note")}
              </p>
            </div>
          </form>
  );
}

function Field({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline gap-1 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-300">
        {label}
        {required && <span className="text-ember-400">*</span>}
      </span>
      {children}
    </label>
  );
}
