import { Reveal } from "@/components/motion/Reveal";
import { ActivityModule } from "@/components/ui/ActivityModule";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionShell } from "@/components/ui/SectionShell";
import { activities } from "@/lib/content";

export function ActivitiesSection() {
  return (
    <SectionShell id="activites" tone="panel">
      <Reveal>
        <SectionLabel index="02">Activités</SectionLabel>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">What happens inside the network</p>
        <h2 className="section-title mt-4 max-w-[14ch] text-ink">Le réseau en action.</h2>
      </Reveal>
      <div className="mt-12 grid gap-px border border-line-strong bg-line-strong sm:grid-cols-2 lg:grid-cols-3">
        {activities.map((activity) => (
          <ActivityModule key={activity.index} {...activity} />
        ))}
      </div>
    </SectionShell>
  );
}
