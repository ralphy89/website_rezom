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
              className="min-h-[220px] bg-surface p-6 md:p-8"
              initial={reduced ? false : { opacity: 0.4 }}
              animate={visible ? { opacity: 1 } : { opacity: 0.4 }}
              transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : index * 0.16, ease: easeMechanical }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] tracking-[0.16em] text-muted">{module.index}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-azure" style={{ opacity: visible ? 1 : 0.25 }} />
              </div>
              <h3 className="mt-10 font-display text-[clamp(1.6rem,2.4vw,2.2rem)] uppercase leading-none tracking-[-0.04em]">
                {module.title}
              </h3>
              <p className="mt-4 max-w-[28ch] text-[16px] leading-snug text-charcoal">{module.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </AboutShell>
  );
}
