"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";

/** Segmented BG / EN switch. */
export function LanguageToggle({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useLocale();
  const options: { id: "bg" | "en"; label: string }[] = [
    { id: "bg", label: "БГ" },
    { id: "en", label: "EN" },
  ];
  return (
    <div
      className={`relative inline-flex items-center rounded-full border p-0.5 ${className}`}
      style={{
        borderColor: "color-mix(in srgb, var(--color-paper-100) 16%, transparent)",
        background: "color-mix(in srgb, var(--color-paper-100) 5%, transparent)",
      }}
      role="group"
      aria-label="Language"
    >
      {options.map((o) => {
        const active = locale === o.id;
        return (
          <button
            key={o.id}
            type="button"
            onClick={() => setLocale(o.id)}
            aria-pressed={active}
            className="relative z-10 rounded-full px-3 py-1 font-mono text-xs font-medium tracking-wider transition-colors"
            style={{
              color: active ? "var(--color-ink-950)" : "var(--color-ink-300)",
              background: active ? "var(--color-ember-500)" : "transparent",
            }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
