import { prisma } from "@/lib/db";
import { mockRecipes } from "@/components/discover/discover-data";
import { ingredientsMatch } from "@/utils/ingredientAliases";
import { normalizeIngredient, getDaysUntilExpiry } from "@/utils/helpers";
import { EXPIRY_WARNING_DAYS } from "@/utils/constants";
import type { PantryItem } from "@/types/pantry";

const ALWAYS_AVAILABLE = new Set(["water", "salt", "paani"]);

const HIGH_PROTEIN = [
  "paneer",
  "egg",
  "eggs",
  "dal",
  "chicken",
  "curd",
  "fish",
  "mutton",
];

function serializePantryItem(item: {
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
  };
}

function isAlwaysAvailable(name: string) {
  const n = normalizeIngredient(name);
  return ALWAYS_AVAILABLE.has(n);
}

export function estimateProteinGrams(
  calories: number,
  ingredientNames: string[]
) {
  const blob = ingredientNames.map(normalizeIngredient).join(" ");
  const high = HIGH_PROTEIN.some((k) => blob.includes(k));
  const ratio = high ? 0.28 : 0.12;
  return Math.round((calories * ratio) / 4);
}

function cookUsageAmount(item: {
  unit: string;
  quantity: number;
  category: string;
}) {
  if (item.category === "spices") return 0;
  const unit = item.unit === "pcs" ? "pieces" : item.unit;
  if (unit === "g" || unit === "ml") return Math.min(50, item.quantity);
  if (unit === "kg" || unit === "L") return Math.min(0.1, item.quantity);
  return Math.min(1, item.quantity);
}

function startOfDay(date = new Date()) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function daysAgo(n: number) {
  const d = startOfDay();
  d.setDate(d.getDate() - n);
  return d;
}

export async function completeCook(userId: string, recipeId: string) {
  const recipe = mockRecipes.find((item) => item.id === recipeId);
  if (!recipe) {
    return { error: "Recipe not found" as const, status: 404 };
  }

  const ingredients = [...new Set([...recipe.have, ...recipe.missing])];
  const pantry = await prisma.pantryItem.findMany({ where: { userId } });
  const usedIds = new Set<string>();
  const deducted: {
    name: string;
    used: number;
    remaining: number;
    removed: boolean;
  }[] = [];
  const missing: string[] = [];

  for (const ingredient of ingredients) {
    if (isAlwaysAvailable(ingredient)) continue;

    const match = pantry.find(
      (item) =>
        !usedIds.has(item.id) && ingredientsMatch(item.name, ingredient)
    );

    if (!match) {
      missing.push(ingredient);
      continue;
    }

    usedIds.add(match.id);
    const used = cookUsageAmount(match);
    const remaining = Number((match.quantity - used).toFixed(2));

    if (used <= 0) continue;

    if (remaining <= 0) {
      await prisma.pantryItem.delete({ where: { id: match.id } });
      deducted.push({
        name: match.name,
        used: match.quantity,
        remaining: 0,
        removed: true,
      });
    } else {
      await prisma.pantryItem.update({
        where: { id: match.id },
        data: { quantity: remaining },
      });
      match.quantity = remaining;
      deducted.push({
        name: match.name,
        used,
        remaining,
        removed: false,
      });
    }
  }

  for (const name of missing) {
    await prisma.shoppingItem.upsert({
      where: { userId_name: { userId, name } },
      create: {
        userId,
        name,
        quantity: "1",
        source: recipeId,
        checked: false,
      },
      update: {
        checked: false,
        source: recipeId,
      },
    });
  }

  const protein = estimateProteinGrams(recipe.calories, ingredients);
  const log = await prisma.cookLog.create({
    data: {
      userId,
      recipeId: recipe.id,
      recipeTitle: recipe.title,
      calories: recipe.calories,
      protein,
      cookTimeMin: recipe.cookTimeMin,
    },
  });

  const overview = await getKitchenOverview(userId);

  return {
    error: null,
    status: 200,
    deducted,
    shoppingAdded: missing,
    log: {
      id: log.id,
      recipeId: log.recipeId,
      recipeTitle: log.recipeTitle,
      calories: log.calories,
      protein: log.protein,
      cookTimeMin: log.cookTimeMin,
      cookedAt: log.cookedAt.toISOString(),
    },
    ...overview,
  };
}

export async function addMissingToShopping(
  userId: string,
  names: string[],
  source?: string
) {
  const added: string[] = [];
  for (const raw of names) {
    const name = raw.trim();
    if (!name || isAlwaysAvailable(name)) continue;
    await prisma.shoppingItem.upsert({
      where: { userId_name: { userId, name } },
      create: {
        userId,
        name,
        quantity: "1",
        source: source ?? null,
        checked: false,
      },
      update: { checked: false, source: source ?? undefined },
    });
    added.push(name);
  }
  return added;
}

export async function getKitchenOverview(userId: string) {
  const today = startOfDay();
  const weekStart = daysAgo(6);

  const [pantryRows, shoppingRows, todayLogs, weekLogs, recentLogs] =
    await Promise.all([
      prisma.pantryItem.findMany({
        where: { userId },
        orderBy: { expiryDate: "asc" },
      }),
      prisma.shoppingItem.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
      }),
      prisma.cookLog.findMany({
        where: { userId, cookedAt: { gte: today } },
        orderBy: { cookedAt: "desc" },
      }),
      prisma.cookLog.findMany({
        where: { userId, cookedAt: { gte: weekStart } },
        orderBy: { cookedAt: "desc" },
      }),
      prisma.cookLog.findMany({
        where: { userId },
        orderBy: { cookedAt: "desc" },
        take: 8,
      }),
    ]);

  const pantry = pantryRows.map(serializePantryItem);
  const expiringSoon = pantry.filter((item) => {
    const days = getDaysUntilExpiry(item.expiryDate);
    return days >= 0 && days <= EXPIRY_WARNING_DAYS;
  });

  const sumLogs = (logs: typeof todayLogs) => ({
    meals: logs.length,
    calories: logs.reduce((sum, log) => sum + log.calories, 0),
    protein: logs.reduce((sum, log) => sum + log.protein, 0),
  });

  return {
    pantry,
    shopping: shoppingRows.map((item) => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      checked: item.checked,
      source: item.source,
      createdAt: item.createdAt.toISOString(),
    })),
    nutritionToday: sumLogs(todayLogs),
    nutritionWeek: sumLogs(weekLogs),
    history: recentLogs.map((log) => ({
      id: log.id,
      recipeId: log.recipeId,
      recipeTitle: log.recipeTitle,
      calories: log.calories,
      protein: log.protein,
      cookTimeMin: log.cookTimeMin,
      cookedAt: log.cookedAt.toISOString(),
    })),
    weekHistory: weekLogs.map((log) => ({
      id: log.id,
      recipeId: log.recipeId,
      recipeTitle: log.recipeTitle,
      calories: log.calories,
      protein: log.protein,
      cookTimeMin: log.cookTimeMin,
      cookedAt: log.cookedAt.toISOString(),
    })),
    expiringSoon,
    pantryCount: pantry.length,
    shoppingOpen: shoppingRows.filter((item) => !item.checked).length,
  };
}
