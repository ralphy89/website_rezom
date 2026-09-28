"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

type IndustrialCardProps = {
  index: string;
  code: string;
  title: string;
  text: string;
};

export function IndustrialCard({ index, code, title, text }: IndustrialCardProps) {
  const reduced = useReducedMotion() === true;
  const [active, setActive] = useState(false);
  const [signal, setSignal] = useState(0);

  useEffect(() => {
    if (!active || reduced) {
      setSignal(active ? 100 : 0);
      return;
    }

    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / 420);
      setSignal(Math.round(progress * 100));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, reduced]);

  return (
    <article
      className="group flex min-h-[380px] flex-col border border-line bg-surface p-6 transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-ink md:p-8"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      <div className="flex items-start justify-between">
        <span className="font-mono text-[12px] tracking-[0.18em] text-muted">{index}</span>
        <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em]">
          <span className={`h-1.5 w-1.5 rounded-full ${active ? "bg-signal" : "bg-line-strong"}`} />
          <span className={active ? "text-ink" : "text-muted"}>{active ? "Live" : "Standby"}</span>
        </span>
      </div>

      <h3 className="mt-16 font-display text-[clamp(1.8rem,3vw,2.6rem)] uppercase leading-none tracking-[-0.04em]">
        {title}
      </h3>
      <p className="mt-4 max-w-[16ch] text-[17px] leading-snug text-charcoal">{text}</p>

      <div className="mt-auto pt-10">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full border border-navy bg-azure" />
          <span className="h-px flex-1 origin-left scale-x-0 bg-azure transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-focus:scale-x-100" />
          <span className={`h-2 w-2 rounded-full border ${active ? "border-azure bg-azure" : "border-line-strong"}`} />
        </div>
        <div className="mt-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
          <span>Sig {String(signal).padStart(3, "0")}</span>
          <span>{code}</span>
        </div>
      </div>
    </article>
  );
}
