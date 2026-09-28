"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { MemberCategory } from "@/components/ui/MemberCategory";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionShell } from "@/components/ui/SectionShell";
import { memberCategories } from "@/lib/content";

export function MembersSection() {
  const [active, setActive] = useState<(typeof memberCategories)[number]["id"]>(memberCategories[0].id);
  const current = memberCategories.find((item) => item.id === active) ?? memberCategories[0];

  return (
    <SectionShell id="reseau">
      <div className="grid items-start gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <SectionLabel index="03">Membres</SectionLabel>
          <h2 className="section-title text-ink">Qui peut rejoindre REZO M ?</h2>
        </Reveal>
        <div className="lg:col-span-7">
          <div className="border border-line-strong bg-surface p-5 md:p-7" aria-live="polite">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Profil {current.index}</p>
            <p className="mt-4 max-w-[18ch] font-display text-[clamp(1.7rem,3vw,2.6rem)] leading-[1.05] tracking-[-0.04em]">
              {current.text}
            </p>
          </div>
          <div className="mt-px border border-line-strong" role="group" aria-label="Catégories de membres">
            {memberCategories.map((category) => (
              <MemberCategory
                key={category.id}
                index={category.index}
                title={category.title}
                selected={category.id === active}
                onSelect={() => setActive(category.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
