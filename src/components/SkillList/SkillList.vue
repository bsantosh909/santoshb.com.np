<template>
  <div>
    <h2 class="text-xl font-semibold">{{ props.title }}</h2>

    <div class="mt-3 flex flex-wrap gap-2">
      <div
        v-for="item of props.items"
        :key="item.id"
        class="group flex w-20 flex-col items-center text-center"
        v-motion-pop
      >
        <div class="mb-1 rounded-lg bg-gray-200 p-1">
          <NuxtImg
            :src="`/icons/${item.id}.svg`"
            width="64"
            height="64"
            class="rounded-lg group-hover:scale-105"
          />
        </div>

        <div class="break-words text-sm">
          <NuxtLink v-if="item.url" :href="item.url" external>
            <p class="hover:text-blue-700 group-hover:underline">
              {{ item.title }}
            </p>
          </NuxtLink>

          <p v-else>
            {{ item.title }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ISkillListProps {
  title: string;
  items: ISkillItem[];
}

const props = defineProps<ISkillListProps>();
</script>
