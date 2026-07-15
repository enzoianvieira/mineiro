import { defineConfig } from "vite";

// GitHub Pages serves the site from /mineiro/
export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? "/mineiro/" : "/",
});
