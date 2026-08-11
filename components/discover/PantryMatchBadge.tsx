import { cn } from "@/utils/helpers";

interface PantryMatchBadgeProps {
  percent: number;
  className?: string;
}

export function PantryMatchBadge({ percent, className }: PantryMatchBadgeProps) {
  const tone =
    percent >= 90
      ? "bg-[var(--brand)] text-white"
      : percent >= 75
        ? "bg-amber-500 text-white"
        : "bg-white/95 text-[var(--brand)]";

  return (
    <span
      className={cn(
        "inline-flex rounded-lg px-2.5 py-1 text-xs font-bold tracking-wide",
        tone,
        className
      )}
    >
      {percent}% MATCH
    </span>
  );
}
