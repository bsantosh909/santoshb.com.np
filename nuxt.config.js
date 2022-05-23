import { hooks, moduleConfig } from "./config";

export default {
  target: "static",
  components: true,
  router: {
    trailingSlash: true,
  },
  loading: { color: "#fff" },
  css: ["@/assets/css/index.css"],
  plugins: ["@/plugins/disqus"],
  build: {
    // extend(config, ctx) {},
  },
  generate: {
    fallback: true,
  },
  hooks,
  ...moduleConfig,
};
