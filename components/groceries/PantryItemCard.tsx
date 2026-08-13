import { QuantitySelector } from "./QuantitySelector";
import type { PantryGroceryItem } from "./groceries-data";
import {
  formatExpiryLabel,
  getExpiryStatus,
} from "@/utils/helpers";

interface PantryItemCardProps {
  item: PantryGroceryItem;
  onQuantityChange: (id: string, quantity: number) => void;
  onExpiryChange: (id: string, expiryDate: string) => void;
  onRemove: (id: string) => void;
}

export function PantryItemCard({
  item,
  onQuantityChange,
  onExpiryChange,
  onRemove,
}: PantryItemCardProps) {
  const status = getExpiryStatus(item.expiryDate);
  const statusClass =
    status === "expired"
      ? "text-red-600"
      : status === "expiring-soon"
        ? "text-amber-700"
        : "text-[var(--muted)]";

  return (
    <article className="flex items-start gap-3 rounded-2xl border border-[var(--line)] bg-white p-4 shadow-sm">
      <span
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--brand-glow)] text-2xl"
        aria-hidden
      >
        {item.emoji}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-[var(--brand)]">{item.name}</h3>
            <p className="mt-0.5 text-sm text-[var(--muted)]">
              {item.quantity} {item.unit}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            aria-label={`Remove ${item.name}`}
            className="rounded-lg px-2 py-1 text-lg leading-none text-[var(--muted)] transition-colors hover:bg-red-50 hover:text-red-600"
          >
            ×
          </button>
        </div>

        <div className="mt-3">
          <QuantitySelector
            value={item.quantity}
            onChange={(qty) => onQuantityChange(item.id, qty)}
            step={item.unit === "g" || item.unit === "ml" ? 50 : 1}
            min={item.unit === "g" || item.unit === "ml" ? 50 : 1}
          />
        </div>

        <label className="mt-3 flex flex-col gap-1.5 text-xs font-semibold text-[var(--brand)]">
          Expiry date
          <input
            type="date"
            value={item.expiryDate}
            onChange={(e) => onExpiryChange(item.id, e.target.value)}
            className="h-10 w-full rounded-xl border border-[var(--line)] bg-[#fcfdfb] px-3 text-sm font-normal text-[var(--foreground)] focus:border-[var(--brand-soft)] focus:outline-none focus:ring-4 focus:ring-[var(--brand-soft)]/15"
          />
          <span className={`font-medium ${statusClass}`}>
            {formatExpiryLabel(item.expiryDate)}
          </span>
        </label>
      </div>
    </article>
  );
}
