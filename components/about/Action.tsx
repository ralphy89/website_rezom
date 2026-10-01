import { AboutShell } from "@/components/about/AboutShell";
import { actionModules } from "@/lib/about";

export function AboutAction() {
  return (
    <AboutShell>
      <h2 className="section-title text-ink">Le réseau en action.</h2>
      <ul className="mt-8 grid gap-px border border-line-strong bg-line-strong md:mt-12 md:grid-cols-2 lg:grid-cols-3">
        {actionModules.map((module) => (
          <li key={module.index} className="group min-h-[160px] bg-surface p-6">
            <span className="block h-1.5 w-1.5 rounded-full bg-line-strong transition-colors duration-200 group-hover:bg-azure" />
            <h3 className="mt-6 font-display text-[1.1rem] uppercase leading-none tracking-[-0.03em] md:mt-8 md:text-[1.35rem]">{module.title}</h3>
            <p className="mt-2 max-w-[28ch] text-[14px] leading-snug text-charcoal md:mt-3 md:text-[15px]">{module.text}</p>
          </li>
        ))}
      </ul>
    </AboutShell>
  );
}
