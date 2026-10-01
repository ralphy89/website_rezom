import { cn } from "@/lib/cn";

type AboutShellProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  tone?: "paper" | "panel" | "ink";
};

export function AboutShell({ id, children, className, tone = "paper" }: AboutShellProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-36",
        tone === "panel" && "bg-panel/70",
        tone === "ink" && "bg-ink text-paper",
        className,
      )}
    >
      <div
        className={cn(
          "mx-auto w-full max-w-[1400px] px-5 py-14 md:px-8 md:py-28 lg:border-l lg:px-14 xl:px-[72px]",
          tone === "ink" ? "border-white/15" : "border-line",
        )}
      >
        {children}
      </div>
    </section>
  );
}
