export default {
	// Nuxt.js modules
	modules: [
		'@nuxt/content',
		'@nuxtjs/sitemap',
		'@nuxtjs/google-adsense'
	],
	// Nuxt.js dev-modules
	buildModules: [
		'@nuxtjs/pwa',
		'@nuxtjs/tailwindcss',
		'@nuxtjs/google-analytics',
		'@nuxt/components'
	],
	// Progressive Web App related configuration
	pwa: {
		workbox: false,
		mainfest: false,
		oneSignal: false,
		meta: {
			name: 'Santosh Bhandari - Innovative Developer',
			author: 'Santosh Bhandari',
			description: 'Personal Website, Protfolio, Blog featuring interesting articles and some of mine free time writings!',
			ogHost: 'https://santoshb.com.np',
			twitterCard: 'summary',
			twitterSite: '@bsantosh909',
			twitterCreator: '@bsantosh909'
		}
	},
	// Sitemap configuration
	sitemap: {
		hostname: 'https://santoshb.com.np',
		gzip: true
	},
	// Adsense configuration
	'google-adsense': {
		id: 'ca-pub-4087610164584593'
	},
	// Analytics configuration
	googleAnalytics: {
		id: 'UA-155877975-1'
	},
	// Content configuration
	content: {
		markdown: {
			prism: {
				theme: 'prism-themes/themes/prism-material-oceanic.css'
			}
		}
	}
}
