import { useState } from "react";
import { useLang } from "../i18n/index.jsx";

// 照 Binary-Adder-Subtractor/main.c 的邏輯：用 32 個全加器逐位元相加，M=1 時把 Y 取反再 +1 變成減法
function fullAdder(x, y, c) {
  return { s: x ^ y ^ c, c: (x & y) | (c & (x ^ y)) };
}
function adder(X, Y, M) {
  let S = 0, cin = 0, cout = M;
  for (let pos = 0; pos < 32; pos++) {
    const x = X & 1, y = (Y & 1) ^ M;
    cin = cout;
    const r = fullAdder(x, y, cout);
    cout = r.c;
    X >>= 1; Y >>= 1;
    S |= r.s << pos;
  }
  return { S: S | 0, overflow: (cin ^ cout) !== 0 };
}
const bin = (n) => (n >>> 0).toString(2).padStart(32, "0").match(/.{4}/g).join(" ");
const MAX = 2147483647, MIN = -2147483648;

export default function AdderDemo() {
  const { t } = useLang();
  const [x, setX] = useState("1234");
  const [y, setY] = useState("-56");
  const [op, setOp] = useState("+");

  const X = Number(x), Y = Number(y);
  const valid = [X, Y].every((n) => Number.isInteger(n) && n >= MIN && n <= MAX) && x !== "" && y !== "";
  const res = valid ? adder(X | 0, Y | 0, op === "-" ? 1 : 0) : null;

  return (
    <div className="adder">
      <div className="adder-inputs">
        <input value={x} onChange={(e) => setX(e.target.value.trim())} inputMode="numeric" aria-label="X" />
        <button className="adder-op" onClick={() => setOp(op === "+" ? "-" : "+")} aria-label={t.adder.toggle}>{op}</button>
        <input value={y} onChange={(e) => setY(e.target.value.trim())} inputMode="numeric" aria-label="Y" />
      </div>
      {!valid ? (
        <p className="adder-err">{t.adder.error}</p>
      ) : (
        <div className="adder-out mono">
          <div><span>X</span><b>{bin(X)}</b><em>{X}</em></div>
          <div><span>Y</span><b>{bin(Y)}</b><em>{Y}</em></div>
          <div className="adder-sum"><span>S</span><b>{bin(res.S)}</b><em>{res.S}</em></div>
          {res.overflow && <p className="adder-flag">{t.adder.overflow}</p>}
        </div>
      )}
    </div>
  );
}
