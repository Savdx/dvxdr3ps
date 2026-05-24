"use client";

import { useState } from "react";
import StarRating from "./StarRating";
import { ArrowIcon, HeartIcon } from "./Icons";
import { AFFILIATE_URL, type Product } from "@/lib/constants";

export default function ProductCard({
  product,
  label,
}: {
  product: Product;
  label: string;
}) {
  const [hover, setHover] = useState(false);
  const [imgOk, setImgOk] = useState(true);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`group relative overflow-hidden rounded-[20px] border bg-card transition-all duration-300 ${
        hover
          ? "-translate-y-1 border-acc/25 shadow-[0_10px_40px_rgba(0,212,170,0.12)]"
          : "border-border"
      }`}
    >
      <div className="relative aspect-square bg-[#080808]">
        {product.image && imgOk && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImgOk(false)}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        {product.price && (
          <span className="absolute left-3 top-3 rounded-md bg-black/70 px-2 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
            {product.price}
          </span>
        )}
        <button
          aria-label="favorite"
          className="absolute right-3 top-3 text-[#666] opacity-50 transition-opacity hover:opacity-100"
        >
          <HeartIcon />
        </button>
      </div>

      <div className="px-4 pb-[18px] pt-3.5">
        <div className="mb-1.5 text-[11px] uppercase tracking-[0.05em] text-t3">
          {product.category}
        </div>
        <div className="mb-2 line-clamp-2 min-h-[40px] text-sm font-bold leading-snug text-t1">
          {product.name}
        </div>
        <StarRating rating={product.rating} />
        <a
          href={product.link || AFFILIATE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-3.5 flex items-center justify-center gap-1.5 rounded-[14px] border px-3 py-2.5 text-[13px] font-semibold transition-all ${
            hover
              ? "border-acc bg-acc/10 text-acc"
              : "border-border2 text-t2"
          }`}
        >
          {label} <ArrowIcon size={14} />
        </a>
      </div>
    </div>
  );
}
