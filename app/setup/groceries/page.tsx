import type { Metadata } from "next";
import { AddGroceriesForm } from "@/components/groceries/AddGroceriesForm";

export const metadata: Metadata = {
  title: "Add Your Groceries — Pantrix",
  description:
    "Add groceries from your kitchen so Pantrix can suggest meals you can cook.",
};

export default function AddGroceriesPage() {
  return <AddGroceriesForm />;
}
