// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: "./src",
  //
  modules: [
    // https://tailwindcss.nuxt.dev/
    "@nuxtjs/tailwindcss",
    // https://v1.image.nuxtjs.org/
    "@nuxt/image-edge",
    // https://motion.vueuse.org/
    "@vueuse/motion/nuxt",
  ],
});
