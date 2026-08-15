import { NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { addMissingToShopping } from "@/lib/cook";

export async function GET(request: Request) {
  try {
    const session = await getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const items = await prisma.shoppingItem.findMany({
      where: { userId: session.userId },
      orderBy: [{ checked: "asc" }, { createdAt: "desc" }],
    });

    return NextResponse.json({
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        checked: item.checked,
        source: item.source,
        createdAt: item.createdAt.toISOString(),
      })),
    });
  } catch (error) {
    console.error("Get shopping error:", error);
    return NextResponse.json(
      { error: "Failed to load shopping list" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const names = Array.isArray(body.names)
      ? body.names.filter((n: unknown) => typeof n === "string")
      : typeof body.name === "string"
        ? [body.name]
        : [];

    if (names.length === 0) {
      return NextResponse.json({ error: "Add at least one item" }, { status: 400 });
    }

    const source = typeof body.source === "string" ? body.source : undefined;
    const added = await addMissingToShopping(session.userId, names, source);

    const items = await prisma.shoppingItem.findMany({
      where: { userId: session.userId },
      orderBy: [{ checked: "asc" }, { createdAt: "desc" }],
    });

    return NextResponse.json({ added, items }, { status: 201 });
  } catch (error) {
    console.error("Add shopping error:", error);
    return NextResponse.json(
      { error: "Failed to update shopping list" },
      { status: 500 }
    );
  }
}
