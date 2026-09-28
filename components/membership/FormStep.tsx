import { cn } from "@/lib/cn";

const steps = [
  { index: "01", label: "Votre profil" },
  { index: "02", label: "Votre réseau" },
] as const;

type FormStepProps = {
  current: 0 | 1;
  onStep: (step: 0 | 1) => void;
};

export function FormStep({ current, onStep }: FormStepProps) {
  return (
    <ol className="flex items-center gap-3" aria-label="Étapes de la demande">
      {steps.map((step, index) => {
        const active = current === index;
        const done = current > index;
        return (
          <li key={step.index} className={cn("flex items-center gap-3", index === 0 ? "flex-1" : "flex-1")}>
            {index === 1 ? <span aria-hidden className="hidden h-px w-8 bg-line-strong sm:block" /> : null}
            <button
              type="button"
              aria-current={active ? "step" : undefined}
              disabled={index > current}
              onClick={() => onStep(index as 0 | 1)}
              className={cn(
                "flex min-h-12 flex-1 items-center gap-3 border px-3 text-left disabled:cursor-not-allowed",
                active ? "border-ink bg-surface" : "border-line bg-paper",
              )}
            >
              <span
                aria-hidden
                className={cn("h-1.5 w-1.5 rounded-full", active || done ? "bg-azure" : "bg-line-strong")}
              />
              <span className="font-mono text-[11px] tracking-[0.14em] text-muted">{step.index}</span>
              <span className="text-[13px] uppercase tracking-[0.08em]">{step.label}</span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
