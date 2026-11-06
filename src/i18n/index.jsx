import { createContext, useContext, useEffect, useMemo, useState } from "react";
import en from "./en.js";
import zhHant from "./zh-Hant.js";
import zhHans from "./zh-Hans.js";
import { buildContent } from "../data.js";

// 支援的語言：要新增語言就在這裡加一行，並新增一個翻譯檔
export const LANGS = [
  { code: "en", label: "EN", name: "English", dict: en },
  { code: "zh-Hant", label: "繁", name: "繁體中文", dict: zhHant },
  { code: "zh-Hans", label: "简", name: "简体中文", dict: zhHans },
];
const byCode = Object.fromEntries(LANGS.map((l) => [l.code, l]));

// 第一次來的訪客：依瀏覽器語言自動選擇（台灣/香港 → 繁體，中國/新加坡 → 簡體，其他 → 英文）
function detect() {
  const q = new URLSearchParams(window.location.search).get("lang");
  if (q && byCode[q]) return q;
  try {
    const saved = localStorage.getItem("lang");
    if (saved && byCode[saved]) return saved;
  } catch {}
  for (const l of navigator.languages || [navigator.language || "en"]) {
    const s = l.toLowerCase();
    if (/^zh-(tw|hk|mo)|hant/.test(s)) return "zh-Hant";
    if (s.startsWith("zh")) return "zh-Hans";
    if (s.startsWith("en")) return "en";
  }
  return "en";
}

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(detect);
  const dict = byCode[lang].dict;

  const value = useMemo(
    () => ({
      lang,
      t: dict.ui,
      c: buildContent(dict.content),
      setLang: (code) => {
        setLangState(code);
        try { localStorage.setItem("lang", code); } catch {}
      },
    }),
    [lang, dict]
  );

  useEffect(() => {
    document.documentElement.lang = dict.meta.htmlLang;
    document.title = dict.meta.title;
  }, [dict]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
