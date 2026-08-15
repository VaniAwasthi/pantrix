import type { Metadata } from "next";
import { RecipeDetailsPage } from "@/components/discover/RecipeDetailsPage";

export const metadata: Metadata = {
  title: "Recipe — Pantrix",
};

export default function RecipeDetailsRoute() {
  return <RecipeDetailsPage />;
}
