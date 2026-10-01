"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import { identityWords } from "@/lib/about";
import { cn } from "@/lib/cn";
import { easeMechanical } from "@/lib/motion";

const phases = [
  { word: "Connecter", note: "Les nœuds apparaissent." },
  { word: "Collaborer", note: "Les liens se forment." },
  { word: "Réussir", note: "Les signaux s’activent." },
] as const;

export function AboutIdentity() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() === true;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [phase, setPhase] = useState(0);
  const shown = reduced ? 2 : phase;

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setPhase(value < 0.34 ? 0 : value < 0.67 ? 1 : 2);
  });

  return (
    <section ref={ref} className={reduced ? "bg-panel/70" : "h-[220vh] bg-panel/70"}>
      <div className={reduced ? undefined : "sticky top-28"}>
        <div className="mx-auto grid w-full max-w-[1400px] items-start gap-8 border-line px-5 py-16 md:px-8 lg:grid-cols-12 lg:border-l lg:px-14 lg:py-20 xl:px-[72px]">
          <div className="lg:col-span-5">
            <h2 className="font-display text-[1.5rem] uppercase leading-[0.96] tracking-[-0.04em] text-ink md:text-[clamp(2.2rem,4vw,3.4rem)] md:leading-[0.92]">Qui sommes-nous ?</h2>
            <p className="mt-5 max-w-[38ch] text-[16px] leading-snug text-charcoal">
              REZOM rassemble des personnes et des organisations autour d’une ambition commune : créer des connexions utiles, partager les connaissances et développer des collaborations durables.
            </p>
          </div>
          <div className="lg:col-span-7">
            <ol>
              {identityWords.map((word, index) => (
                <li key={word}>
                  <p className={cn("font-display text-[1.45rem] uppercase leading-[0.95] tracking-[-0.045em] transition-colors duration-500 md:text-[clamp(2.4rem,5vw,4.4rem)] md:leading-[0.9]", shown === index ? "text-ink" : "text-line")}>
                    {word}.
                  </p>
                </li>
              ))}
            </ol>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">{phases[shown].note}</p>
            <PhaseNetwork phase={shown} />
          </div>
        </div>
      </div>
    </section>
  );
}

function PhaseNetwork({ phase }: { phase: number }) {
  const reduced = useReducedMotion() === true;
  const nodes = [
    { x: 80, y: 70 },
    { x: 220, y: 46 },
    { x: 340, y: 110 },
    { x: 280, y: 190 },
    { x: 120, y: 176 },
  ];
  const links = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 0],
  ];

  return (
    <svg viewBox="0 0 420 230" className="mt-10 h-auto w-full" aria-hidden>
      {links.map(([a, b], index) => (
        <motion.path
          key={`${a}-${b}`}
          d={`M ${nodes[a].x} ${nodes[a].y} L ${nodes[b].x} ${nodes[b].y}`}
          fill="none"
          stroke={phase > 1 ? "#FF6B2C" : "#239DD6"}
          strokeWidth="1.2"
          initial={false}
          animate={{ pathLength: phase >= 1 ? 1 : 0, opacity: phase >= 1 ? 0.85 : 0 }}
          transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : index * 0.05, ease: easeMechanical }}
        />
      ))}
      {nodes.map((node, index) => (
        <motion.g key={index} initial={false} animate={{ opacity: phase >= 0 ? 1 : 0 }} transition={{ delay: reduced ? 0 : index * 0.06 }}>
          <circle cx={node.x} cy={node.y} r={phase > 1 ? 8 : 5} fill={phase > 1 ? "#FF6B2C" : "#239DD6"} />
          <circle cx={node.x} cy={node.y} r="13" fill="none" stroke="#252A75" strokeOpacity={phase >= 0 ? 0.7 : 0} />
        </motion.g>
      ))}
    </svg>
  );
}
