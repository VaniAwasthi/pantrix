import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "Shopping List — Pantrix",
  description: "Your smart shopping list is coming soon.",
};

export default function ShoppingPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-xl py-16 text-center">
        <h1 className="font-display text-3xl font-semibold text-[var(--brand)]">
          Shopping List
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          Coming soon — missing recipe ingredients will land here.
        </p>
      </div>
    </AppShell>
  );
}
