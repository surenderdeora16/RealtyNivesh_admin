import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    root: "./",
    build: {
        outDir: "build",
    },
    base: "",
    publicDir: "public",
    server: {
        port: 4000, // To run the app on port 4000
        open: true // If we want to open the app once its started
    },
})

