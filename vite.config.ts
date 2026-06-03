import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/start/vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    tanstackStart({
      nitro: {
        preset: "vercel",
      },
    }),
    react(),
  ],
});