import type { PantryItem } from "@/types/pantry";

export const LAST_COOK_STORAGE_KEY = "pantrix-last-cook";

export type CookClientResult = {
  deducted: { name: string; used: number; remaining: number; removed: boolean }[];
  shoppingAdded: string[];
  pantry: PantryItem[];
  error?: string;
};

export type StoredCookResult = CookClientResult & {
  recipeId: string;
  recipeTitle?: string;
};

export async function cookRecipeRequest(recipeId: string) {
  const res = await fetch("/api/cook", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ recipeId }),
  });
  const data = (await res.json()) as CookClientResult;
  if (!res.ok) {
    throw new Error(data.error ?? "Could not cook this recipe.");
  }
  return data;
}
