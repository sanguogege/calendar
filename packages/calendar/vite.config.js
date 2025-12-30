// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
    plugins: [
        dts({
            rollupTypes: true, 
            entryRoot: "src", 
            include: ["src/index.ts"],
            outputDir: "dist",
        }),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            name: "calendar",
            formats: ["es", "iife", "cjs", "umd"],
            fileName: "index",
        },
    },
});
