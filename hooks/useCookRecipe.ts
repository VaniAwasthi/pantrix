"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useKitchenPantry } from "@/context/KitchenPantryContext";
import {
  LAST_COOK_STORAGE_KEY,
  cookRecipeRequest,
  type StoredCookResult,
} from "@/lib/cookClient";

export function useCookRecipe() {
  const router = useRouter();
  const { syncToApi, applyServerPantry } = useKitchenPantry();
  const [cookingId, setCookingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function cook(recipeId: string, recipeTitle?: string) {
    setCookingId(recipeId);
    setError("");
    try {
      await syncToApi();
      const data = await cookRecipeRequest(recipeId);
      applyServerPantry(
        data.pantry ?? [],
        (data.deducted ?? []).map((item) => item.name)
      );
      const stored: StoredCookResult = {
        ...data,
        recipeId,
        recipeTitle,
      };
      sessionStorage.setItem(LAST_COOK_STORAGE_KEY, JSON.stringify(stored));
      router.push(`/recipes/${recipeId}/complete`);
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not cook this recipe."
      );
    } finally {
      setCookingId(null);
    }
  }

  return { cook, cookingId, error };
}
