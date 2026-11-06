import { useState } from "react";
import { useLang } from "../i18n/index.jsx";

export default function PcbShowcase() {
  const { t, c } = useLang();
  const pcbs = c.pcbs;
  const [active, setActive] = useState("main");
  const [zoom, setZoom] = useState(false);
  const board = pcbs.find((b) => b.id === active);

  return (
    <div className="pcb">
      <div className="segmented">
        {pcbs.map((b) => (
          <button key={b.id} className={b.id === active ? "on" : ""} onClick={() => setActive(b.id)}>
            {b.name}
          </button>
        ))}
      </div>

      <button className="pcb-image" onClick={() => setZoom(true)} aria-label={t.pcb.enlarge}>
        <img src={board.image} alt={`${board.name} PCB layout`} />
        <span className="pcb-badge mono">{board.mcu}</span>
      </button>

      <ul className="pcb-parts">
        {board.parts.map((p) => <li key={p}>{p}</li>)}
      </ul>
      <a className="btn small" href={board.schematic} target="_blank" rel="noreferrer">
        {t.pcb.schematic}
      </a>

      {zoom && (
        <div className="lightbox" onClick={() => setZoom(false)}>
          <img src={board.image} alt={`${board.name} PCB layout`} />
          <span className="muted small">{t.pcb.close}</span>
        </div>
      )}
    </div>
  );
}
