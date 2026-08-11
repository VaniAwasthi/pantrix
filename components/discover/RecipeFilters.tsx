"use client";

import { cn } from "@/utils/helpers";
import { mealFilters, extraFilters, type MealFilter } from "./discover-data";

interface RecipeFiltersProps {
  activeMeal: MealFilter;
  onMealChange: (meal: MealFilter) => void;
}

export function RecipeFilters({
  activeMeal,
  onMealChange,
}: RecipeFiltersProps) {
  return (
    <div className="space-y-3">
      <div
        className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Meal filters"
      >
        {mealFilters.map((filter) => {
          const selected = filter.id === activeMeal;
          return (
            <button
              key={filter.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => onMealChange(filter.id)}
              className={cn(
                "shrink-0 rounded-2xl px-4 py-2.5 text-sm font-semibold transition-all",
                selected
                  ? "bg-[var(--brand)] text-white shadow-sm"
                  : "bg-white text-[var(--muted)] ring-1 ring-[var(--line)] hover:text-[var(--brand)]"
              )}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {extraFilters.map((filter) => (
          <button
            key={filter}
            type="button"
            className="shrink-0 rounded-2xl bg-white px-3.5 py-2 text-sm font-medium text-[var(--muted)] ring-1 ring-[var(--line)] transition-colors hover:text-[var(--brand)]"
          >
            {filter} ▾
          </button>
        ))}
      </div>
    </div>
  );
}
