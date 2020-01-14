<template>
  <div>
    <h2>My skills</h2>
    <b-row class="pt-5">
      <b-col md="7" lg="8">
        <div v-for="skill in skills" :key="skill.id" class="pt-2 pb-3">
          <h4>
            {{ skill.title }}
            <div class="mdi-set ml-3">
              <span
                v-for="i in (5)"
                :class="`mdi mdi-rotate-45 ${i <= skill.rating ? 'star-checked mdi-star' : 'mdi-star-outline'}`"
                :key="`rating-${skill.id}-${i}`"
              />
            </div>
          </h4>
          <span
            v-for="(_skill, index) in skill.list"
            :key="`skill-${_skill.name}`"
            :class="`${_skill.strong ? 'font-weight-bold' : ''}`"
          >
            <i>{{ getSkillName(_skill.name, index, skill.list.length) }}</i>
          </span>
        </div>
      </b-col>
      <b-col class="d-none d-md-block">
        <ImageTransition :list="images" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  components: {
    ImageTransition: () => import('@/components/ImageTransition')
  },
  data () {
    return {
      images: [
        { name: 'Vue.js', image: 'img/technology/vuejs.png' },
        { name: 'Nuxt.js', image: 'img/technology/nuxtjs.png' },
        // { name: 'Github', image: 'img/technology/github.png' },
        { name: 'Git', image: 'img/technology/git.png' },
        { name: 'Bootstrap', image: 'img/technology/bootstrap.png' },
        { name: 'Node.js', image: 'img/technology/nodejs.png' },
        { name: 'VS Code', image: 'img/technology/vscode.png' }
      ],
      skills: [
        {
          title: 'Programming Languages',
          id: 'skill-languages',
          rating: 4,
          list: [
            { name: 'Javascript', strong: true },
            { name: 'C' },
            { name: 'C++' },
            { name: 'HTML' },
            { name: 'Visual Basics' },
            { name: 'SQL', strong: true }
          ]
        },
        {
          title: 'Front End Technologies',
          id: 'skill-front-end',
          rating: 3,
          list: [
            { name: 'Vue.js' },
            { name: 'Nuxt.js', strong: true },
            { name: 'CSS' },
            { name: 'SCSS' },
            { name: 'Bootstrap', strong: true },
            { name: 'Bulma' }
          ]
        },
        {
          title: 'VC & CI',
          id: 'skill-vc-ci',
          rating: 4,
          list: [{ name: 'Git', strong: true }, { name: 'Travis CI' }]
        },
        {
          title: 'Others',
          id: 'skill-tools',
          rating: 4,
          list: [
            { name: 'Github desktop', strong: true },
            { name: 'Visual Studio' },
            { name: 'Visual Studio Code', strong: true },
            { name: 'JSON', strong: true }
          ]
        }
      ]
    }
  },
  methods: {
    getSkillName (skill, index, length) {
      return `${skill}${index < length - 1 ? ', ' : ''}`
    }
  }
}
</script>

<style scoped>
.star-checked {
  color: orange;
}
</style>
