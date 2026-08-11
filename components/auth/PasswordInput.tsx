"use client";

import { useState } from "react";
import { cn } from "@/utils/helpers";

interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
}

export function PasswordInput({
  label = "Password",
  error,
  className,
  id,
  ...props
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  const inputId = id || props.name || "password";

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={inputId}
        className="text-sm font-semibold text-[var(--brand)]"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={inputId}
          type={visible ? "text" : "password"}
          suppressHydrationWarning
          className={cn(
            "h-12 w-full rounded-2xl border border-[var(--line)] bg-[#fcfdfb] px-4 pr-12 text-[15px] text-[var(--foreground)] placeholder:text-zinc-400 transition-all duration-200",
            "hover:border-[var(--brand-soft)]/40",
            "focus:border-[var(--brand-soft)] focus:outline-none focus:ring-4 focus:ring-[var(--brand-soft)]/15",
            error &&
              "border-red-400 focus:border-red-500 focus:ring-red-500/15",
            className
          )}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute inset-y-0 right-0 flex items-center px-3.5 text-sm font-semibold text-[var(--muted)] transition-colors hover:text-[var(--brand)]"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? "Hide" : "Show"}
        </button>
      </div>
      {error && <p className="text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}
