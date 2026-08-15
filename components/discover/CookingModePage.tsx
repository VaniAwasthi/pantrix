"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { useMatchedRecipe } from "@/hooks/useMatchedRecipe";
import { useCookRecipe } from "@/hooks/useCookRecipe";

export function CookingModePage() {
  const { recipe } = useMatchedRecipe();
  const { cook, cookingId, error } = useCookRecipe();
  const [step, setStep] = useState(0);

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

  const total = recipe.instructions.length;
  const current = recipe.instructions[step] ?? "";
  const last = step >= total - 1;

  return (
    <div className="min-h-screen bg-[#f6f3ee]">
      <Navbar />
      <main className="mx-auto max-w-2xl space-y-8 px-4 py-8 sm:px-6 sm:py-12">
        <Link
          href={`/recipes/${recipe.id}`}
          className="text-sm font-semibold text-[var(--muted)] hover:text-[var(--brand)]"
        >
          ← Recipe details
        </Link>

        <section className="rounded-[1.75rem] bg-[var(--brand)] px-6 py-8 text-white">
          <p className="text-xs font-bold tracking-[0.18em] text-emerald-100/85">
            COOKING MODE
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold">
            {recipe.title}
          </h1>
          <p className="mt-2 text-sm text-emerald-50/90">
            Step {step + 1} of {total} · {recipe.cookTimeMin} min
          </p>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-white"
              style={{ width: `${((step + 1) / total) * 100}%` }}
            />
          </div>
        </section>

        <section className="rounded-[1.75rem] border border-[var(--line)] bg-white p-6 sm:p-8">
          <p className="text-sm font-semibold text-[var(--brand-soft)]">
            Step {step + 1}
          </p>
          <p className="mt-4 font-display text-2xl leading-snug text-[var(--brand)]">
            {current}
          </p>
          {error && (
            <p className="mt-4 text-sm font-medium text-red-600">{error}</p>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              variant="secondary"
              disabled={step === 0}
              onClick={() => setStep((s) => Math.max(0, s - 1))}
            >
              Previous
            </Button>
            {!last ? (
              <Button onClick={() => setStep((s) => Math.min(total - 1, s + 1))}>
                Next step
              </Button>
            ) : (
              <Button
                loading={cookingId === recipe.id}
                onClick={() => void cook(recipe.id, recipe.title)}
              >
                Meal complete
              </Button>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
