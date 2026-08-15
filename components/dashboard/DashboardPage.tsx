"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { useKitchenPreferences } from "@/context/KitchenPreferencesContext";
import { formatDate, formatExpiryLabel } from "@/utils/helpers";
import { nutritionGoals } from "@/components/setup/setup-data";

type Overview = {
  pantryCount: number;
  shoppingOpen: number;
  expiringSoon: { id: string; name: string; expiryDate: string }[];
  nutritionToday: { meals: number; calories: number; protein: number };
  nutritionWeek: { meals: number; calories: number; protein: number };
  history: {
    id: string;
    recipeId: string;
    recipeTitle: string;
    calories: number;
    protein: number;
    cookTimeMin: number;
    cookedAt: string;
  }[];
  shopping: { id: string; name: string; checked: boolean }[];
};

function calorieTarget(goal: string | null) {
  if (goal === "weight-loss") return 1600;
  if (goal === "low-carb") return 1800;
  if (goal === "high-protein" || goal === "muscle-gain") return 2200;
  return 2000;
}

export function DashboardPage() {
  const searchParams = useSearchParams();
  const justCooked = searchParams.get("cooked") === "1";
  const { preferences } = useKitchenPreferences();
  const [data, setData] = useState<Overview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/dashboard");
        if (!res.ok) return;
        const json = (await res.json()) as Overview;
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

  const goalLabel =
    nutritionGoals.find((g) => g.id === preferences.nutritionGoal)?.label ??
    "Balanced eating";
  const target = calorieTarget(preferences.nutritionGoal);
  const todayKcal = data?.nutritionToday.calories ?? 0;
  const progress = Math.min(100, Math.round((todayKcal / target) * 100));

  return (
    <AppShell>
      <div className="mb-8">
        <p className="text-xs font-bold tracking-[0.18em] text-[var(--brand-soft)]">
          DASHBOARD
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-[var(--brand)]">
          Your kitchen at a glance
        </h1>
        {justCooked && (
          <p className="mt-3 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
            Meal logged. Pantry, nutrition, and shopping list are updated.
          </p>
        )}
      </div>

      {loading || !data ? (
        <p className="text-sm text-[var(--muted)]">Loading your kitchen…</p>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Stock"
              value={String(data.pantryCount)}
              hint={
                data.expiringSoon.length > 0
                  ? `${data.expiringSoon.length} expiring soon`
                  : "All items look fresh"
              }
              href="/pantry"
            />
            <StatCard
              label="Today"
              value={`${data.nutritionToday.calories} kcal`}
              hint={`${data.nutritionToday.protein}g protein · ${data.nutritionToday.meals} meals`}
              href="/nutrition"
            />
            <StatCard
              label="History"
              value={String(data.history.length)}
              hint="Recent cooked meals"
              href="/nutrition"
            />
            <StatCard
              label="Shopping"
              value={String(data.shoppingOpen)}
              hint={data.shoppingOpen === 1 ? "item to buy" : "items to buy"}
              href="/shopping"
            />
          </div>

          <section className="rounded-[1.75rem] border border-[var(--line)] bg-white p-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="font-display text-xl font-semibold text-[var(--brand)]">
                  Nutrition
                </h2>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  {goalLabel} · {todayKcal} / {target} kcal today
                </p>
              </div>
              <Link href="/nutrition">
                <Button variant="ghost" size="sm">
                  Details
                </Button>
              </Link>
            </div>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-[var(--brand-glow)]">
              <div
                className="h-full rounded-full bg-[var(--brand)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </section>

          <div className="grid gap-6 lg:grid-cols-2">
            <section className="rounded-[1.75rem] border border-[var(--line)] bg-white p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-semibold text-[var(--brand)]">
                  Expiring stock
                </h2>
                <Link href="/pantry" className="text-sm font-semibold text-[var(--brand-soft)]">
                  Pantry
                </Link>
              </div>
              {data.expiringSoon.length === 0 ? (
                <p className="mt-4 text-sm text-[var(--muted)]">
                  Nothing expiring in the next 3 days.
                </p>
              ) : (
                <ul className="mt-4 space-y-2">
                  {data.expiringSoon.slice(0, 6).map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="font-medium text-[var(--brand)]">
                        {item.name}
                      </span>
                      <span className="text-amber-700">
                        {formatExpiryLabel(item.expiryDate)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="rounded-[1.75rem] border border-[var(--line)] bg-white p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-semibold text-[var(--brand)]">
                  Shopping list
                </h2>
                <Link href="/shopping" className="text-sm font-semibold text-[var(--brand-soft)]">
                  Open
                </Link>
              </div>
              {data.shopping.filter((item) => !item.checked).length === 0 ? (
                <p className="mt-4 text-sm text-[var(--muted)]">
                  List is empty. Missing recipe items land here after you cook.
                </p>
              ) : (
                <ul className="mt-4 space-y-2">
                  {data.shopping
                    .filter((item) => !item.checked)
                    .slice(0, 6)
                    .map((item) => (
                      <li key={item.id} className="text-sm text-[var(--foreground)]">
                        {item.name}
                      </li>
                    ))}
                </ul>
              )}
            </section>
          </div>

          <section className="rounded-[1.75rem] border border-[var(--line)] bg-white p-6">
            <h2 className="font-display text-xl font-semibold text-[var(--brand)]">
              Recent cooks
            </h2>
            {data.history.length === 0 ? (
              <div className="mt-4">
                <p className="text-sm text-[var(--muted)]">
                  Cook a recipe to fill history, nutrition, and shopping.
                </p>
                <Link href="/recipes" className="mt-4 inline-block">
                  <Button>Browse recipes</Button>
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

function StatCard({
  label,
  value,
  hint,
  href,
}: {
  label: string;
  value: string;
  hint: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-[1.5rem] border border-[var(--line)] bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <p className="text-xs font-bold uppercase tracking-wide text-[var(--muted)]">
        {label}
      </p>
      <p className="mt-2 font-display text-3xl font-semibold text-[var(--brand)]">
        {value}
      </p>
      <p className="mt-1 text-sm text-[var(--muted)]">{hint}</p>
    </Link>
  );
}
