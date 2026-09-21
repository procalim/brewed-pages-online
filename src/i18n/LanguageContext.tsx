import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { dictionary, type DictKey, type Lang } from "./dictionary";

const STORAGE_KEY = "codex.lang";

/** A string that exists in both languages — used by the data files. */
export type Localized = { ar: string; en: string };

type LanguageValue = {
  lang: Lang;
  dir: "rtl" | "ltr";
  isRTL: boolean;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  /** Translate a dictionary key. */
  t: (key: DictKey) => string;
  /** Pick the active language out of a localized object. */
  L: (value: Localized) => string;
};

const LanguageContext = createContext<LanguageValue | null>(null);

const readInitialLang = (): Lang => {
  if (typeof window === "undefined") return "ar";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "ar" || stored === "en") return stored;
  return navigator.language?.toLowerCase().startsWith("ar") ? "ar" : "ar";
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(readInitialLang);

  useEffect(() => {
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* storage can be blocked — the site still works without it */
    }
  }, [lang]);

  const setLang = useCallback((next: Lang) => setLangState(next), []);
  const toggleLang = useCallback(() => setLangState((prev) => (prev === "ar" ? "en" : "ar")), []);

  const value = useMemo<LanguageValue>(
    () => ({
      lang,
      dir: lang === "ar" ? "rtl" : "ltr",
      isRTL: lang === "ar",
      setLang,
      toggleLang,
      t: (key: DictKey) => dictionary[key]?.[lang] ?? key,
      L: (val: Localized) => val?.[lang] ?? "",
    }),
    [lang, setLang, toggleLang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLang = (): LanguageValue => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
};

/** Format a price with the active locale's digits. */
export const formatPrice = (amount: number, lang: Lang, symbol = "$") =>
  lang === "ar"
    ? `${amount.toFixed(2).replace(/\.00$/, "")} ${symbol}`
    : `${symbol}${amount.toFixed(2).replace(/\.00$/, "")}`;
