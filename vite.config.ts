/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    host: "localhost",
    port: 5000,
  },
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
  },
});
