import type { Metadata } from "next";
import { ShoppingListPage } from "@/components/shopping/ShoppingListPage";

export const metadata: Metadata = {
  title: "Shopping List — Pantrix",
  description: "Buy the ingredients you are missing.",
};

export default function ShoppingRoute() {
  return <ShoppingListPage />;
}
