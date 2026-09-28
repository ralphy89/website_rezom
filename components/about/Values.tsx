"use client";

import { useState } from "react";
import { AboutShell } from "@/components/about/AboutShell";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { values } from "@/lib/about";
import { cn } from "@/lib/cn";

export function AboutValues() {
  const [open, setOpen] = useState<string | null>(null);
  const canHover = useMediaQuery("(hover: hover)");

  return (
    <AboutShell>
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Our values / System principles</p>
      <h2 className="section-title mt-4 text-ink">Ce qui nous rassemble.</h2>
      <ul className="mt-12 grid gap-px border border-line-strong bg-line-strong sm:grid-cols-2 lg:grid-cols-4">
        {values.map((value) => {
          const active = open === value.index;
          return (
            <li key={value.index}>
              <button
                type="button"
                aria-expanded={active}
                className={cn(
                  "flex min-h-[168px] w-full flex-col p-5 text-left transition-colors duration-300 md:min-h-[190px]",
                  active ? "bg-ink text-paper" : "bg-surface text-ink",
                )}
                onMouseEnter={() => {
                  if (canHover) setOpen(value.index);
                }}
                onMouseLeave={() => {
                  if (canHover) setOpen(null);
                }}
                onFocus={() => setOpen(value.index)}
                onBlur={() => setOpen(null)}
                onClick={() => {
                  if (!canHover) setOpen((current) => (current === value.index ? null : value.index));
                }}
              >
                <span className="flex items-center justify-between">
                  <span className={cn("font-mono text-[11px] tracking-[0.16em]", active ? "text-paper/70" : "text-muted")}>{value.index}</span>
                  <span className={cn("h-1.5 w-1.5 rounded-full", active ? "bg-signal" : "bg-line-strong")} />
                </span>
                <span className="mt-8 font-display text-[1.25rem] uppercase leading-none tracking-[-0.03em]">{value.title}</span>
                <span className={cn("mt-3 max-w-[24ch] text-[14px] leading-snug", active ? "text-paper/85" : "text-transparent")}>
                  {value.text}
                </span>
                <span className={cn("mt-auto block h-px origin-left bg-azure transition-transform duration-500", active ? "scale-x-100" : "scale-x-0")} />
              </button>
            </li>
          );
        })}
      </ul>
    </AboutShell>
  );
}
