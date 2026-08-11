interface PantrySummaryProps {
  count: number;
}

export function PantrySummary({ count }: PantrySummaryProps) {
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--brand-glow)]/50 px-5 py-4 text-center sm:text-left">
      <p className="font-display text-xl font-semibold text-[var(--brand)]">
        {count} ingredient{count === 1 ? "" : "s"} added
      </p>
      <p className="mt-1 text-sm text-[var(--muted)]">
        {count === 0
          ? "Start adding ingredients to build your smart pantry."
          : "Your pantry is already looking delicious. 🍳"}
      </p>
    </div>
  );
}
