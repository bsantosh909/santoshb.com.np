<template>
	<div class="py-8">
		<div class="mt-3 mb-12" align="center">
			<img src="/icon.png" width="320" class="h-auto rounded-full border-4 border-gray-500 border-opacity-50" alt="Rare sight of my selfie!">
			<p class="mt-3 font-bold text-5xl">Santosh Bhandari</p>
			<p class="font-semibold text-lg capitalize">{{ skills.join('&ensp;•&ensp;') }}</p>
		</div>
		<div class="my-4 bg-gray-200 p-4 w-full">
			<Skills />
		</div>
		<div class="pt-4">
			<div class="blockquote text-center">
				<p class="text-xl">"{{ quote.text }}"</p>
				<div class="italic text-gray-700">- {{ quote.author ? quote.author : 'Someone Amazing' }}</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			skills: ['developer', 'gamer', 'writer']
		}
	},
	async asyncData({ $content }) {
		const quotes = await $content('quotes').fetch();
		const quote = quotes.list[Math.floor(Math.random() * quotes.list.length)];
		return { quote };
	}
}
</script>