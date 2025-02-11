import tailwindcss from '@tailwindcss/vite';
import path, { resolve } from 'path';
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
    plugins: [tailwindcss(), solid()],
    build: {
        rollupOptions: {
            input: {
                popup: resolve(__dirname, "./src/extension/popup.html"),
                background: resolve(__dirname, "./src/extension/services/background.ts")
            },
            output: {
                entryFileNames: (assetInfo) => {
                    return assetInfo?.name === "backgound" ? "./src/background.js" : "[name].js"
                }
            }
        },
        outDir: 'dist',
        emptyOutDir: true
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
            "@Assets": path.resolve(__dirname, "src/assets"),
            "@Components": path.resolve(__dirname, "src/components"),
            "@Configs": path.resolve(__dirname, "src/config"),
            "@Extensions": path.resolve(__dirname, "src/extension"),
            "@Utils": path.resolve(__dirname, "src/utils"),
        }
    }
})
