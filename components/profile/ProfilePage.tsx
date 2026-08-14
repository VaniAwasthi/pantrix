"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { useKitchenPreferences } from "@/context/KitchenPreferencesContext";
import {
  cookingTimeOptions,
  cuisinePreferences,
  dietPreferences,
  nutritionGoals,
} from "@/components/setup/setup-data";

export function ProfilePage() {
  const router = useRouter();
  const { preferences } = useKitchenPreferences();
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) setUser({ name: data.user.name, email: data.user.email });
      })
      .catch(() => undefined);
  }, []);

  const diet =
    dietPreferences
      .filter((item) => preferences.diets.includes(item.id))
      .map((item) => item.label)
      .join(", ") || "Not set";
  const cuisine =
    cuisinePreferences
      .filter((item) => preferences.cuisines.includes(item.id))
      .map((item) => item.label)
      .join(", ") || "Not set";
  const time =
    cookingTimeOptions.find((item) => item.id === preferences.cookingTime)
      ?.label ?? "Not set";
  const goal =
    nutritionGoals.find((item) => item.id === preferences.nutritionGoal)
      ?.label ?? "Not set";

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <AppShell userName={user?.name}>
      <h1 className="font-display text-3xl font-semibold text-[var(--brand)]">
        Profile
      </h1>
      <p className="mt-2 text-[var(--muted)]">
        Account, kitchen preferences, and settings.
      </p>

      <div className="mt-8 space-y-6">
        <section className="rounded-[1.75rem] border border-[var(--line)] bg-white p-6">
          <h2 className="font-display text-xl font-semibold text-[var(--brand)]">
            Account
          </h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-[var(--muted)]">Name</dt>
              <dd className="font-semibold text-[var(--brand)]">
                {user?.name ?? "…"}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[var(--muted)]">Email</dt>
              <dd className="font-semibold text-[var(--brand)]">
                {user?.email ?? "…"}
              </dd>
            </div>
          </dl>
        </section>

        <section className="rounded-[1.75rem] border border-[var(--line)] bg-white p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-xl font-semibold text-[var(--brand)]">
              Preferences
            </h2>
            <Link href="/setup">
              <Button variant="secondary" size="sm">
                Edit
              </Button>
            </Link>
          </div>
          <dl className="mt-4 space-y-3 text-sm">
            <Row label="Diet" value={diet} />
            <Row label="Cuisine" value={cuisine} />
            <Row label="Cooking time" value={time} />
            <Row label="Nutrition goal" value={goal} />
          </dl>
        </section>

        <section className="rounded-[1.75rem] border border-[var(--line)] bg-white p-6">
          <h2 className="font-display text-xl font-semibold text-[var(--brand)]">
            Settings
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/setup/groceries">
              <Button variant="secondary">Edit pantry groceries</Button>
            </Link>
            <Button variant="ghost" onClick={() => void logout()}>
              Log out
            </Button>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-[var(--muted)]">{label}</dt>
      <dd className="text-right font-semibold text-[var(--brand)]">{value}</dd>
    </div>
  );
}
