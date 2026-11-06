import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: "./" 讓網站放在 chalie32.github.io 或任何子路徑都能正常運作
export default defineConfig({
  plugins: [react()],
  base: "./",
});
