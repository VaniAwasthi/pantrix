"use client";

import { cn } from "@/utils/helpers";

interface FavouriteButtonProps {
  active?: boolean;
  onToggle?: () => void;
  className?: string;
}

export function FavouriteButton({
  active,
  onToggle,
  className,
}: FavouriteButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? "Remove from favourites" : "Add to favourites"}
      onClick={onToggle}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-lg shadow-sm transition-colors",
        "hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-soft)]",
        active ? "text-rose-500" : "text-[var(--muted)]",
        className
      )}
    >
      {active ? "♥" : "♡"}
    </button>
  );
}
