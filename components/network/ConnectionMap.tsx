"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { NetworkLine } from "./NetworkLine";
import { NetworkNode } from "./NetworkNode";
import { SignalPulse } from "./SignalPulse";
import type { NetworkPoint } from "./data";

const satellites = [
  { id: "talents", label: "Talents", angle: -90 },
  { id: "entreprises", label: "Entreprises", angle: -28 },
  { id: "projets", label: "Projets", angle: 32 },
  { id: "mentors", label: "Mentors", angle: 92 },
  { id: "partenaires", label: "Partenaires", angle: 152 },
  { id: "opportunites", label: "Opportunités", angle: 212 },
] as const;

export function ConnectionMap() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduced = useReducedMotion() === true;
  const compact = useMediaQuery("(max-width: 760px)");
  const visible = reduced || inView;
  const items = compact ? satellites.filter((item) => item.id !== "mentors" && item.id !== "partenaires") : satellites;
  const width = 760;
  const height = compact ? 420 : 480;
  const cx = width / 2;
  const cy = compact ? 200 : 230;
  const radius = compact ? 118 : 148;

  const nodes: NetworkPoint[] = [
    {
      id: "core",
      label: "REZOM",
      x: cx,
      y: cy,
      r: compact ? 22 : 28,
      core: true,
      labelX: cx,
      labelY: cy + (compact ? 46 : 54),
      anchor: "middle",
    },
    ...items.map((item) => {
      const rad = (item.angle * Math.PI) / 180;
      const x = cx + Math.cos(rad) * radius;
      const y = cy + Math.sin(rad) * radius;
      return {
        id: item.id,
        label: item.label,
        x,
        y,
        r: 12,
        labelX: cx + Math.cos(rad) * (radius + (compact ? 28 : 42)),
        labelY: cy + Math.sin(rad) * (radius + (compact ? 24 : 34)),
        anchor: "middle" as const,
      };
    }),
  ];

  const byId = new Map(nodes.map((node) => [node.id, node]));
  const core = byId.get("core");

  return (
    <div ref={ref} className="relative">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full"
        role="img"
        aria-label="Carte du réseau REZOM reliant talents, entreprises, projets, mentors, partenaires et opportunités."
      >
        {visible ? (
        <>
          {core
            ? nodes
                .filter((node) => node.id !== "core")
                .map((node, index) => (
                  <NetworkLine
                    key={node.id}
                    x1={core.x}
                    y1={core.y}
                    x2={node.x}
                    y2={node.y}
                    delay={0.12 + index * 0.12}
                  />
                ))
            : null}
          {!reduced && !compact && core
            ? nodes
                .filter((node) => node.id !== "core")
                .slice(0, 2)
                .map((node, index) => (
                  <SignalPulse
                    key={`pulse-${node.id}`}
                    d={`M ${core.x} ${core.y} L ${node.x} ${node.y}`}
                    delay={1.1 + index * 0.8}
                  />
                ))
            : null}
          {nodes.map((node, index) => (
            <NetworkNode
              key={node.id}
              node={node}
              delay={node.core ? 0.05 : 0.35 + index * 0.08}
              lit={node.core}
              showLabel
            />
          ))}
        </>
      ) : core ? (
        <circle cx={core.x} cy={core.y} r={core.r} fill="#F4F3EF" stroke="#239DD6" strokeWidth="2" />
      ) : null}
      </svg>
    </div>
  );
}
