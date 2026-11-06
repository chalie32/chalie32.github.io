import { useMemo, useState } from "react";
import { useLang } from "../i18n/index.jsx";

// 用 React 重現 SwiftUI「效期追蹤」App 的主畫面（展示用）
const CATS = [
  { name: "食品", color: "#ef4444", icon: "🍴" },
  { name: "藥品", color: "#22c55e", icon: "💊" },
  { name: "化妝品", color: "#a855f7", icon: "✨" },
  { name: "飲料", color: "#3b82f6", icon: "☕" },
  { name: "其他", color: "#6b7280", icon: "▦" },
];
const cat = (n) => CATS.find((c) => c.name === n);

const START = [
  { id: 1, name: "鮮奶", cat: "飲料", days: 2, remind: 3 },
  { id: 2, name: "雞蛋", cat: "食品", days: 9, remind: 3 },
  { id: 3, name: "感冒藥", cat: "藥品", days: 120, remind: 14 },
  { id: 4, name: "優格", cat: "食品", days: -1, remind: 2 },
  { id: 5, name: "防曬乳", cat: "化妝品", days: 5, remind: 7 },
  { id: 6, name: "吐司", cat: "食品", days: 1, remind: 2 },
];
const EXTRA = [
  { name: "綠茶", cat: "飲料" }, { name: "維他命", cat: "藥品" }, { name: "起司", cat: "食品" },
  { name: "面膜", cat: "化妝品" }, { name: "電池", cat: "其他" }, { name: "香蕉", cat: "食品" },
];

function fmt(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

export default function FoodDemo() {
  const { t } = useLang();
  const [items, setItems] = useState(START);
  const [filter, setFilter] = useState(null);
  const [nextId, setNextId] = useState(100);

  const sections = useMemo(() => {
    const list = items.filter((i) => !filter || i.cat === filter).sort((a, b) => a.days - b.days);
    return [
      ["已過期", "#ef4444", list.filter((i) => i.days < 0)],
      ["即將到期", "#f59e0b", list.filter((i) => i.days >= 0 && i.days <= i.remind)],
      ["尚可存放", "#22c55e", list.filter((i) => i.days > i.remind)],
    ].filter((s) => s[2].length);
  }, [items, filter]);

  const add = () => {
    const e = EXTRA[nextId % EXTRA.length];
    setItems([...items, { id: nextId, ...e, days: Math.floor(Math.random() * 30) - 2, remind: 3 }]);
    setNextId(nextId + 1);
  };

  return (
    <div className="phone">
      <div className="phone-notch" />
      <div className="phone-screen">
        <div className="app-bar">
          <strong>效期追蹤</strong>
          <button onClick={add} aria-label="新增">＋</button>
        </div>
        <div className="app-cats">
          <button className={!filter ? "on" : ""} style={{ "--c": "#3b82f6" }} onClick={() => setFilter(null)}>全部</button>
          {CATS.map((c) => (
            <button key={c.name} className={filter === c.name ? "on" : ""} style={{ "--c": c.color }}
              onClick={() => setFilter(c.name)}>
              {c.icon} {c.name}
            </button>
          ))}
        </div>
        <div className="app-list">
          {sections.length === 0 && <p className="app-empty">沒有物品，按 ＋ 新增</p>}
          {sections.map(([title, color, list]) => (
            <div key={title}>
              <div className="app-section"><i style={{ background: color }} />{title}</div>
              {list.map((i) => {
                const c = cat(i.cat);
                const soon = i.days >= 0 && i.days <= i.remind;
                return (
                  <div className="app-row" key={i.id}>
                    <div className="app-thumb" style={{ background: c.color + "22" }}>{c.icon}</div>
                    <div className="app-body">
                      <div className="app-top">
                        <b>{i.name}</b>
                        <span className="app-tag" style={{ color: c.color, background: c.color + "22" }}>{c.name}</span>
                      </div>
                      <div className={soon || i.days < 0 ? "app-date warn" : "app-date"}>
                        📅 {fmt(i.days)}
                        {soon && <span className="app-badge">⚠️ {i.days}天後過期</span>}
                      </div>
                    </div>
                    <button className="app-del" title="刪除" onClick={() => setItems(items.filter((x) => x.id !== i.id))}>×</button>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <p className="muted small center">{t.food.caption}</p>
    </div>
  );
}
