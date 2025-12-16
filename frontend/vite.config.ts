import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    VitePWA({
      // generates 'manifest.webmanifest' file on build
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "assets/*"],
      manifest: {
        // caches the assets/icons mentioned (assets/* includes all the assets present in your src/ directory)
        name: "LineUp",
        short_name: "LineUp",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        display: "standalone", // Or "fullscreen" for iOS
        icons: [
          {
            src: "/icon192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        // defining cached files formats
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webmanifest}"],
      },
    }),
  ],
});
