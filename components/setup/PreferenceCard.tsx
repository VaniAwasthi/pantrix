import { cn } from "@/utils/helpers";

interface PreferenceCardProps {
  emoji: string;
  label: string;
  selected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function PreferenceCard({
  emoji,
  label,
  selected,
  onClick,
  disabled,
  className,
}: PreferenceCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={cn(
        "inline-flex items-center gap-2.5 rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-soft)] focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-60",
        selected
          ? "border-[var(--brand)] bg-[var(--brand)] text-white shadow-sm"
          : "border-[var(--line)] bg-white text-[var(--brand)] hover:border-[var(--brand-soft)] hover:bg-[var(--brand-glow)]/40",
        className
      )}
    >
      <span className="text-lg" aria-hidden>
        {emoji}
      </span>
      <span>{label}</span>
    </button>
  );
}
