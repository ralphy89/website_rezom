import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { SignalIndicator } from "@/components/ui/SignalIndicator";
import { navigation, site } from "@/lib/site";

export function Footer() {
  return (
    <footer id="contact" className="scroll-mt-36 border-t border-line">
      <div className="mx-auto grid w-full max-w-[1400px] gap-12 border-line px-5 py-16 md:px-8 lg:grid-cols-12 lg:border-l lg:px-14 lg:py-20 xl:px-[72px]">
        <div className="lg:col-span-5">
          <Logo size="footer" />
          <p className="mt-6 font-display text-[1.15rem] tracking-[-0.03em] md:text-[1.35rem]">{site.slogan}</p>
        </div>
        <nav aria-label="Navigation du pied de page" className="lg:col-span-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Navigation</p>
          <ul className="mt-4 space-y-1">
            {navigation.map((item) => (
              <li key={item.id}>
                <Link href={item.href} className="inline-flex min-h-11 items-center text-[15px] underline-offset-4 hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="lg:col-span-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Contact</p>
          <a href={`mailto:${site.email}`} className="mt-4 inline-flex min-h-11 items-center text-[16px] text-ink underline decoration-azure underline-offset-4">
            {site.email}
          </a>
          <ul className="mt-4 space-y-2">
            {site.socials.map((social) => (
              <li key={social.label} className="font-mono text-[12px] uppercase tracking-[0.16em] text-charcoal">
                {social.href ? (
                  <a href={social.href} className="inline-flex min-h-11 items-center underline-offset-4 hover:underline">
                    {social.label}
                  </a>
                ) : (
                  <span className="inline-flex min-h-11 items-center">{social.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bg-ink text-paper">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-3 px-5 py-4 font-mono text-[11px] uppercase tracking-[0.16em] sm:flex-row sm:items-center sm:justify-between md:px-8 lg:px-14 xl:px-[72px]">
          <span>REZOM</span>
          <span className="inline-flex items-center gap-2">
            <SignalIndicator label="Network status: active" className="text-paper/80" />
          </span>
          <span>© {site.year}</span>
        </div>
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-center gap-2 border-t border-white/10 px-5 py-2 md:px-8 lg:px-14 xl:px-[72px]">
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-paper/70">Propulsé par</span>
          <Image
            src="/vinkodeai.png"
            alt="VinkodeAI"
            width={720}
            height={171}
            className="h-4 w-auto"
            style={{ width: "auto", height: "1rem" }}
          />
        </div>
      </div>
    </footer>
  );
}
