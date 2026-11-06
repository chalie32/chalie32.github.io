import { useEffect, useState } from "react";
import { useLang } from "../i18n/index.jsx";

// 依照 Rocket_redunt/src/FlightController.cpp 與 Config.h 的真實邏輯
const STATES = ["GROUND", "BOOST", "COAST", "APOGEE", "DESCENT"];

const SNIPPET = `case COAST:
  if (elapsed > COAST_MIN_DURATION &&
      currentAltitude > MIN_APOGEE_ALTITUDE &&
      verticalVelocity < VERTICAL_VELOCITY_THRESHOLD &&
      averageAltitude < maxAltitude - DESCENT_ALTITUDE_THRESHOLD) {
    if (now - descentStartTime >= DESCENT_CONFIRM_TIME) {
      newState = APOGEE;
      digitalWrite(RELAY_PIN, HIGH);   // deploy recovery
    }
  }`;

export default function FlightStateMachine() {
  const { t } = useLang();
  const F = t.fsm;
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => setI((x) => (x + 1) % STATES.length), 1800);
    return () => clearInterval(id);
  }, [auto]);

  const id = STATES[i];
  const s = F.states[id];
  return (
    <div className="fsm">
      <div className="fsm-track">
        {STATES.map((st, k) => (
          <button key={st} className={`fsm-node ${k === i ? "on" : ""} ${k < i ? "done" : ""}`}
            onClick={() => { setAuto(false); setI(k); }}>
            <span className="fsm-dot" />
            <span className="fsm-name">{st}</span>
          </button>
        ))}
      </div>
      <div className="fsm-detail">
        <div><span className="eyebrow">{F.inState}</span><p>{s.rule}{id === "APOGEE" && <span className="fsm-fire"> {F.relay}</span>}</p></div>
        <div><span className="eyebrow">{F.exitWhen}</span><p className="mono">{s.next || F.final}</p></div>
      </div>
      <pre className="code"><code>{SNIPPET}</code></pre>
    </div>
  );
}
