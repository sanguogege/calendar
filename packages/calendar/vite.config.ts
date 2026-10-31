import { defineConfig } from "vite-plus";

export default defineConfig({
  pack: {
    deps: {
      // tsdown <0.23 compatibility: resolve external dependency subpaths.
      // Remove to preserve subpath imports as written (the new default).
      // https://tsdown.dev/options/dependencies#deps-resolvedepsubpath
      resolveDepSubpath: true,
    },
    dts: {
      generator: "tsgo",
    },
    // 保持 1.x 的发布形态：ESM / CJS 给打包工具，IIFE / UMD 给 <script> 直引
    format: ["esm", "cjs", "iife", "umd"],
    globalName: "calendar",
  },
});
