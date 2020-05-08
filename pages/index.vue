<template>
	<div class="pt-3">
		<b-container align="center" class="my-4">
			<b-img-lazy thumbnail :src="$icon(384)" width="320" rounded="circle" class="mb-3 animated slow pulse" alt="Santosh Bhandari" title="Rare sight of my selfie!" />
			<p class="h1 font-weight-bold mt-2">Santosh Bhandari</p>
			<p class="font-weight-bold text-capitalize">{{ skills.join('&ensp;•&ensp;') }}</p>
		</b-container>
		<div class="bg-gray-300 mt-5">
			<b-container class="py-4">
				<p class="h4 text-center font-weight-bold pb-4"><u>About ME</u></p>
				<div class="mt-3 text-center">
					<p v-for="(detail, i) of about" :key="`my-info-${i}`">
						<span>•&ensp;</span>
						<span>{{ detail.title }}:</span>
						<span class="font-weight-bold">&ensp;{{ detail.text }}</span>
					</p>
				</div>
				<hr />
				<div class="pt-2 pb-3">
					<p>I have been using computer since the age of 13. Thus today, I cannot imagine my day with computers! I enjoy learning new stuffs (NOT THROUGH BOOKS) and while doing so I usually break stuffs. But that still gives me some new knowledge, so I am mostly happy with that.</p>
					<p>Most of my days usually have a busy schedule so I am unable to learn new on weekdays, but I spend most of my weekends using computers to backtrack everything I missed and be upto date with the current trend!</p>
					<p>I gained interest in computers since the very first time I saw them. Since them I have learned most of the stuffs myself with the help of internet and also breaking own PC's hardware! Regarding the programming and development, I got into all this back in 2014 through <i>Pokémon</i>! Being a huge fan of pokemon games, one day I ended up on a pokemon fan game development facebook group, which then inspired me to make on my pokemon fan game. Then with the flow of events I ended of learning <i>asm programming</i> and using <i>Visual Studio</i> on my own! Since then, I have learnt many stuffs on my own and also through my Computer Science course in college.<br>Talking about the current date, I am still learning something new and also trying to improve my skills as far as possible.</p>
					<p>I like to know more and more people around, so do stay in touch with me, and keep visiting!<br>I do have some amazing plans and schedules set up which might be interesting for you.</p>
					<p>Till then, Have a nice time! <b>STAY SAFE</b>!</p>
				</div>
			</b-container>
		</div>
		<div class="text-center pb-5 pt-4">
			<SillSet />
		</div>
		<div class="bg-gray-300 py-3">	
			<blockquote class="blockquote text-center">
				<p class="mb-0">"{{ quote.text }}"</p>
				<footer class="blockquote-footer font-italic">{{ quote.author ? quote.author : 'Someone Amazing' }}</footer>
			</blockquote>
		</div>
	</div>
</template>

<script>
import { randomQuote } from '@/utils/quotes';

export default {
	components: {
		SillSet: () => import('@/components/Skills.vue')
	},
	data() {
		return {
			skills: ['developer', 'gamer', 'writer'],
			about: [
				{ title: 'Full Name', text: 'Santosh Bhandari' },
				{ title: 'Age', text: Math.floor((Date.now() - new Date('1998-03-11')) / (1000 * 60 * 60 * 24 * 365)) },
				{ title: 'Location', text: 'Kathmandu, Nepal' },
				{
					title: 'Hobbies',
					text: ['Programming', 'Playing mobile games', 'Listening to music', 'Writing in peace!'].join(', ')
				}
			],
			quote: randomQuote()
		}
	}
}
</script>
