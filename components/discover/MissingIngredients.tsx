interface MissingIngredientsProps {
  have: string[];
  missing: string[];
  onAddMissing?: () => void;
}

export function MissingIngredients({
  have,
  missing,
  onAddMissing,
}: MissingIngredientsProps) {
  if (missing.length === 0) return null;

  return (
    <div className="mt-3 space-y-3 border-t border-[var(--line)]/70 pt-3">
      <div>
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--brand-soft)]">
          You have
        </p>
        <ul className="flex flex-wrap gap-1.5">
          {have.map((item) => (
            <li
              key={item}
              className="rounded-lg bg-[var(--brand-glow)] px-2 py-0.5 text-xs font-medium text-[var(--brand)]"
            >
              ✓ {item}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-amber-700">
          Missing
        </p>
        <ul className="flex flex-wrap gap-1.5">
          {missing.map((item) => (
            <li
              key={item}
              className="rounded-lg bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-900"
            >
              + {item}
            </li>
          ))}
        </ul>
      </div>
      {onAddMissing && (
        <button
          type="button"
          onClick={onAddMissing}
          className="text-sm font-semibold text-[var(--brand-soft)] hover:text-[var(--brand)]"
        >
          Add Missing Items to Shopping List
        </button>
      )}
    </div>
  );
}
