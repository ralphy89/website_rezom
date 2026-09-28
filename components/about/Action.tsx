import { AboutShell } from "@/components/about/AboutShell";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { actionModules } from "@/lib/about";

export function AboutAction() {
  return (
    <AboutShell>
      <SectionLabel index="03">Network in action</SectionLabel>
      <h2 className="section-title text-ink">Le réseau en action.</h2>
      <ul className="mt-12 grid gap-px border border-line-strong bg-line-strong sm:grid-cols-2 lg:grid-cols-3">
        {actionModules.map((module) => (
          <li key={module.index} className="group min-h-[160px] bg-surface p-6">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] tracking-[0.16em] text-muted">{module.index}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-line-strong transition-colors duration-200 group-hover:bg-azure" />
            </div>
            <h3 className="mt-8 font-display text-[1.35rem] uppercase leading-none tracking-[-0.03em]">{module.title}</h3>
            <p className="mt-3 max-w-[26ch] text-[15px] leading-snug text-charcoal">{module.text}</p>
          </li>
        ))}
      </ul>
    </AboutShell>
  );
}
