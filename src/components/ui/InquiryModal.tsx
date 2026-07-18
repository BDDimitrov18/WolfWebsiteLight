"use client";

import { useEffect, useRef } from "react";
import { useT } from "@/lib/i18n/LocaleProvider";
import { CONTACT } from "@/lib/contact";
import { track } from "@/lib/track";

/**
 * Inquiry dialog (owner reference: a classic contact modal, redrawn in
 * the site's drafting grammar). The site is static — on submit the
 * form composes a pre-filled email and opens the visitor's mail
 * program, exactly as the privacy policy describes. Nothing is sent
 * automatically.
 */
export function InquiryModal({ onClose }: { onClose: () => void }) {
  const t = useT();
  const panelRef = useRef<HTMLDivElement>(null);

  // Esc closes; page behind must not scroll.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const val = (k: string) => String(fd.get(k) ?? "").trim();
    const lines = [
      `${t("inquiry.name")}: ${val("name")} ${val("lastName")}`.trim(),
      `${t("inquiry.email")}: ${val("email")}`,
      `${t("inquiry.phone")}: ${val("phone") || "—"}`,
      `${t("inquiry.team")}: ${val("team") || "—"}`,
      "",
      val("message"),
    ];
    track("inquiry_submit");
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      t("inquiry.subject"),
    )}&body=${encodeURIComponent(lines.join("\n"))}`;
    onClose();
  };

  const inputCls =
    "w-full rounded-md border bg-ink-950 px-3 py-2.5 text-sm text-paper-50 placeholder:text-ink-400";

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center overflow-y-auto p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background: "color-mix(in srgb, var(--color-ink-950) 78%, transparent)",
          backdropFilter: "blur(6px)",
        }}
        onClick={onClose}
        aria-hidden
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="relative my-auto w-full max-w-2xl rounded-xl border bg-ink-900 p-6 shadow-ambient sm:p-8"
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="eyebrow mb-2">{t("inquiry.eyebrow")}</p>
            <h2 id="inquiry-title" className="text-xl text-paper-50 sm:text-2xl">
              {t("inquiry.title")}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("inquiry.close")}
            className="flex h-9 w-9 flex-none items-center justify-center rounded-md border border-ink-600 text-ink-300 transition-colors hover:text-paper-50"
          >
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="mt-7">
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label={t("inquiry.name")} required>
              <input name="name" required autoComplete="given-name" className={inputCls} />
            </Field>
            <Field label={t("inquiry.lastName")}>
              <input name="lastName" autoComplete="family-name" className={inputCls} />
            </Field>
            <Field label={t("inquiry.email")} required>
              <input name="email" type="email" required autoComplete="email" className={inputCls} />
            </Field>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label={t("inquiry.phone")}>
              <input name="phone" type="tel" autoComplete="tel" className={inputCls} />
            </Field>
            <Field label={t("inquiry.team")}>
              <select name="team" defaultValue="" className={inputCls}>
                <option value="">{t("inquiry.teamPlaceholder")}</option>
                {t<string[]>("inquiry.teamOptions").map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="mt-4">
            <Field label={t("inquiry.message")} required>
              <textarea name="message" required rows={5} className={`${inputCls} resize-y`} />
            </Field>
          </div>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button type="submit" className="btn btn-primary">
              {t("inquiry.submit")}
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
              {t("inquiry.note")}
            </p>
          </div>
        </form>
      </div>
    </div>
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
