import { NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { pantryItemSchema } from "@/utils/validators";
import {
  getDaysUntilExpiry,
  getExpiryStatus,
} from "@/utils/helpers";
import type { PantryItem } from "@/types/pantry";

function serializeItem(item: {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  expiryDate: Date;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}): PantryItem {
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
}

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

    return NextResponse.json({ items: items.map(serializeItem) });
  } catch (error) {
    console.error("Get pantry error:", error);
    return NextResponse.json(
      { error: "Failed to fetch pantry items" },
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
    const parsed = pantryItemSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    const item = await prisma.pantryItem.create({
      data: {
        ...parsed.data,
        expiryDate: new Date(parsed.data.expiryDate),
        userId: session.userId,
      },
    });

    return NextResponse.json(
      { item: serializeItem(item) },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create pantry error:", error);
    return NextResponse.json(
      { error: "Failed to add pantry item" },
      { status: 500 }
    );
  }
}
