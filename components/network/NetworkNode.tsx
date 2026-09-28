"use client";

import { motion, useReducedMotion } from "framer-motion";
import { easeMechanical } from "@/lib/motion";
import type { NetworkPoint } from "./data";

type NetworkNodeProps = {
  node: NetworkPoint;
  delay?: number;
  lit?: boolean;
  offset?: { x: number; y: number };
  showLabel?: boolean;
};

export function NetworkNode({
  node,
  delay = 0,
  lit = false,
  offset = { x: 0, y: 0 },
  showLabel = false,
}: NetworkNodeProps) {
  const reduced = useReducedMotion() === true;
  const active = Boolean(node.core || lit);

  return (
    <motion.g
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1, x: offset.x, y: offset.y }}
      transition={{
        opacity: { duration: reduced ? 0 : 0.45, delay: reduced ? 0 : delay, ease: easeMechanical },
        x: { duration: reduced ? 0 : 0.45, ease: easeMechanical },
        y: { duration: reduced ? 0 : 0.45, ease: easeMechanical },
      }}
    >
      {active ? (
        <circle cx={node.x} cy={node.y} r={node.r + 8} fill="#239DD6" opacity={node.core ? 0.1 : 0.14} />
      ) : null}
      <circle
        cx={node.x}
        cy={node.y}
        r={node.r}
        fill="#F4F3EF"
        stroke={active ? "#239DD6" : "#262626"}
        strokeWidth={node.core ? 2.4 : 1.4}
      />
      <circle
        cx={node.x}
        cy={node.y}
        r={node.core ? node.r * 0.56 : node.r * 0.38}
        fill={active ? "#239DD6" : "#252A75"}
      />
      <circle cx={node.x - node.r * 0.18} cy={node.y - node.r * 0.2} r={node.core ? 3 : 1.6} fill="#FFFFFF" opacity="0.8" />
      <circle cx={node.x} cy={node.y} r={node.r + 12} fill="transparent" />
      {showLabel ? (
        <text
          x={node.labelX}
          y={node.labelY}
          textAnchor={node.anchor}
          fill="#161616"
          fontSize="11"
          letterSpacing="1.4"
          style={{ fontFamily: "var(--font-mono-face), monospace" }}
        >
          {node.label.toUpperCase()}
        </text>
      ) : null}
    </motion.g>
  );
}
