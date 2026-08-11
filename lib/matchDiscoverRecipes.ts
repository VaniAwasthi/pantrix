import { normalizeIngredient } from "@/utils/helpers";
import { ingredientsMatch } from "@/utils/ingredientAliases";
import type { KitchenPreferences } from "@/context/KitchenPreferencesContext";
import type { MockRecipe } from "@/components/discover/discover-data";
import type { CookingTimeId } from "@/components/setup/setup-data";

const ALWAYS_AVAILABLE = new Set(["water", "salt", "paani"]);

const EGG_KEYWORDS = ["egg", "eggs", "omelette"];
const MEAT_KEYWORDS = [
  "chicken",
  "mutton",
  "fish",
  "meat",
  "prawn",
  "lamb",
  "beef",
];
const DAIRY_KEYWORDS = [
  "milk",
  "curd",
  "yogurt",
  "yoghurt",
  "paneer",
  "cheese",
  "butter",
  "ghee",
  "cream",
];

function pantryHas(pantryNames: string[], ingredient: string): boolean {
  const needed = normalizeIngredient(ingredient);
  if (ALWAYS_AVAILABLE.has(needed)) return true;
  return pantryNames.some((name) => ingredientsMatch(name, ingredient));
}

function ingredientList(recipe: MockRecipe): string[] {
  return [...new Set([...recipe.have, ...recipe.missing])];
}

function containsAny(ingredients: string[], keywords: string[]): boolean {
  return ingredients.some((ing) => {
    const n = normalizeIngredient(ing);
    return keywords.some((k) => n.includes(k));
  });
}

function fitsDiet(recipe: MockRecipe, diets: KitchenPreferences["diets"]) {
  if (diets.length === 0) return true;

  const ingredients = ingredientList(recipe);
  const hasEgg = containsAny(ingredients, EGG_KEYWORDS);
  const hasMeat = containsAny(ingredients, MEAT_KEYWORDS);
  const hasDairy = containsAny(ingredients, DAIRY_KEYWORDS);

  return diets.some((diet) => {
    if (diet === "vegan") return !hasEgg && !hasMeat && !hasDairy;
    if (diet === "vegetarian") return !hasEgg && !hasMeat;
    if (diet === "eggetarian") return !hasMeat;
    if (diet === "non-vegetarian") return true;
    return true;
  });
}

function maxCookMinutes(cookingTime: CookingTimeId | null): number | null {
  if (!cookingTime) return null;
  if (cookingTime === "under-15") return 15;
  if (cookingTime === "15-30") return 30;
  if (cookingTime === "30-60") return 60;
  return null; // "enjoy" = no limit
}

function fitsCuisine(
  recipe: MockRecipe,
  cuisines: KitchenPreferences["cuisines"]
) {
  if (cuisines.length === 0) return true;
  const cuisine = recipe.cuisine.toLowerCase();
  return cuisines.some((id) => {
    if (id === "other") return true;
    if (id === "healthy") return Boolean(recipe.healthy);
    if (id === "asian") {
      return ["asian", "chinese", "indian"].includes(cuisine);
    }
    return cuisine.includes(id);
  });
}

function fitsNutrition(
  recipe: MockRecipe,
  goal: KitchenPreferences["nutritionGoal"]
) {
  if (!goal || goal === "no-goal" || goal === "balanced") return true;
  if (goal === "low-carb") return recipe.calories <= 300;
  if (goal === "weight-loss") return recipe.calories <= 350 || Boolean(recipe.healthy);
  if (goal === "high-protein" || goal === "muscle-gain") {
    return (
      Boolean(recipe.healthy) ||
      containsAny(ingredientList(recipe), [
        "paneer",
        "egg",
        "eggs",
        "dal",
        "chicken",
        "curd",
      ])
    );
  }
  return true;
}

export type MatchedRecipe = MockRecipe & {
  matchPercent: number;
  have: string[];
  missing: string[];
  usesExpiring?: string;
};

export function matchRecipesToPantry(
  recipes: MockRecipe[],
  pantryNames: string[],
  preferences: KitchenPreferences,
  options?: { minMatchPercent?: number; maxMissing?: number }
): MatchedRecipe[] {
  const minMatch = options?.minMatchPercent ?? 50;
  const maxMissing = options?.maxMissing ?? 2;
  const cookLimit = maxCookMinutes(preferences.cookingTime);

  if (pantryNames.length === 0) return [];

  const matched: MatchedRecipe[] = [];

  for (const recipe of recipes) {
    if (!fitsDiet(recipe, preferences.diets)) continue;
    if (!fitsCuisine(recipe, preferences.cuisines)) continue;
    if (!fitsNutrition(recipe, preferences.nutritionGoal)) continue;
    if (cookLimit !== null && recipe.cookTimeMin > cookLimit) continue;

    const ingredients = ingredientList(recipe);
    if (ingredients.length === 0) continue;

    const have = ingredients.filter((ing) => pantryHas(pantryNames, ing));
    const missing = ingredients.filter((ing) => !pantryHas(pantryNames, ing));
    const matchPercent = Math.round((have.length / ingredients.length) * 100);

    // Hide dishes you clearly can't cook (e.g. omelette without eggs)
    if (matchPercent < minMatch) continue;
    if (missing.length > maxMissing) continue;

    const usesExpiring =
      recipe.usesExpiring &&
      pantryNames.some((name) =>
        recipe.usesExpiring!.toLowerCase().includes(normalizeIngredient(name))
      )
        ? recipe.usesExpiring
        : undefined;

    matched.push({
      ...recipe,
      matchPercent,
      have,
      missing,
      favourite: recipe.favourite,
      usesExpiring,
      healthy: recipe.healthy,
    });
  }

  return matched.sort((a, b) => b.matchPercent - a.matchPercent);
}

export function pickAiSuggestion(recipes: MatchedRecipe[]) {
  const expiring = recipes.find((r) => r.usesExpiring && r.matchPercent >= 70);
  if (expiring) {
    return {
      reasonTitle: "Use an ingredient before it expires.",
      recipeTitle: expiring.title,
      reason:
        expiring.usesExpiring ??
        `You already have ${expiring.matchPercent}% of what you need.`,
      recipeId: expiring.id,
    };
  }

  const best = recipes[0];
  if (!best) return null;

  return {
    reasonTitle: "Best match from your pantry.",
    recipeTitle: best.title,
    reason: `You have ${best.matchPercent}% of the ingredients for ${best.title}.`,
    recipeId: best.id,
  };
}
