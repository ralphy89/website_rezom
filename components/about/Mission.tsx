import { AboutShell } from "@/components/about/AboutShell";
import { missionPanels } from "@/lib/about";

export function AboutMission() {
  return (
    <AboutShell>
      <div className="grid gap-px border border-line-strong bg-line-strong lg:grid-cols-2">
        {missionPanels.map((panel) => (
          <article key={panel.index} className="group min-h-[320px] bg-surface p-6 md:p-10">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                {panel.label} / {panel.index}
              </p>
              <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-line-strong transition-colors duration-300 group-hover:bg-azure" />
                Signal
              </span>
            </div>
            <h2 className="mt-16 max-w-[16ch] font-display text-[clamp(1.8rem,3vw,2.8rem)] uppercase leading-[0.95] tracking-[-0.04em] text-ink">
              {panel.title}
            </h2>
            <p className="mt-5 max-w-[42ch] text-[16px] leading-snug text-charcoal">{panel.text}</p>
            <div className="mt-10 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full border border-navy bg-azure" />
              <span className="h-px flex-1 origin-left scale-x-0 bg-azure transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
              <span className="h-2 w-2 rounded-full border border-line-strong transition-colors duration-300 group-hover:border-azure group-hover:bg-azure" />
            </div>
          </article>
        ))}
      </div>
    </AboutShell>
  );
}
