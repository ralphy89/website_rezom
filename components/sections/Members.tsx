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
          <SectionLabel>Membres</SectionLabel>
          <h2 className="section-title text-ink">Qui peut rejoindre <span className="text-azure">REZOM</span> ?</h2>
        </Reveal>
        <div className="lg:col-span-7">
          <div className="border border-line-strong bg-surface p-5 md:p-7" aria-live="polite">
            <p className="max-w-[28ch] font-display text-[1.1rem] leading-snug tracking-[-0.03em] md:max-w-[18ch] md:text-[clamp(1.7rem,3vw,2.6rem)] md:leading-[1.05]">
              {current.text}
            </p>
          </div>
          <div className="mt-px border border-line-strong" role="group" aria-label="Catégories de membres">
            {memberCategories.map((category) => (
              <MemberCategory
                key={category.id}
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
