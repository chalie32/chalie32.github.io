import { useEffect, useRef, useState } from "react";
import { useLang } from "../i18n/index.jsx";

// 模擬一次火箭飛行的遙測資料（只是展示用，不是真實資料）
const FLIGHT = 240; // 每一輪的資料點數
const BURN = 20, APOGEE = 80;
function sample(t) {
  // 推進 20 格 → 滑行到 80 格達到最高點 → 降落傘下降
  let alt, vel, acc;
  if (t < BURN) { acc = 3; vel = 3 * t; alt = 1.5 * t * t; }
  else if (t < APOGEE) {
    const s = t - BURN;
    acc = -1; vel = 60 - s; alt = 600 + 60 * s - 0.5 * s * s;
  } else {
    acc = 0; vel = -15; alt = Math.max(2400 - (t - APOGEE) * 15, 0);
    if (alt === 0) vel = 0;
  }
  acc *= 20; // 換算成 m/s² 顯示
  alt /= 2;
  const noise = () => (Math.random() - 0.5);
  return {
    alt: Math.max(alt + noise() * 2, 0),
    vel: vel + noise(),
    acc: acc + noise() * 2,
    pitch: t < APOGEE ? 88 - t * 0.15 + noise() : 20 * Math.sin(t / 8) + noise() * 4,
    roll: (t * 7) % 360,
    vbat: 7.9 - t * 0.0015 + noise() * 0.02,
  };
}

function Spark({ data, color }) {
  if (data.length < 2) return <svg className="spark" />;
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v, i) =>
    `${(i / (FLIGHT - 1)) * 100},${30 - ((v - min) / (max - min || 1)) * 28 - 1}`
  ).join(" ");
  return (
    <svg className="spark" viewBox="0 0 100 30" preserveAspectRatio="none">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export default function TelemetryDemo() {
  const { t: tr } = useLang();
  const [series, setSeries] = useState([]);
  const t = useRef(0);

  useEffect(() => {
    const id = setInterval(() => {
      t.current = (t.current + 1) % FLIGHT;
      setSeries((s) => (t.current === 0 ? [] : [...s, sample(t.current)]));
    }, 60);
    return () => clearInterval(id);
  }, []);

  const last = series[series.length - 1] || sample(0);
  const tick = series.length;
  const phase = tick < 3 ? "GROUND" : tick < BURN ? "BOOST" : tick < APOGEE ? "COAST" : tick < APOGEE + 8 ? "APOGEE" : last.alt > 1 ? "DESCENT" : "LANDED";
  const col = (k) => series.map((d) => d[k]);

  const channels = [
    { k: "alt", label: "ALT", unit: "m", color: "var(--red)", fmt: 0 },
    { k: "vel", label: "VEL", unit: "m/s", color: "var(--yellow)", fmt: 1 },
    { k: "acc", label: "ACC", unit: "m/s²", color: "var(--blue)", fmt: 1 },
    { k: "pitch", label: "PITCH", unit: "°", color: "var(--green)", fmt: 0 },
  ];

  return (
    <div className="gcs">
      <div className="gcs-head mono">
        <span><span className="dot live" /> {tr.telemetry.live}</span>
        <span className={`phase ${phase.toLowerCase()}`}>{phase}</span>
      </div>
      <div className="gcs-grid">
        {channels.map((c) => (
          <div className="gcs-ch" key={c.k}>
            <div className="gcs-label mono">
              <span style={{ color: c.color }}>{c.label}</span>
              <span>{last[c.k].toFixed(c.fmt)} <small>{c.unit}</small></span>
            </div>
            <Spark data={col(c.k)} color={c.color} />
          </div>
        ))}
      </div>
      <div className="gcs-foot mono">
        <div className="rocket-att" style={{ transform: `rotate(${90 - last.pitch}deg)` }}>▲</div>
        <span>ROLL {last.roll.toFixed(0)}°</span>
        <span>VBAT {last.vbat.toFixed(2)} V</span>
        <span>PKT #{(tick * 7 + 1024).toString(16).toUpperCase()}</span>
      </div>
    </div>
  );
}
