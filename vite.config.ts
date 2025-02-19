import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Control de obra",
        short_name: "Control",
        description: "App para el control de obra",
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#ffffff",
      },
      strategies: "injectManifest",
      injectManifest: {
        rollupFormat: "iife",
      },
      workbox: {
        globPatterns: [
          "**/*.{js,json,css,min.css,html,png,jpg,jpeg,svg,ico,mp3,woff,woff2,ttf}",
        ],
      },
    }),
  ], server: {
    port: 3011,
    host: true,
  },
})
