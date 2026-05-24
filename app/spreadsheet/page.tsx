"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useLang } from "@/components/LangContext";
import ProductCard from "@/components/ProductCard";
import {
  AFFILIATE_URL,
  CATEGORIES,
  type Product,
} from "@/lib/constants";
import { PlusIcon, SearchIcon } from "@/components/Icons";

type Sort = "new" | "old" | "top";

export default function SpreadsheetPage() {
  const { t } = useLang();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");
  const [sort, setSort] = useState<Sort>("new");

  function load() {
    setLoading(true);
    setErr(false);
    supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          setErr(true);
        } else {
          setProducts((data as Product[]) || []);
        }
        setLoading(false);
      });
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return products
      .filter((p) => {
        if (cat !== "All" && p.category !== cat) return false;
        if (!needle) return true;
        return (
          p.name.toLowerCase().includes(needle) ||
          p.category.toLowerCase().includes(needle)
        );
      })
      .sort((a, b) => {
        if (sort === "new")
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        if (sort === "old")
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
        return Number(b.rating) - Number(a.rating);
      });
  }, [products, q, cat, sort]);

  return (
    <div className="relative mx-auto max-w-[1240px] px-6 py-16 md:py-24">
      <div
        className="glow-orb"
        style={{
          top: "-100px",
          left: "50%",
          width: 540,
          height: 540,
          transform: "translateX(-50%)",
          background:
            "radial-gradient(circle, rgba(0,212,170,0.10) 0%, transparent 65%)",
        }}
      />

      <header className="relative mb-12 text-center">
        <div className="mb-4 inline-block rounded-full border border-acc/20 bg-acc/[0.08] px-4 py-1 text-[11px] font-bold uppercase tracking-[2px] text-acc">
          {filtered.length} {t.sheet.available}
        </div>
        <h1 className="font-display text-[clamp(50px,9vw,80px)] leading-none tracking-[3px]">
          {t.sheet.t.toUpperCase()}
        </h1>
        <p className="mt-3 text-[15px] text-t3">{t.sheet.s}</p>
        <a
          href={AFFILIATE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-[12px] font-semibold text-t3 transition-colors hover:border-acc hover:text-acc"
        >
          <PlusIcon size={11} /> {t.sheet.req}
        </a>
      </header>

      {/* Filters */}
      <div className="relative mb-8 rounded-[20px] border border-border bg-card p-5">
        <div className="mb-4 flex flex-wrap gap-1.5">
          {CATEGORIES.map((c) => {
            const active = cat === c;
            return (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-all ${
                  active
                    ? "border-acc bg-acc text-black shadow-[0_0_16px_rgba(0,212,170,0.35)]"
                    : "border-border text-t3 hover:border-border2 hover:text-t1"
                }`}
              >
                {c === "All" ? t.sheet.all : c}
              </button>
            );
          })}
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative min-w-[200px] flex-1">
            <span className="pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 text-t4">
              <SearchIcon size={15} />
            </span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t.sheet.search}
              className="w-full rounded-[10px] border border-border bg-white/[0.03] py-2.5 pl-10 pr-4 text-[14px] text-t1 outline-none transition-colors focus:border-acc"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="cursor-pointer rounded-[10px] border border-border bg-white/[0.03] px-3.5 py-2.5 text-[13px] text-t2 outline-none transition-colors hover:text-t1"
          >
            <option value="new">{t.sheet.new}</option>
            <option value="old">{t.sheet.old}</option>
            <option value="top">{t.sheet.top}</option>
          </select>
          <span className="whitespace-nowrap text-[13px] font-bold text-t4">
            {filtered.length} {t.sheet.count}
          </span>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="spinner" />
        </div>
      ) : err ? (
        <div className="py-20 text-center text-t3">
          <p>{t.sheet.error}</p>
          <button
            onClick={load}
            className="mt-4 rounded-[10px] border border-acc/30 bg-acc/10 px-6 py-2.5 text-[13px] font-bold text-acc"
          >
            {t.sheet.retry}
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center text-t4">{t.sheet.empty}</div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} label={t.sheet.go} />
          ))}
        </div>
      )}
    </div>
  );
}
