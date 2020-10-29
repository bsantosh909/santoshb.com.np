export default {
	// Nuxt.js modules
	modules: [
		'@nuxt/content',
		'@nuxtjs/feed',
		'@nuxtjs/sitemap',
		'@nuxtjs/google-adsense'
	],
	// Nuxt.js dev-modules
	buildModules: [
		'@nuxtjs/pwa',
		'@nuxtjs/tailwindcss',
		'@nuxtjs/google-analytics'
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
		},
		fullTextSearchFields: ['title', 'subtitle', 'slug', 'summary']
	},
	// Feed configuration
	feed: async () => {
		const { $content } = require('@nuxt/content');
		const posts = await $content('blog', { deep: true, text: true })
			.only(['slug', 'title', 'summary', 'text'])
			.fetch();
		return [{
			path: 'feed.xml',
			create(feed) {
				feed.options = {
					title: 'Feed',
					link: 'https://santoshb.com.np/feed.xml',
					description: 'RSS feed for my blog articles!'
				}
				posts.forEach(post => {
					feed.addItem({
						title: post.title,
						id: post.slug,
						link: `https://santoshb.com.np/blog/${post.slug}`,
						description: post.summary.replace(/<[^>]*>?/gm, ""),
						content: post.text
					})
				})
			},
			cache: 1000 * 60 * 15,
			type: 'rss2'
		}]
	}
}
