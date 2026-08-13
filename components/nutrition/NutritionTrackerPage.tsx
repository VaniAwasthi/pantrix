"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { useKitchenPreferences } from "@/context/KitchenPreferencesContext";
import { nutritionGoals } from "@/components/setup/setup-data";
import { formatDate } from "@/utils/helpers";

type NutritionPayload = {
  today: { meals: number; calories: number; protein: number };
  week: { meals: number; calories: number; protein: number };
  history: {
    id: string;
    recipeId: string;
    recipeTitle: string;
    calories: number;
    protein: number;
    cookTimeMin: number;
    cookedAt: string;
  }[];
};

function calorieTarget(goal: string | null) {
  if (goal === "weight-loss") return 1600;
  if (goal === "low-carb") return 1800;
  if (goal === "high-protein" || goal === "muscle-gain") return 2200;
  return 2000;
}

export function NutritionTrackerPage() {
  const { preferences } = useKitchenPreferences();
  const [data, setData] = useState<NutritionPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/nutrition");
        if (!res.ok) return;
        const json = (await res.json()) as NutritionPayload;
        if (!cancelled) setData(json);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const goal =
    nutritionGoals.find((g) => g.id === preferences.nutritionGoal)?.label ??
    "No specific goal";
  const target = calorieTarget(preferences.nutritionGoal);
  const today = data?.today ?? { meals: 0, calories: 0, protein: 0 };
  const week = data?.week ?? { meals: 0, calories: 0, protein: 0 };
  const progress = Math.min(100, Math.round((today.calories / target) * 100));

  return (
    <AppShell>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-[var(--brand)]">
          Nutrition
        </h1>
        <p className="mt-2 max-w-xl text-[var(--muted)]">
          Totals come from meals you mark as cooked. Goal: {goal}.
        </p>
      </div>

      {loading ? (
        <p className="text-sm text-[var(--muted)]">Loading nutrition…</p>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <Metric label="Today" value={`${today.calories} kcal`} hint={`${today.protein}g protein`} />
            <Metric label="This week" value={`${week.calories} kcal`} hint={`${week.meals} meals`} />
            <Metric label="Protein today" value={`${today.protein}g`} hint={`${today.meals} meals logged`} />
          </div>

          <section className="rounded-[1.75rem] border border-[var(--line)] bg-white p-6">
            <h2 className="font-display text-xl font-semibold text-[var(--brand)]">
              Daily target
            </h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              {today.calories} / {target} kcal
            </p>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-[var(--brand-glow)]">
              <div
                className="h-full rounded-full bg-[var(--brand)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-[var(--line)] bg-white p-6">
            <h2 className="font-display text-xl font-semibold text-[var(--brand)]">
              Cook history
            </h2>
            {!data || data.history.length === 0 ? (
              <div className="mt-4">
                <p className="text-sm text-[var(--muted)]">
                  No meals logged yet this week.
                </p>
                <Link href="/recipes" className="mt-4 inline-block">
                  <Button>Find a recipe</Button>
                </Link>
              </div>
            ) : (
              <ul className="mt-4 divide-y divide-[var(--line)]">
                {data.history.map((log) => (
                  <li
                    key={log.id}
                    className="flex flex-wrap items-center justify-between gap-2 py-3"
                  >
                    <div>
                      <Link
                        href={`/recipes/${log.recipeId}`}
                        className="font-semibold text-[var(--brand)] hover:underline"
                      >
                        {log.recipeTitle}
                      </Link>
                      <p className="text-xs text-[var(--muted)]">
                        {formatDate(log.cookedAt)} · {log.cookTimeMin} min
                      </p>
                    </div>
                    <p className="text-sm font-medium text-[var(--brand)]">
                      {log.calories} kcal · {log.protein}g protein
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}
    </AppShell>
  );
}

function Metric({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-[var(--line)] bg-white p-5">
      <p className="text-xs font-bold uppercase tracking-wide text-[var(--muted)]">
        {label}
      </p>
      <p className="mt-2 font-display text-2xl font-semibold text-[var(--brand)]">
        {value}
      </p>
      <p className="mt-1 text-sm text-[var(--muted)]">{hint}</p>
    </div>
  );
}
