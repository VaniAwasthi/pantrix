"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { useKitchenPantry } from "@/context/KitchenPantryContext";
import { useKitchenPreferences } from "@/context/KitchenPreferencesContext";
import { matchRecipesToPantry } from "@/lib/matchDiscoverRecipes";
import { mockRecipes } from "./discover-data";
import { PantryMatchBadge } from "./PantryMatchBadge";
import { ingredientsMatch } from "@/utils/ingredientAliases";
import { normalizeIngredient } from "@/utils/helpers";
import type { PantryItem } from "@/types/pantry";

type CookResult = {
  deducted: { name: string; used: number; remaining: number; removed: boolean }[];
  shoppingAdded: string[];
  pantry: PantryItem[];
  error?: string;
};

export function CookRecipePage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const router = useRouter();
  const {
    items: pantryItems,
    hydrated: pantryReady,
    applyServerPantry,
  } = useKitchenPantry();
  const { preferences, hydrated: prefsReady } = useKitchenPreferences();
  const [cooking, setCooking] = useState(false);
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const recipe = useMemo(() => {
    const base = mockRecipes.find((item) => item.id === id);
    if (!base) return null;
    if (!pantryReady || !prefsReady) return { ...base, expiringCount: 0 };

    const matched = matchRecipesToPantry(
      [base],
      pantryItems.map((item) => ({
        name: item.name,
        expiryDate: item.expiryDate,
      })),
      preferences
    );
    if (matched[0]) return matched[0];

    const pantryNames = pantryItems.map((item) => item.name);
    const ingredients = [...new Set([...base.have, ...base.missing])];
    const have = ingredients.filter((ing) =>
      pantryNames.some(
        (name) =>
          ingredientsMatch(name, ing) ||
          normalizeIngredient(ing) === "water" ||
          normalizeIngredient(ing) === "salt"
      )
    );
    const missing = ingredients.filter((ing) => !have.includes(ing));
    const matchPercent =
      ingredients.length === 0
        ? 0
        : Math.round((have.length / ingredients.length) * 100);

    return {
      ...base,
      have,
      missing,
      matchPercent,
      expiringCount: 0,
    };
  }, [id, pantryItems, pantryReady, prefsReady, preferences]);

  async function addMissingToList() {
    if (!recipe || recipe.missing.length === 0) return;
    setAdding(true);
    setError("");
    try {
      const res = await fetch("/api/shopping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ names: recipe.missing, source: recipe.id }),
      });
      if (!res.ok) {
        setError("Could not update the shopping list.");
        return;
      }
      setMessage("Missing items added to your shopping list.");
    } catch {
      setError("Could not update the shopping list.");
    } finally {
      setAdding(false);
    }
  }

  async function markCooked() {
    if (!recipe) return;
    setCooking(true);
    setError("");
    try {
      const res = await fetch("/api/cook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipeId: recipe.id }),
      });
      const data = (await res.json()) as CookResult;
      if (!res.ok) {
        setError(data.error ?? "Could not update pantry.");
        return;
      }

      applyServerPantry(
        data.pantry ?? [],
        (data.deducted ?? []).map((item) => item.name)
      );

      router.push("/dashboard?cooked=1");
      router.refresh();
    } catch {
      setError("Could not update pantry.");
    } finally {
      setCooking(false);
    }
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-[#f6f3ee]">
        <Navbar />
        <main className="mx-auto max-w-2xl px-4 py-16 text-center">
          <h1 className="font-display text-3xl font-semibold text-[var(--brand)]">
            Recipe not found
          </h1>
          <Link href="/recipes" className="mt-6 inline-block">
            <Button>Back to recipes</Button>
          </Link>
        </main>
      </div>
    );
  }

  const ingredients = [...new Set([...recipe.have, ...recipe.missing])];

  return (
    <div className="min-h-screen bg-[#f6f3ee]">
      <Navbar />
      <main className="mx-auto max-w-2xl space-y-8 px-4 py-8 sm:px-6 sm:py-12">
        <Link
          href="/recipes"
          className="text-sm font-semibold text-[var(--muted)] hover:text-[var(--brand)]"
        >
          ← All recipes
        </Link>

        <section
          className={`overflow-hidden rounded-[1.75rem] bg-gradient-to-br ${recipe.imageGradient} p-6 text-white`}
        >
          <PantryMatchBadge percent={recipe.matchPercent} />
          <h1 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
            {recipe.title}
          </h1>
          <p className="mt-3 text-sm text-white/90">
            {recipe.cookTimeMin} min · {recipe.difficulty} · {recipe.calories}{" "}
            kcal · {recipe.cuisine}
          </p>
        </section>

        {"usesExpiring" in recipe && recipe.usesExpiring && (
          <p className="rounded-2xl bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
            Use soon: {recipe.usesExpiring}
          </p>
        )}

        <section className="rounded-[1.75rem] border border-[var(--line)] bg-white p-6">
          <h2 className="font-display text-xl font-semibold text-[var(--brand)]">
            Ingredients
          </h2>
          <ul className="mt-4 space-y-2">
            {ingredients.map((item) => {
              const inPantry = recipe.have.includes(item);
              return (
                <li
                  key={item}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-[var(--foreground)]">{item}</span>
                  <span
                    className={
                      inPantry
                        ? "font-semibold text-emerald-700"
                        : "font-semibold text-amber-700"
                    }
                  >
                    {inPantry ? "In pantry" : "Missing"}
                  </span>
                </li>
              );
            })}
          </ul>
          {recipe.missing.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-3">
              <Button
                variant="secondary"
                loading={adding}
                onClick={addMissingToList}
              >
                Add missing to shopping list
              </Button>
              <Link href="/shopping">
                <Button variant="ghost">View list</Button>
              </Link>
            </div>
          )}
        </section>

        <section className="rounded-[1.75rem] border border-[var(--line)] bg-white p-6">
          <h2 className="font-display text-xl font-semibold text-[var(--brand)]">
            Cook
          </h2>
          <ol className="mt-4 space-y-3">
            {recipe.instructions.map((step, index) => (
              <li
                key={step}
                className="flex gap-3 text-sm text-[var(--foreground)]"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--brand-glow)] text-xs font-bold text-[var(--brand)]">
                  {index + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>

          {message && (
            <p className="mt-4 text-sm font-medium text-emerald-700">
              {message}
            </p>
          )}
          {error && (
            <p className="mt-4 text-sm font-medium text-red-600">{error}</p>
          )}

          <div className="mt-6">
            <Button
              loading={cooking}
              onClick={markCooked}
              className="w-full sm:w-auto"
            >
              I cooked this
            </Button>
            <p className="mt-2 text-xs text-[var(--muted)]">
              Updates pantry stock, logs nutrition, and adds missing items to
              your shopping list.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
