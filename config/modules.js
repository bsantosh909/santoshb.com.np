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
	// Sitemap configuration
	sitemap: {
		hostname: 'https://santoshb.com.np',
		gzip: true,
		trailingSlash: true,
		exclude: [
			'/privacy'
		],
		defaults: {
			changefreq: 'daily',
			priority: 1
		}
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
