import { head, moduleConfig } from './config';

export default {
  mode: 'universal',
  // Headers related configurations...
  head,
  // Module related configurations...
  ...moduleConfig,
  // Customize the progress-bar color
  loading: { color: '#fff' },
  // Global CSS
  css: [
	'@/assets/styles/app',
	'@/assets/styles/scss/app'
  ],
  // Plugins to load before mounting the App
  plugins: [],  
  // Build configuration
  build: {
    // You can extend webpack config here
    extend (config, ctx) {
    }
  },
  generate: {
	fallback: true
  }
}
