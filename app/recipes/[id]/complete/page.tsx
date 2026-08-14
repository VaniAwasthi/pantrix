import type { Metadata } from "next";
import { MealCompletePage } from "@/components/discover/MealCompletePage";

export const metadata: Metadata = {
  title: "Meal complete — Pantrix",
};

export default function MealCompleteRoute() {
  return <MealCompletePage />;
}
