import { mockKitchenPreview } from "./landing-data";

export function HeroKitchenMock() {
  const {
    pantryCount,
    expiringSoon,
    recipeMatches,
    nutritionScore,
    expiring,
    recipes,
    shoppingItems,
  } = mockKitchenPreview;

  return (
    <div className="landing-mock relative w-full max-w-lg lg:max-w-none">
      <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[var(--brand-glow)] via-transparent to-[var(--accent-soft)] opacity-80 blur-2xl" />

      <div className="relative overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-[#fcfdfb] shadow-[0_24px_60px_-28px_rgba(27,61,47,0.45)]">
        <div className="flex items-center justify-between border-b border-[var(--line)]/80 bg-[var(--brand)] px-5 py-3.5 text-white">
          <div>
            <p className="text-xs font-medium text-emerald-100/80">
              Kitchen overview
            </p>
            <p className="font-display text-lg font-semibold">Your kitchen</p>
          </div>
          <span className="rounded-lg bg-white/10 px-2.5 py-1 text-xs font-semibold">
            Live preview
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-4 sm:p-5">
          <Stat label="Pantry" value={String(pantryCount)} tone="text-[var(--brand)]" />
          <Stat label="Expiring" value={String(expiringSoon)} tone="text-amber-700" />
          <Stat
            label="Recipes"
            value={String(recipeMatches)}
            tone="text-[var(--brand-soft)]"
          />
          <Stat label="Nutrition" value={nutritionScore} tone="text-[var(--accent)]" />
        </div>

        <div className="grid gap-4 border-t border-[var(--line)]/70 p-4 sm:grid-cols-2 sm:p-5">
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
              Expiring groceries
            </h3>
            <ul className="space-y-2">
              {expiring.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center justify-between rounded-xl bg-amber-50/80 px-3 py-2 text-sm"
                >
                  <span className="font-semibold text-[var(--brand)]">
                    {item.name}
                  </span>
                  <span className="text-amber-800">{item.days}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
              Recipe matches
            </h3>
            <ul className="space-y-2">
              {recipes.map((item) => (
                <li
                  key={item.title}
                  className="flex items-center justify-between rounded-xl bg-[var(--brand-glow)]/60 px-3 py-2 text-sm"
                >
                  <span className="font-semibold text-[var(--brand)]">
                    {item.title}
                  </span>
                  <span className="text-[var(--brand-soft)]">{item.tag}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid gap-4 border-t border-[var(--line)]/70 bg-[var(--surface-muted)]/40 p-4 sm:grid-cols-2 sm:p-5">
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
              Nutrition pulse
            </h3>
            <div className="rounded-xl bg-white px-3 py-3">
              <div className="mb-2 flex items-end justify-between">
                <span className="font-display text-2xl font-semibold text-[var(--brand)]">
                  {nutritionScore}
                </span>
                <span className="text-xs text-[var(--muted)]">weekly balance</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[var(--surface-muted)]">
                <div className="h-full w-[82%] rounded-full bg-[var(--brand-soft)]" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
              Shopping list
            </h3>
            <ul className="space-y-1.5 rounded-xl bg-white px-3 py-3">
              {shoppingItems.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-[var(--brand)]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: string;
}) {
  return (
    <div className="rounded-xl border border-[var(--line)]/70 bg-white px-3 py-3 text-center">
      <p className={`font-display text-2xl font-semibold ${tone}`}>{value}</p>
      <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-[var(--muted)]">
        {label}
      </p>
    </div>
  );
}
