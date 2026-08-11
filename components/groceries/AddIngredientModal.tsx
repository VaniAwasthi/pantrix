"use client";

import { useState, type ReactNode } from "react";
import { PrimaryButton } from "@/components/setup/PrimaryButton";
import {
  groceryCategoryFilters,
  groceryUnits,
  type GroceryCategory,
  type GroceryUnit,
  type PantryGroceryItem,
} from "./groceries-data";

interface AddIngredientModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (item: Omit<PantryGroceryItem, "id">) => void;
}

export function AddIngredientModal({
  open,
  onClose,
  onAdd,
}: AddIngredientModalProps) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [unit, setUnit] = useState<GroceryUnit>("pieces");
  const [category, setCategory] =
    useState<Exclude<GroceryCategory, "all">>("other");
  const [error, setError] = useState("");

  if (!open) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    const qty = Number(quantity);
    if (!trimmed) {
      setError("Ingredient name is required");
      return;
    }
    if (!qty || qty <= 0) {
      setError("Enter a valid quantity");
      return;
    }

    onAdd({
      name: trimmed,
      emoji: "🧺",
      category,
      quantity: qty,
      unit,
    });

    setName("");
    setQuantity("1");
    setUnit("pieces");
    setCategory("other");
    setError("");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[var(--brand)]/35 p-4 backdrop-blur-sm sm:items-center">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-ingredient-title"
        className="w-full max-w-md rounded-[1.75rem] border border-[var(--line)] bg-white p-6 shadow-2xl"
      >
        <h2
          id="add-ingredient-title"
          className="font-display text-2xl font-semibold text-[var(--brand)]"
        >
          Add custom ingredient
        </h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Add anything that isn&apos;t in the catalog yet.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <Field label="Ingredient name">
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              className={inputClass}
              placeholder="e.g. Fresh coriander"
              required
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Quantity">
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                  setError("");
                }}
                className={inputClass}
                required
              />
            </Field>
            <Field label="Unit">
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value as GroceryUnit)}
                className={inputClass}
              >
                {groceryUnits.map((u) => (
                  <option key={u.value} value={u.value}>
                    {u.label}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Category">
            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as Exclude<GroceryCategory, "all">)
              }
              className={inputClass}
            >
              {groceryCategoryFilters
                .filter((c) => c.id !== "all")
                .map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
            </select>
          </Field>

          {error && (
            <p className="text-sm font-medium text-red-600" role="alert">
              {error}
            </p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="h-12 flex-1 rounded-2xl border border-[var(--line)] text-sm font-semibold text-[var(--brand)] hover:bg-[var(--brand-glow)]/40"
            >
              Cancel
            </button>
            <PrimaryButton type="submit" className="flex-1">
              Add Ingredient
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-semibold text-[var(--brand)]">
      {label}
      {children}
    </label>
  );
}

const inputClass =
  "h-11 w-full rounded-2xl border border-[var(--line)] bg-[#fcfdfb] px-3.5 text-sm font-normal text-[var(--foreground)] focus:border-[var(--brand-soft)] focus:outline-none focus:ring-4 focus:ring-[var(--brand-soft)]/15";
