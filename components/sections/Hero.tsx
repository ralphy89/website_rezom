"use client";

import { motion, useReducedMotion } from "framer-motion";
import { NetworkCanvas } from "@/components/network/NetworkCanvas";
import { Button } from "@/components/ui/Button";
import { CornerMarks } from "@/components/ui/CornerMarks";
import { easeMechanical } from "@/lib/motion";
import { site } from "@/lib/site";

const lines = ["Connecter.", "Collaborer.", "Réussir"];

export function Hero() {
  const reduced = useReducedMotion() === true;

  return (
    <section aria-labelledby="hero-title">
      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-8 border-line px-5 pb-12 pt-28 md:gap-10 md:px-8 md:pb-16 md:pt-36 lg:grid-cols-12 lg:gap-8 lg:border-l lg:px-14 lg:pb-20 lg:pt-40 xl:px-[72px]">
        <div className="min-w-0 lg:col-span-7">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">REZOM</p>
          <h1 id="hero-title" className="mt-6 text-ink">
            {lines.map((line, index) => (
              <motion.span
                key={line}
                className="hero-line flex items-baseline"
                initial={reduced ? false : { y: 18 }}
                animate={{ y: 0 }}
                transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.12 + index * 0.08, ease: easeMechanical }}
              >
                <span>
                  {line}
                  {index === 2 ? (
                    <>
                      <span className="sr-only">.</span>
                      <span
                        aria-hidden
                        className="ml-[0.08em] inline-grid h-[0.22em] w-[0.22em] translate-y-[-0.02em] place-items-center align-middle"
                      >
                        <span className="col-start-1 row-start-1 h-full w-full rounded-full border border-navy" />
                        <span className="col-start-1 row-start-1 h-[48%] w-[48%] rounded-full bg-azure" />
                      </span>
                    </>
                  ) : null}
                </span>
              </motion.span>
            ))}
          </h1>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-charcoal md:mt-8 md:text-[18px]">{site.tagline}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="#adhesion">Rejoindre REZOM</Button>
            <Button href="#a-propos" variant="secondary">
              Découvrir REZOM
            </Button>
          </div>
        </div>
        <div className="relative min-w-0 lg:col-span-5">
          <div className="relative">
            <CornerMarks />
            <NetworkCanvas />
          </div>
        </div>
      </div>
    </section>
  );
}
