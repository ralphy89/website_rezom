"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type NavigatorWithMemory = Navigator & { deviceMemory?: number };

export function useMotionProfile() {
  const reduced = useReducedMotion() === true;
  const [lite, setLite] = useState(false);

  useEffect(() => {
    const memory = (navigator as NavigatorWithMemory).deviceMemory ?? 8;
    const cores = navigator.hardwareConcurrency ?? 8;
    setLite(reduced || cores <= 4 || memory <= 4);
  }, [reduced]);

  return { reduced, lite };
}
