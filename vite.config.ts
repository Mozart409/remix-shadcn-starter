import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { remixDevTools } from "remix-development-tools";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
installGlobals();

// remix({ ignoredRouteFiles: ["**/.*"] });

export default defineConfig({
  plugins: [remixDevTools(), remix(), tsconfigPaths()],
});
