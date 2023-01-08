<template>
  <div>
    <h2 class="text-4xl">Contact me</h2>

    <div class="mt-5">
      <h3 class="text-2xl">Social Handles</h3>
      <p class="text-gray-600">
        Feel free to connect with me and/or follow me across various of my
        social handles!
      </p>

      <div class="mt-3 flex flex-wrap gap-x-7 gap-y-4">
        <div
          v-for="socialSite of socialHandles"
          :key="socialSite.id"
          class="group text-center"
        >
          <NuxtLink
            :to="socialSite.url"
            external
            target="_blank"
            rel="noreferrer"
          >
            <div class="group-hover:scale-110 group-hover:drop-shadow-md">
              <NuxtImg
                :src="`/icons/${socialSite.id}.svg`"
                width="64"
                loading="lazy"
              />
            </div>
            <p class="text-sm group-hover:font-semibold">
              {{ socialSite.title }}
            </p>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const socialHandles: ISocialHandle[] = [
  {
    id: "github",
    title: "Github",
    url: "https://github.com/TheLearneer",
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    url: "https://www.linkedin.com/in/bsantosh909/",
  },
  {
    id: "twitter",
    title: "Twitter",
    url: "https://twitter.com/bsantosh909",
  },
];
</script>
