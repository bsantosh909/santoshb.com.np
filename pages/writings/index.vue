<template>
	<b-container class="py-3">
		<div class="text-center">
			<p class="h1 text-uppercase mt-3 text-center font-weight-bold">Writings</p>
			<div class="pt-2 pb-2 text-center">
				<span>These are some of my writings that I have written!</span>
				<p class="font-italic">I hope you don't get bored reading them.</p>
			</div>
		</div>
		<div class="my-4" v-if="pageCount > 1">
			<b-pagination-nav pills :link-gen="linkGen" :number-of-pages="pageCount" use-router align="center" />
		</div>
		<div>
			<nuxt-child :articles="writings" :count="perPage" />
		</div>
		<div class="my-4" v-if="pageCount > 1">
			<b-pagination-nav pills :link-gen="linkGen" :number-of-pages="pageCount" use-router align="center" />
		</div>
	</b-container>
</template>

<script>
export default {
	components: {
		Article: () => import('@/components/Article')
	},
	async asyncData() {
		const resolve = require.context('@/writings/', true, /\.md$/);
		let writings = resolve.keys()
			.map(key => {
				const [, name] = key.match(/\/(.+)\.md$/);
				const file = resolve(key);
				return file.attributes;
			})
			.sort((a,b) => new Date(b.created) - new Date (a.created));
		return { writings };
	},
	data() {
		return {
			perPage: 5,
		}
	},
	computed: {
		pageCount() {
			return Math.ceil(this.writings.length / this.perPage);
		}
	},
	methods: {
		linkGen(pageNum) {
			return pageNum === 1 ? '/writing' : `/writing/page/${pageNum}`
		}
	}
}
</script>