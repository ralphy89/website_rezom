"use client";

import { motion, useReducedMotion } from "framer-motion";
import { easeMechanical } from "@/lib/motion";

type NodeClusterProps = {
  active?: boolean;
  caption?: string;
};

const points = {
  core: { x: 116, y: 78 },
  known: { x: 48, y: 40 },
  fresh: { x: 196, y: 112 },
};

export function NodeCluster({ active = false, caption = "Connexion établie." }: NodeClusterProps) {
  const reduced = useReducedMotion() === true;
  const draw = reduced ? 0 : 0.45;

  return (
    <div className="w-full">
      <svg viewBox="0 0 250 160" className="h-auto w-full" role="img" aria-label="Nouvelle connexion activée dans le réseau REZO M">
        <motion.path
          d={`M ${points.known.x} ${points.known.y} L ${points.core.x} ${points.core.y}`}
          fill="none"
          stroke="#262626"
          strokeWidth="1.4"
          strokeLinecap="round"
          initial={reduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: draw, ease: easeMechanical }}
        />
        <motion.path
          d={`M ${points.core.x} ${points.core.y} L ${points.fresh.x} ${points.fresh.y}`}
          fill="none"
          stroke="#239DD6"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={reduced ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: active ? 1 : 0, opacity: active ? 1 : 0 }}
          transition={{ duration: active ? 0.7 : 0.2, delay: active && !reduced ? 0.15 : 0, ease: easeMechanical }}
        />
        <Node cx={points.known.x} cy={points.known.y} />
        <Node cx={points.core.x} cy={points.core.y} core />
        <motion.g
          initial={reduced ? false : { opacity: 0, scale: 0.7 }}
          animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.7 }}
          style={{ transformOrigin: `${points.fresh.x}px ${points.fresh.y}px` }}
          transition={{ duration: 0.45, delay: active && !reduced ? 0.45 : 0, ease: easeMechanical }}
        >
          <Node cx={points.fresh.x} cy={points.fresh.y} fresh />
        </motion.g>
      </svg>
      <p className="mt-2 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-ink" aria-live="polite">
        {active ? caption : "En attente de signal"}
      </p>
    </div>
  );
}

function Node({
  cx,
  cy,
  core = false,
  fresh = false,
}: {
  cx: number;
  cy: number;
  core?: boolean;
  fresh?: boolean;
}) {
  const r = core ? 16 : 10;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#F4F3EF" stroke={fresh || core ? "#239DD6" : "#262626"} strokeWidth={core ? 2 : 1.4} />
      <circle cx={cx} cy={cy} r={core ? 8 : 4} fill={fresh || core ? "#239DD6" : "#252A75"} />
    </g>
  );
}
