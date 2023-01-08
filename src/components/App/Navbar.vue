<template>
  <nav
    class="sticky top-0 z-10 flex justify-between bg-gray-100 bg-opacity-95 px-1 py-4 shadow-sm md:px-2 lg:px-3"
  >
    <div>
      <NuxtLink to="/">Santosh Bhandari</NuxtLink>
    </div>

    <div class="flex gap-x-5">
      <div v-for="(item, index) of navItems" :key="index">
        <NuxtLink :to="item.link">{{ item.title }}</NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const navItems = [
  {
    title: "Skills",
    link: "/skills",
  },
  {
    title: "Contact ME",
    link: "/contact",
  },
];
</script>
