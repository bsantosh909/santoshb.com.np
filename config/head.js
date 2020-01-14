export default {
  titleTemplate: titleChunk => titleChunk ? `${titleChunk} | Santosh Bhandari` : 'Santosh Bhandari - Innovative developer',
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Acme|Slabo+27px&display=swap' },
    { rel: 'stylesheet', href: 'https://cdn.materialdesignicons.com/4.7.95/css/materialdesignicons.min.css' }
  ],
  // Meta for SEO Performance
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { hid: 'description', name: 'description', content: 'Personal Website, Protfolio and Blog of Santosh Bhandari; a passionate developer, quick learner and a wise human being' },
    { hid: 'keywords', name: 'keywords', content: 'nuxtjs, blog' },
    { hid: 'author', name: 'author', content: 'Santosh Bhandari' },
    { hid: 'rating', name: 'rating', content: 'safe for kids' },
    // Fb
    { hid: 'og:title', name: 'og:title', content: 'Santosh Bhandari' },
    { hid: 'og:type', name: 'og:type', content: 'website' },
    { hid: 'og:url', name: 'og:url', content: 'https://santoshb.com.np' },
    { hid: 'og:image', name: 'og:image', content: 'https://santoshb.com.np/img/me.jpg' },
    { hid: 'og:site_name', name: 'og:site_name', content: 'santoshb.com.np' },
    { hid: 'og:description', name: 'og:description', content: 'Personal Website, Protfolio and Blog of Santosh Bhandari; a passionate developer, quick learner and a wise human being' },
    // Twitter
    { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
    { hid: 'twitter:site', name: 'twitter:site', content: '@bsantosh909' },
    { hid: 'twitter:creator', name: 'twitter:creator', content: '@bsantosh909' },
    { hid: 'twitter:title', name: 'twitter:title', content: 'Santosh Bhandari' },
    { hid: 'twitter:url', name: 'twitter:url', content: 'https://santoshb.com.np' },
    { hid: 'twitter:image', name: 'twitter:image', content: 'https://santoshb.com.np/img/me.jpg' },
    { hid: 'twitter:description', name: 'twitter:description', content: 'Personal Website, Protfolio and Blog of Santosh Bhandari; a passionate developer, quick learner and a wise human being' }
  ]
}
