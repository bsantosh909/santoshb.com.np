<template>
	<div class="flex justify-center shadow hover:shadow-lg bg-gray-100 border border-gray-300 rounded-md mx-4 select-none">
		<div class="block mr-auto">
			<!-- Image for smaller devices -->
			<div class="lg:hidden -mt-4" align="center">
				<img :src="`/img/banners/${data.banner}`" class="border shadow-md object-cover w-11/12 rounded">
			</div>
			<!-- Body content -->
			<div class="px-8 py-2">
				<nuxt-link :to="articleLink" class="text-dark-800">
					<p class="text-3xl md:text-4xl font-bold text-center">
						{{ data.title }}
					</p>
					<p class="text-center text-gray-700" v-if="data.subtitle">
						<span class="italic">{{ data.subtitle }}</span>
					</p>
				</nuxt-link>
				<div class="py-1 flex flex-wrap justify-between border-t border-b border-dark-700 py-1 mt-3 text-sm">
					<div class="flex space-x-1">
						<div>
							<!-- SVG from https://github.com/sschoger/heroicons-ui/ -->
							<svg viewBox="0 0 24 24" class="w-5">
								<path d="M17 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h2V3a1 1 0 1 1 2 0v1h6V3a1 1 0 0 1 2 0v1zm-2 2H9v1a1 1 0 1 1-2 0V6H5v4h14V6h-2v1a1 1 0 0 1-2 0V6zm4 6H5v8h14v-8z"/>
							</svg>
						</div>
						<span class="font-semibold">{{ getDate(data.created) }}</span>
					</div>
					<div class="flex space-x-1">
						<div>
							<!-- SVG from https://github.com/sschoger/heroicons-ui/ -->
							<svg viewBox="0 0 24 24" class="w-5">
								<path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1-8.41l2.54 2.53a1 1 0 0 1-1.42 1.42L11.3 12.7A1 1 0 0 1 11 12V8a1 1 0 0 1 2 0v3.59z"/>
							</svg>
						</div>
						<span class="font-semibold">{{ data.readingTime }}</span>
					</div>
				</div>
				<div class="mb-3 py-4 text-left">
					<span v-html="data.summary" />
					<span class="ml-1 font-semibold">
						<nuxt-link :to="articleLink">Read more...</nuxt-link>
					</span>
				</div>
				<div class="text-center">
					<span class="inline-block bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-dark-900 mr-2 mb-2 capitalize" v-for="badge in data.tags" :key="badge">
						{{ badge }}
					</span>
				</div>
			</div>
		</div>
		<!-- Image for large devices -->
		<img :src="`/img/banners/${data.banner}`" class="border shadow border-dark-100 h-full hidden lg:block rounded-md -m-3" :class="alignImage ? 'order-last' : 'order-first'">
	</div>
</template>

<script>
import { Timestamp } from '@klasa/timestamp';

export default {
	props: {
		data: Object,
		index: Number
	},
	computed: {
		alignImage() {
			return this.index % 2 === 1 ? true : false;
		},
		articleLink() {
			return `/blog/${this.data.slug}`;
		}
	},
	methods: {
		getDate(date) {
			return new Timestamp('MMM d').display(date);
		}
	}
}
</script>