<template>
	<div>
		<p class="h3 font-weight-bold"><u>My skills</u></p>
		<b-row no-gutters class="pt-5">
			<b-col md="7" lg="8">
				<div v-for="(skill, i) of skills" :key="`skillset-${i}`" class="pt-2 pb-3">
					<h4>
						<span class="mr-3">{{ skill.title }}</span>
						<b-icon
							v-for="k in 5"
							class="mr-1"
							font-scale="0.85"
							rotate="45"
							:icon="k <= skill.rating ? 'star-fill' : 'star'"
							:color="k <= skill.rating ? 'orange' : 'black'"
							:key="`skillset-${i}-value-${k}`" />
					</h4>
					<span v-for="(item, j) of skill.list" :key="`skillset-${i}-skill-${j}`" :class="`${item.strong ? 'font-weight-bold' : ''}`">
						<i>{{ getSkillName(item.name, j, skill.list.length) }}</i>
					</span>
				</div>
			</b-col>
			<b-col class="d-none d-md-block">
				<ImageTransition :list="images" />
			</b-col>
		</b-row>
	</div>
</template>

<script>

export default {
	components: {
		ImageTransition: () => import('@/components/ImageTransition')
	},
	data () {
		return {
			images: [
				{ name: 'Vue.js', image: 'image/technology/vuejs.png' },
				{ name: 'Nuxt.js', image: 'image/technology/nuxtjs.png' },
				{ name: 'Github', image: 'image/technology/github.png' },
				{ name: 'Git', image: 'image/technology/git.png' },
				{ name: 'Bootstrap', image: 'image/technology/bootstrap.png' },
				{ name: 'Node.js', image: 'image/technology/nodejs.png' },
				{ name: 'VS Code', image: 'image/technology/vscode.png' }
			],
			skills: [
				{
					title: 'Programming Languages',
					id: 'skill-languages',
					rating: 4,
					list: [
						{ name: 'Javascript', strong: true },
						{ name: 'C' },
						{ name: 'C++' },
						{ name: 'HTML' },
						{ name: 'Visual Basics' },
						{ name: 'SQL', strong: true }
					]
				},
				{
					title: 'Front End Technologies',
					id: 'skill-front-end',
					rating: 3,
					list: [
						{ name: 'Vue.js' },
						{ name: 'Nuxt.js', strong: true },
						{ name: 'CSS' },
						{ name: 'SCSS' },
						{ name: 'Bootstrap', strong: true },
						{ name: 'Bulma' }
					]
				},
				{
					title: 'VC & CI',
					id: 'skill-vc-ci',
					rating: 4,
					list: [
						{ name: 'Git', strong: true },
						{ name: 'Travis CI' }
					]
				},
				{
					title: 'Others',
					id: 'skill-tools',
					rating: 4,
					list: [
						{ name: 'Github desktop', strong: true },
						{ name: 'Visual Studio' },
						{ name: 'Visual Studio Code', strong: true },
						{ name: 'JSON', strong: true }
					]
				}
			]
		}
	},
	methods: {
		getSkillName (skill, index, length) {
			return `${skill}${index < length - 1 ? ', ' : ''}`
		}
	}
}
</script>

<style scoped>
.star-checked {
  color: orange;
}
</style>
