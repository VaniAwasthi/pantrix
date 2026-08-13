import type { Metadata } from "next";
import { CookRecipePage } from "@/components/discover/CookRecipePage";

export const metadata: Metadata = {
  title: "Cook — Pantrix",
};

export default function RecipeCookRoute() {
  return <CookRecipePage />;
}
