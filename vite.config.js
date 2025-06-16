import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    // server:{
    //     '/api': 'http://localhost:8081'
    // },
    plugins: [
        react(),
        tailwindcss(),
    ],
    resolve: {
        alias: [
            { find: "@", replacement: "/src" },
            { find: "@components", replacement: "/src/components" },
        ],
    },
})
