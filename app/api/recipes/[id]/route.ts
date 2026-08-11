import { NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth";
import { getRecipeById } from "@/lib/recipes";

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/recipes/[id]
 * Single Indian recipe from Pantrix catalog.
 */
export async function GET(request: Request, context: RouteContext) {
  try {
    const session = await getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const recipe = await getRecipeById(id);

    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    return NextResponse.json({ recipe, source: "pantrix" });
  } catch (error) {
    console.error("Get recipe error:", error);
    return NextResponse.json(
      { error: "Failed to fetch recipe" },
      { status: 500 }
    );
  }
}
