import type {
  DailyMealPlan,
  MealType,
  Recipe,
  RecipeSuggestion,
} from "@/types/recipe";
import type { PantryItem } from "@/types/pantry";
import {
  getDaysUntilExpiry,
  normalizeIngredient,
} from "@/utils/helpers";
import { EXPIRY_WARNING_DAYS } from "@/utils/constants";
import { MEAL_ORDER } from "@/types/recipe";
import { prisma } from "@/lib/db";
import { serializeRecipe } from "@/lib/serializeRecipe";
import {
  canonicalIngredient,
  ingredientsMatch,
} from "@/utils/ingredientAliases";

const ALWAYS_AVAILABLE = new Set(["water", "paani"]);

const STAPLE_INGREDIENTS = new Set([
  "salt",
  "cumin",
  "turmeric",
  "chilli powder",
  "garam masala",
  "black pepper",
  "cooking oil",
  "mustard oil",
  "olive oil",
  "coconut oil",
  "ghee",
  "honey",
  "tea",
  "coffee",
  "sugar",
]);

function isAlwaysAvailable(name: string): boolean {
  const c = canonicalIngredient(name);
  return (
    ALWAYS_AVAILABLE.has(c) ||
    ALWAYS_AVAILABLE.has(normalizeIngredient(name))
  );
}

function isStaple(name: string): boolean {
  const c = canonicalIngredient(name);
  if (STAPLE_INGREDIENTS.has(c)) return true;
  const n = normalizeIngredient(name);
  return [...STAPLE_INGREDIENTS].some((s) => n.includes(s) || s.includes(n));
}

function pantryNamesMatch(pantryName: string, ingredientName: string): boolean {
  if (isAlwaysAvailable(ingredientName)) return true;
  return ingredientsMatch(pantryName, ingredientName);
}

function scoreRecipes(
  recipes: Recipe[],
  pantryItems: PantryItem[]
): RecipeSuggestion[] {
  const activeItems = pantryItems.filter(
    (item) => getDaysUntilExpiry(item.expiryDate) >= 0
  );

  const expiringItems = activeItems.filter(
    (item) => getDaysUntilExpiry(item.expiryDate) <= EXPIRY_WARNING_DAYS
  );

  const scored: (RecipeSuggestion & { keyMatched: number })[] = recipes.map(
    (recipe) => {
      const matchedIngredients: string[] = [];
      const missingIngredients: string[] = [];
      const usesExpiringItems: string[] = [];

      for (const ingredient of recipe.ingredients) {
        if (isAlwaysAvailable(ingredient.name)) {
          matchedIngredients.push(ingredient.name);
          continue;
        }

        const match = activeItems.find((item) =>
          pantryNamesMatch(item.name, ingredient.name)
        );

        if (match) {
          matchedIngredients.push(ingredient.name);
          if (
            expiringItems.some((exp) =>
              pantryNamesMatch(exp.name, ingredient.name)
            )
          ) {
            if (!usesExpiringItems.includes(match.name)) {
              usesExpiringItems.push(match.name);
            }
          }
        } else {
          missingIngredients.push(ingredient.name);
        }
      }

      const matchedKey = matchedIngredients.filter((name) => !isStaple(name));
      const keyMatched = matchedKey.length;
      const keyTotal =
        recipe.ingredients.filter((ing) => !isStaple(ing.name)).length ||
        recipe.ingredients.length;

      const matchScore = keyTotal > 0 ? keyMatched / keyTotal : 1;
      const expiringBonus =
        usesExpiringItems.length > 0
          ? 0.1 + usesExpiringItems.length * 0.05
          : 0;

      return {
        ...recipe,
        matchScore: Math.min(matchScore + expiringBonus, 1),
        matchedIngredients,
        missingIngredients,
        usesExpiringItems,
        keyMatched,
      };
    }
  );

  return scored
    .filter((s) => s.missingIngredients.length === 0)
    .sort((a, b) => {
      if (b.keyMatched !== a.keyMatched) return b.keyMatched - a.keyMatched;
      if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
      return b.usesExpiringItems.length - a.usesExpiringItems.length;
    })
    .map(({ keyMatched: _k, ...rest }) => rest);
}

export async function getAllRecipes(filters?: {
  mealType?: string;
  q?: string;
}): Promise<Recipe[]> {
  const where: {
    cuisine: string;
    mealType?: string;
    OR?: { title?: { contains: string }; description?: { contains: string } }[];
  } = { cuisine: "indian" };

  if (filters?.mealType) where.mealType = filters.mealType;

  if (filters?.q?.trim()) {
    const q = filters.q.trim();
    where.OR = [
      { title: { contains: q } },
      { description: { contains: q } },
    ];
  }

  const rows = await prisma.recipe.findMany({
    where,
    orderBy: { title: "asc" },
  });

  return rows.map(serializeRecipe);
}

export async function getRecipeById(id: string): Promise<Recipe | null> {
  const row = await prisma.recipe.findUnique({ where: { id } });
  return row ? serializeRecipe(row) : null;
}

export async function suggestRecipes(pantryItems: PantryItem[]): Promise<{
  suggestions: RecipeSuggestion[];
  source: "pantrix";
  basedOnIngredients: string[];
}> {
  const active = pantryItems.filter(
    (item) => getDaysUntilExpiry(item.expiryDate) >= 0
  );
  const basedOnIngredients = [
    ...new Set(active.map((item) => item.name)),
  ].sort((a, b) => a.localeCompare(b));

  return {
    suggestions: scoreRecipes(await getAllRecipes(), pantryItems),
    source: "pantrix",
    basedOnIngredients,
  };
}

export function buildDailyMealPlan(
  suggestions: RecipeSuggestion[]
): DailyMealPlan {
  const plan: DailyMealPlan = {
    breakfast: [],
    lunch: [],
    dinner: [],
    snack: [],
    dessert: [],
    drink: [],
  };

  for (const meal of MEAL_ORDER) {
    plan[meal] = suggestions.filter((s) => s.mealType === meal).slice(0, 12);
  }

  return plan;
}

export function getMealOfDayHint(): MealType {
  const hour = new Date().getHours();
  if (hour < 11) return "breakfast";
  if (hour < 15) return "lunch";
  if (hour < 18) return "snack";
  if (hour < 21) return "dinner";
  return "drink";
}

export function getExpiringPantryItems(items: PantryItem[]): PantryItem[] {
  return items
    .filter(
      (item) =>
        getDaysUntilExpiry(item.expiryDate) >= 0 &&
        getDaysUntilExpiry(item.expiryDate) <= EXPIRY_WARNING_DAYS
    )
    .sort(
      (a, b) =>
        getDaysUntilExpiry(a.expiryDate) - getDaysUntilExpiry(b.expiryDate)
    );
}
