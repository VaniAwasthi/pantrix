import type { Metadata } from "next";
import { RecipeDiscoveryPage } from "@/components/discover/RecipeDiscoveryPage";

export const metadata: Metadata = {
  title: "Recipes — Pantrix",
  description:
    "Discover personalised recipes from ingredients already in your pantry.",
};

export default function RecipesPage() {
  return <RecipeDiscoveryPage />;
}
