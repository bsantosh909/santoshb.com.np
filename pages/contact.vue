<template>
	<div class="container mx-auto p-5">
		<h1 class="text-5xl text-center font-bold uppercase">Contact</h1>
		<div class="text-center pb-10">
			<span>Feel free to say hello!</span>
		</div>
		<div v-for="list of contacts" :key="list.title" class="mt-5 text-center">
			<div class="text-3xl font-semibold capitalize">
				{{ list.title }}
			</div>
			<div class="italic">
				{{ list.description }}
			</div>
			<div class="py-4 justify-around flex flex-wrap capitalize font-semibold mt-4">
				<div v-for="site of list.items" :key="site.name" class="m-2">
					<a :href="site.link" target="_blank">
						<div class="block">
							<img :src="getSocialImage(site.name)" :alt="site.name" class="w-16 mb-2 rounded-full">
							<span>{{ site.name }}</span>
						</div>
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			contacts: [
				{
					title: 'write me',
					description: 'If you have anything to talk with me directly then you can always mail me. I check my mail every day, so you will get a response for sure.',
					items: [{ link: 'mailto:contact@santoshb.com.np', name: "gmail" }]
				},
				{
					title: 'social sites',
					description: 'Just like you I am somehow active around social sites as well. You can add, follow and subscribe me over there as well!',
					items: [
						{ link: 'https://www.facebook.com/santosh.bhandari.1401', name: 'facebook' },
						{ link: 'https://www.instagram.com/bsantosh909', name: 'instagram' },
						{ link: 'https://twitter.com/bsantosh909', name: 'twitter' },
						{ link: 'https://www.youtube.com/user/TheSantoshbhandari', name: 'youtube' }
					]
				}
			]
		}
	},
	head() {
		return {
			title: 'Contact ME | Santosh Bhandari'
		}
	},
	methods: {
		getSocialImage(id) {
			try {
				return require(`~/assets/img/social/${id}.png`)
			} catch(err) {
				return '';
			}
		}
	}
}
</script>