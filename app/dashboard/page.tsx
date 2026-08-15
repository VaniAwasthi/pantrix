import type { Metadata } from "next";
import { Suspense } from "react";
import { DashboardPage } from "@/components/dashboard/DashboardPage";

export const metadata: Metadata = {
  title: "Dashboard — Pantrix",
  description: "Stock, nutrition, cook history, and shopping in one place.",
};

export default function DashboardRoute() {
  return (
    <Suspense
      fallback={
        <div className="px-4 py-10 text-sm text-[var(--muted)]">
          Loading dashboard…
        </div>
      }
    >
      <DashboardPage />
    </Suspense>
  );
}
