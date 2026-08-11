import { Navbar } from "./Navbar";

interface AppShellProps {
  children: React.ReactNode;
  userName?: string;
}

export function AppShell({ children, userName }: AppShellProps) {
  return (
    <div className="page-atmosphere relative min-h-screen">
      <div className="relative z-10">
        <Navbar userName={userName} />
        <main className="mx-auto max-w-6xl px-4 py-8 sm:py-10">{children}</main>
      </div>
    </div>
  );
}
