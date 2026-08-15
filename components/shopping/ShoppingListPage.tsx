"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { useKitchenPantry } from "@/context/KitchenPantryContext";
import { useKitchenPreferences } from "@/context/KitchenPreferencesContext";
import { matchRecipesToPantry } from "@/lib/matchDiscoverRecipes";
import { mockRecipes } from "@/components/discover/discover-data";

type ShoppingItem = {
  id: string;
  name: string;
  quantity: string | null;
  checked: boolean;
};

export function ShoppingListPage() {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const { items: pantryItems, hydrated } = useKitchenPantry();
  const { preferences } = useKitchenPreferences();

  async function load() {
    const res = await fetch("/api/shopping");
    if (res.ok) {
      const data = await res.json();
      setItems(data.items ?? []);
    }
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  async function autoGenerate() {
    setGenerating(true);
    try {
      const matched = matchRecipesToPantry(
        mockRecipes,
        pantryItems.map((item) => ({
          name: item.name,
          expiryDate: item.expiryDate,
        })),
        preferences
      );
      const names = [
        ...new Set(matched.flatMap((recipe) => recipe.missing)),
      ];
      if (names.length === 0) return;
      const res = await fetch("/api/shopping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ names, source: "auto" }),
      });
      if (res.ok) {
        const data = await res.json();
        setItems(data.items ?? []);
      }
    } finally {
      setGenerating(false);
    }
  }

  async function addItem(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    setSaving(true);
    try {
      const res = await fetch("/api/shopping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmed }),
      });
      if (res.ok) {
        const data = await res.json();
        setItems(data.items ?? []);
        setName("");
      }
    } finally {
      setSaving(false);
    }
  }

  async function toggle(id: string, checked: boolean) {
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, checked } : item))
    );
    await fetch(`/api/shopping/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ checked }),
    });
  }

  async function remove(id: string) {
    setItems((current) => current.filter((item) => item.id !== id));
    await fetch(`/api/shopping/${id}`, { method: "DELETE" });
  }

  const open = items.filter((item) => !item.checked);
  const done = items.filter((item) => item.checked);

  return (
    <AppShell>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-[var(--brand)]">
          Shopping list
        </h1>
        <p className="mt-2 max-w-xl text-[var(--muted)]">
          Add items yourself, auto-generate from recipe gaps, then mark them
          purchased.
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <form onSubmit={addItem} className="flex flex-1 gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Add an item"
            className="h-12 flex-1 rounded-2xl border border-[var(--line)] bg-white px-4 text-sm focus:border-[var(--brand-soft)] focus:outline-none focus:ring-4 focus:ring-[var(--brand-soft)]/15"
          />
          <Button type="submit" loading={saving}>
            Add
          </Button>
        </form>
        <Button
          type="button"
          variant="secondary"
          loading={generating}
          disabled={!hydrated}
          onClick={() => void autoGenerate()}
        >
          Auto-generate
        </Button>
      </div>

      {loading ? (
        <p className="text-sm text-[var(--muted)]">Loading list…</p>
      ) : items.length === 0 ? (
        <div className="rounded-[1.75rem] border border-dashed border-[var(--line)] bg-white p-10 text-center">
          <p className="font-display text-2xl font-semibold text-[var(--brand)]">
            Nothing to buy yet
          </p>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Cook a recipe with missing items, or add something above.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <section className="rounded-[1.75rem] border border-[var(--line)] bg-white p-6">
            <h2 className="font-display text-xl font-semibold text-[var(--brand)]">
              To buy ({open.length})
            </h2>
            {open.length === 0 ? (
              <p className="mt-3 text-sm text-[var(--muted)]">All done.</p>
            ) : (
              <ul className="mt-4 space-y-2">
                {open.map((item) => (
                  <ShoppingRow
                    key={item.id}
                    item={item}
                    onToggle={toggle}
                    onRemove={remove}
                  />
                ))}
              </ul>
            )}
          </section>

          {done.length > 0 && (
            <section className="rounded-[1.75rem] border border-[var(--line)] bg-white p-6">
              <h2 className="font-display text-xl font-semibold text-[var(--muted)]">
                Purchased ({done.length})
              </h2>
              <ul className="mt-4 space-y-2">
                {done.map((item) => (
                  <ShoppingRow
                    key={item.id}
                    item={item}
                    onToggle={toggle}
                    onRemove={remove}
                  />
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </AppShell>
  );
}

function ShoppingRow({
  item,
  onToggle,
  onRemove,
}: {
  item: ShoppingItem;
  onToggle: (id: string, checked: boolean) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <li className="flex items-center gap-3 rounded-2xl border border-[var(--line)] px-3 py-2">
      <input
        type="checkbox"
        checked={item.checked}
        onChange={(e) => onToggle(item.id, e.target.checked)}
        className="h-4 w-4 accent-[var(--brand)]"
      />
      <span
        className={`flex-1 text-sm ${
          item.checked
            ? "text-[var(--muted)] line-through"
            : "text-[var(--foreground)]"
        }`}
      >
        {item.name}
      </span>
      <button
        type="button"
        onClick={() => onRemove(item.id)}
        className="text-sm font-semibold text-red-600 hover:text-red-700"
      >
        Remove
      </button>
    </li>
  );
}
