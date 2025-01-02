import { defineConfig } from "vite";

export default defineConfig({
    base: "/Todo-App/",
    build: {
      outDir: 'dist',
      assetsDir: 'assets'
    }
});
