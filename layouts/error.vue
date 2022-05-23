<template>
  <div class="mx-auto p-4 text-center">
    <div class="text-5xl font-bold my-8">New Possibilities</div>
    <div class="text-xl my-6">
      Woah! You found a new possibility for us. But that might take some time.
      For now you might want to head to the discovered lands!
    </div>
    <nuxt-link to="/" class="my-10 text-2xl font-bold"> Home </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  head() {
    return {
      title: "Land full of possibilities",
    };
  },
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
