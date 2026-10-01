import { cn } from "@/lib/cn";

type MemberCategoryProps = {
  title: string;
  selected: boolean;
  onSelect: () => void;
};

export function MemberCategory({ title, selected, onSelect }: MemberCategoryProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      onMouseEnter={onSelect}
      className={cn(
        "flex min-h-16 w-full items-center gap-4 border-b border-line px-4 py-4 text-left transition-colors duration-200 last:border-b-0 md:min-h-[76px] md:px-6",
        selected ? "bg-ink text-paper" : "bg-surface text-ink hover:bg-panel",
      )}
    >
      <span aria-hidden className="relative grid h-2.5 w-2.5 place-items-center">
        <span className={cn("absolute inset-0 rounded-full border", selected ? "border-azure" : "border-line-strong")} />
        <span className={cn("h-1.5 w-1.5 rounded-full", selected ? "bg-azure" : "bg-transparent")} />
      </span>
      <span className="font-display text-[1rem] uppercase leading-none tracking-[-0.04em] md:text-[clamp(1.35rem,2.4vw,2rem)]">
        {title}
      </span>
    </button>
  );
}
