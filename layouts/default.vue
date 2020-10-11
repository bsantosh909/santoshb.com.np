<template>
	<div>
		<AppNavbar />
		<Nuxt />
		<AppFooter />
	</div>
</template>

<script>
	export default {
		head() {
			let canonical = `https://santoshb.com.np${this.$route.path}`;
			if (canonical.slice(-1) !== "/") canonical = canonical + "/";
			return {
				link: [{ rel: "canonical", href: canonical }],
				meta: [
					// Open Graph
					{
						hid: "og:site_name",
						property: "og:site_name",
						content: "Santosh Bhandari"
					},
					{
						hid: "og:title",
						property: "og:title",
						content: "Santosh Bhandari - Innovative Developer"
					},
					{
						hid: "og:description",
						property: "og:description",
						content:
							"Personal Website, Protfolio, Blog featuring interesting articles and some of mine free time writings!"
					},
					{ hid: "og:type", property: "og:type", content: "website" },
					{ hid: "og:url", property: "og:url", content: canonical },
					{
						hid: "og:image",
						property: "og:image",
						content: "https://santoshb.com.np/icon.png"
					},
					// Twitter
					{
						hid: "twitter:card",
						name: "twitter:card",
						content: "summary_large_image"
					},
					{ hid: "twitter:site", name: "twitter:site", content: "@bsantosh909" },
					{
						hid: "twitter:title",
						name: "twitter:title",
						content: "Santosh Bhandari - Innovative Developer"
					},
					{
						hid: "twitter:description",
						name: "twitter:description",
						content:
							"Personal Website, Protfolio, Blog featuring interesting articles and some of mine free time writings!"
					},
					{
						hid: "twitter:image",
						name: "twitter:image",
						content: "https://santoshb.com.np/icon.png"
					},
					{
						hid: "twitter:image:alt",
						name: "twitter:image:alt",
						content: "Santosh Bhandari"
					}
				]
			};
		}
	};
</script>