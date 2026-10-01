import { cn } from "@/lib/cn";

type SectionLabelProps = {
  children: React.ReactNode;
  className?: string;
};

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <div className={cn("relative mb-6 flex items-center gap-3", className)}>
      <span aria-hidden className="absolute -left-[21px] top-1 hidden h-2.5 w-2.5 lg:block">
        <span className="absolute inset-0 rounded-full border border-navy/40" />
        <span className="absolute inset-[3px] rounded-full bg-azure" />
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{children}</span>
    </div>
  );
}
