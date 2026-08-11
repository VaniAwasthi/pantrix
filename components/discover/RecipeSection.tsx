import type { ReactNode } from "react";

interface RecipeSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function RecipeSection({
  title,
  description,
  children,
}: RecipeSectionProps) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="font-display text-2xl font-semibold text-[var(--brand)]">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm text-[var(--muted)]">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}
