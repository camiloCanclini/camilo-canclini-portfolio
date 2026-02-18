"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Locale = "es" | "en";

type LangContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggleLocale: () => void;
};

const LangContext = createContext<LangContextValue | null>(null);

const STORAGE_KEY = "locale";

function isLocale(value: unknown): value is Locale {
  return value === "es" || value === "en";
}

export function LanguageProvider({
  children,
  defaultLocale = "es",
}: {
  children: React.ReactNode;
  defaultLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  // Leer preferencia guardada
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (isLocale(saved)) setLocaleState(saved);
    } catch {
      // ignore
    }
  }, []);

  // Persistir + setear <html lang="">
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      // ignore
    }
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (l: Locale) => setLocaleState(l);

  const toggleLocale = () => {
    setLocaleState((prev) => (prev === "es" ? "en" : "es"));
  };

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      toggleLocale,
    }),
    [locale]
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}
