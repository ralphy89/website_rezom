import Image from "next/image";
type LogoProps = {
  size?: "header" | "footer";
  priority?: boolean;
};

const frames = {
  header: "relative block h-[76px] w-[54px] md:h-[108px] md:w-[77px]",
  footer: "relative block h-[210px] w-[149px] md:h-[240px] md:w-[170px]",
};

export function Logo({ size = "header", priority = false }: LogoProps) {
  return (
    <span className={frames[size]}>
      <Image
        src="/logo.png"
        alt="REZO M"
        fill
        priority={priority}
        sizes={size === "footer" ? "200px" : "(min-width: 768px) 120px, 80px"}
        className="object-contain object-left"
      />
    </span>
  );
}
