import { cn } from "@/utils/helpers";

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export function PrimaryButton({
  className,
  loading,
  disabled,
  children,
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[var(--brand)] px-6 text-sm font-semibold text-white shadow-sm shadow-[var(--brand)]/20 transition-all duration-200",
        "hover:bg-[var(--brand-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-soft)] focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.98]",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  );
}
