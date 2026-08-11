"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { AuthInput } from "./AuthInput";
import { PasswordInput } from "./PasswordInput";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const canSubmit = useMemo(() => {
    return email.trim().length > 0 && password.length > 0 && !loading;
  }, [email, password, loading]);

  function validate() {
    let ok = true;
    setEmailError("");
    setPasswordError("");
    setFormError("");

    if (!email.trim()) {
      setEmailError("Email is required");
      ok = false;
    } else if (!isValidEmail(email.trim())) {
      setEmailError("Enter a valid email address");
      ok = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      ok = false;
    }

    return ok;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setFormError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Invalid email or password");
      }

      router.push("/setup");
      router.refresh();
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Failed to sign in. Try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full rounded-[1.75rem] border border-[var(--line)] bg-white p-6 shadow-[0_20px_50px_-28px_rgba(27,61,47,0.35)] sm:p-8">
      <div className="mb-7">
        <h2 className="font-display text-3xl font-semibold text-[var(--brand)]">
          Welcome back
        </h2>
        <p className="mt-2 text-sm text-[var(--muted)] sm:text-[15px]">
          Sign in to continue to your smart kitchen.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <AuthInput
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          error={emailError}
          disabled={loading}
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
          onChange={(e) => {
            setEmail(e.target.value);
            if (emailError) setEmailError("");
            if (formError) setFormError("");
          }}
        />

        <div className="space-y-2">
          <PasswordInput
            name="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            value={password}
            error={passwordError}
            disabled={loading}
            onChange={(e) => {
              setPassword(e.target.value);
              if (passwordError) setPasswordError("");
              if (formError) setFormError("");
            }}
          />
          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm font-semibold text-[var(--brand-soft)] transition-colors hover:text-[var(--brand)]"
            >
              Forgot password?
            </button>
          </div>
        </div>

        {formError && (
          <div
            role="alert"
            className="rounded-2xl border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700"
          >
            {formError}
          </div>
        )}

        <Button
          type="submit"
          size="lg"
          loading={loading}
          disabled={!canSubmit}
          className="h-12 w-full rounded-2xl"
        >
          Sign In
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-[var(--muted)]">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-[var(--brand)] underline-offset-2 hover:underline"
        >
          Get Started
        </Link>
      </p>
    </div>
  );
}
