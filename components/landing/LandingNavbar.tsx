"use client";

import { useState } from "react";
import { Logo } from "@/components/common/Logo";
import { cn } from "@/utils/helpers";
import { CtaLink } from "./CtaLink";
import { landingNavLinks } from "./landing-data";

export function LandingNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)]/70 bg-[#f7faf5]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Logo preload />

        <nav className="hidden items-center gap-1 md:flex">
          {landingNavLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-xl px-3.5 py-2 text-sm font-semibold text-[var(--muted)] transition-colors hover:bg-white/70 hover:text-[var(--brand)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CtaLink
            href="/login"
            variant="ghost"
            size="sm"
            className="hidden sm:inline-flex"
          >
            Sign in
          </CtaLink>
          <CtaLink href="/register" size="sm">
            Get Started
          </CtaLink>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--line)] bg-white/80 text-[var(--brand)] md:hidden"
            aria-expanded={open}
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <span className="relative flex h-3.5 w-4 flex-col justify-between">
              <span
                className={cn(
                  "block h-0.5 w-4 origin-center bg-current transition-transform",
                  open && "translate-y-[6px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-4 bg-current transition-opacity",
                  open && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-4 origin-center bg-current transition-transform",
                  open && "-translate-y-[6px] -rotate-45"
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-[var(--line)]/70 bg-[#f7faf5]/95 px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {landingNavLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-semibold text-[var(--brand)] hover:bg-white/80"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
