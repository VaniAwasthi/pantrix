import Link from "next/link";
import { Logo } from "@/components/common/Logo";
import { APP_NAME } from "@/utils/constants";
import { landingNavLinks } from "./landing-data";

export function LandingFooter() {
  return (
    <footer className="border-t border-[var(--line)]/80 bg-white/40 px-4 py-12 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-sm text-[var(--muted)]">
            Cook smarter with what you already have. Pantrix is your AI-powered
            smart pantry for everyday kitchens.
          </p>
        </div>

        <div className="flex flex-wrap gap-10">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
              Explore
            </p>
            <ul className="space-y-2">
              {landingNavLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm font-medium text-[var(--brand)] hover:text-[var(--brand-soft)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
              Get started
            </p>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/login"
                  className="text-sm font-medium text-[var(--brand)] hover:text-[var(--brand-soft)]"
                >
                  Sign in
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-sm font-medium text-[var(--brand)] hover:text-[var(--brand-soft)]"
                >
                  Create account
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-[var(--line)]/70 pt-6 text-sm text-[var(--muted)]">
        © 2026 {APP_NAME}. Cook smarter. Waste less.
      </div>
    </footer>
  );
}
