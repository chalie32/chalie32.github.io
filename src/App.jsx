import Nav from "./components/Nav.jsx";
import Home from "./pages/Home.jsx";
import { LangProvider } from "./i18n/index.jsx";

// 單頁網站：導覽列的連結都是捲動到頁面中的區塊
function navigate(to) {
  const hash = to.split("#")[1];
  if (hash) {
    window.history.replaceState({}, "", "#" + hash);
    document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
  } else {
    window.history.replaceState({}, "", window.location.pathname);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

export default function App() {
  return (
    <LangProvider>
      <Nav navigate={navigate} />
      <Home navigate={navigate} />
    </LangProvider>
  );
}
