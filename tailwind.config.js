module.exports = {
	theme: {
		extend: {
			colors: {
				dark: {
					100: "#CFD8DC",
					200: "#B0BEC5",
					300: "#90A4AE",
					400: "#78909C",
					500: "#607D8B",
					600: "#546E7A",
					700: "#455A64",
					800: "#37474F",
					900: "#263238"
				}
			}
		}
	},
	variants: {},
	plugins: [],
	purge: {
		enabled: process.env.NODE_ENV === 'production',
		content: [
			'content/**/*.md',
			'components/**/*.vue',
			'layouts/**/*.vue',
			'pages/**/*.vue',
			'plugins/**/*.js',
			'nuxt.config.js'
		]
	}
};
