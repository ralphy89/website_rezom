import { cn } from "@/lib/cn";

type SectionShellProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  tone?: "paper" | "panel";
};

export function SectionShell({ id, children, className, tone = "paper" }: SectionShellProps) {
  return (
    <section id={id} className={cn("scroll-mt-36", tone === "panel" && "bg-panel/70", className)}>
      <div className="mx-auto w-full max-w-[1400px] border-line px-5 py-24 md:px-8 md:py-32 lg:border-l lg:px-14 lg:py-40 xl:px-[72px]">
        {children}
      </div>
    </section>
  );
}
