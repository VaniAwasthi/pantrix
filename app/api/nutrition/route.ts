import { NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth";
import { getKitchenOverview } from "@/lib/cook";

export async function GET(request: Request) {
  try {
    const session = await getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const overview = await getKitchenOverview(session.userId);
    return NextResponse.json({
      today: overview.nutritionToday,
      week: overview.nutritionWeek,
      history: overview.weekHistory,
    });
  } catch (error) {
    console.error("Nutrition error:", error);
    return NextResponse.json(
      { error: "Failed to load nutrition" },
      { status: 500 }
    );
  }
}
