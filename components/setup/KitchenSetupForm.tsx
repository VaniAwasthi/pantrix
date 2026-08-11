"use client";

import { useRouter } from "next/navigation";
import { Logo } from "@/components/common/Logo";
import { useKitchenPreferences } from "@/context/KitchenPreferencesContext";
import { PreferenceCard } from "./PreferenceCard";
import { PrimaryButton } from "./PrimaryButton";
import { ProgressIndicator } from "./ProgressIndicator";
import {
  cookingTimeOptions,
  cuisinePreferences,
  dietPreferences,
  foodPreferences,
  nutritionGoals,
} from "./setup-data";

export function KitchenSetupForm() {
  const router = useRouter();
  const {
    preferences,
    toggleDiet,
    toggleFood,
    toggleCuisine,
    setCookingTime,
    setNutritionGoal,
    savePreferences,
  } = useKitchenPreferences();

  const diets = new Set(preferences.diets);
  const foods = new Set(preferences.foods);
  const cuisines = new Set(preferences.cuisines);
  const { cookingTime, nutritionGoal } = preferences;

  function goNext() {
    savePreferences();
    router.push("/setup/groceries");
  }

  return (
    <div className="min-h-screen bg-[#f6f3ee]">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 55% 35% at 0% 0%, rgba(216,232,220,0.65), transparent 55%), radial-gradient(ellipse 45% 30% at 100% 0%, rgba(243,228,212,0.55), transparent 50%)",
        }}
      />

      <header className="relative z-10 border-b border-[var(--line)]/70 bg-[#f6f3ee]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Logo href="/recipes" />
          <div className="flex items-center gap-3">
            <ProgressIndicator currentStep={1} compact />
            <button
              type="button"
              onClick={goNext}
              className="text-sm font-semibold text-[var(--muted)] transition-colors hover:text-[var(--brand)]"
            >
              Skip for now
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="mb-10 max-w-2xl">
          <h1 className="font-display text-3xl font-semibold text-[var(--brand)] sm:text-4xl">
            Kitchen onboarding
          </h1>
          <p className="mt-3 text-[var(--muted)] sm:text-lg">
            Tell Pantrix how you like to eat. We&apos;ll personalise recipes,
            groceries, and nutrition from here.
          </p>
        </div>

        <div className="space-y-8">
          <section className="rounded-[1.75rem] border border-[var(--line)] bg-white p-5 shadow-[0_16px_40px_-28px_rgba(27,61,47,0.3)] sm:p-8">
            <h2 className="font-display text-2xl font-semibold text-[var(--brand)]">
              Dietary preference
            </h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Select one or more that match how you usually eat.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {dietPreferences.map((item) => (
                <PreferenceCard
                  key={item.id}
                  emoji={item.emoji}
                  label={item.label}
                  selected={diets.has(item.id)}
                  onClick={() => toggleDiet(item.id)}
                />
              ))}
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-[var(--line)] bg-white p-5 shadow-[0_16px_40px_-28px_rgba(27,61,47,0.3)] sm:p-8">
            <h2 className="font-display text-2xl font-semibold text-[var(--brand)]">
              Food preference
            </h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              What kind of meals do you reach for most often?
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {foodPreferences.map((item) => (
                <PreferenceCard
                  key={item.id}
                  emoji={item.emoji}
                  label={item.label}
                  selected={foods.has(item.id)}
                  onClick={() => toggleFood(item.id)}
                />
              ))}
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-[var(--line)] bg-white p-5 shadow-[0_16px_40px_-28px_rgba(27,61,47,0.3)] sm:p-8">
            <h2 className="font-display text-2xl font-semibold text-[var(--brand)]">
              Favourite cuisines
            </h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Select as many as you like.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {cuisinePreferences.map((item) => (
                <PreferenceCard
                  key={item.id}
                  emoji={item.emoji}
                  label={item.label}
                  selected={cuisines.has(item.id)}
                  onClick={() => toggleCuisine(item.id)}
                />
              ))}
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-[var(--line)] bg-white p-5 shadow-[0_16px_40px_-28px_rgba(27,61,47,0.3)] sm:p-8">
            <h2 className="font-display text-2xl font-semibold text-[var(--brand)]">
              Cooking time
            </h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              How much time do you usually have to cook?
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {cookingTimeOptions.map((item) => (
                <PreferenceCard
                  key={item.id}
                  emoji={item.emoji}
                  label={item.label}
                  selected={cookingTime === item.id}
                  onClick={() =>
                    setCookingTime(
                      cookingTime === item.id ? null : item.id
                    )
                  }
                  className="w-full justify-start"
                />
              ))}
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-[var(--line)] bg-white p-5 shadow-[0_16px_40px_-28px_rgba(27,61,47,0.3)] sm:p-8">
            <h2 className="font-display text-2xl font-semibold text-[var(--brand)]">
              Nutrition goal
            </h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Optional — helps Pantrix tune suggestions to your goals.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {nutritionGoals.map((item) => (
                <PreferenceCard
                  key={item.id}
                  emoji={item.emoji}
                  label={item.label}
                  selected={nutritionGoal === item.id}
                  onClick={() =>
                    setNutritionGoal(
                      nutritionGoal === item.id ? null : item.id
                    )
                  }
                />
              ))}
            </div>
          </section>
        </div>

        <div className="mt-10 space-y-6 border-t border-[var(--line)]/80 pt-8">
          <ProgressIndicator currentStep={1} />
          <div className="flex flex-col-reverse items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={goNext}
              className="h-12 rounded-2xl px-5 text-sm font-semibold text-[var(--muted)] transition-colors hover:bg-white hover:text-[var(--brand)]"
            >
              Skip for now
            </button>
            <PrimaryButton
              type="button"
              onClick={goNext}
              className="sm:min-w-[12rem]"
            >
              Continue →
            </PrimaryButton>
          </div>
        </div>
      </main>
    </div>
  );
}
