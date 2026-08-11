import { cn } from "@/utils/helpers";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function AuthInput({
  label,
  error,
  className,
  id,
  ...props
}: AuthInputProps) {
  const inputId = id || props.name || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={inputId}
        className="text-sm font-semibold text-[var(--brand)]"
      >
        {label}
      </label>
      <input
        id={inputId}
        suppressHydrationWarning
        className={cn(
          "h-12 w-full rounded-2xl border border-[var(--line)] bg-[#fcfdfb] px-4 text-[15px] text-[var(--foreground)] placeholder:text-zinc-400 transition-all duration-200",
          "hover:border-[var(--brand-soft)]/40",
          "focus:border-[var(--brand-soft)] focus:outline-none focus:ring-4 focus:ring-[var(--brand-soft)]/15",
          error &&
            "border-red-400 focus:border-red-500 focus:ring-red-500/15",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}
