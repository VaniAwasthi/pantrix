"use client";

import { useEffect, useMemo, useReducer, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { QuantitySelector } from "@/components/groceries/QuantitySelector";
import {
  pantryApiItemToKitchen,
  useKitchenPantry,
} from "@/context/KitchenPantryContext";
import { groceryCategoryFilters } from "@/components/groceries/groceries-data";
import {
  formatExpiryLabel,
  getExpiryStatus,
} from "@/utils/helpers";

type PantryUiState = {
  userName: string;
  loadingUser: boolean;
  syncingApi: boolean;
};

type PantryUiAction =
  | { type: "USER_LOADED"; name: string }
  | { type: "USER_DONE" }
  | { type: "API_SYNC_START" }
  | { type: "API_SYNC_DONE" };

function pantryUiReducer(
  state: PantryUiState,
  action: PantryUiAction
): PantryUiState {
  switch (action.type) {
    case "USER_LOADED":
      return { ...state, userName: action.name, loadingUser: false };
    case "USER_DONE":
      return { ...state, loadingUser: false };
    case "API_SYNC_START":
      return { ...state, syncingApi: true };
    case "API_SYNC_DONE":
      return { ...state, syncingApi: false };
    default:
      return state;
  }
}

function categoryLabel(category: string) {
  return (
    groceryCategoryFilters.find((c) => c.id === category)?.label ?? category
  );
}

export default function PantryPage() {
  const {
    items,
    hydrated,
    updateQuantity,
    updateExpiry,
    removeItem,
    mergeItems,
    syncItemToApi,
  } = useKitchenPantry();

  const [ui, dispatchUi] = useReducer(pantryUiReducer, {
    userName: "",
    loadingUser: true,
    syncingApi: true,
  });
  const [removingId, setRemovingId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      dispatchUi({ type: "API_SYNC_START" });
      try {
        const [userRes, pantryRes] = await Promise.all([
          fetch("/api/auth/me"),
          fetch("/api/pantry"),
        ]);

        if (!cancelled && userRes.ok) {
          const data = await userRes.json();
          dispatchUi({ type: "USER_LOADED", name: data.user.name });
        } else if (!cancelled) {
          dispatchUi({ type: "USER_DONE" });
        }

        if (!cancelled && pantryRes.ok) {
          const data = await pantryRes.json();
          const apiItems = (data.items ?? []).map(pantryApiItemToKitchen);
          mergeItems(apiItems);
        }
      } catch {
        if (!cancelled) dispatchUi({ type: "USER_DONE" });
      } finally {
        if (!cancelled) dispatchUi({ type: "API_SYNC_DONE" });
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [mergeItems]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof items>();
    for (const item of items) {
      const list = map.get(item.category) ?? [];
      list.push(item);
      map.set(item.category, list);
    }
    return [...map.entries()];
  }, [items]);

  async function handleRemove(id: string) {
    const item = items.find((entry) => entry.id === id);
    setRemovingId(id);
    try {
      if (item?.serverId) {
        await fetch(`/api/pantry/${item.serverId}`, { method: "DELETE" });
      }
      removeItem(id);
    } finally {
      setRemovingId(null);
    }
  }

  const loading = !hydrated || ui.syncingApi;

  return (
    <AppShell userName={ui.userName}>
      <div className="animate-rise mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-[var(--brand)]">
            My Pantry
          </h1>
          <p className="mt-2 max-w-xl text-[var(--muted)]">
            Ingredients, quantities, and expiry dates drive recipe matching —
            items nearing expiry get priority.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/setup/groceries">
            <Button variant="secondary">Add grocery</Button>
          </Link>
          <Link href="/profile">
            <Button variant="ghost">Preferences</Button>
          </Link>
          {items.length > 0 && (
            <Link href="/recipes">
              <Button>Browse Recipes</Button>
            </Link>
          )}
        </div>
      </div>

      <div className="animate-rise rounded-3xl border border-[var(--line)] bg-white/80 p-4 shadow-sm backdrop-blur sm:p-6">
        <h2 className="mb-4 font-display text-xl font-semibold text-[var(--brand)]">
          Your kitchen items ({loading ? "…" : items.length})
        </h2>

        {loading ? (
          <p className="text-sm text-[var(--muted)]">Loading your pantry…</p>
        ) : items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[var(--line)] bg-[#fcfdfb] p-8 text-center">
            <p className="font-display text-2xl font-semibold text-[var(--brand)]">
              No kitchen items yet
            </p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Select ingredients on the kitchen setup page first.
            </p>
            <Link href="/setup/groceries" className="mt-5 inline-block">
              <Button>What&apos;s in your kitchen?</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {grouped.map(([category, categoryItems]) => (
              <section key={category}>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
                  {categoryLabel(category)}
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {categoryItems.map((item) => {
                    const status = getExpiryStatus(item.expiryDate);
                    const statusClass =
                      status === "expired"
                        ? "text-red-600"
                        : status === "expiring-soon"
                          ? "text-amber-700"
                          : "text-[var(--muted)]";

                    return (
                      <article
                        key={item.id}
                        className="flex items-start gap-3 rounded-2xl border border-[var(--line)] bg-white p-4 shadow-sm"
                      >
                        <span
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--brand-glow)] text-2xl"
                          aria-hidden
                        >
                          {item.emoji}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="font-semibold text-[var(--brand)]">
                                {item.name}
                              </h4>
                              <p className="mt-0.5 text-sm text-[var(--muted)]">
                                {item.quantity} {item.unit}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:bg-red-50"
                              loading={removingId === item.id}
                              onClick={() => handleRemove(item.id)}
                            >
                              Remove
                            </Button>
                          </div>
                          <div className="mt-3">
                            <QuantitySelector
                              value={item.quantity}
                              onChange={(qty) => {
                                updateQuantity(item.id, qty);
                                void syncItemToApi(item.id, { quantity: qty });
                              }}
                              step={
                                item.unit === "g" || item.unit === "ml"
                                  ? 50
                                  : 1
                              }
                              min={
                                item.unit === "g" || item.unit === "ml"
                                  ? 50
                                  : 1
                              }
                            />
                          </div>
                          <label className="mt-3 flex flex-col gap-1.5 text-xs font-semibold text-[var(--brand)]">
                            Expiry date
                            <input
                              type="date"
                              value={item.expiryDate}
                              onChange={(e) => {
                                const expiryDate = e.target.value;
                                updateExpiry(item.id, expiryDate);
                                void syncItemToApi(item.id, { expiryDate });
                              }}
                              className="h-10 w-full rounded-xl border border-[var(--line)] bg-[#fcfdfb] px-3 text-sm font-normal text-[var(--foreground)] focus:border-[var(--brand-soft)] focus:outline-none focus:ring-4 focus:ring-[var(--brand-soft)]/15"
                            />
                            <span className={`font-medium ${statusClass}`}>
                              {formatExpiryLabel(item.expiryDate)}
                            </span>
                          </label>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
