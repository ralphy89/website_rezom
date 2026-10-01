import type { Activity } from "@/lib/content";

export function ActivityModule({ title, text, icon: Icon }: Activity) {
  return (
    <article className="group min-h-[148px] bg-surface p-5 transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-ink hover:text-paper md:min-h-[220px] md:p-7">
      <div className="flex items-start justify-between">
        <Icon aria-hidden strokeWidth={1.4} className="h-6 w-6" />
        <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-line-strong transition-colors duration-200 group-hover:bg-azure" />
      </div>
      <h3 className="mt-5 font-display text-[1.05rem] uppercase leading-none tracking-[-0.03em] md:mt-10 md:text-[1.6rem]">
        {title}
      </h3>
      <p className="mt-2 max-w-[32ch] text-[14px] leading-snug text-charcoal group-hover:text-paper/80 md:mt-3 md:text-[16px]">{text}</p>
    </article>
  );
}
