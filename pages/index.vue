<template>
	<div class="pt-8">
		<div class="mt-3 mb-12" align="center">
			<img src="/icon.png" width="320" class="h-auto rounded-full border-4 border-gray-500 border-opacity-50" alt="Rare sight of my selfie!">
			<h1 class="mt-3 font-bold text-5xl">Santosh Bhandari</h1>
			<p class="font-semibold text-lg capitalize">{{ skills.join('&ensp;•&ensp;') }}</p>
		</div>
		<div class="mt-4 bg-gray-200 p-4 w-full">
			<Skills />
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
	head() {
		return {
			title: 'Santosh Bhandari - Innovative developer'
		}
	}
}
</script>