<template>
	<div class="container mx-auto py-8 px-2 text-center">
		<div v-for="(article, i) of articles" :key="article.slug" class="p-3 mb-10">
			<BlogCard :data="article" :index="i" />
		</div>
		<div class="my-8">
			<adsbygoogle adSlot="1056851328" adFormat="fluid" adLayoutKey="-eo+58+6l-e2+5t" />
		</div>
	</div>
</template>

<script>
export default {
	async asyncData({ $content }) {
		const articles = await $content('blog')
			.sortBy('created', 'desc')
			.fetch();
		return { articles };
	}
}
</script>