// import Terminal from "vite-plugin-terminal";
import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 3000
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      // "@assets": path.resolve(__dirname, "src/assets"),
      // "@logos": path.resolve(__dirname, "src/assets/logos"),
      // "@components": path.resolve(__dirname, "src/components"),
      // "@pages": path.resolve(__dirname, "src/pages"),
      // "@layouts": path.resolve(__dirname, "src/layouts"),
      // "@contexts": path.resolve(__dirname, "src/contexts"),
      // "@hooks": path.resolve(__dirname, "src/hooks"),
    },
  },
});