// src/i18n/index.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { applyDomL10n } from "./domL10n";

const I18nCtx = createContext(null);

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "lt");

  useEffect(() => {
    localStorage.setItem("lang", lang);
    applyDomL10n(lang); // LT nekeičia, EN/NO – verčia
  }, [lang]);

  // t() – palikta, jei kur nors jau naudoji
  const t = (k, fallback) => fallback || k;

  const value = useMemo(() => ({ lang, setLang, t }), [lang]);
  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nCtx);
  if (!ctx) {
    // Kad nestrigtų, jei kas nors pamirštų Provider (bet vis tiek rekomenduoju apgaubti, kaip 1 žingsnyje)
    return {
      lang: localStorage.getItem("lang") || "lt",
      setLang: (v) => {
        localStorage.setItem("lang", v);
        applyDomL10n(v);
        // be Provider komponentai neperenderins, todėl visada naudok Provider! (žr. 1 žingsnį)
      },
      t: (k, fallback) => fallback || k
    };
  }
  return ctx;
}

