"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { approachSteps } from "@/lib/about";
import { cn } from "@/lib/cn";

export function AboutApproach() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() === true;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 40%"] });
  const scaleY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), { stiffness: 120, damping: 28 });

  return (
    <section ref={ref} className="scroll-mt-36 bg-ink text-paper">
      <div className="mx-auto w-full max-w-[1400px] border-white/15 px-5 py-20 md:px-8 md:py-28 lg:border-l lg:px-14 xl:px-[72px]">
        <h2 className="section-title max-w-[14ch]">Une connexion peut tout changer.</h2>
        <p className="mt-6 max-w-[42ch] text-[17px] leading-snug text-paper/80">
          REZO M ne cherche pas simplement à multiplier les contacts. Nous voulons créer les conditions pour que les bonnes personnes se rencontrent.
        </p>
        <ol className="relative mt-14 max-w-[720px]">
          <span aria-hidden className="absolute bottom-2 left-[7px] top-2 w-px bg-white/20" />
          <motion.span
            aria-hidden
            className="absolute left-[7px] top-2 w-px origin-top bg-azure"
            style={{ scaleY: reduced ? 1 : scaleY, height: "calc(100% - 1rem)" }}
          />
          {approachSteps.map((step, index) => (
            <li key={step.index} className="relative flex min-h-20 items-center gap-6 py-4 pl-10">
              <span
                aria-hidden
                className={cn("absolute left-0 h-4 w-4 rounded-full border", index === approachSteps.length - 1 ? "border-signal bg-signal" : "border-azure bg-ink")}
              />
              <span className="font-mono text-[11px] tracking-[0.16em] text-paper/50">{step.index}</span>
              <span className="font-display text-[clamp(1.6rem,3vw,2.4rem)] uppercase leading-none tracking-[-0.04em]">{step.title}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
