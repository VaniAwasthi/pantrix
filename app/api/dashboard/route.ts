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
    return NextResponse.json(overview);
  } catch (error) {
    console.error("Dashboard error:", error);
    return NextResponse.json(
      { error: "Failed to load dashboard" },
      { status: 500 }
    );
  }
}
