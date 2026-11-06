import { useState } from "react";
import { profile } from "../data.js";
import { LANGS, useLang } from "../i18n/index.jsx";

export default function Nav({ navigate }) {
  const [open, setOpen] = useState(false);
  const { t, lang, setLang } = useLang();
  const links = [
    { to: "/#about", label: t.nav.about },
    { to: "/#projects", label: t.nav.projects },
    { to: "/#experience", label: t.nav.experience },
    { to: "/#contact", label: t.nav.contact },
  ];
  const go = (e, to) => {
    e.preventDefault();
    setOpen(false);
    navigate(to);
  };

  return (
    <header className="nav">
      <a href="#" className="nav-logo" onClick={(e) => go(e, "/")}>
        <span className="chip-logo">{profile.initials}</span>
        <span>{profile.shortName}</span>
      </a>
      <nav className={open ? "nav-links open" : "nav-links"}>
        {links.map((l) => (
          <a key={l.to} href={l.to.replace("/", "")} onClick={(e) => go(e, l.to)}>{l.label}</a>
        ))}
      </nav>
      <div className="nav-right">
        <div className="lang-switch" role="group" aria-label={t.nav.language}>
          {LANGS.map((l) => (
            <button key={l.code} lang={l.code} title={l.name} aria-pressed={lang === l.code}
              className={lang === l.code ? "on" : ""} onClick={() => setLang(l.code)}>
              {l.label}
            </button>
          ))}
        </div>
        <button className="nav-toggle" aria-label={t.nav.menu} onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
