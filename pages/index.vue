<template>
  <div class="pt-3 pb-5 text-center">
    <!--
    <b-alert v-if="isBirthday" show>
      It's my birthday!
    </b-alert>
    -->
    <div class="container pt-3 pb-5 animated zoomIn">
      <b-img src="/img/me.jpg" height="256" class="rounded-circle border-3 border-solid border-indigo-200" alt="Santosh Bhandari with an smile" />
      <h1 class="pt-4">
        Santosh Bhandari
      </h1>
      <p><b>Developer &bull; Gamer</b></p>
    </div>
    <div class="bg-gray-400 pt-5 pb-5 text-left">
      <div class="container">
        <h4 class="text-center pb-4">
          Hello!
        </h4>
        <p>
          My name is <i>Santosh Bhandari</i> all the way from <b>Kathmandu, Nepal</b>. I am currently {{ age }} years old. I am currently studying <b>Computer Engineering</b>.
          And the most important thing "If there is anything after air for survival, it's <i>Computers</i> for me"!
        </p>
        <p>
          My weekday activies(<i>which are boring</i>) includes 75% studying, 15% sleeping, 5% eating and 5% playing with mobile and computers.
          But my weekend is real fun. I enjoy myself 75% with using computers and learning new stuffs. The rest are the same... I really like sleeping too.
        </p>
        <p>
          I have been using computer since the age of 13. And most of the stuffs I know today; after {{ age - 13 }} years of using computers
          are self learned. I really enjoy learning new stuffs (<i>NOT BOOKS</i>) and experimenting with them. Doing so really puts a smile on my face.
          I am impatient as well, result of which I keep hoping to new stuffs, learn them for the basics and hop again to new stuff.
          But I am gained some good knowledge with few of what I have learnt.
        </p>
        <p>
          I have good hands of knowledge on Javascript and <i>Node.js</i>. Also I have started using Nuxt.js to create all the necessity of my web app frontends.
          Even this entire Site is built using Nuxt.js. Alongside it I use Bootstrap to give classy looks to my websites.
          I am heading further to gain a level of expertise on Python and AI as well.
        </p>
        <span>Do stay in touch with me, and keep visiting.</span>
        <p>
          I do have some amazing plans and schedules set up which might be interesting for you.
        </p>
        <span>Till then, Have a nice time!</span>
      </div>
    </div>
    <div class="container pt-5 pb-3">
      <SillSet />
    </div>
  </div>
</template>

<script>
export default {
  components: {
    SillSet: () => import('@/components/Skills.vue')
  },
  data () {
    return {
      age: Math.floor((Date.now() - new Date('1998-03-11')) / (1000 * 60 * 60 * 24 * 365))
    }
  }/*
  ,computed: {
    isBirthday() {
      const today = new Date();
      return today.getMonth() === 2 && today.getDate() === 11;
    }
  } */
}
</script>
