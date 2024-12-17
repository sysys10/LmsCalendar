import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: resolve(__dirname, "src") },
      { find: "@stores", replacement: resolve(__dirname, "src/stores") },
      {
        find: "@components",
        replacement: resolve(__dirname, "src/components"),
      },
      { find: "@pages", replacement: resolve(__dirname, "src/pages") },
      { find: "@utils", replacement: resolve(__dirname, "src/utils") },
      { find: "@apis", replacement: resolve(__dirname, "src/apis") },
      { find: "@hooks", replacement: resolve(__dirname, "src/hooks") },
      { find: "@constants", replacement: resolve(__dirname, "src/constants") },
    ],
  },
});
