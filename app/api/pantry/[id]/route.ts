import { NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { pantryItemSchema } from "@/utils/validators";
import {
  getDaysUntilExpiry,
  getExpiryStatus,
} from "@/utils/helpers";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    const session = await getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const existing = await prisma.pantryItem.findFirst({
      where: { id, userId: session.userId },
    });

    if (!existing) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    const body = await request.json();
    const parsed = pantryItemSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    const item = await prisma.pantryItem.update({
      where: { id },
      data: {
        ...parsed.data,
        expiryDate: new Date(parsed.data.expiryDate),
      },
    });

    const expiryDate = item.expiryDate.toISOString();
    return NextResponse.json({
      item: {
        ...item,
        expiryDate,
        createdAt: item.createdAt.toISOString(),
        updatedAt: item.updatedAt.toISOString(),
        expiryStatus: getExpiryStatus(expiryDate),
        daysUntilExpiry: getDaysUntilExpiry(expiryDate),
      },
    });
  } catch (error) {
    console.error("Update pantry error:", error);
    return NextResponse.json(
      { error: "Failed to update item" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  try {
    const session = await getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const existing = await prisma.pantryItem.findFirst({
      where: { id, userId: session.userId },
    });

    if (!existing) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    await prisma.pantryItem.delete({ where: { id } });
    return NextResponse.json({ message: "Item deleted" });
  } catch (error) {
    console.error("Delete pantry error:", error);
    return NextResponse.json(
      { error: "Failed to delete item" },
      { status: 500 }
    );
  }
}
