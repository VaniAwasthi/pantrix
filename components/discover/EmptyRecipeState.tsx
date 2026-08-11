import { PrimaryButton } from "@/components/setup/PrimaryButton";

interface EmptyRecipeStateProps {
  onAsk?: () => void;
}

export function EmptyRecipeState({ onAsk }: EmptyRecipeStateProps) {
  return (
    <div className="rounded-[1.75rem] border border-dashed border-[var(--line)] bg-white/80 px-6 py-14 text-center">
      <h3 className="font-display text-2xl font-semibold text-[var(--brand)]">
        Nothing perfect yet.
      </h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-[var(--muted)]">
        Try adding another ingredient or ask Pantrix AI to create something with
        what you have.
      </p>
      <div className="mt-6 flex justify-center">
        <PrimaryButton type="button" onClick={onAsk}>
          Ask Pantrix ✦
        </PrimaryButton>
      </div>
    </div>
  );
}
