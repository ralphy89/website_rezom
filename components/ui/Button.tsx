import { cn } from "@/lib/cn";

type Common = {
  variant?: "primary" | "secondary";
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = Common &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = Common &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children"> & {
    href: string;
  };

export function Button({ variant = "primary", className, children, ...props }: ButtonAsButton | ButtonAsLink) {
  const classes = cn(
    "inline-flex min-h-11 items-center justify-center gap-2.5 px-5 text-[12px] font-medium uppercase tracking-[0.14em] transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:cursor-not-allowed disabled:opacity-50",
    variant === "primary" ? "bg-ink text-paper hover:bg-charcoal" : "border border-ink bg-transparent text-ink hover:bg-ink hover:text-paper",
    className,
  );

  const content = (
    <>
      {variant === "primary" ? <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-azure" /> : null}
      {children}
    </>
  );

  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }

  const { type = "button", ...buttonProps } = props as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
