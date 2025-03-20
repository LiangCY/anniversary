import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  base: "/anniversary/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "纪念日",
        short_name: "Anniversary",
        start_url: "/anniversary/",
        icons: [
          {
            src: "/anniversary/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/anniversary/icon-512.png",
            type: "image/png",
            sizes: "512x512",
          },
        ],
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
      },
    }),
  ],
});
