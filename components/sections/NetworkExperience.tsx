import { ConnectionMap } from "@/components/network/ConnectionMap";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionShell } from "@/components/ui/SectionShell";
import { SignalIndicator } from "@/components/ui/SignalIndicator";

export function NetworkExperience() {
  return (
    <SectionShell id="experience" tone="panel">
      <Reveal>
        <SectionLabel index="04">Carte</SectionLabel>
      </Reveal>
      <div className="relative border border-line-strong bg-surface p-3 md:p-5">
        <div className="border border-line px-2 py-4 md:px-6 md:py-8">
          <ConnectionMap />
        </div>
        <div className="mt-5 flex flex-col gap-4 px-2 pb-2 sm:flex-row sm:items-end sm:justify-between md:px-3">
          <p className="max-w-[16ch] font-display text-[clamp(1.8rem,3.4vw,2.8rem)] leading-[0.95] tracking-[-0.04em]">
            Une connexion peut tout changer.
          </p>
          <SignalIndicator label="Live map" />
        </div>
      </div>
    </SectionShell>
  );
}
