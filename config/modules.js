export default {
	// Nuxt.js modules
	modules: [
		'bootstrap-vue/nuxt',
		'@nuxtjs/pwa',
		'@nuxtjs/sitemap',
		'@nuxtjs/google-adsense'
	],
	// Nuxt.js dev-modules
	buildModules: [],
	// Bootstrap-vue configuration
	bootstrapVue: {
		icons: true
	},
	// Progressive Web App related configuration
	pwa: {
		workbox: false,
		mainfest: false,
		oneSignal: false,
		meta: {
			name: 'Santosh Bhandari - Innovative Developer',
			author: 'Santosh Bhandari',
			description: 'Personal Website, Protfolio and Collection of mine writings!',
			ogHost: 'https://santoshb.com.np',
			twitterCard: 'summary',
			twitterSite: '@bsantosh909',
			twitterCreator: '@bsantosh909'
		}
	},
	// Adsense configuration
	'google-adsense': {
		id: 'ca-pub-4087610164584593'
	},
	// Sitemap configuration
	sitemap: {
		hostname: 'https://santoshb.com.np',
		gzip: true,
		exclude: [
			'/privacy',
			'/writings/page'
		]
	}
}
