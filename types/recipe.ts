export interface RecipeIngredient {
  name: string;
  quantity?: string;
}

export type MealType =
  | "breakfast"
  | "lunch"
  | "dinner"
  | "snack"
  | "dessert"
  | "drink";

export interface Recipe {
  id: string;
  title: string;
  description: string;
  mealType: MealType;
  prepTime: number;
  cookTime: number;
  servings: number;
  ingredients: RecipeIngredient[];
  instructions: string[];
  tags: string[];
  imageUrl?: string;
  sourceUrl?: string;
}

export interface RecipeSuggestion extends Recipe {
  matchScore: number;
  matchedIngredients: string[];
  missingIngredients: string[];
  usesExpiringItems: string[];
}

export interface DailyMealPlan {
  breakfast: RecipeSuggestion[];
  lunch: RecipeSuggestion[];
  dinner: RecipeSuggestion[];
  snack: RecipeSuggestion[];
  dessert: RecipeSuggestion[];
  drink: RecipeSuggestion[];
}

export const MEAL_LABELS: Record<MealType, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  snack: "Snacks",
  dessert: "Desserts",
  drink: "Drinks",
};

export const MEAL_ORDER: MealType[] = [
  "breakfast",
  "lunch",
  "dinner",
  "snack",
  "dessert",
  "drink",
];
