import { cn } from "@/utils/helpers";
import { SETUP_STEPS } from "./setup-data";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps?: number;
  compact?: boolean;
}

export function ProgressIndicator({
  currentStep,
  totalSteps = SETUP_STEPS.length,
  compact = false,
}: ProgressIndicatorProps) {
  if (compact) {
    return (
      <p className="text-sm font-semibold text-[var(--muted)]">
        Step {currentStep} of {totalSteps}
      </p>
    );
  }

  return (
    <nav aria-label="Setup progress" className="w-full">
      <ol className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {SETUP_STEPS.map((step, index) => {
          const active = step.id === currentStep;
          const done = step.id < currentStep;
          return (
            <li key={step.id} className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors",
                    active && "bg-[var(--brand)] text-white",
                    done && "bg-[var(--brand-soft)] text-white",
                    !active && !done && "bg-[var(--surface-muted)] text-[var(--muted)]"
                  )}
                  aria-current={active ? "step" : undefined}
                >
                  {step.id}
                </span>
                <span
                  className={cn(
                    "hidden text-sm font-semibold sm:inline",
                    active || done
                      ? "text-[var(--brand)]"
                      : "text-[var(--muted)]"
                  )}
                >
                  {step.label}
                </span>
              </div>
              {index < SETUP_STEPS.length - 1 && (
                <span
                  aria-hidden
                  className={cn(
                    "h-px w-6 sm:w-10",
                    done ? "bg-[var(--brand-soft)]" : "bg-[var(--line)]"
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
