import type { Metadata } from "next";
import { CookingModePage } from "@/components/discover/CookingModePage";

export const metadata: Metadata = {
  title: "Cooking — Pantrix",
};

export default function CookingModeRoute() {
  return <CookingModePage />;
}
