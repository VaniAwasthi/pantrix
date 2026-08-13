"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/common/Logo";
import { IngredientChip } from "@/components/setup/IngredientChip";
import { PrimaryButton } from "@/components/setup/PrimaryButton";
import { ProgressIndicator } from "@/components/setup/ProgressIndicator";
import {
  persistKitchenPantry,
  useKitchenPantry,
} from "@/context/KitchenPantryContext";
import { AddIngredientModal } from "./AddIngredientModal";
import { CategoryFilter } from "./CategoryFilter";
import { IngredientSearch } from "./IngredientSearch";
import { PantryItemCard } from "./PantryItemCard";
import { PantrySummary } from "./PantrySummary";
import {
  groceryCatalog,
  groceryCategoryFilters,
  popularIngredients,
  type GroceryCategory,
} from "./groceries-data";

export function AddGroceriesForm() {
  const router = useRouter();
  const {
    items: pantry,
    itemIds: pantryIds,
    toggleCatalog,
    addItem,
    updateQuantity,
    updateExpiry,
    removeItem,
    syncToApi,
  } = useKitchenPantry();

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<GroceryCategory>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const filteredCatalog = useMemo(() => {
    const q = query.trim().toLowerCase();
    return groceryCatalog.filter((item) => {
      const matchesCategory =
        category === "all" || item.category === category;
      const matchesQuery = !q || item.name.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  async function finish(path: "/pantry" | "/recipes") {
    setSaving(true);
    try {
      // Guarantee selections are saved before leaving this page
      persistKitchenPantry(pantry);
      await syncToApi();
      router.push(path);
      router.refresh();
    } finally {
      setSaving(false);
    }
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
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Logo href="/recipes" />
          <div className="flex items-center gap-3">
            <ProgressIndicator currentStep={2} compact />
            <button
              type="button"
              disabled={saving}
              onClick={() => finish("/pantry")}
              className="text-sm font-semibold text-[var(--muted)] transition-colors hover:text-[var(--brand)] disabled:opacity-60"
            >
              Skip for now
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="mb-8 max-w-2xl">
          <h1 className="font-display text-3xl font-semibold text-[var(--brand)] sm:text-4xl">
            What&apos;s in your kitchen?
          </h1>
          <p className="mt-3 text-[var(--muted)] sm:text-lg">
            Tap ingredients you have, then set quantities and expiry dates.
            Recipes prioritize items that expire soon.
          </p>
        </div>

        <div className="space-y-8">
          <section className="rounded-[1.75rem] border border-[var(--line)] bg-white p-5 shadow-[0_16px_40px_-28px_rgba(27,61,47,0.3)] sm:p-8">
            <IngredientSearch value={query} onChange={setQuery} />

            <div className="mt-5">
              <p className="mb-3 text-sm font-semibold text-[var(--brand)]">
                Popular quick-adds
              </p>
              <div className="flex flex-wrap gap-2.5">
                {popularIngredients.map((item) => (
                  <IngredientChip
                    key={item.id}
                    emoji={item.emoji}
                    label={item.name}
                    selected={pantryIds.has(item.id)}
                    onClick={() => toggleCatalog(item)}
                  />
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-[var(--line)] bg-white p-5 shadow-[0_16px_40px_-28px_rgba(27,61,47,0.3)] sm:p-8">
            <h2 className="font-display text-xl font-semibold text-[var(--brand)]">
              Browse by category
            </h2>
            <div className="mt-4">
              <CategoryFilter
                categories={groceryCategoryFilters}
                active={category}
                onChange={setCategory}
              />
            </div>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {filteredCatalog.length === 0 ? (
                <p className="text-sm text-[var(--muted)]">
                  No ingredients match your search.
                </p>
              ) : (
                filteredCatalog.map((item) => (
                  <IngredientChip
                    key={item.id}
                    emoji={item.emoji}
                    label={item.name}
                    selected={pantryIds.has(item.id)}
                    onClick={() => toggleCatalog(item)}
                  />
                ))
              )}
            </div>

            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="mt-5 text-sm font-semibold text-[var(--brand-soft)] transition-colors hover:text-[var(--brand)]"
            >
              + Add custom ingredient
            </button>
          </section>

          <section className="rounded-[1.75rem] border border-[var(--line)] bg-white p-5 shadow-[0_16px_40px_-28px_rgba(27,61,47,0.3)] sm:p-8">
            <h2 className="font-display text-xl font-semibold text-[var(--brand)]">
              Selected for pantry ({pantry.length})
            </h2>
            {pantry.length === 0 ? (
              <p className="mt-3 text-sm text-[var(--muted)]">
                Selected ingredients will appear here — and in My Pantry.
              </p>
            ) : (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {pantry.map((item) => (
                  <PantryItemCard
                    key={item.id}
                    item={item}
                    onQuantityChange={updateQuantity}
                    onExpiryChange={updateExpiry}
                    onRemove={removeItem}
                  />
                ))}
              </div>
            )}
          </section>

          <PantrySummary count={pantry.length} />
        </div>

        <div className="mt-10 space-y-6 border-t border-[var(--line)]/80 pt-8">
          <ProgressIndicator currentStep={2} />
          <div className="flex flex-col-reverse items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link
              href="/setup"
              className="inline-flex h-12 items-center justify-center rounded-2xl px-5 text-sm font-semibold text-[var(--muted)] transition-colors hover:bg-white hover:text-[var(--brand)]"
            >
              Back
            </Link>
            <PrimaryButton
              type="button"
              disabled={saving}
              onClick={() => finish("/pantry")}
              className="sm:min-w-[12rem]"
            >
              {saving ? "Saving to pantry…" : "Save to My Pantry →"}
            </PrimaryButton>
          </div>
        </div>
      </main>

      <AddIngredientModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={(item) => {
          addItem({
            ...item,
            id: `custom-${Date.now()}`,
          });
        }}
      />
    </div>
  );
}
