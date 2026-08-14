import {
  formatExpiryLabel,
  getDaysUntilExpiry,
  normalizeIngredient,
} from "@/utils/helpers";
import { ingredientsMatch } from "@/utils/ingredientAliases";
import { EXPIRY_WARNING_DAYS } from "@/utils/constants";
import type { KitchenPreferences } from "@/context/KitchenPreferencesContext";
import type { MockRecipe } from "@/components/discover/discover-data";
import type { CookingTimeId } from "@/components/setup/setup-data";
import { nutritionGoals } from "@/components/setup/setup-data";

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

export type PantryMatchItem = {
  name: string;
  expiryDate: string;
};

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

export function recipeFitsDiet(
  recipe: MockRecipe,
  diets: KitchenPreferences["diets"]
) {
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

export function maxCookMinutes(cookingTime: CookingTimeId | null): number | null {
  if (!cookingTime) return null;
  if (cookingTime === "under-15") return 15;
  if (cookingTime === "15-30") return 30;
  if (cookingTime === "30-60") return 60;
  return null; // "enjoy" = no limit
}

export function recipeFitsCuisine(
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
  if (goal === "weight-loss")
    return recipe.calories <= 350 || Boolean(recipe.healthy);
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

function goalLabelFor(
  recipe: MockRecipe,
  goal: KitchenPreferences["nutritionGoal"]
): string | undefined {
  if (!goal || goal === "no-goal") return undefined;
  if (!fitsNutrition(recipe, goal)) return undefined;
  return nutritionGoals.find((g) => g.id === goal)?.label;
}

function buildUsesExpiring(
  recipeIngredients: string[],
  expiringItems: PantryMatchItem[]
): string | undefined {
  const used = expiringItems.filter((item) =>
    recipeIngredients.some((ing) => ingredientsMatch(item.name, ing))
  );
  if (used.length === 0) return undefined;

  const soonest = [...used].sort(
    (a, b) =>
      getDaysUntilExpiry(a.expiryDate) - getDaysUntilExpiry(b.expiryDate)
  )[0];

  return `${soonest.name} — ${formatExpiryLabel(soonest.expiryDate)}`;
}

export type MatchedRecipe = MockRecipe & {
  matchPercent: number;
  have: string[];
  missing: string[];
  usesExpiring?: string;
  expiringCount: number;
  goalLabel?: string;
};

export function matchRecipesToPantry(
  recipes: MockRecipe[],
  pantryItems: PantryMatchItem[],
  preferences: KitchenPreferences
): MatchedRecipe[] {
  const activeItems = pantryItems.filter((item) => {
    if (!item.expiryDate) return true;
    return getDaysUntilExpiry(item.expiryDate) >= 0;
  });
  if (activeItems.length === 0 && pantryItems.length === 0) return [];

  const pantryNames = (activeItems.length > 0 ? activeItems : pantryItems).map(
    (item) => item.name
  );
  const expiringItems = activeItems.filter((item) => {
    if (!item.expiryDate) return false;
    const days = getDaysUntilExpiry(item.expiryDate);
    return days >= 0 && days <= EXPIRY_WARNING_DAYS;
  });

  const matched: MatchedRecipe[] = [];

  for (const recipe of recipes) {
    const ingredients = ingredientList(recipe);
    if (ingredients.length === 0) continue;

    const have = ingredients.filter((ing) => pantryHas(pantryNames, ing));
    const missing = ingredients.filter((ing) => !pantryHas(pantryNames, ing));
    const matchPercent = Math.round((have.length / ingredients.length) * 100);

    if (have.length === 0) continue;

    const usesExpiring = buildUsesExpiring(ingredients, expiringItems);
    const expiringCount = expiringItems.filter((item) =>
      ingredients.some((ing) => ingredientsMatch(item.name, ing))
    ).length;

    matched.push({
      ...recipe,
      matchPercent,
      have,
      missing,
      favourite: recipe.favourite,
      usesExpiring,
      expiringCount,
      healthy: recipe.healthy,
      goalLabel: goalLabelFor(recipe, preferences.nutritionGoal),
    });
  }

  return matched.sort((a, b) => {
    if (b.matchPercent !== a.matchPercent) return b.matchPercent - a.matchPercent;
    if (b.expiringCount !== a.expiringCount)
      return b.expiringCount - a.expiringCount;
    return a.cookTimeMin - b.cookTimeMin;
  });
}

export function pickBestMatch(recipes: MatchedRecipe[]) {
  const expiring = recipes.find((r) => r.usesExpiring && r.matchPercent >= 70);
  const best = expiring ?? recipes[0];
  if (!best) return null;

  const stats = [
    `${best.matchPercent}% pantry match`,
    `${best.cookTimeMin} min`,
    best.goalLabel,
  ]
    .filter(Boolean)
    .join(" · ");

  return {
    recipe: best,
    reasonTitle: best.usesExpiring
      ? "Cook this before it expires"
      : "Best pantry match",
    reason: best.usesExpiring ? `${best.usesExpiring}. ${stats}` : stats,
  };
}

export function recipeMatchesQuery(recipe: MockRecipe, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;

  const haystack = [
    recipe.title,
    recipe.cuisine,
    recipe.mealType,
    recipe.difficulty,
    ...recipe.have,
    ...recipe.missing,
    recipe.healthy ? "healthy" : "",
    recipe.cookTimeMin <= 15 ? "quick under 15" : "",
    recipe.cookTimeMin <= 30 ? "under 30 minutes quick" : "",
    recipe.calories <= 300 ? "low calorie light" : "",
    containsAny([...recipe.have, ...recipe.missing], HIGH_PROTEIN_QUERY)
      ? "high protein"
      : "",
  ]
    .join(" ")
    .toLowerCase();

  return q.split(/\s+/).every((word) => {
    if (["something", "a", "an", "the", "my", "and", "with"].includes(word)) {
      return true;
    }
    if (word === "potatoes") return haystack.includes("potato");
    return haystack.includes(word);
  });
}

const HIGH_PROTEIN_QUERY = [
  "paneer",
  "egg",
  "eggs",
  "dal",
  "chicken",
  "curd",
];
