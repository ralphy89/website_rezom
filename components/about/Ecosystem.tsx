"use client";

import { useMemo, useState } from "react";
import { AboutShell } from "@/components/about/AboutShell";
import { ecosystemNodes } from "@/lib/about";
import { cn } from "@/lib/cn";

const width = 860;
const height = 640;
const cx = 430;
const cy = 320;

type NodePoint = (typeof ecosystemNodes)[number] & { x: number; y: number };

function place(angle: number, radius: number) {
  const rad = (angle * Math.PI) / 180;
  return { x: cx + Math.cos(rad) * radius, y: cy + Math.sin(rad) * radius };
}

export function AboutEcosystem() {
  const [active, setActive] = useState<string | null>(null);
  const nodes = useMemo<NodePoint[]>(
    () =>
      ecosystemNodes.map((node) => ({
        ...node,
        ...place(node.angle, node.ring === "primary" ? 168 : 268),
      })),
    [],
  );
  const current = nodes.find((node) => node.id === active) ?? null;

  return (
    <AboutShell tone="panel">
      <h2 className="section-title max-w-[12ch] text-ink">Un écosystème connecté.</h2>
      <div className="mt-10 hidden md:block">
        <div className="relative mx-auto aspect-[860/640] max-w-[920px]">
          <svg viewBox={`0 0 ${width} ${height}`} className="absolute inset-0 h-full w-full" aria-hidden>
            {nodes.map((node) => {
              const linked = !active || active === node.id;
              return (
                <line
                  key={node.id}
                  x1={cx}
                  y1={cy}
                  x2={node.x}
                  y2={node.y}
                  stroke={linked && active ? "#239DD6" : "#262626"}
                  strokeWidth={linked && active ? 1.6 : 1}
                  opacity={!active || linked ? 0.7 : 0.12}
                />
              );
            })}
            <circle cx={cx} cy={cy} r="28" fill="#F4F3EF" stroke="#252A75" />
            <circle cx={cx} cy={cy} r="6" fill="#239DD6" />
          </svg>
          <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[140%] font-mono text-[11px] uppercase tracking-[0.16em]">REZO M</p>
          {nodes.map((node) => {
            const on = !active || active === node.id;
            return (
              <button
                key={node.id}
                type="button"
                className={cn(
                  "absolute -translate-x-1/2 -translate-y-1/2 border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] transition-opacity duration-300",
                  node.ring === "primary" ? "bg-surface" : "bg-paper",
                  on ? "border-ink opacity-100" : "border-line opacity-30",
                  active === node.id && "border-azure text-navy",
                )}
                style={{ left: `${(node.x / width) * 100}%`, top: `${(node.y / height) * 100}%` }}
                onMouseEnter={() => setActive(node.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(node.id)}
                onBlur={() => setActive(null)}
              >
                {node.label}
              </button>
            );
          })}
        </div>
        <p className="mx-auto min-h-11 max-w-[46ch] text-center text-[16px] leading-snug text-charcoal">
          {current?.text ?? "Survolez un nœud pour voir sa place dans le réseau."}
        </p>
      </div>
      <ul className="mt-8 grid gap-px border border-line-strong bg-line-strong sm:grid-cols-2 md:hidden">
        {nodes.map((node) => (
          <li key={node.id}>
            <button
              type="button"
              aria-expanded={active === node.id}
              className="min-h-14 w-full bg-surface px-4 py-3 text-left"
              onClick={() => setActive((value) => (value === node.id ? null : node.id))}
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.14em]">{node.label}</span>
              {active === node.id ? <span className="mt-1 block text-[14px] leading-snug text-charcoal">{node.text}</span> : null}
            </button>
          </li>
        ))}
      </ul>
    </AboutShell>
  );
}
