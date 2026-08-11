import { cn } from "@/utils/helpers";

interface IngredientChipProps {
  label: string;
  emoji?: string;
  selected?: boolean;
  onClick?: () => void;
  removable?: boolean;
  disabled?: boolean;
}

export function IngredientChip({
  label,
  emoji,
  selected,
  onClick,
  removable,
  disabled,
}: IngredientChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-2xl border px-3.5 py-2 text-sm font-semibold transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-soft)] focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-60",
        selected
          ? "border-[var(--brand)] bg-[var(--brand)] text-white shadow-sm"
          : "border-[var(--line)] bg-white text-[var(--brand)] hover:border-[var(--brand-soft)] hover:bg-[var(--brand-glow)]/50"
      )}
    >
      {emoji && <span aria-hidden>{emoji}</span>}
      <span>{label}</span>
      {removable && selected && (
        <span className="ml-0.5 text-white/80" aria-hidden>
          ×
        </span>
      )}
    </button>
  );
}
