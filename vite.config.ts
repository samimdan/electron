import { defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
const config: UserConfig = {
  plugins: [react()],
  base: "./",
  build: {
    outDir: "dist-react",
  },
  server: {
    port: 5000,
   
  }
};

export default defineConfig(config);
