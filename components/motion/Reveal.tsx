"use client";

import { motion, useReducedMotion } from "framer-motion";
import { easeMechanical } from "@/lib/motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduced = useReducedMotion() === true;

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 1, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : delay, ease: easeMechanical }}
    >
      {children}
    </motion.div>
  );
}
