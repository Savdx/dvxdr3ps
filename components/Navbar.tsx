"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "./LangContext";
import { AFFILIATE_URL } from "@/lib/constants";
import { GlobeIcon } from "./Icons";

export default function Navbar() {
  const { lang, toggle, t } = useLang();
  const pathname = usePathname();

  const links = [
    { href: "/spreadsheet", label: t.nav.sheet },
    { href: "/tutorial", label: t.nav.tuto },
    { href: "/admin", label: t.nav.admin },
  ];

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <nav className="sticky top-0 z-40 flex h-[58px] items-center justify-between border-b border-border bg-bg/80 px-4 backdrop-blur-xl sm:px-8">
      <div className="flex items-center gap-7">
        <Link
          href="/"
          className="font-display text-[22px] tracking-[2px] text-t1"
        >
          DVXDR3PS
        </Link>
        <div className="hidden gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-lg px-3 py-1.5 text-[13px] font-semibold transition-colors ${
                isActive(l.href)
                  ? "text-acc"
                  : "text-t3 hover:text-t2"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <a
          href={AFFILIATE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-1.5 rounded-[10px] bg-acc px-4 py-2 text-[13px] font-bold text-black shadow-[0_0_20px_rgba(0,212,170,0.25)] transition-shadow hover:shadow-[0_0_28px_rgba(0,212,170,0.45)] sm:flex"
        >
          {t.nav.cta}
        </a>
        <button
          onClick={toggle}
          className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-[12px] font-bold text-t3 transition-colors hover:text-t1"
          aria-label="Toggle language"
        >
          <GlobeIcon size={12} />
          {lang === "en" ? "FR" : "EN"}
        </button>
      </div>
    </nav>
  );
}

export function MobileNav() {
  const { t } = useLang();
  const pathname = usePathname();
  const links = [
    { href: "/", label: t.nav.home },
    { href: "/spreadsheet", label: t.nav.sheet },
    { href: "/tutorial", label: t.nav.tuto },
    { href: "/admin", label: t.nav.admin },
  ];
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-around border-t border-border bg-bg/95 px-2 py-2 backdrop-blur-xl md:hidden">
      {links.map((l) => {
        const active = pathname === l.href;
        return (
          <Link
            key={l.href}
            href={l.href}
            className={`flex-1 rounded-md py-2 text-center text-[11px] font-bold transition-colors ${
              active ? "text-acc" : "text-t3"
            }`}
          >
            {l.label}
          </Link>
        );
      })}
    </div>
  );
}
