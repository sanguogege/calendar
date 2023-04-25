// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
    plugins: [dts({
        outputDir: "dist"
    })],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/core/index.ts'),
            name: 'calendar',
            formats: ['es', "iife", "cjs", "umd"],
            // the proper extensions will be added
            fileName: 'index',
        },
    },
})
