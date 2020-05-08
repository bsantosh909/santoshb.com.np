<template>
	<b-container class="py-5">
		<div class="text-center pb-4">
			<p class="h1 font-weight-bold">{{ article.title }}</p>
		</div>
		<div class="border-top border-bottom mb-2 py-1">
			<span v-html="header" />
		</div>
		</div>
		<div class="py-4">
			<component :is="dynamicComponent" />
		</div>
		<b-row no-gutters class="my-2 py-1 border-top border-bottom">
			<b-col sm="12" md="6" v-if="article.updated">
				<span>Originally created on</span>
				<span class="font-weight-bold">{{ new Date(article.created).toISOString().substr(0,10) }}</span>
			</b-col>
			<b-col sm="12" :md="article.updated ? 6 : 12" class="text-right">
				<b-badge v-for="(tag, i) of article.tags" :key="`article-tag-${i}`" class="mx-1 my-1 text-capitalize" variant="dark" pill>{{ tag }}</b-badge>
			</b-col>
		</b-row>
		<div class="mt-5 bg-gray-200 rounded shadow">
			<adsbygoogle />
		</div>
	</b-container>
</template>

<script>
export default {
    data () {
      return {
        dynamicComponent: null,
		article: null
      }
    },
	created () {
		const post = require(`@/writings/${this.$route.params.id}.md`);
		this.dynamicComponent = post.vue.component;
		this.article = post.attributes;
    },
	computed: {
		header() {
			let action,date;
			if (this.article.updated) {
				action = 'Last Updated on';
				date = this.article.updated;
			} else {
				action = 'Originally Created on';
				date = this.article.created;
			}
			return `${action} <b>${new Date(date).toISOString().substr(0,10)}</b>`;
		}
	}
}
</script>

<style scoped>
.frontmatter-markdown {
	padding-top: 2rem;
	padding-bottom: 2rem;
}

.frontmatter-markdown >>> h1, .frontmatter-markdown >>> h2, .frontmatter-markdown >>> h3 {
	padding-top: 3rem;
	padding-bottom: 0.5rem;
}
</style>