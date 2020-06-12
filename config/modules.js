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
		},
		async routes() {
			const { $content } = require('@nuxt/content');
			const articles = await $content('blog').only(['slug', 'created', 'updated']).fetch();
			const blogArticles = articles.map((article) => ({
				url: `/blog/${article.slug}/`,
				lastmod: new Date(article.updated ? article.updated : article.created)
			}));
			return [].concat(blogArticles);
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
