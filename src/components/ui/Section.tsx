import type { ReactNode } from "react";

/** Standard horizontal container. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}

/** A vertical section with consistent rhythm and optional id anchor. */
export function Section({
  children,
  id,
  className = "",
}: {
  children: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-24 py-24 sm:py-28 lg:py-36 ${className}`}
    >
      {children}
    </section>
  );
}

/** Section header: mono eyebrow + display heading + lead. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "light",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
}) {
  const headColor =
    tone === "light" ? "var(--color-paper-50)" : "var(--color-ink-900)";
  const subColor =
    tone === "light"
      ? "color-mix(in srgb, var(--color-paper-100) 70%, transparent)"
      : "color-mix(in srgb, var(--color-ink-700) 78%, transparent)";
  return (
    <div
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && (
        <p
          className={`eyebrow mb-4 flex items-center gap-3 ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          <span className="inline-block h-px w-8 bg-current opacity-60" />
          {eyebrow}
        </p>
      )}
      <h2
        className="text-balance"
        style={{ fontSize: "var(--fs-h2)", color: headColor }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-pretty lead" style={{ color: subColor }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
