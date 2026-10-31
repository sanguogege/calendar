import { fileRoutes } from "filesystem-routing/vite";
import { defineConfig } from "vite-plus";
import solid from "@solidjs/vite-plugin";

export default defineConfig({
  plugins: [
    solid({ start: true, extensions: [".jsx", ".tsx"], diagnostics: false }),
    fileRoutes({ types: true }),
  ],
  server: {
    port: 3000,
  },
  test: {
    environment: "jsdom",
    globals: false,
    setupFiles: ["./vitest-setup.ts"],
    isolate: false,
    // 文档站暂时没有测试文件，避免 `vp test` 因 "No test files found" 退出 1
    passWithNoTests: true,
  },
  build: {
    target: "esnext",
    assetsInlineLimit: 0,
  },
});
