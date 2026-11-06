import { useLang } from "../i18n/index.jsx";

const LANG_COLOR = { "C++": "#f34b7d", C: "#555555", Processing: "#0096d8", Java: "#b07219", Swift: "#f05138" };
import PcbShowcase from "../components/PcbShowcase.jsx";
import TelemetryDemo from "../components/TelemetryDemo.jsx";
import FoodDemo from "../components/FoodDemo.jsx";
import FlightStateMachine from "../components/FlightStateMachine.jsx";
import AdderDemo from "../components/AdderDemo.jsx";


function GitHubIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

// 專案卡片：標題、簡介、標籤，可以展開看完整細節
function ProjectText({ p, label }) {
  const { t } = useLang();
  return (
    <>
      <div className="tile-top">
        <span className="eyebrow">{label}</span>
        <span className="eyebrow">{p.date}</span>
      </div>
      <h3>{p.title}</h3>
      <p className="tile-blurb">{p.blurb}</p>
      <div className="tags">{p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
      {p.links && (
        <div className="code-links">
          {p.links.map((l) => (
            <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="code-link">
              <GitHubIcon /> {l.label} ↗
            </a>
          ))}
        </div>
      )}
      <details>
        <summary>{t.tiles.details}</summary>
        <ul>{p.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
      </details>
    </>
  );
}

export default function Home({ navigate }) {
  const { t, c } = useLang();
  const { profile, education, skills, experience, repos } = c;
  const { rocket, gcs, food, java, adder } = c.projects;
  const T = t.tiles, L = t.labels;
  const go = (e, to) => { e.preventDefault(); navigate(to); };
  const lead = experience[0];

  return (
    <main className="bento-page">
      <div className="bento">
        {/* ---------- 第一區：介紹 ---------- */}
        <section className="tile intro span-2 row-2" id="about">
          <div className="avatar">{profile.initials}</div>
          <h1>{t.hero.hi(profile.name)}</h1>
          <p className="intro-tagline">{profile.tagline}</p>
          <p className="muted">{profile.summary}</p>
          <div className="actions">
            <a className="btn primary" href="#projects" onClick={(e) => go(e, "/#projects")}>{t.hero.viewProjects}</a>
            <a className="btn" href={profile.github} target="_blank" rel="noreferrer"><GitHubIcon /> GitHub</a>
            <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </section>

        <div className="tile dark stat">
          <span className="eyebrow">{T.gpa}</span>
          <span className="big">{education.gpa}</span>
          <span className="muted small">{education.degree}</span>
        </div>

        <div className="tile school">
          <span className="eyebrow">{T.education}</span>
          <div>
            <h3>{education.school}</h3>
            <p className="muted small">{education.place} · {education.date}</p>
          </div>
        </div>

        <div className="tile status">
          <span className="eyebrow">{T.status}</span>
          <div className="status-line"><span className="pulse" /> {T.open}</div>
          <p className="muted small">{T.focus}</p>
        </div>

        <a className="tile linkedin" href={profile.linkedin} target="_blank" rel="noreferrer">
          <span className="eyebrow">{T.connect}</span>
          <span className="li-logo">in</span>
          <span className="tile-link">LinkedIn ↗</span>
        </a>

        {/* ---------- 專案 ---------- */}
        <section className="tile dark span-2 row-3 project-tile" id="projects">
          <ProjectText p={rocket} label={L.rocket} />
          <PcbShowcase />
        </section>

        <section className="tile dark span-2 row-2 project-tile">
          <ProjectText p={gcs} label={L.gcs} />
          <TelemetryDemo />
        </section>

        <div className="tile accent stat">
          <span className="eyebrow">{T.pcbs}</span>
          <span className="big">2</span>
          <span className="small">{T.pcbsSub}</span>
        </div>
        <div className="tile stat">
          <span className="eyebrow">{T.telemetry}</span>
          <span className="big">13+</span>
          <span className="muted small">{T.telemetrySub}</span>
        </div>

        <section className="tile span-2 row-2 fsm-tile">
          <div className="tile-top">
            <span className="eyebrow">{t.fsm.eyebrow}</span>
            <a className="eyebrow gh-inline" href="https://github.com/chalie32/Rocket_redunt/blob/main/src/FlightController.cpp" target="_blank" rel="noreferrer">FlightController.cpp ↗</a>
          </div>
          <h3>{t.fsm.title}</h3>
          <p className="tile-blurb">{t.fsm.blurb}</p>
          <FlightStateMachine />
          <div className="spec-chips">
            {t.fsm.chips.map((x) => <span key={x}>{x}</span>)}
          </div>
        </section>

        <section className="tile span-2 row-2 project-tile">
          <ProjectText p={adder} label={L.adder} />
          <AdderDemo />
        </section>

        <section className="tile span-2 row-2 food-tile">
          <div className="food-text">
            <ProjectText p={food} label={L.food} />
          </div>
          <FoodDemo />
        </section>

        <section className="tile span-2 skills-tile">
          <span className="eyebrow">{T.toolbox}</span>
          {skills.map((g) => (
            <div key={g.group} className="skill-row">
              <h4>{g.group}</h4>
              <div className="tags">{g.items.map((s) => <span className="tag" key={s}>{s}</span>)}</div>
            </div>
          ))}
        </section>

        <section className="tile span-2 project-tile">
          <ProjectText p={java} label={L.java} />
        </section>

        {/* ---------- 領導經驗 + 聯絡 ---------- */}
        <section className="tile span-2" id="experience">
          <div className="tile-top">
            <span className="eyebrow">{T.leadership}</span>
            <span className="eyebrow">{lead.date}</span>
          </div>
          <h3>{lead.role}</h3>
          <p className="muted">{lead.org}</p>
          <ul>{lead.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
        </section>

        <section className="tile github-tile span-2">
          <div className="tile-top">
            <span className="eyebrow">{T.openSource}</span>
            <a className="eyebrow gh-handle" href={profile.github} target="_blank" rel="noreferrer">@chalie32 ↗</a>
          </div>
          <h3><GitHubIcon size={20} /> {T.onGithub}</h3>
          <div className="repo-list">
            {repos.map((r) => (
              <a key={r.name} className="repo" href={`${profile.github}/${r.name}`} target="_blank" rel="noreferrer">
                <span className="repo-name">{r.name}</span>
                <span className="repo-desc">{r.desc}</span>
                <span className="repo-lang"><i style={{ background: LANG_COLOR[r.lang] || "#8b949e" }} />{r.lang}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="tile accent span-4 contact-tile" id="contact">
          <span className="eyebrow">{T.contact}</span>
          <h2>{T.contactTitle}</h2>
          <p>{T.contactText}</p>
          <div className="actions">
            <a className="btn light" href={profile.linkedin} target="_blank" rel="noreferrer">{T.contactCta}</a>
            <a className="btn outline-light" href={profile.github} target="_blank" rel="noreferrer"><GitHubIcon /> GitHub ↗</a>
          </div>
        </section>
      </div>

      <footer className="footer">{t.footer(profile.name, new Date().getFullYear())}</footer>
    </main>
  );
}
