import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import suidPlugin from "@suid/vite-plugin";
import { resolve } from "path";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import typescript from "rollup-plugin-typescript2";

export default defineConfig({
  plugins: [solidPlugin(), suidPlugin()],

  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "src/components/index.ts"),
      name: "MyLib",
      // the proper extensions will be added
      fileName: "my-lib",
    },
    rollupOptions: {
      external: [
        "@suid",
        "@suid/icons-material",
        "@suid/material",
        "solid-js",
        "solid-js/web",
      ],
      plugins: [nodeResolve(), commonjs(), typescript()],
    },
  },
});
