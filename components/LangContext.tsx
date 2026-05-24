"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { translations, type Lang, type Translation } from "@/lib/translations";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: Translation;
};

const LangCtx = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored =
      typeof window !== "undefined"
        ? (localStorage.getItem("dvxd-lang") as Lang | null)
        : null;
    if (stored === "en" || stored === "fr") setLangState(stored);
    setHydrated(true);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("dvxd-lang", l);
  };

  const toggle = () => setLang(lang === "en" ? "fr" : "en");

  void hydrated;

  return (
    <LangCtx.Provider
      value={{ lang, setLang, toggle, t: translations[lang] }}
    >
      {children}
    </LangCtx.Provider>
  );
}

export function useLang(): Ctx {
  const c = useContext(LangCtx);
  if (!c) throw new Error("useLang must be inside LangProvider");
  return c;
}
