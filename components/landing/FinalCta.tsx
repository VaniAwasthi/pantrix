import { CtaLink } from "./CtaLink";

export function FinalCta() {
  return (
    <section className="px-4 pb-20 sm:px-6">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[var(--brand)] px-6 py-14 text-center text-white sm:px-12 sm:py-16">
        <p className="text-sm font-semibold tracking-wide text-emerald-100/80">
          Ready when you are
        </p>
        <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
          Your fridge has more ideas than you think.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-emerald-50/85">
          Start with what you already bought. Pantrix helps you cook it well,
          waste less, and shop with intention.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <CtaLink
            href="/register"
            className="bg-white text-[var(--brand)] hover:bg-emerald-50"
          >
            Start Your Pantry
          </CtaLink>
          <CtaLink
            href="#features"
            variant="ghost"
            className="text-white hover:bg-white/10"
          >
            Explore features
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
