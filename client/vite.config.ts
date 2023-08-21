import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  // NOTE: See https://vitejs.dev/guide/build.html#library-mode.
  build: {
    lib: {
      entry: {
        main: "./src/main.ts",
        "liveroom-client-element": "./src/LiveroomClientElement.svelte",
      },
      name: "LiveroomClientElement",
      // the proper extensions will be added
      // fileName: "main",
    },
    // rollupOptions: {
    //   // make sure to externalize deps that shouldn't be bundled
    //   // into your library
    // TODO: Do it for Svelte?
    //   external: ["vue"],
    //   output: {
    //     // Provide global variables to use in the UMD build
    //     // for externalized deps
    //     globals: {
    //       vue: "Vue",
    //     },
    //   },
    // },
  },
});
