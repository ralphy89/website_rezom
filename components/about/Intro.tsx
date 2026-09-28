"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { AboutShell } from "@/components/about/AboutShell";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { introLinks, introNodes } from "@/lib/about";
import { easeMechanical } from "@/lib/motion";

const byId = new Map(introNodes.map((node) => [node.id, node]));

export function AboutIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  const reduced = useReducedMotion() === true;
  const visible = reduced || inView;

  return (
    <AboutShell>
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionLabel index="About">REZO M</SectionLabel>
          <h1 className="section-title text-ink">Plus qu’un réseau.</h1>
          <p className="mt-6 max-w-[38ch] text-[17px] leading-snug text-charcoal md:text-[18px]">
            REZO M est un réseau professionnel et entrepreneurial dédié à la connexion, à la collaboration et à la création d’opportunités.
          </p>
          <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.16em] text-muted">
            Entrepreneurs. Professionnels. Étudiants. Porteurs de projets. Organisations.
          </p>
        </div>
        <div ref={ref} className="lg:col-span-6">
          <svg viewBox="0 0 400 340" className="h-auto w-full" role="img" aria-label="Réseau reliant talents, entreprises, projets, partenaires et opportunités.">
            {introLinks.map(([from, to], index) => {
              const a = byId.get(from);
              const b = byId.get(to);
              if (!a || !b) return null;
              return (
                <motion.path
                  key={`${from}-${to}`}
                  d={`M ${a.x} ${a.y} L ${b.x} ${b.y}`}
                  fill="none"
                  stroke="#262626"
                  strokeWidth="1.15"
                  initial={reduced ? false : { pathLength: 0, opacity: 0 }}
                  animate={visible ? { pathLength: 1, opacity: 0.55 } : { pathLength: 0, opacity: 0 }}
                  transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.15 + index * 0.12, ease: easeMechanical }}
                />
              );
            })}
            {introNodes.map((node, index) => (
              <motion.g
                key={node.id}
                initial={reduced ? false : { opacity: 0 }}
                animate={visible ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : index * 0.1, ease: easeMechanical }}
              >
                <circle cx={node.x} cy={node.y} r="14" fill="#239DD6" opacity="0.12" />
                <circle cx={node.x} cy={node.y} r="5.5" fill="#239DD6" />
                <circle cx={node.x} cy={node.y} r="11" fill="none" stroke="#252A75" strokeWidth="1" />
                <text
                  x={node.anchor === "end" ? node.x - 16 : node.anchor === "middle" ? node.x : node.x + 16}
                  y={node.anchor === "middle" ? node.y + 28 : node.y + 4}
                  textAnchor={node.anchor}
                  fill="#262626"
                  fontSize="12"
                  fontFamily="var(--font-mono-face), monospace"
                >
                  {node.label}
                </text>
              </motion.g>
            ))}
          </svg>
        </div>
      </div>
    </AboutShell>
  );
}
