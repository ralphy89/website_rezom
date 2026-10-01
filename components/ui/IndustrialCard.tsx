"use client";

import { useState } from "react";

type IndustrialCardProps = {
  title: string;
  text: string;
};

export function IndustrialCard({ title, text }: IndustrialCardProps) {
  const [active, setActive] = useState(false);

  return (
    <article
      className="group flex min-h-[220px] flex-col border border-line bg-surface p-5 transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-ink md:min-h-[380px] md:p-8"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      <div className="flex items-start justify-end">
        <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em]">
          <span className={`h-1.5 w-1.5 rounded-full ${active ? "bg-signal" : "bg-line-strong"}`} />
          <span className={active ? "text-ink" : "text-muted"}>{active ? "Live" : "Standby"}</span>
        </span>
      </div>

      <h3 className="mt-6 font-display text-[1.3rem] uppercase leading-none tracking-[-0.04em] md:mt-16 md:text-[clamp(1.8rem,3vw,2.6rem)]">
        {title}
      </h3>
      <p className="mt-2 max-w-[28ch] text-[14px] leading-snug text-charcoal md:mt-4 md:text-[17px]">{text}</p>

      <div className="mt-auto pt-6 md:pt-10">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full border border-navy bg-azure" />
          <span className="h-px flex-1 origin-left scale-x-0 bg-azure transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-focus:scale-x-100" />
          <span className={`h-2 w-2 rounded-full border ${active ? "border-azure bg-azure" : "border-line-strong"}`} />
        </div>
      </div>
    </article>
  );
}
