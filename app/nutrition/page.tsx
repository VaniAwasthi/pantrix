import type { Metadata } from "next";
import { NutritionTrackerPage } from "@/components/nutrition/NutritionTrackerPage";

export const metadata: Metadata = {
  title: "Nutrition — Pantrix",
  description: "Track calories and protein from meals you cook.",
};

export default function NutritionRoute() {
  return <NutritionTrackerPage />;
}
