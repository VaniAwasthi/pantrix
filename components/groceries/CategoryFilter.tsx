import { cn } from "@/utils/helpers";
import type { GroceryCategory } from "./groceries-data";

interface CategoryFilterProps {
  categories: { id: GroceryCategory; label: string }[];
  active: GroceryCategory;
  onChange: (id: GroceryCategory) => void;
}

export function CategoryFilter({
  categories,
  active,
  onChange,
}: CategoryFilterProps) {
  return (
    <div
      className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      role="tablist"
      aria-label="Ingredient categories"
    >
      {categories.map((category) => {
        const selected = category.id === active;
        return (
          <button
            key={category.id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(category.id)}
            className={cn(
              "shrink-0 rounded-2xl px-4 py-2.5 text-sm font-semibold transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-soft)]",
              selected
                ? "bg-[var(--brand)] text-white shadow-sm"
                : "bg-white text-[var(--muted)] ring-1 ring-[var(--line)] hover:text-[var(--brand)]"
            )}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
}
