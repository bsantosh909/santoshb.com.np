<template>
	<div class="container mx-auto" align="center">
		<div class="text-4xl font-bold my-6"><u>My skills</u></div>
		<div class="flex flex-wrap">
			<div class="w-full md:w-2/3 block">
				<div v-for="(group, i) of skills" :key="`skillset-${i}`" class="py-3">
					<div class="text-2xl md:text-3xl flex flex-wrap justify-center">
						<span class="mr-6 font-semibold">{{ group.title }}</span>
						<div>
							<div v-for="k in 5" :key="k" class="inline-block rotate-stars">
								<svg
									class="w-6 mr-1"
									viewBox="0 0 16 16"
									fill="orange"
									v-if="k <= group.rating"
								>
									<path
										d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
									/>
								</svg>
								<svg class="w-6 mr-1" viewBox="0 0 16 16" fill="black" v-else>
									<path
										fill-rule="evenodd"
										d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288l1.847-3.658 1.846 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.564.564 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"
									/>
								</svg>
							</div>
						</div>
					</div>
					<span
						v-for="(item, j) of group.list"
						:key="`skillset-${i}-skill-${j}`"
						:class="item.strong ? 'font-semibold' : ''"
					>
						<i>{{ getSkillName(item.name, j, group.list.length) }}</i>
					</span>
				</div>
			</div>
			<div class="hidden md:block md:w-1/3">
				<ImageTransition :list="images" />
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				images: [
					{ name: "Vue.js", image: "img/technology/vuejs.png" },
					{ name: "Nuxt.js", image: "img/technology/nuxtjs.png" },
					{ name: "Github", image: "img/technology/github.png" },
					{ name: "Git", image: "img/technology/git.png" },
					{ name: "Bootstrap", image: "img/technology/bootstrap.png" },
					{ name: "Node.js", image: "img/technology/nodejs.png" },
					{ name: "VS Code", image: "img/technology/vscode.png" }
				],
				skills: [
					{
						title: "Programming Languages",
						rating: 4,
						list: [
							{ name: "Javascript", strong: true },
							{ name: "Typescript" },
							{ name: "C" },
							{ name: "C++" },
							{ name: "HTML" },
							{ name: "Visual Basics" },
							{ name: "SQL", strong: true }
						]
					},
					{
						title: "Front End Technologies",
						rating: 4,
						list: [
							{ name: "Vue.js", strong: true },
							{ name: "Nuxt.js", strong: true },
							{ name: "CSS" },
							{ name: "SCSS" },
							{ name: "Bootstrap", strong: true },
							{ name: "Bulma" }
						]
					},
					{
						title: "VC & CI",
						rating: 4,
						list: [{ name: "Git", strong: true }, { name: "Travis CI" }]
					},
					{
						title: "Others",
						rating: 4,
						list: [
							{ name: "Github desktop", strong: true },
							{ name: "Visual Studio" },
							{ name: "Visual Studio Code", strong: true },
							{ name: "JSON", strong: true }
						]
					}
				]
			};
		},
		methods: {
			getSkillName(skill, index, length) {
				return `${skill}${index < length - 1 ? ", " : ""}`;
			}
		}
	};
</script>

<style scoped>
	.star-checked {
		color: orange;
	}
	.rotate-stars {
		transform: rotate(20deg);
	}
</style>
