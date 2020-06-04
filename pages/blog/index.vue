<template>
	<div class="container mx-auto py-8 px-2 text-center">
		<h1 class="text-5xl text-center font-bold">Blog Articles</h1>
		<div class="italic mb-16">
			Here are some of the articles that are written over time to share the knowledge, share information, help you get better (my telling general mistakes) for various stuffs! I hope these article will be helpful to you, or maybe you can learn something new after reading these out. Make sure to read them and share your knowledge with me in the comment sections.
		</div>
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
	},
	head() {
		return {
			title: 'Blog - Technology, Programming and Tricks | Santosh Bhandari'
		}
	}
}
</script>