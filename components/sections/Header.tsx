"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/cn";
import { navigation } from "@/lib/site";

const sectionIds: string[] = navigation.filter((item) => item.href.includes("#")).map((item) => item.id);
const idleSections: string[] = [];

export function Header() {
  const pathname = usePathname();
  const active = useActiveSection(pathname === "/" ? sectionIds : idleSections);
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const [height, setHeight] = useState(96);
  const menuId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const element = headerRef.current;
    if (!element) return;
    const observer = new ResizeObserver(() => setHeight(element.offsetHeight));
    observer.observe(element);
    setHeight(element.offsetHeight);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.getElementById("contenu")?.setAttribute("inert", "");
    document.querySelector("footer")?.setAttribute("inert", "");
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
      document.getElementById("contenu")?.removeAttribute("inert");
      document.querySelector("footer")?.removeAttribute("inert");
    };
  }, [open]);

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper supports-[backdrop-filter]:bg-paper/92 supports-[backdrop-filter]:backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-4 px-5 py-3 md:px-8 lg:px-14 xl:px-[72px]">
        <Link href="/" className="shrink-0" aria-label="REZO M, accueil">
          <Logo priority />
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-6 lg:flex">
          {navigation.map((item) => {
            const inSection = item.href.includes("#") && pathname === "/" && active === item.id;
            const onAbout = item.href === "/a-propos" && pathname === "/a-propos";
            const onHome = item.href === "/" && pathname === "/" && !sectionIds.includes(active);
            const current = inSection || onAbout || onHome;
            return (
              <Link
                key={item.id}
                href={item.href}
                aria-current={current ? (item.href.includes("#") ? "true" : "page") : undefined}
                className="group inline-flex min-h-11 items-center gap-2 text-[13px] text-charcoal"
              >
                <span
                  aria-hidden
                  className={cn(
                    "h-1.5 w-1.5 rounded-full transition-colors duration-200 group-hover:bg-azure",
                    current ? "bg-azure" : "bg-line-strong",
                  )}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/#adhesion" className="group relative inline-flex min-h-11 items-center">
            <span aria-hidden className="relative z-10 mr-2.5 grid h-3 w-3 shrink-0 place-items-center">
              <span className="absolute inset-0 rounded-full border border-navy/40" />
              <span className="h-1.5 w-1.5 rounded-full bg-azure transition-transform duration-200 group-hover:scale-125" />
              <span className="absolute left-1/2 top-1/2 h-px w-0 -translate-y-1/2 bg-azure transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-12" />
            </span>
            <span className="relative z-10 inline-flex min-h-11 items-center bg-ink px-3.5 text-[12px] font-medium uppercase tracking-[0.14em] text-paper sm:px-4">
              <span className="sm:hidden">Rejoindre</span>
              <span className="hidden sm:inline">Rejoindre REZO M</span>
            </span>
          </Link>
          <button
            ref={closeRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center border border-line lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden className="h-5 w-5" /> : <Menu aria-hidden className="h-5 w-5" />}
            <span className="sr-only">{open ? "Fermer le menu" : "Ouvrir le menu"}</span>
          </button>
        </div>
      </div>

      {open ? (
        <div
          id={menuId}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
          className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper lg:hidden"
          style={{ top: height }}
        >
          <nav aria-label="Navigation mobile" className="flex flex-col px-5 py-6">
            {navigation.map((item, index) => (
              <Link
                key={item.id}
                href={item.href}
                className="flex min-h-14 items-center gap-4 border-b border-line text-[1.35rem] font-display uppercase tracking-[-0.04em]"
                onClick={() => setOpen(false)}
              >
                <span className="font-mono text-[11px] tracking-[0.16em] text-muted">{String(index + 1).padStart(2, "0")}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
