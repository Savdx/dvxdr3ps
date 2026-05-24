"use client";

import {
  useEffect,
  useRef,
  useState,
  type DetailedHTMLProps,
  type HTMLAttributes,
} from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/components/LangContext";
import { AFFILIATE_URL } from "@/lib/constants";
import {
  ArrowIcon,
  CartIcon,
  PackageIcon,
  SearchIcon,
  UserIcon,
} from "@/components/Icons";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "wistia-player": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & { "media-id": string; aspect: string },
        HTMLElement
      >;
    }
  }
}

export default function TutorialPage() {
  const { t } = useLang();
  const router = useRouter();
  const videoRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src = "https://fast.wistia.com/player.js";
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement("script");
    script2.src = "https://fast.wistia.com/embed/xvjlkusjlu35po5.js";
    script2.async = true;
    script2.type = "module";
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  const steps = t.tuto.steps.map((s, i) => {
    const meta = [
      {
        icon: UserIcon,
        action: () => window.open(AFFILIATE_URL, "_blank", "noopener,noreferrer"),
        kind: "external" as const,
      },
      {
        icon: SearchIcon,
        action: () => router.push("/spreadsheet"),
        kind: "internal" as const,
      },
      {
        icon: PackageIcon,
        action: () => window.open(AFFILIATE_URL, "_blank", "noopener,noreferrer"),
        kind: "external" as const,
      },
    ][i];
    return { ...s, ...meta };
  });

  const ActiveIcon = steps[active].icon;

  return (
    <div className="relative mx-auto max-w-[1100px] px-6 py-16 md:py-24">
      <div
        className="glow-orb"
        style={{
          top: "-120px",
          left: "50%",
          width: 540,
          height: 540,
          transform: "translateX(-50%)",
          background:
            "radial-gradient(circle, rgba(0,212,170,0.12) 0%, transparent 65%)",
        }}
      />

      <header className="relative mb-12 text-center">
        <div className="mb-4 inline-block rounded-full border border-acc/20 bg-acc/[0.08] px-4 py-1 text-[11px] font-bold uppercase tracking-[2px] text-acc">
          TUTORIAL
        </div>
        <h1 className="font-display text-[clamp(48px,8vw,72px)] leading-none tracking-[3px]">
          {t.tuto.t.toUpperCase()}
        </h1>
        <p className="mt-3 text-[15px] text-t3">{t.tuto.s}</p>
        <button
          onClick={() =>
            videoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
          }
          className="pulse-glow mt-7 inline-flex items-center gap-2 rounded-[14px] bg-gradient-to-br from-acc to-acc2 px-8 py-3.5 text-[15px] font-extrabold text-black"
        >
          {t.tuto.start} <ArrowIcon size={15} />
        </button>
      </header>

      {/* Video */}
      <div
        ref={videoRef}
        className="relative mb-14 overflow-hidden rounded-[24px] border border-border bg-black"
        style={{ width: "100%", aspectRatio: "16/9" }}
      >
        <wistia-player
          media-id="xvjlkusjlu35po5"
          aspect="16/9"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <p className="mb-14 text-center text-[13px] text-t4">{t.tuto.videoLabel}</p>

      {/* Steps */}
      <div className="mb-10 grid gap-5 md:grid-cols-3">
        {steps.map((s, i) => {
          const Icon = s.icon;
          const isActive = active === i;
          return (
            <button
              key={i}
              type="button"
              onClick={() => {
                setActive(i);
                s.action();
              }}
              onMouseEnter={() => setActive(i)}
              className={`group relative overflow-hidden rounded-[20px] border p-7 text-left transition-all duration-300 ${
                isActive
                  ? "-translate-y-1 border-acc bg-acc/[0.06] shadow-[0_10px_40px_rgba(0,212,170,0.18)]"
                  : "border-border bg-card hover:border-border2"
              }`}
            >
              <div className="absolute -right-6 -top-6 font-display text-[140px] leading-none transition-colors duration-300 text-t1/[0.025] group-hover:text-acc/10">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="relative">
                <div
                  className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl transition-colors ${
                    isActive ? "bg-acc text-black" : "bg-acc/10 text-acc"
                  }`}
                >
                  <Icon size={20} />
                </div>
                <h3 className="mb-2 text-[16px] font-bold text-t1">{s.t}</h3>
                <p className="text-[13px] leading-[1.65] text-t3">{s.d}</p>
                <div
                  className={`mt-5 flex items-center gap-1.5 text-[12px] font-bold transition-colors ${
                    isActive ? "text-acc" : "text-t4"
                  }`}
                >
                  {s.kind === "external" ? "OPEN" : "GO"} <ArrowIcon size={12} />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detail panel */}
      <div className="mb-10 overflow-hidden rounded-[20px] border border-border bg-card">
        <div className="flex flex-col gap-6 p-8 md:flex-row md:items-center">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-acc to-acc2 text-black shadow-[0_0_30px_rgba(0,212,170,0.3)]">
            <ActiveIcon size={26} />
          </div>
          <div className="flex-1">
            <div className="mb-1 text-[11px] font-bold uppercase tracking-[2px] text-acc">
              STEP {String(active + 1).padStart(2, "0")} / 03
            </div>
            <h3 className="mb-2 font-display text-[28px] leading-none tracking-[1.5px] text-t1">
              {steps[active].t}
            </h3>
            <p className="text-[14px] leading-[1.7] text-t3">
              {steps[active].d}
            </p>
          </div>
          <button
            onClick={steps[active].action}
            className="flex shrink-0 items-center gap-2 rounded-[12px] bg-acc px-6 py-3 text-[13px] font-extrabold text-black shadow-[0_0_24px_rgba(0,212,170,0.3)]"
          >
            {steps[active].kind === "external" ? t.tuto.cta : t.nav.sheet}{" "}
            <ArrowIcon size={13} />
          </button>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="text-center">
        <a
          href={AFFILIATE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-[14px] bg-gradient-to-br from-acc to-acc2 px-12 py-4 text-[16px] font-extrabold text-black shadow-[0_0_30px_rgba(0,212,170,0.3)] transition-shadow hover:shadow-[0_0_40px_rgba(0,212,170,0.5)]"
        >
          <CartIcon size={16} /> {t.tuto.cta} <ArrowIcon size={16} />
        </a>
      </div>
    </div>
  );
}
