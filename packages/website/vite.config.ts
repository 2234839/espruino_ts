import { defineConfig } from "vite";

// document.cre
import solid from "vite-plugin-solid";

export default defineConfig({
  plugins: [solid()],
  server: {
    port: 4678,
  },
});
