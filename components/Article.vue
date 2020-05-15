<template>
	<div class="px-2">
		<p class="font-weight-bold h2 no-text-decoration mb-3">{{ article.title }}</p>
		<div class="border-top-bottom mb-2 py-1">
			<span v-html="header" />
		</div>
		<div class="py-2">
			<span v-html="article.intro" />
			<nuxt-link :to="`/writings/${article.id}`" class="ml-3">
				<span class="font-weight-bold">Read More...</span>
			</nuxt-link>
		</div>
		<b-row no-gutters class="my-2 py-1 border-top-bottom">
			<b-col sm="12" md="6">
				<span v-if="article.updated">
					<span>Originally created on</span>
					<span class="font-weight-bold">{{ new Date(article.created).toISOString().substr(0,10) }}</span>
				</span>
			</b-col>
			<b-col sm="12" md="6" class="text-right">
				<b-badge v-for="(tag, i) of article.tags" :key="`article-tag-${i}`" class="mx-1 my-1 text-white text-capitalize" variant="dark" pill>{{ tag }}</b-badge>
			</b-col>
		</b-row>
	</div>
</template>

<script>
export default {
	props: {
		article: Object
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