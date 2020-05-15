<template>
	<div>
		<b-container v-for="(article, i) of articleList" :key="`article-${i}`" class="py-3 my-5 rounded writing-box bg-darker">
			<ArticleItem :article="article" />
		</b-container>
		<div class="my-5">
			<adsbygoogle />
		</div>
	</div>
</template>

<script>
export default {
	components: {
		ArticleItem: () => import('@/components/Article')
	},
	props: {
		count: Number,
		articles: Array
	},
	computed: {
		articleList() {
			return this.articles.slice(0, this.count);
		}
	}
}
</script>

<style lang="scss">
.writing-box {
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 7px 0 rgba(0, 0, 0, 0.19);
	&:hover {
		box-shadow: 0 7px 15px 0 rgba(0, 0, 0, 0.2), 0 10px 27px 0 rgba(0, 0, 0, 0.19);
	}
}
</style>