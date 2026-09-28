"use client";

import { motion, useReducedMotion } from "framer-motion";
import { easeMechanical } from "@/lib/motion";

type NetworkLineProps = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay?: number;
  highlighted?: boolean;
};

export function NetworkLine({ x1, y1, x2, y2, delay = 0, highlighted = false }: NetworkLineProps) {
  const reduced = useReducedMotion() === true;

  return (
    <motion.path
      d={`M ${x1} ${y1} L ${x2} ${y2}`}
      fill="none"
      stroke={highlighted ? "#239DD6" : "#262626"}
      strokeWidth={highlighted ? 1.7 : 1.15}
      strokeLinecap="round"
      initial={reduced ? false : { pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: highlighted ? 1 : 0.55 }}
      transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : delay, ease: easeMechanical }}
    />
  );
}
