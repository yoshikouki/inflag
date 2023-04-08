import { configDefaults, defineConfig } from "vitest/config";

import { resolve } from "path";

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, "src/measurements/*"],
  },

  //
  resolve: {
    alias: [{ find: "~", replacement: resolve(__dirname, "./src") }],
  },
});
