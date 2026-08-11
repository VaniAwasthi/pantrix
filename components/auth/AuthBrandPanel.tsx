import type { ReactNode } from "react";
import { Logo } from "@/components/common/Logo";

export type AuthBrandContent = {
  headline: string;
  support?: string;
  footer?: string;
  preview?: ReactNode;
};

const signInPantry = [
  { name: "Tomato", tone: "fresh" as const },
  { name: "Paneer", tone: "soon" as const },
  { name: "Spinach", tone: "soon" as const },
  { name: "Rice", tone: "fresh" as const },
  { name: "Cumin", tone: "fresh" as const },
];

export const signInBrandContent: AuthBrandContent = {
  headline: "Cook smarter with what you already have.",
  footer: "Your kitchen, intelligently organised.",
  preview: (
    <KitchenPreviewCard
      eyebrow="Kitchen preview"
      title="Tonight's pantry"
      badge="7 matches"
      items={signInPantry}
      stats={[
        { label: "Fresh", value: "14" },
        { label: "Expiring", value: "3" },
        { label: "Recipes", value: "7" },
      ]}
    />
  ),
};

export const signUpBrandContent: AuthBrandContent = {
  headline: "Meet your new kitchen assistant.",
  support:
    "Tell Pantrix what's in your kitchen and we'll help you decide what to cook, what to use first, and what to buy next.",
  footer: "Set up once. Cook smarter every day.",
  preview: (
    <KitchenPreviewCard
      eyebrow="Your intelligent kitchen"
      title="Getting started"
      badge="Fresh start"
      items={[
        { name: "Add groceries", tone: "fresh" },
        { name: "Track expiry", tone: "soon" },
        { name: "Match recipes", tone: "fresh" },
        { name: "Shop smarter", tone: "fresh" },
      ]}
      stats={[
        { label: "Cook", value: "01" },
        { label: "Use", value: "02" },
        { label: "Buy", value: "03" },
      ]}
    />
  ),
};

interface AuthBrandPanelProps {
  content?: AuthBrandContent;
}

export function AuthBrandPanel({
  content = signInBrandContent,
}: AuthBrandPanelProps) {
  return (
    <aside className="relative hidden min-h-screen overflow-hidden bg-[var(--brand)] lg:flex lg:flex-col lg:justify-between lg:p-10 xl:p-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 20% 20%, rgba(216,232,220,0.35), transparent 55%), radial-gradient(ellipse 50% 40% at 90% 80%, rgba(196,120,58,0.22), transparent 50%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10">
        <div className="inline-flex rounded-2xl bg-black/40 p-2 ring-1 ring-white/10">
          <Logo size="sm" />
        </div>
        <h1 className="mt-10 max-w-md font-display text-4xl font-semibold leading-tight text-white xl:text-5xl">
          {content.headline}
        </h1>
        {content.support && (
          <p className="mt-5 max-w-md text-sm leading-relaxed text-emerald-50/85 sm:text-[15px]">
            {content.support}
          </p>
        )}
      </div>

      {content.preview && (
        <div className="relative z-10 my-10">{content.preview}</div>
      )}

      {content.footer && (
        <p className="relative z-10 text-sm font-medium text-emerald-50/80">
          {content.footer}
        </p>
      )}
    </aside>
  );
}

function KitchenPreviewCard({
  eyebrow,
  title,
  badge,
  items,
  stats,
}: {
  eyebrow: string;
  title: string;
  badge: string;
  items: { name: string; tone: "fresh" | "soon" }[];
  stats: { label: string; value: string }[];
}) {
  return (
    <div className="rounded-3xl border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-md">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-emerald-100/75">{eyebrow}</p>
          <p className="font-display text-lg font-semibold text-white">{title}</p>
        </div>
        <span className="shrink-0 rounded-lg bg-white/15 px-2.5 py-1 text-xs font-semibold text-white">
          {badge}
        </span>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item.name}
            className="inline-flex items-center gap-1.5 rounded-xl bg-white/95 px-3 py-1.5 text-sm font-semibold text-[var(--brand)]"
          >
            {item.name}
            {item.tone === "soon" && (
              <span className="rounded-md bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-800">
                Soon
              </span>
            )}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl bg-black/20 px-3 py-3 text-center"
          >
            <p className="font-display text-xl font-semibold text-white">
              {stat.value}
            </p>
            <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-emerald-100/70">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
