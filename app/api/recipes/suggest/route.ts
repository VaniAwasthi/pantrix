import { NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/db";
import {
  suggestRecipes,
  getExpiringPantryItems,
  buildDailyMealPlan,
  getMealOfDayHint,
} from "@/lib/recipes";
import {
  getDaysUntilExpiry,
  getExpiryStatus,
} from "@/utils/helpers";
import type { PantryItem } from "@/types/pantry";

/**
 * GET /api/recipes/suggest
 * Suggest Indian recipes based on ingredients in the user's pantry.
 */
export async function GET(request: Request) {
  try {
    const session = await getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const items = await prisma.pantryItem.findMany({
      where: { userId: session.userId },
      orderBy: { expiryDate: "asc" },
    });

    const pantryItems: PantryItem[] = items.map((item) => {
      const expiryDate = item.expiryDate.toISOString();
      return {
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        unit: item.unit,
        category: item.category,
        expiryDate,
        userId: item.userId,
        createdAt: item.createdAt.toISOString(),
        updatedAt: item.updatedAt.toISOString(),
        expiryStatus: getExpiryStatus(expiryDate),
        daysUntilExpiry: getDaysUntilExpiry(expiryDate),
      };
    });

    const { suggestions, source, basedOnIngredients } =
      await suggestRecipes(pantryItems);
    const mealPlan = buildDailyMealPlan(suggestions);
    const expiringItems = getExpiringPantryItems(pantryItems);

    return NextResponse.json({
      suggestions,
      mealPlan,
      source,
      basedOnIngredients,
      currentMeal: getMealOfDayHint(),
      expiringItems,
      totalPantryItems: pantryItems.length,
      totalMatches: suggestions.length,
    });
  } catch (error) {
    console.error("Recipe suggest error:", error);
    return NextResponse.json(
      { error: "Failed to match recipes" },
      { status: 500 }
    );
  }
}
