"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MembershipForm } from "@/components/membership/MembershipForm";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionShell } from "@/components/ui/SectionShell";
import { easeMechanical } from "@/lib/motion";

export function MembershipSection() {
  const reduced = useReducedMotion() === true;
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  function focusForm() {
    const node = formRef.current;
    if (!node) return;
    node.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "nearest" });
    node.querySelector<HTMLElement>("input:not([tabindex='-1'])")?.focus();
  }

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(focusForm, reduced ? 0 : 640);
    return () => window.clearTimeout(timer);
  }, [open, reduced]);

  return (
    <SectionShell id="adhesion">
      <div className="grid items-start gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <SectionLabel>Adhésion</SectionLabel>
          <h2 className="section-title text-ink">Entrez dans le réseau.</h2>
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-charcoal md:mt-6 md:text-[18px]">
            Votre prochaine opportunité peut commencer ici.
          </p>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="demande"
            onClick={() => {
              if (open) {
                focusForm();
                return;
              }
              setOpen(true);
            }}
            className="mt-8 inline-flex min-h-11 items-center bg-ink px-5 text-[12px] font-medium uppercase tracking-[0.14em] text-paper"
          >
            <span aria-hidden className="mr-2.5 h-1.5 w-1.5 rounded-full bg-azure" />
            Commencer mon adhésion
          </button>
        </Reveal>
        {open ? (
          <motion.div
            ref={formRef}
            className="overflow-hidden lg:col-span-7"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ duration: reduced ? 0 : 0.6, ease: easeMechanical }}
          >
            <MembershipForm />
          </motion.div>
        ) : null}
      </div>
    </SectionShell>
  );
}
