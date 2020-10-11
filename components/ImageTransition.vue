<template>
	<transition
		name="custom"
		mode="out-in"
		enter-active-class="animated fadeIn"
		leave-active-class="animated fadeOut"
	>
		<div :key="currentImage">
			<img
				:src="activeData.image"
				:key="activeData.text"
				:alt="`Skilled with ${activeData.text}`"
				width="248"
			/>
			<div class="text-xl font-bold" v-if="showText">{{ activeData.text }}</div>
		</div>
	</transition>
</template>

<script>
	export default {
		props: {
			list: Array,
			showText: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				currentImage: 0
			};
		},
		computed: {
			activeData() {
				const preData = this.randomizedList[this.currentImage];
				if (!preData.hasOwnProperty("local")) {
					preData.local = true;
				}
				return {
					text: preData.name,
					image: preData.local
						? require(`@/assets/${preData.image}`)
						: preData.image
				};
			},
			randomizedList() {
				let t1;
				let j;
				const ret = this.list.slice(0);
				let i = ret.length;
				while (--i > 0) {
					t1 = ret[(j = Math.round(Math.random() * i))];
					ret[j] = ret[i];
					ret[i] = t1;
				}
				return ret;
			}
		},
		created() {
			this.switchImages();
		},
		methods: {
			switchImages() {
				setInterval(() => {
					const newValue = this.currentImage + 1;
					this.currentImage = newValue > this.list.length - 1 ? 0 : newValue;
				}, 7000);
			}
		}
	};
</script>

<style>
	@-webkit-keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	.fadeIn {
		-webkit-animation-name: fadeIn;
		animation-name: fadeIn;
	}
	@-webkit-keyframes fadeOut {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}
	@keyframes fadeOut {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}
	.fadeOut {
		-webkit-animation-name: fadeOut;
		animation-name: fadeOut;
	}
	.animated {
		-webkit-animation-duration: 1s;
		animation-duration: 1s;
		-webkit-animation-fill-mode: both;
		animation-fill-mode: both;
	}
</style>
