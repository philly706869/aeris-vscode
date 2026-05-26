import { context } from "esbuild";

const production = process.argv.includes("--production");
const watch = process.argv.includes("--watch");

const ctx = await context({
  entryPoints: ["src/extension.ts"],
  bundle: true,
  format: "cjs",
  platform: "node",
  outfile: "dist/extension.cjs",
  external: ["vscode"],
  logLevel: "silent",
  minify: production,
  sourcemap: !production,
  sourcesContent: false,
});

if (watch) {
  await ctx.watch();
} else {
  await ctx.rebuild();
  await ctx.dispose();
}
