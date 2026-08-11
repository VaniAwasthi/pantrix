"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { AuthCheckbox } from "./AuthCheckbox";
import { AuthInput } from "./AuthInput";
import { PasswordInput } from "./PasswordInput";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function SignUpForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [termsError, setTermsError] = useState("");
  const [formError, setFormError] = useState("");

  const [loading, setLoading] = useState(false);

  const canSubmit = useMemo(() => {
    return (
      name.trim().length > 0 &&
      email.trim().length > 0 &&
      password.length > 0 &&
      confirmPassword.length > 0 &&
      acceptedTerms &&
      !loading
    );
  }, [name, email, password, confirmPassword, acceptedTerms, loading]);

  function clearAlerts() {
    if (formError) setFormError("");
  }

  function validate() {
    let ok = true;
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmError("");
    setTermsError("");
    setFormError("");

    if (!name.trim()) {
      setNameError("Full name is required");
      ok = false;
    }

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
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      ok = false;
    }

    if (!confirmPassword) {
      setConfirmError("Confirm your password");
      ok = false;
    } else if (confirmPassword !== password) {
      setConfirmError("Passwords do not match");
      ok = false;
    }

    if (!acceptedTerms) {
      setTermsError("Please accept the Terms & Conditions");
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
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create account");
      }

      router.push("/setup");
      router.refresh();
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Failed to create account."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full rounded-[1.75rem] border border-[var(--line)] bg-white p-6 shadow-[0_20px_50px_-28px_rgba(27,61,47,0.35)] sm:p-8">
      <div className="mb-7">
        <h2 className="font-display text-3xl font-semibold text-[var(--brand)]">
          Create your Pantrix
        </h2>
        <p className="mt-2 text-sm text-[var(--muted)] sm:text-[15px]">
          Your smarter kitchen starts here.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <AuthInput
          label="Full Name"
          name="name"
          autoComplete="name"
          placeholder="Your full name"
          value={name}
          error={nameError}
          disabled={loading}
          onChange={(e) => {
            setName(e.target.value);
            if (nameError) setNameError("");
            clearAlerts();
          }}
        />

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
            clearAlerts();
          }}
        />

        <PasswordInput
          label="Password"
          name="password"
          autoComplete="new-password"
          placeholder="At least 6 characters"
          value={password}
          error={passwordError}
          disabled={loading}
          onChange={(e) => {
            setPassword(e.target.value);
            if (passwordError) setPasswordError("");
            clearAlerts();
          }}
        />

        <PasswordInput
          label="Confirm Password"
          name="confirmPassword"
          id="confirm-password"
          autoComplete="new-password"
          placeholder="Re-enter your password"
          value={confirmPassword}
          error={confirmError}
          disabled={loading}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (confirmError) setConfirmError("");
            clearAlerts();
          }}
        />

        <AuthCheckbox
          id="terms"
          checked={acceptedTerms}
          disabled={loading}
          error={termsError}
          onChange={(checked) => {
            setAcceptedTerms(checked);
            if (termsError) setTermsError("");
            clearAlerts();
          }}
        >
          I agree to the{" "}
          <span className="font-semibold text-[var(--brand)]">
            Terms &amp; Conditions
          </span>{" "}
          and Privacy Policy.
        </AuthCheckbox>

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
          Create My Pantry
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-[var(--muted)]">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-[var(--brand)] underline-offset-2 hover:underline"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}
