import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  test: {},

  //
  resolve: {
    alias: [{ find: "~", replacement: resolve(__dirname, "./src") }],
  },
});
