"use client";

import Link from "next/link";
import { useLang } from "./LangContext";
import { AFFILIATE_URL } from "@/lib/constants";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="mt-20 border-t border-border px-6 py-12 pb-24 md:pb-12">
      <div className="mx-auto flex max-w-[1240px] flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div>
          <div className="mb-2 font-display text-[28px] tracking-[3px] text-t1/15">
            DVXDR3PS
          </div>
          <p className="text-[13px] text-t4">{t.ft}</p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-[12px] font-semibold text-t3">
          <Link href="/" className="hover:text-acc">{t.nav.home}</Link>
          <Link href="/spreadsheet" className="hover:text-acc">{t.nav.sheet}</Link>
          <Link href="/tutorial" className="hover:text-acc">{t.nav.tuto}</Link>
          <a
            href={AFFILIATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-acc"
          >
            LoveGoBuy
          </a>
        </div>
      </div>
    </footer>
  );
}
