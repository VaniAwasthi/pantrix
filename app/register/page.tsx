import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { signUpBrandContent } from "@/components/auth/AuthBrandPanel";
import { SignUpForm } from "@/components/auth/SignUpForm";

export const metadata: Metadata = {
  title: "Get Started — Pantrix",
  description:
    "Create your Pantrix account and set up your intelligent kitchen.",
};

export default function RegisterPage() {
  return (
    <AuthShell
      brand={signUpBrandContent}
      mobileFooter="Set up once. Cook smarter every day."
    >
      <SignUpForm />
    </AuthShell>
  );
}
