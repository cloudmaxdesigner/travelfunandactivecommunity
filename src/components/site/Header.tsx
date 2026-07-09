import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/tfac-logo.asset.json";

const NAV = [
  { href: "#about", label: "About" },
  { href: "#what-we-do", label: "What We Do" },
  { href: "#impact", label: "Impact" },
  { href: "#leadership", label: "Leadership" },
  { href: "#contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-10">
        <a href="#top" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src={logo.url} alt="TFAC logo" className="h-11 w-11 rounded-full object-cover" width={44} height={44} />
          <span className="font-display text-lg font-semibold leading-tight text-navy sm:text-xl">
            Travel, Fun<span className="text-sunset"> &amp;</span> Active <span className="hidden sm:inline">Community</span>
          </span>
        </a>
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="rounded-full px-3 py-2 text-sm font-medium text-navy/80 transition-colors hover:bg-cream hover:text-navy">
              {n.label}
            </a>
          ))}
          <a href="#contact" className="ml-2 rounded-full bg-sunset px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sunset/90">
            Connect
          </a>
        </nav>
        <button type="button" className="rounded-md p-2 text-navy lg:hidden" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((v) => !v)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border/60 bg-background lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-base font-medium text-navy/90 hover:bg-cream">
                {n.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
