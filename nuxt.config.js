import { hooks, moduleConfig } from './config';

export default {
	components: true,
	head: {
		link: [{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Acme|Slabo+27px&display=swap' }]
	},
	router: {
		trailingSlash: true
	},
	loading: { color: '#fff' },
	css: [
		'@/assets/css/index.css'
	],
	plugins: [
		'@/plugins/disqus'
	],
	build: {
		extend (config, ctx) {}
	},
	generate: {
		fallback: true
	},
	hooks,
	...moduleConfig
}
