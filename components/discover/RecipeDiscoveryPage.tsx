"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PrimaryButton } from "@/components/setup/PrimaryButton";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { useKitchenPantry } from "@/context/KitchenPantryContext";
import { useKitchenPreferences } from "@/context/KitchenPreferencesContext";
import {
  matchRecipesToPantry,
  pickAiSuggestion,
  type MatchedRecipe,
} from "@/lib/matchDiscoverRecipes";
import { AIRecipePrompt } from "./AIRecipePrompt";
import { EmptyRecipeState } from "./EmptyRecipeState";
import { RecipeFilters } from "./RecipeFilters";
import { RecipeGrid } from "./RecipeGrid";
import { RecipeSection } from "./RecipeSection";
import { mockRecipes, type MealFilter } from "./discover-data";

function takeExclusive(
  source: MatchedRecipe[],
  used: Set<string>,
  predicate: (recipe: MatchedRecipe) => boolean
) {
  const picked: MatchedRecipe[] = [];
  for (const recipe of source) {
    if (used.has(recipe.id) || !predicate(recipe)) continue;
    picked.push(recipe);
    used.add(recipe.id);
  }
  return picked;
}

export function RecipeDiscoveryPage() {
  const { items: pantryItems, hydrated: pantryReady } = useKitchenPantry();
  const { preferences, hydrated: prefsReady } = useKitchenPreferences();

  const [meal, setMeal] = useState<MealFilter>("all");
  const [craving, setCraving] = useState("");
  const [favourites, setFavourites] = useState<Record<string, boolean>>({});
  const [asked, setAsked] = useState(false);

  const pantryNames = useMemo(
    () => pantryItems.map((item) => item.name),
    [pantryItems]
  );

  const matched = useMemo(() => {
    if (!pantryReady || !prefsReady) return [];
    return matchRecipesToPantry(mockRecipes, pantryNames, preferences, {
      minMatchPercent: 50,
      maxMissing: 2,
    }).map((recipe) => ({
      ...recipe,
      favourite: favourites[recipe.id] ?? recipe.favourite,
    }));
  }, [pantryReady, prefsReady, pantryNames, preferences, favourites]);

  const filtered = useMemo(() => {
    return matched.filter((recipe) =>
      meal === "all" ? true : recipe.mealType === meal
    );
  }, [matched, meal]);

  const sections = useMemo(() => {
    const used = new Set<string>();
    const useBeforeGone = takeExclusive(filtered, used, (r) =>
      Boolean(r.usesExpiring)
    );
    const readyToCook = takeExclusive(
      filtered,
      used,
      (r) => r.matchPercent >= 90 && r.missing.length === 0
    );
    const almostThere = takeExclusive(
      filtered,
      used,
      (r) => r.missing.length >= 1 && r.missing.length <= 2
    );
    const quickEasy = takeExclusive(
      filtered,
      used,
      (r) => r.cookTimeMin <= 30
    );
    const healthy = takeExclusive(filtered, used, (r) => Boolean(r.healthy));
    const moreMatches = takeExclusive(filtered, used, () => true);

    return {
      useBeforeGone,
      readyToCook,
      almostThere,
      quickEasy,
      healthy,
      moreMatches,
    };
  }, [filtered]);

  const aiPick = useMemo(() => pickAiSuggestion(filtered), [filtered]);

  function toggleFavourite(id: string) {
    setFavourites((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  const loading = !pantryReady || !prefsReady;

  return (
    <div className="min-h-screen bg-[#f6f3ee]">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 50% 30% at 10% 0%, rgba(216,232,220,0.7), transparent 55%), radial-gradient(ellipse 40% 25% at 100% 10%, rgba(243,228,212,0.55), transparent 50%)",
        }}
      />

      <div className="relative">
        <Navbar />

        <main className="mx-auto max-w-6xl space-y-12 px-4 py-8 sm:px-6 sm:py-12">
          <section className="max-w-3xl">
            <p className="text-xs font-bold tracking-[0.18em] text-[var(--brand-soft)]">
              PERSONALISED FOR YOU
            </p>
            <h1 className="mt-3 font-display text-3xl font-semibold text-[var(--brand)] sm:text-5xl">
              What can you cook today?
            </h1>
            <p className="mt-3 text-[var(--muted)] sm:text-lg">
              Recipes matched to your pantry
              {pantryNames.length > 0
                ? ` (${pantryNames.length} items)`
                : ""}{" "}
              and kitchen preferences.
            </p>
          </section>

          <AIRecipePrompt
            value={craving}
            onChange={setCraving}
            onAsk={() => setAsked(true)}
          />

          {asked && craving && (
            <p className="rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm text-[var(--muted)]">
              Showing ideas inspired by “{craving}” — AI matching will plug in
              here later.
            </p>
          )}

          <RecipeFilters activeMeal={meal} onMealChange={setMeal} />

          {loading ? (
            <p className="text-sm text-[var(--muted)]">
              Matching recipes to your pantry…
            </p>
          ) : pantryNames.length === 0 ? (
            <div className="rounded-[1.75rem] border border-dashed border-[var(--line)] bg-white p-10 text-center">
              <h2 className="font-display text-2xl font-semibold text-[var(--brand)]">
                Add kitchen items first
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-[var(--muted)]">
                Recipes are based on what you selected in &ldquo;What&apos;s in
                your kitchen&rdquo;. Add ingredients to see matches.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link href="/setup/groceries">
                  <Button>Add kitchen items</Button>
                </Link>
                <Link href="/setup">
                  <Button variant="secondary">Edit preferences</Button>
                </Link>
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="space-y-6">
              <EmptyRecipeState onAsk={() => setAsked(true)} />
              <p className="text-center text-sm text-[var(--muted)]">
                No recipes match your current pantry and preferences. Try adding
                more ingredients or relaxing cooking-time / diet filters.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/setup/groceries">
                  <Button variant="secondary">Update pantry</Button>
                </Link>
                <Link href="/setup">
                  <Button variant="ghost">Edit preferences</Button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              {aiPick && (
                <section className="overflow-hidden rounded-[1.75rem] bg-[var(--brand)] px-6 py-8 text-white sm:px-8">
                  <p className="text-sm font-semibold tracking-wide text-emerald-100/85">
                    Pantrix AI Pick ✦
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
                    {aiPick.reasonTitle}
                  </h2>
                  <p className="mt-4 font-display text-xl text-emerald-50">
                    {aiPick.recipeTitle}
                  </p>
                  <p className="mt-2 max-w-xl text-sm text-emerald-50/85">
                    {aiPick.reason}
                  </p>
                  <div className="mt-6">
                    <PrimaryButton
                      type="button"
                      className="bg-white text-[var(--brand)] hover:bg-emerald-50"
                    >
                      Cook This
                    </PrimaryButton>
                  </div>
                </section>
              )}

              {sections.useBeforeGone.length > 0 && (
                <RecipeSection
                  title="Use It Before It's Gone"
                  description="Recipes using ingredients nearing expiry."
                >
                  <RecipeGrid
                    recipes={sections.useBeforeGone}
                    onToggleFavourite={toggleFavourite}
                  />
                </RecipeSection>
              )}

              {sections.readyToCook.length > 0 && (
                <RecipeSection
                  title="Ready to Cook"
                  description="You have every ingredient."
                >
                  <RecipeGrid
                    recipes={sections.readyToCook}
                    onToggleFavourite={toggleFavourite}
                  />
                </RecipeSection>
              )}

              {sections.almostThere.length > 0 && (
                <RecipeSection
                  title="Almost There"
                  description="Missing just 1–2 ingredients."
                >
                  <RecipeGrid
                    recipes={sections.almostThere}
                    onToggleFavourite={toggleFavourite}
                    onAddMissing={() => undefined}
                  />
                </RecipeSection>
              )}

              {sections.quickEasy.length > 0 && (
                <RecipeSection
                  title="Quick & Easy"
                  description="Under 30 minutes."
                >
                  <RecipeGrid
                    recipes={sections.quickEasy}
                    onToggleFavourite={toggleFavourite}
                  />
                </RecipeSection>
              )}

              {sections.healthy.length > 0 && (
                <RecipeSection
                  title="Healthy Picks"
                  description="Based on lighter nutrition preferences."
                >
                  <RecipeGrid
                    recipes={sections.healthy}
                    onToggleFavourite={toggleFavourite}
                  />
                </RecipeSection>
              )}

              {sections.moreMatches.length > 0 && (
                <RecipeSection
                  title="More from your pantry"
                  description="Other recipes matched to what you have."
                >
                  <RecipeGrid
                    recipes={sections.moreMatches}
                    onToggleFavourite={toggleFavourite}
                    onAddMissing={() => undefined}
                  />
                </RecipeSection>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
