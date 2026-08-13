"use client";

import Link from "next/link";
import { FavouriteButton } from "./FavouriteButton";
import { MissingIngredients } from "./MissingIngredients";
import { PantryMatchBadge } from "./PantryMatchBadge";
import type { MatchedRecipe } from "@/lib/matchDiscoverRecipes";

interface RecipeCardProps {
  recipe: MatchedRecipe;
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
      <Link href={`/recipes/${recipe.id}`} className="block">
        <div
          className={`relative flex h-40 items-end bg-gradient-to-br ${recipe.imageGradient} p-4`}
        >
          <PantryMatchBadge percent={recipe.matchPercent} />
          <div
            className="absolute right-3 top-3"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <FavouriteButton
              active={recipe.favourite}
              onToggle={() => onToggleFavourite?.(recipe.id)}
            />
          </div>
        </div>
      </Link>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/recipes/${recipe.id}`}>
            <h3 className="font-display text-xl font-semibold text-[var(--brand)]">
              {recipe.title}
            </h3>
          </Link>
          <span className="shrink-0 text-sm font-medium text-amber-700">
            ★ {recipe.rating.toFixed(1)}
          </span>
        </div>

        <p className="mt-2 text-sm text-[var(--muted)]">
          {recipe.cookTimeMin} min · {recipe.difficulty} · {recipe.calories}{" "}
          kcal · {recipe.cuisine}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className="rounded-lg bg-[var(--brand-glow)] px-2 py-0.5 text-xs font-semibold text-[var(--brand)]">
            {recipe.matchPercent}% Pantry Match
          </span>
          <span className="rounded-lg bg-[#f3efe8] px-2 py-0.5 text-xs font-semibold text-[var(--brand)]">
            {recipe.cookTimeMin} min
          </span>
          {recipe.goalLabel && (
            <span className="rounded-lg bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-800">
              {recipe.goalLabel}
            </span>
          )}
        </div>

        {recipe.usesExpiring && (
          <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-xs font-medium text-amber-800">
            Use soon: {recipe.usesExpiring}
          </p>
        )}

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

        <Link
          href={`/recipes/${recipe.id}`}
          className="mt-4 inline-flex h-10 items-center rounded-xl bg-[var(--brand)] px-4 text-sm font-semibold text-white hover:bg-[var(--brand-soft)]"
        >
          Cook this
        </Link>
      </div>
    </article>
  );
}
