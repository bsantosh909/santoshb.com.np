<template>
  <div class="container mx-auto p-8">
    <div class="text-center text-5xl font-bold"><u>Privacy Policy</u></div>
    <nuxt-content :document="privacy" />
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const privacy = await $content("privacy").fetch();
    return { privacy };
  },
};
</script>

<style lang="postcss">
.nuxt-content h2 {
  @apply text-3xl font-black mb-4 pb-1 border-b -mt-16 pt-24;
}
.nuxt-content h3 {
  @apply text-2xl font-extrabold mb-2 pb-1 border-b -mt-16 pt-20;
}
</style>
