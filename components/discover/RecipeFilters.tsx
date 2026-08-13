"use client";

import { cn } from "@/utils/helpers";
import {
  mealFilters,
  type CalorieFilter,
  type CookingTimeFilter,
  type CuisineFilter,
  type DietFilter,
  type DifficultyFilter,
  type MatchPercentFilter,
  type MealFilter,
  type RecipeExtraFilters,
} from "./discover-data";

interface RecipeFiltersProps {
  activeMeal: MealFilter;
  onMealChange: (meal: MealFilter) => void;
  extra: RecipeExtraFilters;
  onExtraChange: (next: RecipeExtraFilters) => void;
}

const selectClass =
  "h-10 shrink-0 cursor-pointer appearance-none rounded-2xl bg-white py-2 pl-3.5 pr-8 text-sm font-medium text-[var(--muted)] ring-1 ring-[var(--line)] transition-colors hover:text-[var(--brand)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-soft)]";

export function RecipeFilters({
  activeMeal,
  onMealChange,
  extra,
  onExtraChange,
}: RecipeFiltersProps) {
  function patch<K extends keyof RecipeExtraFilters>(
    key: K,
    value: RecipeExtraFilters[K]
  ) {
    onExtraChange({ ...extra, [key]: value });
  }

  const activeSelect = (isActive: boolean) =>
    cn(
      selectClass,
      isActive && "bg-[var(--brand-glow)] font-semibold text-[var(--brand)]"
    );

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
        <FilterSelect
          label="Cooking time"
          value={extra.cookingTime}
          active={extra.cookingTime !== "any"}
          className={activeSelect(extra.cookingTime !== "any")}
          onChange={(value) => patch("cookingTime", value as CookingTimeFilter)}
          options={[
            { value: "any", label: "Cooking time" },
            { value: "under-15", label: "Under 15 min" },
            { value: "15-30", label: "15–30 min" },
            { value: "30-60", label: "30–60 min" },
          ]}
        />
        <FilterSelect
          label="Cuisine"
          value={extra.cuisine}
          active={extra.cuisine !== "any"}
          className={activeSelect(extra.cuisine !== "any")}
          onChange={(value) => patch("cuisine", value as CuisineFilter)}
          options={[
            { value: "any", label: "Cuisine" },
            { value: "indian", label: "Indian" },
            { value: "asian", label: "Asian" },
          ]}
        />
        <FilterSelect
          label="Diet"
          value={extra.diet}
          active={extra.diet !== "any"}
          className={activeSelect(extra.diet !== "any")}
          onChange={(value) => patch("diet", value as DietFilter)}
          options={[
            { value: "any", label: "Diet" },
            { value: "vegetarian", label: "Vegetarian" },
            { value: "vegan", label: "Vegan" },
            { value: "eggetarian", label: "Eggetarian" },
            { value: "non-vegetarian", label: "Non-veg" },
          ]}
        />
        <FilterSelect
          label="Calories"
          value={extra.calories}
          active={extra.calories !== "any"}
          className={activeSelect(extra.calories !== "any")}
          onChange={(value) => patch("calories", value as CalorieFilter)}
          options={[
            { value: "any", label: "Calories" },
            { value: "under-200", label: "Under 200 kcal" },
            { value: "under-300", label: "Under 300 kcal" },
            { value: "under-400", label: "Under 400 kcal" },
          ]}
        />
        <FilterSelect
          label="Difficulty"
          value={extra.difficulty}
          active={extra.difficulty !== "any"}
          className={activeSelect(extra.difficulty !== "any")}
          onChange={(value) => patch("difficulty", value as DifficultyFilter)}
          options={[
            { value: "any", label: "Difficulty" },
            { value: "Easy", label: "Easy" },
            { value: "Medium", label: "Medium" },
            { value: "Hard", label: "Hard" },
          ]}
        />
        <FilterSelect
          label="Match %"
          value={extra.matchPercent}
          active={extra.matchPercent !== "any"}
          className={activeSelect(extra.matchPercent !== "any")}
          onChange={(value) =>
            patch("matchPercent", value as MatchPercentFilter)
          }
          options={[
            { value: "any", label: "Match %" },
            { value: "70", label: "70%+ match" },
            { value: "80", label: "80%+ match" },
            { value: "90", label: "90%+ match" },
            { value: "100", label: "100% match" },
          ]}
        />
      </div>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  active,
  className,
  onChange,
  options,
}: {
  label: string;
  value: string;
  active: boolean;
  className: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="relative shrink-0">
      <label className="sr-only">{label}</label>
      <select
        value={value}
        aria-label={label}
        onChange={(e) => onChange(e.target.value)}
        className={className}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span
        aria-hidden
        className={`pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] ${
          active ? "text-[var(--brand)]" : "text-[var(--muted)]"
        }`}
      >
        ▾
      </span>
    </div>
  );
}
