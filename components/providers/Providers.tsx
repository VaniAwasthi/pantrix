"use client";

import { KitchenPantryProvider } from "@/context/KitchenPantryContext";
import { KitchenPreferencesProvider } from "@/context/KitchenPreferencesContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <KitchenPreferencesProvider>
      <KitchenPantryProvider>{children}</KitchenPantryProvider>
    </KitchenPreferencesProvider>
  );
}
