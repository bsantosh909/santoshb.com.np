import { hooks, moduleConfig } from './config';

export default {
	mode: 'universal',
	head: {
		link: [{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Acme|Slabo+27px&display=swap' }]
	},
	loading: { color: '#fff' },
	css: [
		'@/assets/css/index.css'
	],
	plugins: [
		{ src: '@/plugins/disqus', mode: 'client' }
	],
	build: {
		extend (config, ctx) {}
	},
	generate: {
		fallback: true,
		async routes() {
			const { $content } = require('@nuxt/content');
			const articles = await $content('blog').only(['slug']).fetch();
			return articles.map((article) => `/blog/${article.slug}`);
		}
	},
	hooks,
	...moduleConfig
}
