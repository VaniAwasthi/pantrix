"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { useKitchenPantry } from "@/context/KitchenPantryContext";
import { useKitchenPreferences } from "@/context/KitchenPreferencesContext";
import { matchRecipesToPantry } from "@/lib/matchDiscoverRecipes";
import { mockRecipes } from "@/components/discover/discover-data";
import { ingredientsMatch } from "@/utils/ingredientAliases";
import { normalizeIngredient } from "@/utils/helpers";

export function useRecipeId() {
  const params = useParams<{ id: string }>();
  const rawId = params?.id;
  return Array.isArray(rawId) ? rawId[0] : rawId;
}

export function useMatchedRecipe() {
  const id = useRecipeId();
  const { items: pantryItems, hydrated: pantryReady } = useKitchenPantry();
  const { preferences, hydrated: prefsReady } = useKitchenPreferences();

  const recipe = useMemo(() => {
    const base = mockRecipes.find((item) => item.id === id);
    if (!base) return null;
    if (!pantryReady || !prefsReady) return { ...base, expiringCount: 0 };

    const matched = matchRecipesToPantry(
      [base],
      pantryItems.map((item) => ({
        name: item.name,
        expiryDate: item.expiryDate,
      })),
      preferences
    );
    if (matched[0]) return matched[0];

    const pantryNames = pantryItems.map((item) => item.name);
    const ingredients = [...new Set([...base.have, ...base.missing])];
    const have = ingredients.filter((ing) =>
      pantryNames.some(
        (name) =>
          ingredientsMatch(name, ing) ||
          normalizeIngredient(ing) === "water" ||
          normalizeIngredient(ing) === "salt"
      )
    );
    const missing = ingredients.filter((ing) => !have.includes(ing));
    const matchPercent =
      ingredients.length === 0
        ? 0
        : Math.round((have.length / ingredients.length) * 100);

    return {
      ...base,
      have,
      missing,
      matchPercent,
      expiringCount: 0,
    };
  }, [id, pantryItems, pantryReady, prefsReady, preferences]);

  return {
    id,
    recipe,
    ready: pantryReady && prefsReady,
  };
}
