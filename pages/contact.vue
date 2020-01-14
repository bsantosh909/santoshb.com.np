<template>
  <div class="container mt-5 mb-5" align="center">
    <h1>CONTACT</h1>
    <p>Feel free to say hello!</p>
    <div>
      <div v-if="visibleMail">
        <div class="separator">
          <h5>Write me</h5>
        </div>
        <SocialIcon id="gmail" link="`mailto:${email}`" name="Email" />
      </div>

      <div v-if="visibleGithub">
        <div class="separator">
          <h5>My Works</h5>
        </div>
        <SocialIcon id="github" link="https://github.com/TheLearneer" name="Github" />
      </div>

      <div class="separator">
        <h5>Social Sites</h5>
      </div>
      <b-row v-for="siteArr in socialChunk" :key="`row-${siteArr[0].id}`" class="pb-3" no-gutters>
        <b-col v-for="site in siteArr" :key="site.id">
          <SocialIcon :link="site.link" :id="site.id" :name="site.name" />
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    SocialIcon: () => import('@/components/Social/Icon')
  },
  data () {
    return {
      email: '',
      visibleMail: false,
      visibleGithub: true,
      title: 'Contact',
      socials: [
        { link: 'https://www.facebook.com/santosh.bhandari.1401', id: 'facebook', name: 'Facebook' },
        { link: 'https://www.instagram.com/bsantosh909', id: 'instagram', name: 'Instagram' },
        { link: 'https://twitter.com/bsantosh909', id: 'twitter', name: 'Twitter' },
        { link: 'https://www.youtube.com/user/TheSantoshbhandari', id: 'youtube', name: 'Youtube' }
      ]
    }
  },
  computed: {
    socialChunk () {
      const perRow = 4
      const myArray = []
      for (let i = 0; i < this.socials.length; i += perRow) {
        myArray.push(this.socials.slice(i, i + perRow))
      }
      return myArray
    }
  }
}
</script>

<style scoped>
h1 {
  padding-bottom: 20px;
}
a {
  text-decoration: underline;
  color: black;
}
.separator {
  display: flex;
  align-items: center;
  text-align: center;
  padding-top: 50px;
  padding-bottom: 20px;
}
.separator::before, .separator::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #d9d9d9;
}
.separator::before {
  margin-right: 1em;
}
.separator::after {
  margin-left: 1em;
}
</style>
