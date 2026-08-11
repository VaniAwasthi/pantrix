import { SectionHeading } from "./SectionHeading";
import { demoPantryItems, demoRecipes } from "./landing-data";

export function RecipeIntelligence() {
  return (
    <section id="recipes" className="scroll-mt-24 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Recipe intelligence"
          title="Your pantry becomes tonight’s menu"
          description="Add ingredients once. Pantrix suggests dishes you can actually cook — no missing spices, no surprise shopping runs."
        />

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
              Example pantry
            </h3>
            <ul className="flex flex-wrap gap-2.5">
              {demoPantryItems.map((item) => (
                <li
                  key={item.name}
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--line)] bg-white/90 px-3.5 py-2 text-sm shadow-sm"
                >
                  <span className="font-semibold text-[var(--brand)]">
                    {item.name}
                  </span>
                  <span className="text-[var(--muted)]">{item.qty}</span>
                  {item.status === "expiring" && (
                    <span className="rounded-md bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-800">
                      Soon
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
              Suggested tonight
            </h3>
            <ul className="space-y-3">
              {demoRecipes.map((recipe) => (
                <li
                  key={recipe.title}
                  className="rounded-2xl border border-[var(--line)] bg-gradient-to-br from-white to-[var(--brand-glow)]/30 px-5 py-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="font-display text-xl font-semibold text-[var(--brand)]">
                      {recipe.title}
                    </h4>
                    <span className="rounded-lg bg-[var(--brand)] px-2.5 py-1 text-xs font-semibold text-white">
                      {recipe.match}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-[var(--muted)]">{recipe.uses}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
