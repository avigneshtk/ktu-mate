import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    exclude: [
      "node_modules/**",
      "dist/**",
      "tests/e2e/**",
    ],
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});