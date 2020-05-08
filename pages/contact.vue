<template>
	<div class="pt-3">
		<div class="text-center">
			<p class="h1 text-uppercase mt-3 text-center font-weight-bold">contact</p>
			<div class="pt-2 pb-2 text-center">
				<p class="font-italic">Feel free to say hello!</p>
			</div>
		</div>
		<b-container class="py-3" align="center">
			<div v-for="(category, i) of contacts" :key="`contact-category-${i}`">
				<div class="separator">
					<span class="h5 font-weight-bold text-capitalize">{{ category.title }}</span>
				</div>
				<b-row no-gutters class="justify-content-center">
					<SocialIcon	v-for="(site, j) of category.items"	:key="`contact-category-${i}-site-${j}`" :id="site.id" :name="site.name" :link="site.link" class="mx-auto" />
				</b-row>
			</div>
		</b-container>
	</div>
</template>

<script>
export default {
	components: {
		SocialIcon: () => import('@/components/Social')
	},
	data () {
		return {
			contacts: [
				{
					title: 'write me',
					items: [{ link: 'mailto:contact@santoshb.com.np', id: "gmail", name: "gmail" }]
				},
				{
					title: 'social sites',
					items: [
						{ link: 'https://www.facebook.com/santosh.bhandari.1401', id: 'facebook', name: 'Facebook' },
						{ link: 'https://www.instagram.com/bsantosh909', id: 'instagram', name: 'Instagram' },
						{ link: 'https://twitter.com/bsantosh909', id: 'twitter', name: 'Twitter' },
						{ link: 'https://www.youtube.com/user/TheSantoshbhandari', id: 'youtube', name: 'Youtube' }
					]
				}
			]
		}
	}
}
</script>
