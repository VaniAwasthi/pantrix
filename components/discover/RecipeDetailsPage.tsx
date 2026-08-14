"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { PantryMatchBadge } from "@/components/discover/PantryMatchBadge";
import { useMatchedRecipe } from "@/hooks/useMatchedRecipe";

export function RecipeDetailsPage() {
  const { recipe } = useMatchedRecipe();
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

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
          <p className="text-xs font-bold tracking-[0.18em] text-white/80">
            RECIPE DETAILS
          </p>
          <div className="mt-3">
            <PantryMatchBadge percent={recipe.matchPercent} />
          </div>
          <h1 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
            {recipe.title}
          </h1>
          <p className="mt-3 text-sm text-white/90">
            {recipe.cookTimeMin} min · {recipe.difficulty} · {recipe.calories}{" "}
            kcal · {recipe.cuisine}
          </p>
        </section>

        {recipe.usesExpiring && (
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
                  <span>{item}</span>
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
                onClick={() => void addMissingToList()}
              >
                Add missing to shopping list
              </Button>
              <Link href="/shopping">
                <Button variant="ghost">View list</Button>
              </Link>
            </div>
          )}
          {(message || error) && (
            <p
              className={`mt-4 text-sm font-medium ${
                message ? "text-emerald-700" : "text-red-600"
              }`}
            >
              {message || error}
            </p>
          )}
        </section>

        <section className="rounded-[1.75rem] border border-[var(--line)] bg-white p-6">
          <h2 className="font-display text-xl font-semibold text-[var(--brand)]">
            Steps overview
          </h2>
          <ol className="mt-4 space-y-3">
            {recipe.instructions.map((step, index) => (
              <li key={step} className="flex gap-3 text-sm">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--brand-glow)] text-xs font-bold text-[var(--brand)]">
                  {index + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
          <div className="mt-6">
            <Link href={`/recipes/${recipe.id}/cook`}>
              <Button className="w-full sm:w-auto">Start cooking</Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
