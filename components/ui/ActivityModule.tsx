import type { Activity } from "@/lib/content";

export function ActivityModule({ index, title, text, icon: Icon }: Activity) {
  return (
    <article className="group min-h-[176px] bg-surface p-6 transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-ink hover:text-paper md:min-h-[220px] md:p-7">
      <div className="flex items-start justify-between">
        <Icon aria-hidden strokeWidth={1.4} className="h-6 w-6" />
        <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted group-hover:text-paper/70">
          <span className="h-1.5 w-1.5 rounded-full bg-line-strong transition-colors duration-200 group-hover:bg-azure" />
          {index}
        </span>
      </div>
      <h3 className="mt-10 font-display text-[1.35rem] uppercase leading-none tracking-[-0.03em] md:text-[1.6rem]">
        {title}
      </h3>
      <p className="mt-3 max-w-[24ch] text-[16px] leading-snug text-charcoal group-hover:text-paper/80">{text}</p>
    </article>
  );
}
