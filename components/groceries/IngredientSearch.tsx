interface IngredientSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hint?: string;
}

export function IngredientSearch({
  value,
  onChange,
  placeholder = "Search ingredients...",
  hint = "Try tomato, rice, paneer...",
}: IngredientSearchProps) {
  return (
    <div>
      <label htmlFor="ingredient-search" className="sr-only">
        Search ingredients
      </label>
      <div className="relative">
        <span
          className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-[var(--muted)]"
          aria-hidden
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path
              d="M20 20l-3.5-3.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <input
          id="ingredient-search"
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-14 w-full rounded-2xl border border-[var(--line)] bg-white pl-12 pr-4 text-[15px] text-[var(--foreground)] shadow-sm placeholder:text-zinc-400 transition-shadow focus:border-[var(--brand-soft)] focus:outline-none focus:ring-4 focus:ring-[var(--brand-soft)]/15"
        />
      </div>
      <p className="mt-2 text-sm text-[var(--muted)]">{hint}</p>
    </div>
  );
}
