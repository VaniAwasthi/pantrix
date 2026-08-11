import { cn } from "@/utils/helpers";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const variants = {
  primary:
    "bg-[var(--brand)] text-white shadow-sm shadow-[var(--brand)]/20 hover:bg-[var(--brand-soft)] focus-visible:ring-[var(--brand-soft)]",
  secondary:
    "bg-white/90 text-[var(--brand)] border border-[var(--line)] hover:border-[var(--brand-soft)] hover:bg-[var(--brand-glow)] focus-visible:ring-[var(--brand-soft)]",
  ghost:
    "text-[var(--brand-soft)] hover:bg-[var(--brand-glow)] focus-visible:ring-[var(--brand-soft)]",
  danger:
    "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  loading,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.98]",
        variants[variant],
        sizes[size],
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
