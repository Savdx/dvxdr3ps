"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useLang } from "@/components/LangContext";
import {
  ADMIN_PASSWORD_CLIENT,
  CATEGORIES,
  type Product,
} from "@/lib/constants";
import {
  LockIcon,
  PlusIcon,
  TrashIcon,
  UploadIcon,
} from "@/components/Icons";

type FormState = {
  name: string;
  category: string;
  rating: string;
  price: string;
  link: string;
  image: string;
};

const INPUT_CLASS =
  "w-full rounded-[10px] border border-border bg-white/[0.03] px-3.5 py-2.5 text-[13px] text-t1 outline-none transition-colors focus:border-acc";

const EMPTY_FORM: FormState = {
  name: "",
  category: "Shoes",
  rating: "4.5",
  price: "",
  link: "",
  image: "",
};

export default function AdminPage() {
  const { t } = useLang();
  const [unlocked, setUnlocked] = useState(false);
  const [pw, setPw] = useState("");
  const [pwErr, setPwErr] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [delId, setDelId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // restore unlock state for the session
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("dvxd-admin-unlocked") === "1") {
      setUnlocked(true);
    }
  }, []);

  const load = () => {
    setLoading(true);
    supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setProducts((data as Product[]) || []);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (unlocked) load();
  }, [unlocked]);

  function unlock() {
    if (pw === ADMIN_PASSWORD_CLIENT) {
      setUnlocked(true);
      setPwErr(false);
      sessionStorage.setItem("dvxd-admin-unlocked", "1");
    } else {
      setPwErr(true);
    }
  }

  function lock() {
    setUnlocked(false);
    setPw("");
    sessionStorage.removeItem("dvxd-admin-unlocked");
  }

  function onImage(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result;
      if (typeof result === "string") {
        setForm((s) => ({ ...s, image: result }));
      }
    };
    reader.readAsDataURL(f);
  }

  async function addProduct() {
    if (!form.name.trim() || !form.link.trim() || saving) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": ADMIN_PASSWORD_CLIENT,
        },
        body: JSON.stringify({
          name: form.name.trim(),
          category: form.category,
          rating: parseFloat(form.rating) || 4.5,
          price: form.price.trim(),
          link: form.link.trim(),
          image: form.image,
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || `HTTP ${res.status}`);
      }
      const created = (await res.json()) as Product;
      setProducts((p) => [created, ...p]);
      setForm(EMPTY_FORM);
      if (fileRef.current) fileRef.current.value = "";
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to add product");
    } finally {
      setSaving(false);
    }
  }

  async function deleteProduct(id: number) {
    if (delId) return;
    setDelId(id);
    setError(null);
    try {
      const res = await fetch(`/api/admin/products?id=${id}`, {
        method: "DELETE",
        headers: { "x-admin-password": ADMIN_PASSWORD_CLIENT },
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || `HTTP ${res.status}`);
      }
      setProducts((p) => p.filter((x) => x.id !== id));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to delete");
    } finally {
      setDelId(null);
    }
  }

  return (
    <div className="relative mx-auto max-w-[860px] px-6 py-16 md:py-24">
      <div className="mb-9 flex items-center justify-between">
        <h1 className="font-display text-[44px] tracking-[2px]">
          {t.admin.t.toUpperCase()}
        </h1>
        {unlocked && (
          <button
            onClick={lock}
            className="rounded-[10px] border border-border bg-card px-4 py-2 text-[12px] font-bold text-t3 hover:text-t1"
          >
            LOCK
          </button>
        )}
      </div>

      {!unlocked ? (
        <div className="mx-auto max-w-[380px] rounded-[24px] border border-border bg-card px-10 py-14 text-center">
          <div className="mb-6 flex justify-center text-acc">
            <LockIcon size={32} />
          </div>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && unlock()}
            placeholder={t.admin.ph}
            className={`mb-3 w-full rounded-[10px] border bg-white/[0.03] px-4 py-3 text-[14px] text-t1 outline-none transition-colors ${
              pwErr ? "border-red-500/50" : "border-border focus:border-acc"
            }`}
          />
          {pwErr && (
            <p className="mb-3 text-[13px] text-red-400">{t.admin.wrong}</p>
          )}
          <button
            onClick={unlock}
            className="w-full rounded-[12px] bg-gradient-to-br from-acc to-acc2 py-3.5 text-[15px] font-extrabold text-black shadow-[0_0_20px_rgba(0,212,170,0.25)]"
          >
            {t.admin.btn}
          </button>
        </div>
      ) : (
        <div>
          {/* Add form */}
          <div className="mb-8 rounded-[20px] border border-border bg-card p-7">
            <h2 className="mb-6 text-[16px] font-bold text-acc">
              {t.admin.addT}
            </h2>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <Field label={t.admin.fn}>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  className={INPUT_CLASS}
                />
              </Field>
              <Field label={t.admin.fl}>
                <input
                  type="text"
                  value={form.link}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, link: e.target.value }))
                  }
                  placeholder="https://www.lovegobuy.com/..."
                  className={INPUT_CLASS}
                />
              </Field>
              <Field label={t.admin.fc}>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, category: e.target.value }))
                  }
                  className={INPUT_CLASS}
                >
                  {CATEGORIES.filter((c) => c !== "All").map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Field>
              <Field label={t.admin.fr}>
                <input
                  type="number"
                  min={0}
                  max={5}
                  step={0.1}
                  value={form.rating}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, rating: e.target.value }))
                  }
                  className={INPUT_CLASS}
                />
              </Field>
              <Field label={t.admin.fp}>
                <input
                  type="text"
                  value={form.price}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, price: e.target.value }))
                  }
                  placeholder="¥299"
                  className={INPUT_CLASS}
                />
              </Field>
              <div className="md:col-span-2">
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-t4">
                  {t.admin.fi}
                </label>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={onImage}
                  className="hidden"
                />
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="flex items-center gap-2 rounded-[10px] border border-acc/25 bg-acc/10 px-5 py-2.5 text-[13px] font-bold text-acc"
                  >
                    <UploadIcon size={14} /> {t.admin.fi}
                  </button>
                  {form.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={form.image}
                      alt="preview"
                      className="h-14 w-14 rounded-[10px] border border-acc/25 object-cover"
                    />
                  ) : (
                    <span className="text-[12px] text-t4">{t.admin.noimg}</span>
                  )}
                </div>
              </div>
            </div>

            {error && (
              <p className="mt-4 rounded-[10px] border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-[13px] text-red-400">
                {error}
              </p>
            )}

            <button
              onClick={addProduct}
              disabled={saving || !form.name.trim() || !form.link.trim()}
              className="mt-5 inline-flex items-center gap-2 rounded-[12px] bg-gradient-to-br from-acc to-acc2 px-8 py-3 text-[14px] font-extrabold text-black shadow-[0_0_20px_rgba(0,212,170,0.25)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? (
                <>
                  <span className="spinner !h-3.5 !w-3.5" /> {t.admin.saving}
                </>
              ) : (
                <>
                  <PlusIcon size={14} /> {t.admin.sub}
                </>
              )}
            </button>
          </div>

          {/* Product list */}
          <h2 className="mb-3.5 text-[15px] font-bold">
            {t.admin.list}{" "}
            <span className="text-t4">({products.length})</span>
          </h2>

          {loading ? (
            <div className="flex justify-center py-10">
              <div className="spinner" />
            </div>
          ) : products.length === 0 ? (
            <div className="py-10 text-center text-[14px] text-t4">
              No products yet. Add one above.
            </div>
          ) : (
            <div className="flex flex-col gap-1.5">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-3.5 rounded-[14px] border border-border bg-card px-3.5 py-2.5 transition-colors hover:border-border2"
                >
                  {p.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.image}
                      alt=""
                      className="h-12 w-12 shrink-0 rounded-[10px] bg-[#080808] object-cover"
                    />
                  ) : (
                    <div className="h-12 w-12 shrink-0 rounded-[10px] bg-[#080808]" />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13px] font-bold text-t1">
                      {p.name}
                    </div>
                    <div className="text-[12px] text-t4">
                      {p.category} · {Number(p.rating).toFixed(1)}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteProduct(p.id)}
                    disabled={delId === p.id}
                    className="flex shrink-0 items-center gap-1.5 rounded-lg border border-red-500/15 bg-red-500/[0.06] px-3.5 py-1.5 text-[12px] font-bold text-red-400 disabled:opacity-60"
                  >
                    {delId === p.id ? (
                      <span className="spinner !h-3 !w-3 !border-red-500/30 !border-t-red-400" />
                    ) : (
                      <TrashIcon size={12} />
                    )}{" "}
                    {t.admin.del}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-t4">
        {label}
      </label>
      {children}
    </div>
  );
}
