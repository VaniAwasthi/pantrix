import { CtaLink } from "./CtaLink";
import { HeroKitchenMock } from "./HeroKitchenMock";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-20">
        <div className="animate-rise relative z-10 max-w-xl">
          <span className="inline-flex items-center rounded-full border border-[var(--line)] bg-white/80 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-[var(--brand-soft)] shadow-sm">
            Your AI-powered smart pantry
          </span>

          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.08] text-[var(--brand)] sm:text-5xl lg:text-[3.35rem]">
            Cook smarter with what you already have.
          </h1>

          <p className="mt-5 max-w-md text-base text-[var(--muted)] sm:text-lg">
            Pantrix turns your groceries into meals, tracks expiry before waste,
            and builds shopping lists only for what is truly missing.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <CtaLink href="/register">Start Your Pantry</CtaLink>
            <CtaLink href="#how-it-works" variant="secondary">
              See How It Works
            </CtaLink>
          </div>
        </div>

        <div className="animate-rise stagger-2 relative z-10 flex justify-center lg:justify-end">
          <HeroKitchenMock />
        </div>
      </div>
    </section>
  );
}
