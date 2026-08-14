"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "@/components/common/Logo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/helpers";

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/pantry", label: "Pantry" },
  { href: "/recipes", label: "Recipes" },
  { href: "/shopping", label: "Shopping" },
  { href: "/nutrition", label: "Nutrition" },
  { href: "/profile", label: "Profile" },
] as const;

interface NavbarProps {
  userName?: string;
}

export function Navbar({ userName }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)]/80 bg-[#f6f3ee]/95 backdrop-blur-xl">
      <div className="relative z-50 mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Logo href="/dashboard" />

        <nav
          className="hidden items-center gap-1 rounded-2xl bg-white/80 p-1 lg:flex"
          aria-label="Main"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "cursor-pointer rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-200",
                isActive(link.href)
                  ? "bg-[var(--brand)] text-white shadow-sm"
                  : "text-[var(--muted)] hover:bg-[var(--brand-glow)]/60 hover:text-[var(--brand)]"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {userName ? (
            <Link
              href="/profile"
              className="hidden max-w-[10rem] truncate rounded-full bg-[var(--brand-glow)] px-3 py-1 text-sm font-medium text-[var(--brand)] hover:bg-[var(--brand-glow)] sm:inline"
            >
              {userName}
            </Link>
          ) : (
            <Link
              href="/profile"
              className="hidden text-sm font-semibold text-[var(--muted)] hover:text-[var(--brand)] sm:inline"
            >
              Profile
            </Link>
          )}
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>

      <nav
        className="relative z-50 flex gap-1 overflow-x-auto border-t border-[var(--line)]/60 px-4 py-2 lg:hidden"
        aria-label="Main mobile"
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "cursor-pointer shrink-0 rounded-xl px-3 py-1.5 text-sm font-semibold transition-colors",
              isActive(link.href)
                ? "bg-[var(--brand)] text-white"
                : "bg-white text-[var(--muted)] hover:text-[var(--brand)]"
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
