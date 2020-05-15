<template>
	<div class="pt-3">
		<div class="text-center">
			<p class="h1 text-uppercase mt-3 text-center font-weight-bold">Portfolio</p>
			<div class="pt-2 pb-2 text-center">
				<span>These are some of the projects that I have done over time!</span>
				<p class="font-italic">Feedbacks are highly appreciated!</p>
			</div>
		</div>
		<b-container class="text-center">
			<div class="separator">
				<span class="h2 font-weight-bold">My Works</span>
			</div>
			<p class="py-2"><i>Most</i> of mine works are <b>open source</b> and are hosted on <i>github</i>. You are easily have a look at them through my github profile linked below!</p>
			<SocialIcon link="https://github.com/TheLearneer" id="github" name="github" class="pb-2" />
		</b-container>
		<b-container fluid class="bg-darker mt-3">
			<div class="container separator">
				<span class="h4 font-weight-bold">Notable Works</span>
			</div>
			<b-row class="pb-5 px-3 justify-content-center">
				<div v-for="(item, i) of projects" :key="`portfolio-item-${i}`" class="m-4 fixed-width-container">
					<div class="rounded project-box fixed-width-container bg-gray-100">
						<b-row no-gutters class="pt-3 justify-content-center" v-if="item.image">
							<b-img-lazy :src="item.image" width="100" height="100" class="shadow rounded bg-gray-200" align="center" />
						</b-row>
						<b-row no-gutters class="pt-3 justify-content-center">
							<span class="h2 font-weight-bold">{{ item.title }}</span>
						</b-row>
						<hr class="mx-3">
						<b-row no-gutters class="text-center px-3">
							<div v-html="item.intro" />
						</b-row>
						<hr class="mx-3">
						<b-row no-gutters class="justify-content-center pb-2">
							<b-button size="sm" variant="success" v-if="item.demo" :href="item.demo" target="_blank" class="m-1">View Demo</b-button>
							<b-button size="sm" variant="primary" v-if="item.source" :href="item.source" target="_blank" class="m-1">View Source</b-button>
						</b-row>
					</div>
				</div>
			</b-row>
		</b-container>
	</div>
</template>

<script>
import { projects } from '@/utils/projects';

export default {
	data() {
		return {
			projects
		}
	},
	components: {
		SocialIcon: () => import('@/components/Social')
	}
}
</script>

<style scoped lang="scss">
.fixed-width-container {
	max-width: 300px;
	width: 300px;
	margin: auto;
}
.project-box {
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 7px 0 rgba(0, 0, 0, 0.19);
	&:hover {
		box-shadow: 0 7px 15px 0 rgba(0, 0, 0, 0.2), 0 10px 27px 0 rgba(0, 0, 0, 0.19);
	}
}
</style>