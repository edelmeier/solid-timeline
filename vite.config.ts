import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import suidPlugin from "@suid/vite-plugin";
import * as path from "path";

export default defineConfig({
  plugins: [suidPlugin(), solidPlugin()],
  build: {
    manifest: true,
    minify: true,
    target: "esnext",
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      formats: ["es", "cjs"],
    },
  },
});
