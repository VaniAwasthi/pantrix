import type { ReactNode } from "react";
import { Logo } from "@/components/common/Logo";
import {
  AuthBrandPanel,
  signInBrandContent,
  type AuthBrandContent,
} from "./AuthBrandPanel";

interface AuthShellProps {
  children: ReactNode;
  brand?: AuthBrandContent;
  mobileFooter?: string;
}

export function AuthShell({
  children,
  brand = signInBrandContent,
  mobileFooter = "Your kitchen, intelligently organised.",
}: AuthShellProps) {
  return (
    <div className="min-h-screen bg-[#f6f3ee] lg:grid lg:grid-cols-[46%_1fr] xl:grid-cols-[48%_1fr]">
      <AuthBrandPanel content={brand} />

      <div className="relative flex min-h-screen flex-col justify-center px-4 py-10 sm:px-8 lg:px-12 xl:px-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 100% 0%, rgba(243,228,212,0.7), transparent 55%), radial-gradient(ellipse 50% 35% at 0% 100%, rgba(216,232,220,0.55), transparent 50%)",
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-md">
          <div className="mb-8 flex justify-center lg:hidden">
            <div className="rounded-2xl bg-black/90 p-2 shadow-lg ring-1 ring-black/10">
              <Logo size="sm" />
            </div>
          </div>

          {children}

          <p className="mt-8 text-center text-xs text-[var(--muted)] lg:hidden">
            {mobileFooter}
          </p>
        </div>
      </div>
    </div>
  );
}
