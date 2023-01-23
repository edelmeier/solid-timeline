import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import babel from "@rollup/plugin-babel";
import postcss from "postcss";
import nodeResolve from "@rollup/plugin-node-resolve";

export default {
  input: "./src/index.ts",

  external: [
    "@suid",
    "@suid/icons-material",
    "@suid/material",
    "solid-js",
    "solid-js/web",
  ],
  plugins: [
    nodeResolve(),
    resolve(),
    commonjs(),
    postcss({
      autoModules: true,
      plugins: [],
      sourceMap: true,
      extract: true,
      minimize: true,
    }),
    typescript(),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
      extensions: [".ts", ".tsx"],
    }),
  ],
};
