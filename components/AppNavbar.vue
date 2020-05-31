<template>
	<nav class="flex items-center justify-between flex-wrap bg-dark-900 sticky top-0 p-3 z-50">
		<nuxt-link to="/" class="flex items-center flex-no-shrink mr-4">
			<img class="h-8 rounded" src="@/assets/img/logo.png" alt="Santosh Bhandari">
			<span class="pl-2 text-xl text-gray-200 font-semibold">Santosh Bhandari</span>
		</nuxt-link>
		<div class="block md:hidden">
			<button @click="isOpen = !isOpen" type="button" class="flex text-gray-200 focus:outline-none">
				<svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
					<path v-if="isOpen" fill-rule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"/>
					<path v-if="!isOpen" fill-rule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/>
				</svg>
			</button>
		</div>
		<div :class="isOpen ? 'block' : 'hidden'" class="w-full md:flex md:items-center md:w-auto ml-auto mt-4 md:mt-0">
			<div v-for="route of routes" :key="route.title" class="block md:inline-block p-2 md:px-3 md:py-1 font-medium">
				<nuxt-link :to="route.to" @click.native="isOpen = false" class="text-gray-200">
					{{ route.title }}
				</nuxt-link>
			</div>
		</div>
	</nav>
</template>

<script>
export default {
	data() {
		return {
			isOpen: false,
			routes: [
				{
					title: 'About',
					to: '/'
				},
				/*
				{
					title: 'Portfolio',
					to: '/portfolio'
				},*/
				{
					title: 'Blog',
					to: '/blog'
				},/*
				{
					title: 'Writings',
					to: '/writings'
				},*/
				{
					title: 'Contact',
					to: '/contact'
				}
			]
		}
	}
}
</script>