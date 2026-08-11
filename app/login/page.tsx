import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { SignInForm } from "@/components/auth/SignInForm";

export const metadata: Metadata = {
  title: "Sign In — Pantrix",
  description: "Sign in to your Pantrix smart kitchen.",
};

export default function LoginPage() {
  return (
    <AuthShell>
      <SignInForm />
    </AuthShell>
  );
}
