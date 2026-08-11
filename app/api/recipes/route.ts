import { NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth";
import { getAllRecipes } from "@/lib/recipes";

/**
 * GET /api/recipes
 * Pantrix Indian recipe catalog (our own API).
 * Query: ?mealType=breakfast|lunch|dinner|snack & ?q=search
 */
export async function GET(request: Request) {
  try {
    const session = await getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const mealType = searchParams.get("mealType") ?? undefined;
    const q = searchParams.get("q") ?? undefined;

    const recipes = await getAllRecipes({ mealType, q });

    return NextResponse.json({
      recipes,
      count: recipes.length,
      cuisine: "indian",
      source: "pantrix",
    });
  } catch (error) {
    console.error("List recipes error:", error);
    return NextResponse.json(
      { error: "Failed to fetch recipes" },
      { status: 500 }
    );
  }
}
