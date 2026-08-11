import { cn } from "@/utils/helpers";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  const inputId = id || props.name;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-semibold text-[var(--brand)]"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          "rounded-xl border border-[var(--line)] bg-white/90 px-3.5 py-2.5 text-sm text-[var(--foreground)] placeholder:text-zinc-400 transition-shadow focus:border-[var(--brand-soft)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-soft)]/20",
          error && "border-red-400 focus:border-red-500 focus:ring-red-500/20",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function Select({
  label,
  error,
  options,
  className,
  id,
  ...props
}: SelectProps) {
  const selectId = id || props.name;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={selectId}
          className="text-sm font-semibold text-[var(--brand)]"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={cn(
          "rounded-xl border border-[var(--line)] bg-white/90 px-3.5 py-2.5 text-sm text-[var(--foreground)] focus:border-[var(--brand-soft)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-soft)]/20",
          error && "border-red-400",
          className
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
