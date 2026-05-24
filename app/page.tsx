"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import ProductCard from "@/components/ProductCard";
import {
  AFFILIATE_URL,
  FALLBACK_PRODUCTS,
  type Product,
} from "@/lib/constants";
import {
  ArrowIcon,
  PackageIcon,
  ShieldIcon,
  StarOutlineIcon,
  TagIcon,
  TicketIcon,
  TruckIcon,
  UsersIcon,
} from "@/components/Icons";

/* Scroll-reveal wrapper using IntersectionObserver. */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const TRUST_BADGES = [
  { icon: ShieldIcon, label: "Verified Sellers" },
  { icon: PackageIcon, label: "400+ Products" },
  { icon: StarOutlineIcon, label: "Top Rated Picks" },
  { icon: TagIcon, label: "Best Prices" },
];

const FEATURES = [
  {
    icon: TicketIcon,
    title: "700€ Welcome Coupons",
    desc: "Create your free account through our link and unlock 700€ in LoveGoBuy coupons the moment you sign up.",
  },
  {
    icon: UsersIcon,
    title: "Trusted by 250,000+ Users",
    desc: "Join a community of a quarter-million shoppers already sourcing verified products from trusted sellers.",
  },
  {
    icon: TruckIcon,
    title: "Fast Shipping to France",
    desc: "Reliable forwarding with tracking. Most orders land in France within 7–14 days, fully insured.",
  },
];

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(4)
      .then(({ data, error }) => {
        if (cancelled) return;
        if (!error && data && data.length > 0) {
          setProducts(data as Product[]);
        } else {
          setProducts(FALLBACK_PRODUCTS);
        }
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="relative">
      {/* ─── HERO ─── */}
      <section className="relative flex min-h-[calc(100vh-58px)] flex-col items-center justify-center overflow-hidden px-6 py-20 text-center">
        {/* Animated gradient glow behind headline */}
        <div
          className="glow-orb animate-pulse-slow"
          style={{
            top: "12%",
            left: "50%",
            width: 760,
            height: 520,
            transform: "translateX(-50%)",
            background:
              "radial-gradient(circle, rgba(0,212,170,0.20) 0%, rgba(0,212,170,0.05) 38%, transparent 68%)",
          }}
        />
        <div
          className="glow-orb"
          style={{
            bottom: "-10%",
            left: "10%",
            width: 360,
            height: 360,
            background:
              "radial-gradient(circle, rgba(0,212,170,0.07) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-[1] mx-auto max-w-[920px] animate-fade-up">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-acc/20 bg-acc/[0.08] px-4 py-1.5 text-[12px] font-bold uppercase tracking-[1.5px] text-acc">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-acc opacity-75" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-acc" />
            </span>
            Trusted Reps · Real Prices
          </div>

          <h1 className="font-display text-[clamp(56px,12vw,128px)] leading-[0.9] tracking-[2px] text-t1">
            The #1 Rep Database
          </h1>
          <h1 className="mb-8 font-display text-[clamp(56px,12vw,128px)] leading-[0.9] tracking-[2px] gradient-text">
            For LoveGoBuy.
          </h1>

          <p className="mx-auto mb-10 max-w-[600px] text-[17px] leading-[1.75] text-t2">
            400+ verified products. Trusted sellers. Sign up via our link and
            unlock 700€ in welcome coupons.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={AFFILIATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="pulse-glow flex items-center gap-2 rounded-[14px] bg-gradient-to-br from-acc to-acc2 px-9 py-4 text-[16px] font-extrabold text-black"
            >
              Get 700€ in Coupons <ArrowIcon size={16} />
            </a>
            <Link
              href="/spreadsheet"
              className="flex items-center gap-2 rounded-[14px] border border-border2 bg-transparent px-9 py-4 text-[16px] font-bold text-t1 transition-all hover:border-acc hover:text-acc"
            >
              Browse Products <ArrowIcon size={16} />
            </Link>
          </div>
        </div>

        {/* Trust badges */}
        <div className="relative z-[1] mt-16 grid w-full max-w-[760px] grid-cols-2 gap-3 sm:grid-cols-4">
          {TRUST_BADGES.map(({ icon: Icon, label }, i) => (
            <Reveal key={label} delay={i * 80}>
              <div className="flex items-center justify-center gap-2.5 rounded-[14px] border border-border bg-card/60 px-4 py-3.5 backdrop-blur-sm">
                <span className="text-acc">
                  <Icon size={18} />
                </span>
                <span className="text-[13px] font-semibold text-t2">
                  {label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── WHY LOVEGOBUY ─── */}
      <section className="relative mx-auto max-w-[1240px] px-6 py-24">
        <Reveal className="mb-12 text-center">
          <div className="mb-3 inline-block rounded-full border border-acc/20 bg-acc/[0.08] px-3 py-1 text-[11px] font-bold uppercase tracking-[1.5px] text-acc">
            Why LoveGoBuy
          </div>
          <h2 className="font-display text-[clamp(40px,7vw,64px)] leading-none tracking-[2px]">
            Built For Serious Buyers
          </h2>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 100}>
              <div className="group h-full rounded-[20px] border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-acc/30 hover:shadow-[0_10px_40px_rgba(0,212,170,0.1)]">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-acc/10 text-acc transition-colors group-hover:bg-acc group-hover:text-black">
                  <Icon size={22} />
                </div>
                <h3 className="mb-2.5 text-[18px] font-bold text-t1">{title}</h3>
                <p className="text-[14px] leading-[1.7] text-t3">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── LATEST DROPS ─── */}
      <section className="relative mx-auto max-w-[1240px] px-6 pb-24">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-[44px] leading-none tracking-[2px]">
              Latest Drops
            </h2>
            <p className="mt-2 text-[14px] text-t4">Fresh picks added recently</p>
          </div>
          <Link
            href="/spreadsheet"
            className="flex items-center gap-1.5 rounded-[10px] border border-border2 px-5 py-2.5 text-[13px] font-semibold text-t2 transition-all hover:border-acc hover:text-acc"
          >
            View all <ArrowIcon size={14} />
          </Link>
        </Reveal>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="spinner" />
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
            {products.slice(0, 4).map((p, i) => (
              <Reveal key={p.id} delay={i * 80}>
                <ProductCard product={p} label="View Product" />
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="relative mx-auto max-w-[1240px] px-6 pb-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] border border-border bg-gradient-to-br from-card via-card to-[#0a1614] p-12 text-center md:p-16">
            <div
              className="glow-orb"
              style={{
                top: "-80px",
                left: "50%",
                width: 640,
                height: 320,
                transform: "translateX(-50%)",
                background:
                  "radial-gradient(ellipse, rgba(0,212,170,0.28) 0%, transparent 70%)",
              }}
            />
            <div className="relative">
              <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-acc/30 bg-acc/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[1.5px] text-acc">
                <TicketIcon size={11} /> 700€ DROP
              </div>
              <h2 className="mx-auto max-w-[700px] font-display text-[clamp(40px,7vw,72px)] leading-[0.95] tracking-[2px] text-t1">
                Ready to start your haul?
              </h2>
              <p className="mx-auto mt-5 max-w-[560px] text-[15px] leading-[1.7] text-t3">
                Sign up on LoveGoBuy via our link and get 700€ in coupons
                instantly.
              </p>
              <a
                href={AFFILIATE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="pulse-glow mt-8 inline-flex items-center gap-2 rounded-[14px] bg-gradient-to-br from-acc to-acc2 px-10 py-4 text-[16px] font-extrabold text-black"
              >
                Join LoveGoBuy Free <ArrowIcon size={16} />
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
