import type { Recipe, RecipeIngredient, MealType } from "@/types/recipe";
import type { Recipe as PrismaRecipe } from "@prisma/client";

export function serializeRecipe(row: PrismaRecipe): Recipe {
  let ingredients: RecipeIngredient[] = [];
  let instructions: string[] = [];
  let tags: string[] = [];

  try {
    ingredients = JSON.parse(row.ingredients) as RecipeIngredient[];
  } catch {
    ingredients = [];
  }
  try {
    instructions = JSON.parse(row.instructions) as string[];
  } catch {
    instructions = [];
  }
  try {
    tags = JSON.parse(row.tags) as string[];
  } catch {
    tags = [];
  }

  return {
    id: row.id,
    title: row.title,
    description: row.description,
    mealType: row.mealType as MealType,
    prepTime: row.prepTime,
    cookTime: row.cookTime,
    servings: row.servings,
    ingredients,
    instructions,
    tags,
    imageUrl: row.imageUrl ?? undefined,
  };
}
