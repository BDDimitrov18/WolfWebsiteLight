"use client";

import { useT } from "@/lib/i18n/LocaleProvider";
import { CONTACT } from "@/lib/contact";
import { Container, Section } from "@/components/ui/Section";

/**
 * The demo-meeting request page (modeled on the owner's reference: a
 * reassuring "no obligation" pitch + a clear booking action). The
 * site is static, so instead of a third-party calendar embed — which
 * would need cookies and break the privacy story — the form composes
 * a pre-filled email and opens the visitor's mail program, exactly as
 * the privacy policy describes.
 */
export function DemoRequest() {
  const t = useT();
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

          {/* ---- The request form ---- */}
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
        </div>
      </Container>
    </Section>
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
