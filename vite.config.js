import { defineConfig } from "vite";

export default defineConfig({
  root: "src", // Set the root folder for the source files
  build: {
    outDir: "../dist", // Output directory
    emptyOutDir: true, // Clear the output directory
    rollupOptions: {
      input: {
        main: "./src/index.html",
        chat: "./src/chat.html", // Include additional HTML files if needed
      },
    },
  },
});
