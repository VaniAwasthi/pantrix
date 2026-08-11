interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"
      }
    >
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold tracking-wide text-[var(--brand-soft)]">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl font-semibold text-[var(--brand)] sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base text-[var(--muted)] sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
