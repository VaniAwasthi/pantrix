import { NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth";
import { completeCook } from "@/lib/cook";

export async function POST(request: Request) {
  try {
    const session = await getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const recipeId = typeof body.recipeId === "string" ? body.recipeId : "";
    if (!recipeId) {
      return NextResponse.json({ error: "Recipe is required" }, { status: 400 });
    }

    const result = await completeCook(session.userId, recipeId);
    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Cook error:", error);
    return NextResponse.json({ error: "Failed to log cooked meal" }, { status: 500 });
  }
}
