import { MembershipForm } from "@/components/membership/MembershipForm";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionShell } from "@/components/ui/SectionShell";

export function MembershipSection() {
  return (
    <SectionShell id="adhesion">
      <div className="grid items-start gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <SectionLabel index="05">Adhésion</SectionLabel>
          <h2 className="section-title text-ink">Entrez dans le réseau.</h2>
          <p className="mt-6 max-w-sm text-[18px] leading-relaxed text-charcoal">
            Votre prochaine opportunité peut commencer ici.
          </p>
          <a
            href="#demande"
            className="mt-8 inline-flex min-h-11 items-center bg-ink px-5 text-[12px] font-medium uppercase tracking-[0.14em] text-paper"
          >
            <span aria-hidden className="mr-2.5 h-1.5 w-1.5 rounded-full bg-azure" />
            Commencer mon adhésion
          </a>
        </Reveal>
        <div className="lg:col-span-7">
          <MembershipForm />
        </div>
      </div>
    </SectionShell>
  );
}
