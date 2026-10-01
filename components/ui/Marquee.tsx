import { marqueeItems } from "@/lib/content";

export function Marquee() {
  return (
    <div className="marquee overflow-hidden border-y border-line bg-panel" aria-hidden="true">
      <div className="marquee-track flex w-max">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {marqueeItems.map((item) => (
              <li key={`${copy}-${item}`} className="flex items-center">
                <span className="px-4 font-display text-[1rem] uppercase leading-none tracking-[-0.045em] md:px-10 md:text-[clamp(1.7rem,3.6vw,3.15rem)]">
                  {item}
                </span>
                <NodeSeparator />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

function NodeSeparator() {
  return (
    <span className="relative grid h-3.5 w-3.5 place-items-center">
      <span className="absolute inset-0 rounded-full border border-navy/50" />
      <span className="h-1.5 w-1.5 rounded-full bg-azure" />
    </span>
  );
}
