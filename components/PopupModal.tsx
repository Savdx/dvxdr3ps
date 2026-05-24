"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLang } from "./LangContext";
import { AFFILIATE_URL } from "@/lib/constants";
import {
  ArrowIcon,
  CartIcon,
  PlayIcon,
  SearchIcon,
  StarIcon,
  UserIcon,
  XIcon,
} from "./Icons";

const KNOWS_KEY = "dvxd_knows";
const INTERVAL_MS = 120_000; // 2 minutes

export default function PopupModal() {
  const { t } = useLang();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [sel, setSel] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const knowsRef = useRef(false);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const scheduleNext = useCallback(() => {
    clearTimer();
    if (knowsRef.current) return;
    if (pathname !== "/") return;
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      setOpen(true);
    }, INTERVAL_MS);
  }, [clearTimer, pathname]);

  // On mount / pathname change: open immediately on "/", clear any timer otherwise.
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (pathname !== "/") {
      clearTimer();
      setOpen(false);
      return;
    }

    knowsRef.current = localStorage.getItem(KNOWS_KEY) === "true";
    setOpen(true);

    return () => {
      clearTimer();
    };
  }, [pathname, clearTimer]);

  const closeNormally = useCallback(() => {
    setOpen(false);
    scheduleNext();
  }, [scheduleNext]);

  const closeForever = useCallback(() => {
    knowsRef.current = true;
    if (typeof window !== "undefined") {
      localStorage.setItem(KNOWS_KEY, "true");
    }
    clearTimer();
    setOpen(false);
  }, [clearTimer]);

  const go = useCallback(
    (path: string) => {
      // navigating away will unmount the popup logic on / and clear the timer
      clearTimer();
      setOpen(false);
      router.push(path);
    },
    [clearTimer, router],
  );

  if (!open) return null;

  const p = t.popup;
  const steps = [
    {
      icon: <PlayIcon />,
      ...p.s1,
      action: () => go("/tutorial"),
      kind: "internal",
    },
    {
      icon: <UserIcon />,
      ...p.s2,
      href: AFFILIATE_URL,
      kind: "external",
    },
    {
      icon: <CartIcon />,
      ...p.s3,
      action: () => go("/spreadsheet"),
      kind: "internal",
    },
  ] as const;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/85 px-4 backdrop-blur-md animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeNormally();
      }}
    >
      <div className="relative w-full max-w-[440px] rounded-3xl border border-border bg-[#0a0a0a] px-7 pb-7 pt-9 shadow-[0_0_80px_rgba(0,212,170,0.1)] animate-fade-up">
        <button
          onClick={closeNormally}
          aria-label="close"
          className="absolute right-3.5 top-3.5 p-1 text-[#444] transition-colors hover:text-t1"
        >
          <XIcon />
        </button>

        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-acc to-acc2 shadow-[0_0_40px_rgba(0,212,170,0.35)]">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="#000">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
          </div>
          <div className="mb-2.5 text-[11px] font-bold tracking-[3px] text-acc">
            {p.label}
          </div>
          <div className="font-display text-[22px] leading-tight tracking-[1.5px] text-t1">
            {p.t1}
            <br />
            {p.t2}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-1.5">
          {steps.map((s, i) => {
            const active = sel === i;
            const inner = (
              <>
                <span className="min-w-[18px] text-[11px] font-bold text-t4">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`flex transition-colors ${
                    active ? "text-acc" : "text-t3"
                  }`}
                >
                  {s.icon}
                </span>
                <div className="flex-1 text-left">
                  <div className="text-[13px] font-bold text-t1">{s.t}</div>
                  <div className="text-[12px] text-t4">{s.s}</div>
                </div>
                <span className="text-t4">
                  <ArrowIcon size={14} />
                </span>
              </>
            );

            const className = `flex w-full items-center gap-3.5 rounded-[14px] border px-3.5 py-3 text-left transition-all ${
              active
                ? "border-acc/35 bg-acc/5"
                : "border-border hover:border-border2"
            }`;

            if (s.kind === "external") {
              return (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setSel(i)}
                  onClick={() => {
                    setSel(i);
                    closeNormally();
                  }}
                  className={className}
                >
                  {inner}
                </a>
              );
            }
            return (
              <button
                key={i}
                onMouseEnter={() => setSel(i)}
                onClick={() => {
                  setSel(i);
                  s.action();
                }}
                className={className}
              >
                {inner}
              </button>
            );
          })}
        </div>

        <div className="mb-4 flex items-center justify-between px-1 text-[12px] text-t3">
          <span>{p.join}</span>
          <span className="flex items-center gap-1.5">
            <StarIcon filled size={11} /> {p.rate}
          </span>
        </div>

        <button
          onClick={() => go("/tutorial")}
          className="flex w-full items-center justify-center gap-2 rounded-[14px] bg-gradient-to-br from-acc to-acc2 px-4 py-3.5 text-[15px] font-extrabold text-black shadow-[0_0_30px_rgba(0,212,170,0.35)] transition-shadow hover:shadow-[0_0_40px_rgba(0,212,170,0.5)]"
        >
          {p.cta} <ArrowIcon size={16} />
        </button>

        <button
          onClick={() => go("/spreadsheet")}
          className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-[12px] border border-border bg-transparent px-3 py-3 text-[13px] font-semibold text-t3 transition-colors hover:text-t1"
        >
          <SearchIcon size={13} /> {p.skip} <ArrowIcon size={13} />
        </button>

        <button
          onClick={closeForever}
          className="mt-1 block w-full bg-transparent py-2 text-[12px] text-t4 transition-colors hover:text-t2"
        >
          {p.already}
        </button>
      </div>
    </div>
  );
}
