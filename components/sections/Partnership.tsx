import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionShell } from "@/components/ui/SectionShell";
import { allianceBayCount, partnerBays, partners } from "@/lib/content";

export function PartnershipSection() {
  return (
    <SectionShell id="partenaires" tone="panel">
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <SectionLabel index="06">Alliances</SectionLabel>
          <h2 className="section-title text-ink">Construisons ensemble.</h2>
          <ul className="mt-8 space-y-2">
            {partners.map((partner) => (
              <li key={partner} className="font-display text-[clamp(1.4rem,2.5vw,2rem)] uppercase leading-none tracking-[-0.04em]">
                {partner}.
              </li>
            ))}
          </ul>
          <a
            href="#adhesion"
            className="mt-8 inline-flex min-h-11 items-center border border-ink px-5 text-[12px] font-medium uppercase tracking-[0.14em]"
          >
            Devenir partenaire
          </a>
        </Reveal>
        <div className="grid grid-cols-1 gap-px border border-line-strong bg-line-strong sm:grid-cols-2 lg:col-span-7">
          {Array.from({ length: allianceBayCount }, (_, slot) => {
            const bay = partnerBays[slot];
            const index = String(slot + 1).padStart(2, "0");

            if (!bay) {
              return (
                <a
                  key={index}
                  href="#adhesion"
                  className="bay-slot group flex min-h-[156px] flex-col justify-between p-4 md:min-h-[176px] md:p-5"
                >
                  <span className="relative z-10 flex items-center justify-between gap-3">
                    <span className="font-mono text-[11px] tracking-[0.16em] text-muted">{index}</span>
                    <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em]">
                      <span className="bay-led" aria-hidden />
                      <span className="grid">
                        <span className="col-start-1 row-start-1 text-muted transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0">
                          Libre
                        </span>
                        <span className="col-start-1 row-start-1 text-azure opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                          Ouvert
                        </span>
                      </span>
                    </span>
                  </span>
                  <span className="relative z-10 flex flex-1 items-center justify-center py-3">
                    <svg viewBox="0 0 100 100" fill="none" aria-hidden className="size-12 text-ink md:size-14">
                      <path
                        d="M40 40V16A2 2 0 0 0 42 14H58A2 2 0 0 1 60 16V40H84A2 2 0 0 1 86 42V58A2 2 0 0 1 84 60H60V84A2 2 0 0 1 58 86H42A2 2 0 0 1 40 84V60H16A2 2 0 0 1 14 58V42A2 2 0 0 0 16 40H40Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        className="bay-plus-live text-azure"
                        pathLength="100"
                        d="M40 40V16A2 2 0 0 0 42 14H58A2 2 0 0 1 60 16V40H84A2 2 0 0 1 86 42V58A2 2 0 0 1 84 60H60V84A2 2 0 0 1 58 86H42A2 2 0 0 1 40 84V60H16A2 2 0 0 1 14 58V42A2 2 0 0 0 16 40H40Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </span>
                  <span className="relative z-10">
                    <span className="mb-2 block h-px origin-left scale-x-0 bg-azure transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100" />
                    <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-muted transition-colors duration-300 group-hover:text-ink group-focus-visible:text-ink">
                      Ajoutez votre logo
                    </span>
                  </span>
                </a>
              );
            }

            return (
              <article key={bay.index} className="flex min-h-[132px] flex-col justify-between bg-surface p-4 md:min-h-[148px] md:p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[11px] tracking-[0.16em] text-muted">{bay.index}</span>
                  <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-azure" />
                    Intl
                  </span>
                </div>
                <div className="relative mt-5 h-16 w-full max-w-[210px] md:h-[4.5rem]">
                  <Image src={bay.logo} alt={bay.name} fill sizes="210px" className="object-contain object-left" />
                </div>
                <p className="mt-3 max-w-[28ch] text-[14px] leading-snug text-charcoal">{bay.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
