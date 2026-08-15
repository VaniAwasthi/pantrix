"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { useMatchedRecipe } from "@/hooks/useMatchedRecipe";
import {
  LAST_COOK_STORAGE_KEY,
  type StoredCookResult,
} from "@/lib/cookClient";

export function MealCompletePage() {
  const { recipe } = useMatchedRecipe();
  const [result, setResult] = useState<StoredCookResult | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(LAST_COOK_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as StoredCookResult;
      if (!recipe || parsed.recipeId === recipe.id) setResult(parsed);
    } catch {
      setResult(null);
    }
  }, [recipe]);

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

  return (
    <div className="min-h-screen bg-[#f6f3ee]">
      <Navbar />
      <main className="mx-auto max-w-2xl space-y-8 px-4 py-8 sm:px-6 sm:py-12">
        <section className="rounded-[1.75rem] bg-[var(--brand)] px-6 py-10 text-white">
          <p className="text-xs font-bold tracking-[0.18em] text-emerald-100/85">
            MEAL COMPLETE
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
            {recipe.title} is logged
          </h1>
          <p className="mt-3 max-w-lg text-sm text-emerald-50/90">
            Pantry stock, nutrition, history, and shopping are updated.
          </p>
        </section>

        <div className="grid gap-4 sm:grid-cols-3">
          <Stat
            label="Stock used"
            value={String(result?.deducted.length ?? 0)}
            href="/pantry"
          />
          <Stat
            label="Shopping added"
            value={String(result?.shoppingAdded.length ?? 0)}
            href="/shopping"
          />
          <Stat
            label="Calories"
            value={`${recipe.calories}`}
            href="/nutrition"
          />
        </div>

        {result?.deducted && result.deducted.length > 0 && (
          <section className="rounded-[1.75rem] border border-[var(--line)] bg-white p-6">
            <h2 className="font-display text-xl font-semibold text-[var(--brand)]">
              Pantry updated
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              {result.deducted.map((item) => (
                <li key={item.name} className="flex justify-between">
                  <span>{item.name}</span>
                  <span className="text-[var(--muted)]">
                    {item.removed ? "Used up" : `${item.remaining} left`}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {result?.shoppingAdded && result.shoppingAdded.length > 0 && (
          <section className="rounded-[1.75rem] border border-[var(--line)] bg-white p-6">
            <h2 className="font-display text-xl font-semibold text-[var(--brand)]">
              Added to shopping list
            </h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              {result.shoppingAdded.join(", ")}
            </p>
          </section>
        )}

        <div className="flex flex-wrap gap-3">
          <Link href="/dashboard">
            <Button>Dashboard</Button>
          </Link>
          <Link href="/nutrition">
            <Button variant="secondary">Nutrition</Button>
          </Link>
          <Link href="/shopping">
            <Button variant="ghost">Shopping list</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}

function Stat({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-[1.5rem] border border-[var(--line)] bg-white p-5"
    >
      <p className="text-xs font-bold uppercase tracking-wide text-[var(--muted)]">
        {label}
      </p>
      <p className="mt-2 font-display text-2xl font-semibold text-[var(--brand)]">
        {value}
      </p>
    </Link>
  );
}
