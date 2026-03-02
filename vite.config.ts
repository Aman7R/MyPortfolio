import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@stores": path.resolve(__dirname, "./src/stores"),
      "@constants": path.resolve(__dirname, "./src/constants"),
      "@types": path.resolve(__dirname, "./src/types"),
    },
  },
});
