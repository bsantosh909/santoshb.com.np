import { head, moduleConfig } from './config';
import path from 'path';
import glob from 'glob';

export default {
	mode: 'universal',
	loading: { color: '#fff' },
	css: [
		'@/assets/style/index'
	],
	build: {
		extractCSS: true,
		extend (config) {
			// frontmatter-markdown-loader configuration
			config.module.rules.push({
				test: /\.md$/,
				include: path.resolve(__dirname, 'writings'),
				loader: 'frontmatter-markdown-loader',
				options: {
					mode: ['vue-component']
				}
			});
		}
	},
	// Headers related configurations...
	head,
	// Module related configurations...
	...moduleConfig,
	// Hmm...
	generate: {
		routes: () => {
			const writings = glob.sync('*.md', { cwd: 'writings' }).map((file) => `/writings/${path.basename(file, '.md')}`);
			const writingCount = Math.ceil(writings / 5);
			const writingPages = [];
			if (writingCount > 1) {
				for (let i = 0; i < writingCount.length; i++) writingPages.push(`/writings/page/${i+1}`);
			}
			return [].concat(writings, writingPages);
		}
	}
}