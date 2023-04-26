import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import svgrPlugin from "vite-plugin-svgr";
import viteTsconfigPaths from "vite-tsconfig-paths";
import pluginRewriteAll from "vite-plugin-rewrite-all";

export default defineConfig({
  plugins: [
    react(),
    pluginRewriteAll(),
    viteTsconfigPaths(),
    svgrPlugin(),
    splitVendorChunkPlugin(),
  ],
  publicDir: "./public/",
  build: {
    outDir: "build",
  },
  server: {
    port: 3000,
  },
});
