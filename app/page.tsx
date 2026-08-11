import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/LandingPage";

export const metadata: Metadata = {
  title: "Pantrix — Cook smarter with what you already have",
  description:
    "AI-powered smart pantry for expiry tracking, recipe matches from your ingredients, shopping lists, and nutrition.",
};

export default function HomePage() {
  return <LandingPage />;
}
