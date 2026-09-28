"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useMotionProfile } from "@/hooks/useMotionProfile";
import { heroLinks, heroNodes, heroStatuses, heroView, mobileHeroIds } from "./data";
import { NetworkLine } from "./NetworkLine";
import { NetworkNode } from "./NetworkNode";
import { SignalPulse } from "./SignalPulse";

type PointerState = { x: number; y: number; inside: boolean };

export function NetworkCanvas() {
  const compact = useMediaQuery("(max-width: 1023px)");
  const { reduced, lite } = useMotionProfile();
  const [hovered, setHovered] = useState<string | null>(null);
  const [statusIndex, setStatusIndex] = useState(0);
  const [pointer, setPointer] = useState<PointerState>({ x: 0, y: 0, inside: false });
  const frame = useRef(0);
  const latest = useRef<PointerState>({ x: 0, y: 0, inside: false });

  const nodes = useMemo(
    () => (compact ? heroNodes.filter((node) => mobileHeroIds.has(node.id)) : heroNodes),
    [compact],
  );
  const links = useMemo(
    () => heroLinks.filter(([from, to]) => nodes.some((node) => node.id === from) && nodes.some((node) => node.id === to)),
    [nodes],
  );
  const byId = useMemo(() => new Map(nodes.map((node) => [node.id, node])), [nodes]);

  useEffect(() => {
    if (reduced) return;
    const timer = window.setInterval(() => {
      setStatusIndex((current) => (current + 1) % heroStatuses.length);
    }, 2600);
    return () => window.clearInterval(timer);
  }, [reduced]);

  function queuePointer(next: PointerState) {
    latest.current = next;
    if (frame.current) return;
    frame.current = window.requestAnimationFrame(() => {
      frame.current = 0;
      setPointer(latest.current);
    });
  }

  const interactive = !reduced && !lite && !compact;

  return (
    <div className="relative border border-line-strong bg-surface/80">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Net-map</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          {String(nodes.length).padStart(2, "0")} nodes
        </span>
      </div>
      <div className="px-3 py-2 sm:px-4">
        <svg
          viewBox={`0 0 ${heroView.width} ${heroView.height}`}
          className="h-auto w-full"
          role="img"
          aria-label="Réseau REZO M : entrepreneurs, professionnels, étudiants, entreprises, partenaires et projets reliés à un nœud central."
          onPointerMove={(event) => {
            if (!interactive) return;
            const rect = event.currentTarget.getBoundingClientRect();
            queuePointer({
              x: ((event.clientX - rect.left) / rect.width) * heroView.width,
              y: ((event.clientY - rect.top) / rect.height) * heroView.height,
              inside: true,
            });
          }}
          onPointerLeave={() => {
            if (!interactive) return;
            queuePointer({ x: 0, y: 0, inside: false });
            setHovered(null);
          }}
        >
          {links.map(([from, to], index) => {
            const a = byId.get(from);
            const b = byId.get(to);
            if (!a || !b) return null;
            const highlighted = hovered === from || hovered === to;
            return (
              <NetworkLine
                key={`${from}-${to}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                delay={0.22 + index * 0.07}
                highlighted={highlighted}
              />
            );
          })}
          {!reduced && !lite
            ? links.slice(0, compact ? 1 : 2).map(([from, to], index) => {
                const a = byId.get(from);
                const b = byId.get(to);
                if (!a || !b) return null;
                return (
                  <SignalPulse
                    key={`pulse-${from}-${to}`}
                    d={`M ${a.x} ${a.y} L ${b.x} ${b.y}`}
                    delay={1.2 + index}
                  />
                );
              })
            : null}
          {nodes.map((node, index) => (
            <g
              key={node.id}
              onPointerEnter={() => setHovered(node.id)}
              onPointerLeave={() => setHovered((current) => (current === node.id ? null : current))}
            >
              <NetworkNode
                node={node}
                delay={node.core ? 0.05 : 0.62 + index * 0.07}
                lit={hovered === node.id || (!hovered && statusIndex % nodes.length === index)}
                showLabel={hovered === node.id || node.core}
                offset={offsetFor(node.x, node.y, Boolean(node.core), pointer)}
              />
            </g>
          ))}
        </svg>
      </div>
      <div className="flex items-center justify-between border-t border-line px-4 py-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink">
          {heroStatuses[reduced ? heroStatuses.length - 1 : statusIndex]}
        </span>
        <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
          <span className="signal-blink h-1.5 w-1.5 rounded-full bg-signal" />
          Live
        </span>
      </div>
    </div>
  );
}

function offsetFor(x: number, y: number, core: boolean, pointer: PointerState) {
  if (!pointer.inside) return { x: 0, y: 0 };
  const dx = pointer.x - x;
  const dy = pointer.y - y;
  const dist = Math.hypot(dx, dy) || 1;
  const influence = Math.max(0, 1 - dist / 260);
  const mag = influence * (core ? 8 : 14);
  return { x: (dx / dist) * mag, y: (dy / dist) * mag };
}
