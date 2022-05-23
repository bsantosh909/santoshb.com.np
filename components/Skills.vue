<template>
  <div class="container mx-auto" align="center">
    <div class="text-4xl font-bold my-6"><u>My skills</u></div>
    <div class="flex flex-wrap">
      <div class="w-full md:w-2/3 block">
        <div v-for="(group, i) of skills" :key="`skillset-${i}`" class="py-3">
          <div class="text-2xl md:text-3xl flex flex-wrap justify-center">
            <span class="font-semibold">{{ group.title }}</span>
          </div>
          <span
            v-for="(item, j) of group.list"
            :key="`skillset-${i}-skill-${j}`"
            :class="item.strong ? 'font-bold' : ''"
          >
            {{ getSkillName(item.name, j, group.list.length) }}
          </span>
        </div>
      </div>
      <div class="hidden md:block md:w-1/3">
        <ImageTransition :list="images" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        { name: "Vue.js", image: "img/technology/vuejs.png" },
        { name: "Nuxt.js", image: "img/technology/nuxtjs.png" },
        { name: "Github", image: "img/technology/github.png" },
        { name: "Git", image: "img/technology/git.png" },
        { name: "Bootstrap", image: "img/technology/bootstrap.png" },
        { name: "Node.js", image: "img/technology/nodejs.png" },
        { name: "VS Code", image: "img/technology/vscode.png" },
      ],
      skills: [
        {
          title: "Programming Languages",

          list: [
            { name: "Javascript", strong: true },
            { name: "Typescript", strong: true },
            { name: "C" },
            { name: "C++" },
            { name: "Visual Basics" },
            { name: "SQL", strong: true },
          ],
        },
        {
          title: "Front End Technologies",

          list: [
            { name: "Vue.js", strong: true },
            { name: "Nuxt.js", strong: true },
            { name: "React", strong: true },
            { name: "Next.js", strong: true },
            { name: "CSS" },
            { name: "SCSS" },
            { name: "Bootstrap", strong: true },
          ],
        },
        {
          title: "VC & CI",

          list: [
            { name: "Git", strong: true },
            { name: "Bitbucket" },
            { name: "Travis CI" },
          ],
        },
        {
          title: "Others",

          list: [
            { name: "Github desktop", strong: true },
            { name: "Visual Studio" },
            { name: "Visual Studio Code", strong: true },
            { name: "JSON", strong: true },
          ],
        },
      ],
    };
  },
  methods: {
    getSkillName(skill, index, length) {
      return `${skill}${index < length - 1 ? ", " : ""}`;
    },
  },
};
</script>

<style scoped>
.star-checked {
  color: orange;
}
.rotate-stars {
  transform: rotate(20deg);
}
</style>
