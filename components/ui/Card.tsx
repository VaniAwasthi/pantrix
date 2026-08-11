import { cn } from "@/utils/helpers";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn("surface-panel rounded-2xl p-6", className)}>
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-5">
      <h2 className="font-display text-xl font-semibold text-[var(--brand)]">
        {title}
      </h2>
      {description && (
        <p className="mt-1.5 text-sm text-[var(--muted)]">{description}</p>
      )}
    </div>
  );
}
