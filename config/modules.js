export default {
  // Nuxt.js modules
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/sitemap',
    '@nuxtjs/google-adsense'
  ],
  // Nuxt.js dev-modules
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/google-analytics'
  ],
  // Sitemap config...
  sitemap: {
    hostname: 'https://santoshb.com.np',
    defaults: {
      changefreq: 'daily'
    }
  },
  // Google adsense...
  'google-adsense': {
    id: 'ca-pub-4087610164584593'
  },
  // Google analytics...
  googleAnalytics: {
    id: 'UA-155877975-1'
  }
}
