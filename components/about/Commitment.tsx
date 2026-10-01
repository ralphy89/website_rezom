import { AboutShell } from "@/components/about/AboutShell";
import { commitments } from "@/lib/about";

export function AboutCommitment() {
  return (
    <AboutShell>
      <h2 className="section-title max-w-[12ch] text-ink">Un réseau se construit ensemble.</h2>
      <p className="mt-5 max-w-[36ch] text-[15px] leading-snug text-charcoal md:mt-6 md:text-[17px]">Faire partie de REZOM, c’est aussi contribuer à la vie du réseau.</p>
      <ul className="mt-12 border-t border-line-strong">
        {commitments.map((item) => (
          <li key={item.title}>
            <div className="group grid min-h-[72px] grid-cols-1 items-center gap-2 border-b border-line-strong py-4 md:grid-cols-[1fr_1.4fr_auto] md:gap-6">
              <span className="font-display text-[1.15rem] uppercase leading-none tracking-[-0.04em] md:text-[clamp(1.4rem,2.5vw,2rem)]">{item.title}</span>
              <span className="text-[14px] text-charcoal md:text-[16px]">{item.text}</span>
              <span aria-hidden className="hidden h-px w-16 origin-left scale-x-0 bg-azure transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 md:block" />
            </div>
          </li>
        ))}
      </ul>
    </AboutShell>
  );
}
