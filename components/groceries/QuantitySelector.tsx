import { cn } from "@/utils/helpers";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  step?: number;
  disabled?: boolean;
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  step = 1,
  disabled,
}: QuantitySelectorProps) {
  return (
    <div className="inline-flex items-center rounded-xl border border-[var(--line)] bg-white">
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={disabled || value <= min}
        onClick={() => onChange(Math.max(min, value - step))}
        className="flex h-9 w-9 items-center justify-center text-lg font-semibold text-[var(--brand)] transition-colors hover:bg-[var(--brand-glow)] disabled:opacity-40"
      >
        −
      </button>
      <span className="min-w-[2rem] text-center text-sm font-semibold text-[var(--brand)]">
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={disabled}
        onClick={() => onChange(value + step)}
        className="flex h-9 w-9 items-center justify-center text-lg font-semibold text-[var(--brand)] transition-colors hover:bg-[var(--brand-glow)] disabled:opacity-40"
      >
        +
      </button>
    </div>
  );
}
