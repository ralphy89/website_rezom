"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { AboutShell } from "@/components/about/AboutShell";
import { ambitionModules } from "@/lib/about";
import { easeMechanical } from "@/lib/motion";

export function AboutAmbition() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduced = useReducedMotion() === true;
  const visible = reduced || inView;

  return (
    <AboutShell tone="panel">
      <h2 className="section-title max-w-[14ch] text-ink">Transformer les connexions en opportunités.</h2>
      <div ref={ref} className="relative mt-12">
        <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 hidden h-full w-full md:block" aria-hidden>
          <motion.path
            d="M25 28 H75 V72 H25 Z"
            fill="none"
            stroke="#239DD6"
            strokeWidth="0.35"
            initial={reduced ? false : { pathLength: 0 }}
            animate={visible ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: reduced ? 0 : 1.1, ease: easeMechanical }}
          />
        </svg>
        <div className="grid gap-px border border-line-strong bg-line-strong md:grid-cols-2">
          {ambitionModules.map((module, index) => (
            <motion.article
              key={module.index}
              className="bg-surface p-5 md:min-h-[220px] md:p-8"
              initial={reduced ? false : { opacity: 0.4 }}
              animate={visible ? { opacity: 1 } : { opacity: 0.4 }}
              transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : index * 0.16, ease: easeMechanical }}
            >
              <span className="block h-1.5 w-1.5 rounded-full bg-azure" style={{ opacity: visible ? 1 : 0.25 }} />
              <h3 className="mt-5 font-display text-[1.15rem] uppercase leading-none tracking-[-0.04em] md:mt-10 md:text-[clamp(1.6rem,2.4vw,2.2rem)]">
                {module.title}
              </h3>
              <p className="mt-2 max-w-[32ch] text-[14px] leading-snug text-charcoal md:mt-4 md:text-[16px]">{module.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </AboutShell>
  );
}
