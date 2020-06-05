<template>
	<div class="container mx-auto px-4 py-6 md:px-8">
		<div align="center">
			<p class="font-bold text-3xl md:text-5xl mt-4 mb-2">{{ article.title }}</p>
			<p class="text-xl">{{ article.subtitle }}</p>
		</div>
		<div class="border-t border-b border-dark-700 py-1 flex flex-wrap justify-between my-8 text-sm">
			<div class="flex flex-wrap space-x-6">
				<div class="flex space-x-1">
					<div>
						<svg viewBox="0 0 24 24" class="w-5">
							<path d="M17 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h2V3a1 1 0 1 1 2 0v1h6V3a1 1 0 0 1 2 0v1zm-2 2H9v1a1 1 0 1 1-2 0V6H5v4h14V6h-2v1a1 1 0 0 1-2 0V6zm4 6H5v8h14v-8z"/>
						</svg>
					</div>
					<span>{{ createOrUpdate }}</span>
					<span class="font-semibold">{{ getDate(article.created) }}</span>
				</div>
				<div class="flex space-x-1">
					<div>
						<svg viewBox="0 0 24 24" class="w-5">
							<path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1-8.41l2.54 2.53a1 1 0 0 1-1.42 1.42L11.3 12.7A1 1 0 0 1 11 12V8a1 1 0 0 1 2 0v3.59z"/>
						</svg>
					</div>
					<span class="font-semibold">{{ article.readingTime }}</span>
				</div>
			</div>
			<!--
			<div class="mt-3 sm:mt-0 flex">
				Sharing options
			</div>
			-->
		</div>
		<div class="my-10">
			<adsbygoogle adSlot="2052252693" />
		</div>
		<!--
		<div v-if="article.toc.length">
			<p class="font-semibold text-3xl">Table Of Content</p>
			<div>
				<div v-for="item of article.toc" :key="item.id" :class="item.depth === 2 ? 'ml-1' : 'ml-3'">
					<nuxt-link :to="`#${item.id}`">
						<span v-if="item.depth === 2">❯❯</span>
						<span v-else>•</span>
						<span class="ml-1">{{ item.text }}</span>
					</nuxt-link>
				</div>
			</div>
		</div>
		-->
		<div class="my-10">
			<nuxt-content :document="article" />
		</div>
		<div class="mb-6 text-center">
			<span class="font-bold text-lg">
				I hope you liked the article. Make sure to leave your feedbacks or queries through the comments below!
			</span>
		</div>
		<div class="border-t border-b border-dark-700 py-1 flex justify-between">
			<div>
			</div>
			<div class="flex space-x-2">
				<span class="select-none inline-block bg-gray-300 rounded-full px-3 py-1 my-1 text-sm font-semibold text-dark-900 capitalize" v-for="badge in article.tags" :key="badge">
					{{ badge }}
				</span>
			</div>
		</div>
		<div class="my-8">
			<adsbygoogle />
		</div>
		<div class="mt-12">
			<vue-disqus shortname="santoshb" :identifier="article.slug" :url="articleUrl" :title="completeTitle" />
		</div>
	</div>
</template>

<script>
import { Timestamp } from '@klasa/timestamp';

export default {
	async asyncData({ $content, params }) {
		const [article] = await $content('blog')
			.where({ slug: params.slug })
			.fetch();
		return { article };
	},
	head() {
		return {
			title: this.article.title,
			titleTemplate: '%s - Santosh Blogs',
			meta: [
				{ hid: 'description', name: 'description', content: this.articleDescription },
				// Open Graph
				{ hid: 'og:title', property: 'og:title', content: this.completeTitle },
				{ hid: 'og:description', property: 'og:description', content: this.articleDescription },
				{ hid: 'og:type', property: 'og:type', content: 'article' },
				{ hid: 'og:image', property: 'og:image', content: `https://santoshb.com.np${this.imageLink}` },
				// Twitter
				{ hid: 'twitter:title', name: 'twitter:title', content: this.completeTitle },
				{ hid: 'twitter:description', name: 'twitter:description', content: this.articleDescription },
				{ hid: 'twitter:image', name: 'twitter:image', content: `https://santoshb.com.np${this.imageLink}` }
			]
		}
	},
	computed: {
		createOrUpdate() {
			return this.article.updated ? 'Updated on' : 'Created on'
		},
		articleDescription() {
			return this.article.summary.replace(/<[^>]*>?/gm, '')
		},
		articleUrl() {
			return `https://santoshb.com.np${this.$route.path}`
		},		
		imageLink() {
			return `/img/banners/${this.article.banner}`;
		},
		completeTitle() {
			return `${this.article.title}${this.article.subtitle ? ` - ${this.article.subtitle}` : ''}`;
		}
	},
	methods: {
		getDate(date) {
			return new Timestamp('MMMM d, YYYY').display(date);
		}
	}
}
</script>

<style lang="postcss">
/* The entire style below is copied from https://github.com/nuxt/content with a sligh modification to meet specific needs */

.nuxt-content h2 {
  @apply text-3xl font-black mb-4 pb-1 border-b -mt-16 pt-24;
  & > a {
    @apply ml-6;
    &::before {
      content: "#";
      @apply font-semibold font-normal -ml-6 pr-1 absolute opacity-100;
    }
  }
  &:hover {
    & > a::before {
      @apply opacity-100;
    }
  }
}
.nuxt-content h3 {
  @apply text-2xl font-extrabold mb-2 pb-1 border-b -mt-16 pt-20;
  & > a {
    @apply ml-6;
    &::before {
      content: "#";
      @apply font-semibold font-normal -ml-5 pr-1 absolute opacity-100;
    }
  }
  &:hover {
    & > a::before {
      @apply opacity-100;
    }
  }
}
.nuxt-content h4 {
	@apply text-xl font-bold mb-1 pb-1 -mt-12 pt-16;
}
@screen lg {
  .nuxt-content h2 a,
  .nuxt-content h3 a {
    @apply ml-0;
    &::before {
      @apply opacity-0;
    }
  }
}
.nuxt-content ul,
.nuxt-content ol {
  @apply list-disc list-inside mb-4;
  & > li {
    @apply leading-7;
    & > ul {
      @apply pl-4;
    }
  }
}
.nuxt-content ol {
  @apply list-decimal;
}
.nuxt-content {
  & a {
    @apply underline;
  }
  & p {
    @apply mb-4 leading-7;
  }
  & > blockquote {
    @apply py-2 pl-4 mb-4 border-l-4;
    & p:last-child {
      @apply mb-0;
    }
  }
  & > code,
  & li > code,
  & p > code {
    @apply bg-gray-100 p-1 text-sm shadow-xs rounded;
  }
  & h3 > code {
    @apply bg-gray-100 p-1 text-lg shadow-xs rounded;
  }
  & pre[class*="language-"] {
    @apply rounded mt-0 mb-4 bg-gray-800 text-sm relative;
    > code {
      @apply bg-gray-800 relative;
      text-shadow: none;
    }
  }
  & video {
    @apply w-full border rounded shadow-md;
  }
}
.nuxt-content-highlight {
  @apply relative;
  & > .filename {
    @apply absolute right-0 text-gray-600 font-light z-10 mr-2 mt-1 text-sm;
  }
}
</style>