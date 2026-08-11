"use client";

import { PrimaryButton } from "@/components/setup/PrimaryButton";
import { cravingExamples } from "./discover-data";

interface AIRecipePromptProps {
  value: string;
  onChange: (value: string) => void;
  onAsk?: () => void;
}

export function AIRecipePrompt({
  value,
  onChange,
  onAsk,
}: AIRecipePromptProps) {
  return (
    <div className="rounded-[1.75rem] border border-[var(--line)] bg-white p-5 shadow-[0_16px_40px_-28px_rgba(27,61,47,0.28)] sm:p-6">
      <label
        htmlFor="ai-craving"
        className="font-display text-lg font-semibold text-[var(--brand)]"
      >
        What are you craving?
      </label>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <input
          id="ai-craving"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Something quick and spicy..."
          className="h-12 flex-1 rounded-2xl border border-[var(--line)] bg-[#fcfdfb] px-4 text-[15px] text-[var(--foreground)] placeholder:text-zinc-400 focus:border-[var(--brand-soft)] focus:outline-none focus:ring-4 focus:ring-[var(--brand-soft)]/15"
        />
        <PrimaryButton type="button" onClick={onAsk} className="sm:px-6">
          Ask Pantrix ✦
        </PrimaryButton>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {cravingExamples.map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => onChange(example)}
            className="rounded-xl bg-[var(--surface-muted)] px-3 py-1.5 text-xs font-medium text-[var(--muted)] transition-colors hover:bg-[var(--brand-glow)] hover:text-[var(--brand)]"
          >
            {example}
          </button>
        ))}
      </div>
    </div>
  );
}
