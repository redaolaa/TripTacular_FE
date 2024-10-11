import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000", //  this wil allow you to not need to write http://localhost:8000 in every route.
        changeOrigin: true,
      },
    },
  },
});