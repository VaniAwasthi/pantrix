import type { Metadata } from "next";
import { KitchenSetupForm } from "@/components/setup/KitchenSetupForm";

export const metadata: Metadata = {
  title: "Kitchen Onboarding — Pantrix",
  description:
    "Set your diet, food preferences, cuisines, cooking time, and nutrition goals.",
};

export default function KitchenSetupPage() {
  return <KitchenSetupForm />;
}
