"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { easeMechanical } from "@/lib/motion";

export function AboutClose() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduced = useReducedMotion() === true;
  const visible = reduced || inView;

  return (
    <section ref={ref} className="relative overflow-hidden border-t border-line bg-panel/70">
      <svg viewBox="0 0 1200 520" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
        <motion.path
          d="M180 90 C 320 90, 420 180, 560 250 S 860 390, 1040 360"
          fill="none"
          stroke="#239DD6"
          strokeWidth="1.4"
          initial={reduced ? false : { pathLength: 0, opacity: 0 }}
          animate={visible ? { pathLength: 1, opacity: 0.9 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: reduced ? 0 : 1.2, ease: easeMechanical }}
        />
        {[
          [180, 90],
          [560, 250],
          [1040, 360],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="5" fill="#239DD6" />
        ))}
        <circle cx="1040" cy="360" r="9" fill="none" stroke="#FF6B2C" />
      </svg>
      <div className="relative mx-auto w-full max-w-[1400px] px-5 py-24 md:px-8 md:py-32 lg:px-14 xl:px-[72px]">
        <h2 className="section-title max-w-[12ch] text-ink">
          Les opportunités
          <br />
          commencent souvent
          <br />
          par une rencontre.
        </h2>
        <p className="mt-5 max-w-[36ch] text-[15px] leading-snug text-charcoal md:mt-6 md:text-[17px]">Rejoignez une communauté qui avance, collabore et construit.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/#adhesion">Rejoindre REZOM</Button>
          <Button href="/#activites" variant="secondary">
            Découvrir nos activités
          </Button>
        </div>
      </div>
    </section>
  );
}
