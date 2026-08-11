import type { ReactNode } from "react";
import { cn } from "@/utils/helpers";

interface AuthCheckboxProps {
  id?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  error?: string;
  children: ReactNode;
}

export function AuthCheckbox({
  id = "auth-checkbox",
  checked,
  onChange,
  disabled,
  error,
  children,
}: AuthCheckboxProps) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className={cn(
          "flex cursor-pointer items-start gap-3 rounded-2xl border border-[var(--line)] bg-[#fcfdfb] px-3.5 py-3 transition-colors",
          "hover:border-[var(--brand-soft)]/40",
          checked && "border-[var(--brand-soft)]/50 bg-[var(--brand-glow)]/35",
          error && "border-red-400",
          disabled && "cursor-not-allowed opacity-60"
        )}
      >
        <input
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-[var(--line)] text-[var(--brand)] accent-[var(--brand)] focus:ring-[var(--brand-soft)]/30"
        />
        <span className="text-sm leading-snug text-[var(--muted)]">
          {children}
        </span>
      </label>
      {error && <p className="text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}
