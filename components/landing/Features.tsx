import { SectionHeading } from "./SectionHeading";
import { smartFeatures } from "./landing-data";

export function Features() {
  return (
    <section
      id="features"
      className="scroll-mt-24 border-y border-[var(--line)]/70 bg-white/50 px-4 py-20 sm:px-6"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Smart kitchen features"
          title="Everything your kitchen was missing"
          description="Expiry awareness, recipe intelligence, shopping clarity, and nutrition — in one place."
        />

        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2">
          {smartFeatures.map((feature, index) => (
            <article key={feature.title} className="max-w-md">
              <div className="mb-3 flex items-baseline gap-3">
                <span className="font-display text-sm font-semibold text-[var(--accent)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-2xl font-semibold text-[var(--brand)]">
                  {feature.title}
                </h3>
              </div>
              <p className="text-[var(--muted)]">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
