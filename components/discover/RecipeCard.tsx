"use client";

import { FavouriteButton } from "./FavouriteButton";
import { MissingIngredients } from "./MissingIngredients";
import { PantryMatchBadge } from "./PantryMatchBadge";
import type { MockRecipe } from "./discover-data";

interface RecipeCardProps {
  recipe: MockRecipe;
  onToggleFavourite?: (id: string) => void;
  onAddMissing?: (id: string) => void;
}

export function RecipeCard({
  recipe,
  onToggleFavourite,
  onAddMissing,
}: RecipeCardProps) {
  return (
    <article className="overflow-hidden rounded-[1.5rem] border border-[var(--line)] bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[var(--brand)]/10">
      <div
        className={`relative flex h-40 items-end bg-gradient-to-br ${recipe.imageGradient} p-4`}
      >
        <PantryMatchBadge percent={recipe.matchPercent} />
        <div className="absolute right-3 top-3">
          <FavouriteButton
            active={recipe.favourite}
            onToggle={() => onToggleFavourite?.(recipe.id)}
          />
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-xl font-semibold text-[var(--brand)]">
            {recipe.title}
          </h3>
          <span className="shrink-0 text-sm font-medium text-amber-700">
            ★ {recipe.rating.toFixed(1)}
          </span>
        </div>

        <p className="mt-2 text-sm text-[var(--muted)]">
          {recipe.cookTimeMin} min · {recipe.difficulty} · {recipe.calories}{" "}
          kcal · {recipe.cuisine}
        </p>

        {recipe.missing.length === 0 ? (
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {recipe.have.slice(0, 4).map((item) => (
              <li
                key={item}
                className="rounded-lg bg-[var(--brand-glow)] px-2 py-0.5 text-xs font-medium text-[var(--brand)]"
              >
                ✓ {item}
              </li>
            ))}
          </ul>
        ) : (
          <MissingIngredients
            have={recipe.have}
            missing={recipe.missing}
            onAddMissing={() => onAddMissing?.(recipe.id)}
          />
        )}
      </div>
    </article>
  );
}
