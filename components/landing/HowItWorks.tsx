import { SectionHeading } from "./SectionHeading";
import { howItWorksSteps } from "./landing-data";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="How it works"
          title="Three steps from fridge to plate"
          description="A calm kitchen workflow — stock once, cook smarter every day."
        />

        <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {howItWorksSteps.map((item, index) => (
            <li key={item.step} className="relative">
              {index < howItWorksSteps.length - 1 && (
                <span
                  aria-hidden
                  className="absolute left-[calc(100%-0.5rem)] top-6 hidden h-px w-8 bg-[var(--line)] md:block lg:w-16"
                />
              )}
              <p className="font-display text-4xl font-semibold text-[var(--brand-glow)]">
                {item.step}
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-[var(--brand)]">
                {item.title}
              </h3>
              <p className="mt-3 text-[var(--muted)]">{item.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
