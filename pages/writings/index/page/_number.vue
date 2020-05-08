<template>
	<div>
		<b-container v-for="(article, i) of articleList" :key="`article-${i}`" class="py-3 my-5 rounded writing-box bg-gray-200">
			<ArticleItem :article="article" />
		</b-container>
		<div class="my-5 rounded bg-gray-200 shadow" v-if="articleList.length > 2">
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
			const pageNum = this.$route.params.number
			const startNum = (pageNum - 1) * this.count;
			const endNum = pageNum * this.count;
			return this.articles.slice(startNum, endNum);
		}
	}
}
</script>