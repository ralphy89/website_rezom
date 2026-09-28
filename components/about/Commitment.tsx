import { AboutShell } from "@/components/about/AboutShell";
import { commitments } from "@/lib/about";

export function AboutCommitment() {
  return (
    <AboutShell>
      <h2 className="section-title max-w-[12ch] text-ink">Un réseau se construit ensemble.</h2>
      <p className="mt-6 max-w-[36ch] text-[17px] leading-snug text-charcoal">Faire partie de REZO M, c’est aussi contribuer à la vie du réseau.</p>
      <ul className="mt-12 border-t border-line-strong">
        {commitments.map((item, index) => (
          <li key={item.title}>
            <div className="group grid min-h-[88px] grid-cols-[auto_1fr] items-center gap-6 border-b border-line-strong py-4 md:grid-cols-[4rem_1fr_1.4fr_auto]">
              <span className="font-mono text-[11px] tracking-[0.16em] text-muted">{String(index + 1).padStart(2, "0")}</span>
              <span className="font-display text-[clamp(1.4rem,2.5vw,2rem)] uppercase leading-none tracking-[-0.04em]">{item.title}</span>
              <span className="col-span-2 text-[16px] text-charcoal md:col-span-1">{item.text}</span>
              <span aria-hidden className="col-span-2 hidden h-px w-16 origin-left scale-x-0 bg-azure transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 md:col-span-1 md:block" />
            </div>
          </li>
        ))}
      </ul>
    </AboutShell>
  );
}
