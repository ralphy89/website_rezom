import { Reveal } from "@/components/motion/Reveal";
import { IndustrialCard } from "@/components/ui/IndustrialCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionShell } from "@/components/ui/SectionShell";
import { valueCards } from "@/lib/content";

export function ValueSection() {
  return (
    <SectionShell id="a-propos">
      <Reveal>
        <SectionLabel>Réseau</SectionLabel>
        <h2 className="section-title max-w-[12ch] text-ink">
          Un réseau.
          <br />
          Des opportunités.
        </h2>
      </Reveal>
      <div className="mt-8 grid gap-3 md:mt-12 md:gap-4 lg:grid-cols-3">
        {valueCards.map((card, index) => (
          <Reveal key={card.index} delay={index * 0.08} className="h-full">
            <IndustrialCard {...card} />
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
