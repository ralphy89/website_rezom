import { cn } from "@/lib/cn";

type SignalIndicatorProps = {
  label?: string;
  tone?: "blue" | "signal";
  className?: string;
};

export function SignalIndicator({ label, tone = "blue", className = "text-muted" }: SignalIndicatorProps) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em]", className)}>
      <span
        aria-hidden
        className={cn("signal-blink h-1.5 w-1.5 rounded-full", tone === "signal" ? "bg-signal" : "bg-azure")}
      />
      {label}
    </span>
  );
}
