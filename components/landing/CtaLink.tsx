import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/utils/helpers";

/** Link styled like primary/secondary Button — avoids button nested in anchor */
export function CtaLink({
  href,
  children,
  variant = "primary",
  size = "lg",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const variants = {
    primary:
      "bg-[var(--brand)] text-white shadow-sm shadow-[var(--brand)]/20 hover:bg-[var(--brand-soft)]",
    secondary:
      "bg-white/90 text-[var(--brand)] border border-[var(--line)] hover:border-[var(--brand-soft)] hover:bg-[var(--brand-glow)]",
    ghost: "text-[var(--brand-soft)] hover:bg-[var(--brand-glow)]",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const isHash = href.startsWith("#");
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-soft)] focus-visible:ring-offset-2 active:scale-[0.98]",
    variants[variant],
    sizes[size],
    className
  );

  if (isHash) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
