<template>
	<div>
		<a :href="link" target="_blank" class="text-decoration-none text-dark">
			<b-img-lazy :src="imageLink" :width="size" rounded="circle" :thumbnail="thumbnail" />
			<p v-if="display" class=" text-capitalize">{{ name }}</p>
		</a>
	</div>
</template>

<script>
export default {
	props: {
		link: String,
		name: String,
		id: String,
		size: {
			type: Number,
			default: 58
		},
		display: {
			type: Boolean,
			default: true
		},
		thumbnail: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		imageLink() {
			const size = Math.pow(2,Math.round(Math.log(this.size)/Math.log(2)));
			return this.images[this.id].replace('{{size}}', size);
		}
	},
	data () {
		return {
			images: {
				youtube: 'https://cdn4.iconfinder.com/data/icons/social-media-icons-the-circle-set/48/youtube_circle-{{size}}.png',
				facebook: 'https://cdn4.iconfinder.com/data/icons/social-media-icons-the-circle-set/48/facebook_circle-{{size}}.png',
				instagram: 'https://cdn4.iconfinder.com/data/icons/social-media-2146/512/25_social-{{size}}.png',
				twitter: 'https://cdn4.iconfinder.com/data/icons/social-media-icons-the-circle-set/48/twitter_circle-{{size}}.png',
				github: 'https://cdn4.iconfinder.com/data/icons/octicons/1024/mark-github-{{size}}.png',
				gmail: 'https://cdn4.iconfinder.com/data/icons/social-icons-circular-color/512/gmail-{{size}}.png'
			}
		}
	}
}
</script>