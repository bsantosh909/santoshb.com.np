<template>
  <a :href="link" target="_blank">
    <div :class="classObject" :style="styleObject" />
    <p>{{ name }}</p>
  </a>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    link: String, name: String, id: String, size: { type: Number, default: 58 }
  },
  data () {
    return {
      styleObject: {
        'background-size': 'cover',
        height: `${this.size}px`,
        width: `${this.size}px`,
        'border-radius': `${this.size / 2}px`,
        'margin-top': '5px',
        'margin-bottom': '10px'
      }
    }
  },
  computed: {
    classObject () {
      return `icon-${this.id}`
    }
  }
}
</script>

<style>
.icon-gmail {
  background-image: url("https://cdn4.iconfinder.com/data/icons/social-icons-circular-color/512/gmail-64.png");
}
.icon-github {
  background-image: url("https://cdn4.iconfinder.com/data/icons/octicons/1024/mark-github-64.png");
}
.icon-twitter {
  background-image: url("https://cdn4.iconfinder.com/data/icons/social-media-icons-the-circle-set/48/twitter_circle-64.png");
}
.icon-instagram {
  background-image: url("https://cdn4.iconfinder.com/data/icons/social-media-2146/512/25_social-64.png");
}
.icon-facebook {
  background-image: url("https://cdn4.iconfinder.com/data/icons/social-media-icons-the-circle-set/48/facebook_circle-64.png");
}
.icon-youtube {
  background-image: url("https://cdn4.iconfinder.com/data/icons/social-media-icons-the-circle-set/48/youtube_circle-64.png");
}
</style>
